import { validateEqualWords, validateSelection, wordCount } from './skills/zuweisung-reihenfolge/tools/validate.js';
import { buildChapterTask } from './chapter-one.js';
import { buildChapterTwoTask } from './chapter-two.js';
import { buildChapterThreeTask } from './chapter-three.js';
import { advancedDefinitions, buildAdvancedTask } from './advanced-lessons.js';
import { applyVariation, validateVariation } from './task-variation.js';
export { evaluate } from './skills/zuweisung-reihenfolge/tools/evaluate.js';
export { validateSelection };
export const typeLabels = { 'single-choice': 'Eine Antwort wählen', 'multiple-choice': 'Alle richtigen wählen', 'code-selection': 'Code auswählen', 'gap-fill': 'Lücken befüllen', ordering: 'Schritte ordnen', 'diagram-choice': 'Diagramm auswählen' };

function shuffle(items, random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
}

export function buildTask(selection, templates, language = 'python', random = Math.random) {
  if (!['python', 'javascript'].includes(language)) throw new Error('Ungültige Sprache.');
  const { template: t, parameters: p } = validateSelection(selection, templates);
  const variation = validateVariation(selection.variation, t);
  if (t.chapter >= 2) {
    const task = Object.hasOwn(advancedDefinitions,t.id) ? buildAdvancedTask(t,p,language) : t.chapter === 3 ? buildChapterThreeTask(t, p, language) : buildChapterTwoTask(t, p, language);
    for (const gap of task.gaps) {
      if (new Set(gap.choices.map(choice => wordCount(choice.text))).size !== 1) throw new Error('Lückenalternativen haben unterschiedliche Wortanzahl.');
      gap.choices = shuffle(gap.choices, random);
    }
    return selection.variation === undefined ? task : applyVariation(task, variation, random);
  }
  if (!['assignment', 'transfer'].includes(t.mode)) {
    const task = buildChapterTask(t, p, language);
    task.values = shuffle(task.values, random);
    return selection.variation === undefined ? task : applyVariation(task, variation, random);
  }
  const sum = p.start + p.add;
  const replace = text => text.replace(/\{(start|add|sum)\}/g, (_, key) => String({ ...p, sum }[key]));
  const output = value => language === 'python' ? `print(${value})` : `console.log(${value});`;
  const initial = `${language === 'javascript' ? 'let ' : ''}wert = ${p.start}${language === 'javascript' ? ';' : ''}`;
  const assignment = `wert = wert + ${p.add}${language === 'javascript' ? ';' : ''}`;
  const code = t.mode === 'assignment' ? [initial, assignment, output('wert')] : [initial, output(`wert + ${p.add}`), output('wert')];
  const task = {
    templateId: t.id, difficulty: t.difficulty, mode: t.mode, type: t.type, language,
    title: t.title, prompt: t.prompt, criteria: t.criteria, parameters: p, code,
    explanation: t.mode === 'assignment' ? `Vor der zweiten Zeile ist wert ${p.start}. Rechts wird ${p.start} + ${p.add} = ${sum} berechnet. Erst danach wird wert ${sum} zugeordnet. Die Ausgabe zeigt ${sum}.` : `Die erste Ausgabe berechnet ${p.start} + ${p.add} = ${sum}. Sie enthält keine Neuzuweisung: wert bleibt ${p.start}. Deshalb zeigt die zweite Ausgabe ${p.start}.`,
    trace: t.mode === 'assignment'
      ? [{ line: 1, value: p.start, output: '' }, { line: 2, value: sum, output: '' }, { line: 3, value: sum, output: String(sum) }]
      : [{ line: 1, value: p.start, output: '' }, { line: 2, value: p.start, output: String(sum) }, { line: 3, value: p.start, output: String(p.start) }]
  };
  if (t.options || t.diagrams) {
    const options = (t.options || t.diagrams).map(o => ({ ...o, ...(o.text ? { text: replace(o.text) } : { nodes: o.nodes.map(replace) }) }));
    validateEqualWords(options);
    const selected = options.filter(o => o.correct).map(o => o.id);
    if (!selected.length || selected.length === options.length || (t.type !== 'multiple-choice' && selected.length !== 1)) throw new Error('Ungültiger Lösungsschlüssel.');
    task.solution = { selected };
    task.options = shuffle(options.map(({ correct, ...rest }) => rest), random);
  } else if (t.type === 'code-selection') {
    task.regions = [{ id: 'target', text: 'wert' }, { id: 'assignment', text: '=' }, { id: 'expression', text: `wert + ${p.add}` }];
    task.values = shuffle([p.start, sum, sum + p.add], random);
    task.solution = { region: 'expression', value: p.start };
  } else if (t.type === 'gap-fill') {
    task.gaps = [{ id: 'old', label: 'Bisheriger Wert rechts' }, { id: 'result', label: `Ergebnis nach Addition von ${p.add}` }, { id: 'new', label: 'Wert nach der Neuzuweisung' }];
    task.values = shuffle([p.start, sum, sum + p.add], random);
    task.solution = { gaps: { old: p.start, result: sum, new: sum } };
  } else if (t.type === 'ordering') {
    task.steps = shuffle(t.steps, random);
    if (task.steps.every((s, i) => s.id === t.steps[i].id)) task.steps.push(task.steps.shift());
    task.solution = { order: t.steps.map(s => s.id) };
  } else throw new Error('Unbekannte Vorlage.');
  return selection.variation === undefined ? task : applyVariation(task, variation, random);
}

export function publicTask(task) {
  const { solution, explanation, trace, gapHints, ...view } = task;
  if (view.generation) { const { draft, ...metadata } = view.generation; view.generation = metadata; }
  if (view.options) view.options = view.options.map(({ hint, ...option }) => option);
  return structuredClone(view);
}

export function parseSkill(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error('Skill benötigt YAML-Frontmatter.');
  // Bewusst begrenzter YAML-Teilumfang: skalare Werte und JSON-kompatible Arrays.
  const metadata = {};
  for (const line of match[1].split(/\r?\n/)) {
    const entry = line.match(/^([a-z_]+):\s*(.+)$/);
    if (!entry || Object.hasOwn(metadata, entry[1])) throw new Error('Ungültiges Skill-Frontmatter.');
    const raw = entry[2];
    if (/^[\["\d]/.test(raw)) {
      try { metadata[entry[1]] = JSON.parse(raw); } catch { throw new Error(`Ungültiges Frontmatter-Feld ${entry[1]}.`); }
    } else if (/^[a-z][a-z0-9.-]*$/.test(raw)) metadata[entry[1]] = raw;
    else throw new Error(`Nicht unterstütztes YAML-Feld ${entry[1]}.`);
  }
  const objectives = { 1: ['assignment-order', 'current-state', 'statement-order', 'value-copy'], 2: ['condition-check', 'branch-choice', 'decision-chain', 'branch-change'], 3: ['counted-loop', 'while-loop', 'loop-accumulator', 'loop-change','loop-break','loop-continue'], 4:['list-access','list-change','list-iteration','map-record','text-processing','collection-transform'], 5:['function-call','function-return','function-scope','function-effect','function-compose','function-module'] };
  if (metadata.status !== 'approved' || !objectives[metadata.chapter]?.includes(metadata.learning_objective) || !metadata.name || typeof metadata.description !== 'string' || !Array.isArray(metadata.difficulty_levels) || !metadata.difficulty_levels.every(d => [1, 2, 3].includes(d))) throw new Error('Skill ist nicht für das angegebene Kapitel freigegeben.');
  return { metadata, body: match[2].trim() };
}
