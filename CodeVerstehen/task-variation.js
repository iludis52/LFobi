import { validateEqualWords } from './skills/zuweisung-reihenfolge/tools/validate.js';

export const nameSets = {
  standard: { wert: 'wert', a: 'a', b: 'b' },
  punkte: { wert: 'punkte', a: 'punkte', b: 'bonus' },
  vorrat: { wert: 'vorrat', a: 'vorrat', b: 'reserve' },
  nummer: { wert: 'nummer', a: 'nummer', b: 'kopie' }
};

export function validateVariation(variation, template) {
  if (variation === undefined) return { names: 'standard', answer_form: 'original' };
  if (!variation || typeof variation !== 'object' || Array.isArray(variation) || Object.keys(variation).sort().join(',') !== 'answer_form,names' || !Object.hasOwn(nameSets, variation.names) || !['original', 'single-choice'].includes(variation.answer_form)) throw new Error('Ungültige Aufgabenvariation.');
  if (template.chapter >= 2 && variation.names !== 'standard') throw new Error(`Kapitel ${template.chapter} verwendet feste Kontextnamen.`);
  if (variation.answer_form === 'single-choice' && !(template.chapter >= 2) && !['current-state', 'statement-order', 'value-copy'].includes(template.mode)) throw new Error('Diese Antwortvariation ist für die Vorlage nicht freigegeben.');
  return { ...variation };
}

export function variationChoices(template) {
  return { names: template.chapter >= 2 ? ['standard'] : Object.keys(nameSets), answer_form: ['original', ...(template.chapter >= 2 || ['current-state', 'statement-order', 'value-copy'].includes(template.mode) ? ['single-choice'] : [])] };
}

export function applyVariation(task, variation, random = Math.random) {
  const names = nameSets[variation.names];
  const rename = text => text.replace(/\b(wert|a|b)\b/g, name => names[name]);
  task.variation = variation;
  task.variableNames = names;
  task.code = task.code.map(rename);
  for (const key of ['prompt', 'explanation']) task[key] = rename(task[key]);
  if (task.options) task.options = task.options.map(option => ({ ...option, ...(option.text ? { text: rename(option.text) } : { nodes: option.nodes.map(rename) }), ...(option.hint ? { hint: rename(option.hint) } : {}) }));
  if (task.regions) task.regions = task.regions.map(region => ({ ...region, text: rename(region.text) }));
  if (task.gaps) task.gaps = task.gaps.map(gap => ({ ...gap, label: rename(gap.label) }));
  if (task.steps) task.steps = task.steps.map(step => ({ ...step, text: rename(step.text) }));
  if (task.gapHints) task.gapHints = Object.fromEntries(Object.entries(task.gapHints).map(([id, hint]) => [id, rename(hint)]));
  task.trace = task.trace.map(step => ({ ...step, variables: Object.fromEntries(Object.entries(step.variables || { wert: step.value }).map(([name, value]) => [names[name] || name, value])) }));

  if (variation.answer_form === 'single-choice') {
    const gaps = task.gaps;
    if (gaps.length !== 2) throw new Error('Die Antwortvariation benötigt zwei Beobachtungspunkte.');
    const [first, second] = gaps.map(gap => task.solution.gaps[gap.id]);
    const wrong = task.values?.find(value => value !== first && value !== second);
    const wrongFirst = gaps[0].choices?.find(choice => choice.id !== first)?.id ?? wrong;
    const wrongSecond = gaps[1].choices?.find(choice => choice.id !== second)?.id ?? wrong;
    if (wrongFirst === undefined || wrongSecond === undefined) throw new Error('Eine falsche Alternative fehlt.');
    const display = (gap, value) => gap.choices?.find(choice => choice.id === value)?.text ?? value;
    const combinations = [[first, second], [wrongFirst, second], [first, wrongSecond], [wrongFirst, wrongSecond]];
    task.pairLabels = gaps.map(gap => gap.label);
    task.options = combinations.map(([a, b], index) => ({ id: `pair-${index}`, pair: [display(gaps[0], a), display(gaps[1], b)], text: `${gaps[0].label}: ${display(gaps[0], a)}. ${gaps[1].label}: ${display(gaps[1], b)}.`, ...(index ? { hint: task.gapHints[gaps[a !== first ? 0 : 1].id] } : {}) }));
    validateEqualWords(task.options);
    for (let i = task.options.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1)); [task.options[i], task.options[j]] = [task.options[j], task.options[i]];
    }
    task.type = 'single-choice';
    task.prompt = task.mode === 'current-state' ? 'Welche Antwort nennt den Wert nach der angegebenen Zeile und die letzte Ausgabe richtig? Wähle genau eine Antwort.' : task.mode === 'statement-order' ? 'Die Programme A und B starten getrennt. Welche Antwort nennt beide Ausgaben richtig? Wähle genau eine Antwort.' : 'Welche Antwort nennt die erste und die zweite Ausgabe richtig? Wähle genau eine Antwort.';
    if (task.chapter >= 2) task.prompt = task.choicePrompt || 'Welche Antwort nennt beide Beobachtungen richtig? Wähle genau eine Antwort.';
    task.solution = { selected: ['pair-0'] };
    delete task.gaps; delete task.gapHints; delete task.values;
  }
  return task;
}
