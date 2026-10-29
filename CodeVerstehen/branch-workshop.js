import { branchGenerationPrompt, compactAdaptation } from './model-prompts.js';
import { runDecisionPrograms } from './chapter-two.js';
import { parseObject } from './model-client.js';
import { validateEqualWords, wordCount } from './skills/zuweisung-reihenfolge/tools/validate.js';

export const branchKinds = ['output', 'state', 'condition', 'lines', 'repair', 'compare'];
export const branchKindLabels = { output: 'Ausgabe vorhersagen', state: 'Endzustand bestimmen', condition: 'Bedingung beurteilen', lines: 'Ausgeführte Zeilen auswählen', repair: 'Passende Änderung finden', compare: 'Programme vergleichen' };
export const branchLimits = { 1: { nodes: 12, variables: 3, depth: 2, arithmetic: 0 }, 2: { nodes: 14, variables: 4, depth: 3, arithmetic: 1 }, 3: { nodes: 18, variables: 5, depth: 3, arithmetic: 3 } };
const operators = ['>', '>=', '<', '<='];
const forbiddenNames = new Set(['constructor', 'prototype', '__proto__', 'console', 'print', 'let', 'if', 'else', 'elif', 'class', 'return', 'var', 'const', 'function', 'true', 'false', 'True', 'False', 'None', 'null', 'undefined', 'eval', 'window', 'document', 'import', 'export', 'new', 'for', 'while', 'break', 'continue', 'this', 'globalThis', 'process']);
for (const keyword of ['await', 'yield', 'async', 'try', 'catch', 'finally', 'throw', 'switch', 'case', 'default', 'do', 'in', 'instanceof', 'typeof', 'void', 'delete', 'extends', 'super', 'with', 'debugger', 'enum', 'implements', 'interface', 'package', 'private', 'protected', 'public', 'static', 'arguments', 'as', 'assert', 'def', 'del', 'except', 'from', 'global', 'is', 'lambda', 'nonlocal', 'not', 'or', 'and', 'pass', 'raise']) forbiddenNames.add(keyword);
const fail = text => { throw new Error(text); };
const exact = (object, keys) => { if (!object || typeof object !== 'object' || Array.isArray(object) || Object.keys(object).sort().join(',') !== [...keys].sort().join(',')) fail(`Erwartete Felder: ${keys.join(', ')}.`); };
const name = value => { if (typeof value !== 'string' || !/^[a-z][a-z0-9_]{0,15}$/.test(value) || forbiddenNames.has(value)) fail('Ungültiger oder reservierter Name.'); return value; };
const integer = value => { if (!Number.isInteger(value) || value < -10 || value > 30) fail('Zahlenliterale müssen ganze Zahlen von -10 bis 30 sein.'); };
const literal = value => ({ kind: 'literal', value });
const variable = name => ({ kind: 'variable', name });
const binary = (left, op, right) => ({ kind: 'binary', left, op, right });
const assign = (id, name, value) => ({ id, kind: 'assign', name, value });
const output = (id, value) => ({ id, kind: 'output', value });
const decision = (test, body, otherwise) => ({ id: 'entscheidung', kind: 'decision', branches: [{ test, body }], otherwise });
const flatten = program => program.flatMap(node => [node, ...(node.kind === 'decision' ? [...node.branches[0].body, ...node.otherwise] : [])]);
const shuffled = (items, random) => {
  const copy = [...items]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy;
};

// Abstract interpretation checks every expression and both paths, including
// the branch not taken by these particular inputs. No model source is executed.
export function validateBranchDraft(draft, difficulty, requiredKind) {
  const limits = branchLimits[difficulty]; if (!limits) fail('Ungültige Schwierigkeit.');
  exact(draft, ['version', 'title', 'context', 'program', 'question']);
  if (draft.version !== 1) fail('Aufgabenformat muss Version 1 sein.');
  for (const [key, max] of [['title', 90], ['context', 240]]) if (typeof draft[key] !== 'string' || draft[key].trim().length < 8 || draft[key].length > max || /[<>\r\n]/.test(draft[key])) fail(`Ungültiger Text: ${key}.`);
  const ids = new Set(), assigned = new Set(); let nodes = 0, decisions = 0, arithmetic = 0;
  function expression(node, state, depth = 1) {
    if (depth > limits.depth) fail('Ausdruck ist für diese Stufe zu tief.');
    if (node?.kind === 'literal') {
      exact(node, ['kind', 'value']);
      if (typeof node.value === 'number') { integer(node.value); return { type: 'number', min: node.value, max: node.value }; }
      if (typeof node.value !== 'string' || !/^[\p{L}][\p{L}\p{N}]{0,15}$/u.test(node.value)) fail('Textwerte müssen ein kurzes einzelnes Wort sein.');
      return { type: 'string' };
    }
    if (node?.kind === 'variable') { exact(node, ['kind', 'name']); name(node.name); if (!Object.hasOwn(state, node.name)) fail('Variable wird vor ihrer Zuweisung verwendet.'); return state[node.name]; }
    exact(node, ['kind', 'left', 'op', 'right']);
    if (node.kind !== 'binary' || !['+', '-', ...operators].includes(node.op)) fail('Nicht zugelassener Ausdruck oder Operator.');
    const a = expression(node.left, state, depth + 1), b = expression(node.right, state, depth + 1);
    if (a.type !== 'number' || b.type !== 'number') fail('Rechnen und Vergleichen sind nur mit Zahlen erlaubt.');
    if (operators.includes(node.op)) return { type: 'boolean' };
    arithmetic++;
    const min = node.op === '+' ? a.min + b.min : a.min - b.max;
    const max = node.op === '+' ? a.max + b.max : a.max - b.min;
    if (min < -20 || max > 100) fail('Rechenergebnis liegt außerhalb von -20 bis 100.');
    return { type: 'number', min, max };
  }
  function block(body, state, inBranch = false) {
    if (!Array.isArray(body) || !body.length || body.length > limits.nodes) fail('Programmblöcke müssen kurz und nicht leer sein.');
    for (const node of body) {
      if (++nodes > limits.nodes) fail('Zu viele Anweisungen für diese Stufe.');
      name(node?.id); if (ids.has(node.id)) fail('Anweisungs-IDs müssen eindeutig sein.'); ids.add(node.id);
      if (node.kind === 'assign') {
        exact(node, ['id', 'kind', 'name', 'value']); name(node.name);
        if (inBranch && !Object.hasOwn(state, node.name)) fail('Neue Variablen müssen vor if/else initialisiert sein.');
        const value = expression(node.value, state);
        if (value.type === 'boolean') fail('Wahrheitswerte werden hier nur geprüft oder ausgegeben, nicht gespeichert.');
        if (state[node.name] && state[node.name].type !== value.type) fail('Der Typ einer Variable darf nicht wechseln.');
        state[node.name] = value; assigned.add(node.name);
        if (assigned.size > limits.variables) fail('Zu viele Variablen für diese Stufe.');
      } else if (node.kind === 'output') { exact(node, ['id', 'kind', 'value']); expression(node.value, state); }
      else if (node.kind === 'decision') {
        exact(node, ['id', 'kind', 'branches', 'otherwise']);
        if (inBranch || ++decisions > 1 || !Array.isArray(node.branches) || node.branches.length !== 1) fail('Genau ein nicht verschachteltes if/else ist erlaubt.');
        const branch = node.branches[0]; exact(branch, ['test', 'body']);
        if (branch.test?.kind !== 'binary' || !operators.includes(branch.test.op) || expression(branch.test, state).type !== 'boolean') fail('if benötigt einen numerischen Vergleich.');
        if (!JSON.stringify(branch.test).includes('"variable"')) fail('Die Bedingung muss einen Zustand prüfen.');
        const yes = structuredClone(state), no = structuredClone(state);
        block(branch.body, yes, true); block(node.otherwise, no, true);
        for (const key of Object.keys(state)) state[key] = state[key].type === 'number' ? { type: 'number', min: Math.min(yes[key].min, no[key].min), max: Math.max(yes[key].max, no[key].max) } : state[key];
      } else fail('Nicht zugelassene Anweisung.');
    }
    return state;
  }
  block(draft.program, {});
  if (decisions !== 1 || arithmetic < limits.arithmetic) fail('Die Programmkomplexität passt nicht zur gewählten Stufe.');
  if (!branchKinds.includes(draft.question?.kind) || draft.question.kind !== requiredKind) fail('Die Fragestellung entspricht nicht der angeforderten Aufgabenart.');
  const fields = { output: ['kind', 'index'], state: ['kind', 'variable'], condition: ['kind'], lines: ['kind'], repair: ['kind', 'node', 'expected'], compare: ['kind', 'operator', 'index'] };
  exact(draft.question, fields[requiredKind]);
  if (['output', 'compare'].includes(requiredKind) && (!Number.isInteger(draft.question.index) || draft.question.index < 0 || draft.question.index > 3)) fail('Ungültige Ausgabeposition.');
  if (requiredKind === 'state') name(draft.question.variable);
  if (requiredKind === 'repair') { name(draft.question.node); integer(draft.question.expected); }
  if (requiredKind === 'compare' && !operators.includes(draft.question.operator)) fail('Ungültige Vergleichsänderung.');
  return structuredClone(draft);
}

function execute(program, language) { return runDecisionPrograms([{ body: program }], language); }
const displayValue = value => typeof value === 'boolean' ? (value ? 'wahr' : 'falsch') : String(value);
const valueChoices = (value, pool = []) => {
  let values = typeof value === 'number' ? [value, ...pool.filter(item => typeof item === 'number'), value - 1, value + 1, value + 2] : typeof value === 'boolean' ? [true, false] : [value, ...pool.filter(item => typeof item === 'string')];
  if (typeof value === 'string' && new Set(values).size < 2) values.push(value === 'Unbekannt' ? 'Unverändert' : 'Unbekannt');
  values = [...new Set(values)].slice(0, typeof value === 'boolean' ? 2 : 4);
  return values.map((item, index) => ({ id: `value-${index}`, text: displayValue(item), value: item }));
};

export function branchFingerprint(draft) {
  const normalize = node => node.kind === 'literal' ? `literal:${typeof node.value}` : node.kind === 'variable' ? 'variable' : node.kind === 'binary' ? [node.op, normalize(node.left), normalize(node.right)] : node.kind === 'assign' ? ['assign', normalize(node.value)] : node.kind === 'output' ? ['output', normalize(node.value)] : ['if', normalize(node.branches[0].test), node.branches[0].body.map(normalize), node.otherwise.map(normalize)];
  return JSON.stringify(draft.program.map(normalize));
}
const contextKey = draft => draft.context.toLocaleLowerCase('de-DE').replace(/\d+/g, '#').replace(/[^\p{L}#]+/gu, ' ').trim();
export function checkBranchNovelty(draft, history) {
  const recent = history.slice(-3);
  if (recent.some(row => row.fingerprint === branchFingerprint(draft))) fail('Programmstruktur entspricht einer der letzten drei Aufgaben; andere Zahlen und Namen reichen nicht.');
  if (recent.some(row => row.context === contextKey(draft))) fail('Kontext entspricht einer der letzten drei Aufgaben.');
}

export function buildBranchTask(input, difficulty, language, requiredKind, random = Math.random) {
  const draft = validateBranchDraft(input, difficulty, requiredKind);
  let execution = execute(draft.program, language);
  const nodes = flatten(draft.program), testNode = nodes.find(node => node.kind === 'decision');
  const state = execution.runs[0].variables, outputs = execution.runs[0].outputs;
  const testStep = execution.trace.find(step => step.nodeId === testNode.id);
  const suffix = testStep.condition ? 'if' : 'else';
  // Both forced paths must have an observable effect; a cosmetic if/else is not a lesson.
  const forced = truth => { const copy = structuredClone(draft.program); flatten(copy).find(node => node.kind === 'decision').branches[0].test = binary(literal(truth ? 1 : 0), '>', literal(0)); return execute(copy, language).runs[0]; };
  if (JSON.stringify(forced(true)) === JSON.stringify(forced(false))) fail('Beide Zweige haben dieselbe Wirkung.');
  const task = { chapter: 2, templateId: `branch-workshop-${requiredKind}-v1`, mode: 'branch-choice', difficulty, language,
    title: draft.title, context: draft.context, taskKind: requiredKind, generation: { version: 1, draft },
    parameters: {}, criteria: ['branch-choice', `branch-${requiredKind}`], code: execution.code, trace: execution.trace,
    explanation: `Die Bedingung in Zeile ${testStep.line} ist ${testStep.condition ? 'wahr' : 'falsch'}. Deshalb wird der ${suffix}-Block ausgeführt; der andere Block wird übersprungen.`,
    variation: { names: 'standard', answer_form: requiredKind }, options: [], type: 'single-choice' };
  const finishOptions = (options, correct) => {
    validateEqualWords(options); task.options = shuffled(options, random); task.solution = { selected: correct };
  };
  const hint = 'Prüfe die Bedingung mit den Startwerten. Verfolge danach ausschließlich den gewählten Zweig.';
  if (requiredKind === 'output') {
    if (draft.question.index >= outputs.length || typeof outputs[draft.question.index] === 'boolean') fail('Die gewählte Ausgabe fehlt oder ist für diese Antwortform nicht geeignet.');
    if (forced(true).outputs[draft.question.index] === forced(false).outputs[draft.question.index]) fail('Die beobachtete Ausgabe muss vom gewählten Zweig abhängen.');
    const value = outputs[draft.question.index];
    task.prompt = `Welche Ausgabe erscheint an Position ${draft.question.index + 1}? Wähle genau eine Antwort.`;
    const pool = [forced(true).outputs[draft.question.index], forced(false).outputs[draft.question.index], ...execution.trace.filter(step => step.executed && step.line < testStep.line).flatMap(step => Object.values(step.variables))];
    const options = valueChoices(value, pool).map(({ value, ...option }) => ({ ...option, text: `Ausgabe: ${option.text}`, hint }));
    if (typeof value === 'string' && options.length < 3) options.push({ id: 'no-output', text: 'Keine Ausgabe', hint: 'Verfolge den gewählten Zweig: die gezeigte Ausgabeanweisung wird erreicht.' });
    finishOptions(options, ['value-0']);
    task.explanation += ` Die gesuchte Ausgabe lautet ${displayValue(value)}.`;
  } else if (requiredKind === 'state') {
    if (!Object.hasOwn(state, draft.question.variable)) fail('Beobachtete Variable fehlt.');
    if (forced(true).variables[draft.question.variable] === forced(false).variables[draft.question.variable]) fail('Der beobachtete Endzustand muss vom gewählten Zweig abhängen.');
    const value = state[draft.question.variable]; const choices = valueChoices(value, [forced(true).variables[draft.question.variable], forced(false).variables[draft.question.variable], ...execution.trace.filter(step => step.executed && step.line < testStep.line).map(step => step.variables[draft.question.variable])]);
    task.type = 'gap-fill'; task.prompt = `Welcher Wert ist am Ende in ${draft.question.variable} gespeichert?`;
    task.gaps = [{ id: 'state', label: `${draft.question.variable} am Ende`, choices: shuffled(choices.map(({ value, ...choice }) => choice), random) }];
    task.gapHints = { state: hint }; task.solution = { gaps: { state: 'value-0' } };
    task.explanation += ` Am Ende ist ${draft.question.variable} ${displayValue(value)}.`; delete task.options;
  } else if (requiredKind === 'condition') {
    task.prompt = `Wie wird die Bedingung in Zeile ${testStep.line} ausgewertet?`;
    finishOptions([{ id: 'true', text: 'Die Bedingung ist wahr.', hint }, { id: 'false', text: 'Die Bedingung ist falsch.', hint }, { id: 'unreached', text: 'Die Bedingung ist ungeprüft.', hint: 'Die einzelne if-Anweisung wird nach den Startzuweisungen erreicht.' }], [String(testStep.condition)]);
  } else if (requiredKind === 'lines') {
    const yes = execution.trace.find(step => step.nodeId === testNode.branches[0].body[0].id);
    const no = execution.trace.find(step => step.nodeId === testNode.otherwise[0].id);
    const after = execution.trace.find(step => step.line > Math.max(yes.line, no.line) && step.nodeId && nodes.some(node => node.id === step.nodeId && draft.program.includes(node)));
    const before = execution.trace.find(step => step.nodeId && step.line < testStep.line);
    const chosen = [testStep, yes, no, after || before];
    if (chosen.some(step => !step) || new Set(chosen.map(step => step.line)).size !== 4) fail('Vier unterschiedliche Beobachtungszeilen fehlen.');
    task.type = 'multiple-choice'; task.prompt = 'Welche dieser Zeilen werden ausgeführt? Kreuze alle richtigen Aussagen an.';
    finishOptions(chosen.map(step => ({ id: `line-${step.line}`, text: `Zeile ${step.line} wird ausgeführt.`, hint })), chosen.filter(step => step.executed).map(step => `line-${step.line}`));
  } else if (requiredKind === 'repair') {
    const target = nodes.find(node => node.id === draft.question.node), step = execution.trace.find(row => row.nodeId === draft.question.node);
    if (target?.kind !== 'assign' || !step?.executed || target.value.kind !== 'binary' || !['+', '-'].includes(target.value.op) || target.value.right.kind !== 'literal' || typeof target.value.right.value !== 'number') fail('Die Änderung benötigt eine ausgeführte Addition/Subtraktion mit einer Zahl rechts.');
    if (state[target.name] === draft.question.expected) fail('Das unveränderte Programm erreicht bereits das Änderungsziel.');
    const candidates = [];
    for (let number = 0; number <= 9; number++) {
      const altered = structuredClone(draft); flatten(altered.program).find(node => node.id === target.id).value.right.value = number;
      try { validateBranchDraft(altered, difficulty, requiredKind); candidates.push({ number, result: execute(altered.program, language).runs[0].variables[target.name] }); } catch { /* Unzulässige Änderungen werden nicht angeboten. */ }
    }
    const matches = candidates.filter(item => item.result === draft.question.expected);
    if (matches.length !== 1 || candidates.length < 3) fail('Die Änderung ist nicht eindeutig oder passende Alternativen fehlen.');
    const alternatives = [matches[0], ...candidates.filter(item => item.result !== draft.question.expected).slice(0, 2)];
    task.prompt = `Welche Zahl ersetzt die rechte Zahl ${target.value.right.value} in Zeile ${step.line}, damit ${target.name} am Ende ${draft.question.expected} ist?`;
    finishOptions(alternatives.map(item => ({ id: `change-${item.number}`, text: `Setze die Zahl ${item.number} ein.`, hint: `Mit ${item.number} ergibt sich am Ende ${item.result}. Gesucht ist ${draft.question.expected}.` })), [`change-${matches[0].number}`]);
    task.explanation += ` Mit ${matches[0].number} statt ${target.value.right.value} erreicht ${target.name} den Wert ${draft.question.expected}. Der Ablauf links zeigt das ursprüngliche Programm.`;
  } else {
    if (draft.question.operator === testNode.branches[0].test.op) fail('Programm B benötigt ein anderes Vergleichszeichen.');
    const modified = structuredClone(draft.program); flatten(modified).find(node => node.kind === 'decision').branches[0].test.op = draft.question.operator;
    validateBranchDraft({ ...draft, program: modified }, difficulty, requiredKind);
    execution = runDecisionPrograms([{ label: 'Programm A', body: draft.program }, { label: 'Programm B', body: modified }], language);
    const first = execution.runs[0].outputs[draft.question.index], second = execution.runs[1].outputs[draft.question.index];
    if (first === undefined || second === undefined || first === second || typeof first === 'boolean' || typeof second === 'boolean') fail('Der Vergleich muss zwei vorhandene unterschiedliche Ausgaben zeigen.');
    task.code = execution.code; task.trace = execution.trace; task.type = 'gap-fill';
    task.prompt = `Beide Programme starten getrennt. Welche Ausgabe erscheint jeweils an Position ${draft.question.index + 1}?`;
    task.gaps = [first, second].map((value, index) => ({ id: index ? 'b' : 'a', label: `Ausgabe aus Programm ${index ? 'B' : 'A'}`, choices: shuffled(valueChoices(value, [first, second]).map(({ value, ...choice }) => choice), random) }));
    task.solution = { gaps: { a: 'value-0', b: 'value-0' } }; task.gapHints = { a: hint, b: 'Starte B mit seinen eigenen Werten und prüfe das geänderte Vergleichszeichen.' }; delete task.options;
    task.explanation = `Das Vergleichszeichen wechselt von ${testNode.branches[0].test.op} zu ${draft.question.operator}. A gibt ${displayValue(first)} aus, B ${displayValue(second)}. Beide Programme haben eigene Startzustände.`;
  }
  for (const gap of task.gaps || []) if (new Set(gap.choices.map(choice => wordCount(choice.text))).size !== 1 || new Set(gap.choices.map(choice => choice.text)).size !== gap.choices.length) fail('Ungültige Lückenalternativen.');
  if (task.code.length > 48) fail('Das angezeigte Programm ist zu lang.');
  return task;
}

// Six distinct curated structures per stage; numbers are not the only difference.
export function fallbackBranchDraft(kind, difficulty, seed = 0, variant = 0) {
  const base = 4 + seed % 3, stage = difficulty;
  let program, question, title, context;
  const enrich = (body, tracked) => {
    if (stage > 1) body.unshift(assign('reserve_start', 'reserve', literal(2)));
    if (stage === 3) {
      body.unshift(assign('bonus_start', 'bonus', literal(1)));
      body.splice(body.findIndex(node => node.kind === 'decision'), 0, assign('vorpruefung', tracked, binary(variable(tracked), '+', variable('bonus'))), assign('reserve_plus', 'reserve', binary(variable('reserve'), '+', variable('bonus'))));
    }
    if (stage > 1) {
      const test = body.find(node => node.kind === 'decision').branches[0].test;
      if (test.left.kind === 'variable') { test.left = binary(test.left, '+', variable('reserve')); test.right.value += stage === 3 ? 3 : 2; }
    }
    return body;
  };
  if (kind === 'output') {
    title = 'Welche Nachricht zeigt das Spiel?'; context = 'Ein Spiel entscheidet anhand der Punkte, welche Nachricht auf dem Bildschirm erscheint.';
    program = [assign('start', 'punkte', literal(base)), decision(binary(stage > 1 ? binary(variable('punkte'), '+', variable('reserve')) : variable('punkte'), '>=', literal(stage === 1 ? 5 : stage === 2 ? 7 : 9)), [output('freigabe', literal('Freigabe'))], [output('training', literal('Training'))])];
    enrich(program, 'punkte'); question = { kind, index: 0 };
  } else if (kind === 'state') {
    title = 'Wie viel Energie bleibt im Akku?'; context = 'Ein Gerät zieht bei ausreichender Energie drei Einheiten ab und lädt sonst zwei Einheiten nach.';
    program = [assign('start', 'energie', literal(base)), decision(binary(variable('energie'), '>=', literal(5)), [assign('verbrauch', 'energie', binary(variable('energie'), '-', literal(3)))], [assign('laden', 'energie', binary(variable('energie'), '+', literal(2)))]), output('ende', variable('energie'))];
    enrich(program, 'energie'); question = { kind, variable: 'energie' };
  } else if (kind === 'condition') {
    title = 'Welche Prüfung steuert die Pumpe?'; context = 'Eine Pumpe prüft einen Wasserstand und speichert anschließend den passenden Betriebsstatus.';
    program = [assign('start', 'wasser', literal(base)), assign('status_start', 'status', literal('Pause')), decision(binary(stage > 1 ? binary(variable('wasser'), '-', variable('reserve')) : variable('wasser'), '>', literal(3)), [assign('pumpen', 'status', literal('Pumpen'))], [assign('pause', 'status', literal('Pause'))]), output('meldung', variable('status'))];
    enrich(program, 'wasser'); question = { kind };
  } else if (kind === 'lines') {
    title = 'Welchen Weg nimmt die Lieferung?'; context = 'Ein Lieferdienst prüft freie Plätze und verändert nur die Werte im gewählten Zweig.';
    program = [assign('start', 'plaetze', literal(base)), assign('pakete_start', 'pakete', literal(2)), decision(binary(variable('plaetze'), '<', literal(5)), [assign('erweitern', 'plaetze', binary(variable('plaetze'), '+', variable('pakete'))), output('ausgabe_a', variable('plaetze'))], [assign('belegen', 'plaetze', binary(variable('plaetze'), '-', variable('pakete'))), output('ausgabe_b', variable('plaetze'))]), output('anzahl', variable('pakete'))];
    enrich(program, 'plaetze'); question = { kind };
  } else if (kind === 'repair') {
    title = 'Eine Zugabe für den richtigen Vorrat'; context = 'Ein Lager ergänzt einen kleinen Vorrat. Du sollst die Zugabe auf den gewünschten Endbestand einstellen.';
    program = [assign('start', 'vorrat', literal(base)), decision(binary(variable('vorrat'), '>=', literal(4)), [assign('zugabe', 'vorrat', binary(variable('vorrat'), '+', literal(1)))], [assign('entnahme', 'vorrat', binary(variable('vorrat'), '-', literal(1)))]), output('ende', variable('vorrat'))];
    enrich(program, 'vorrat'); question = { kind, node: 'zugabe', expected: base + 3 + (stage === 3 ? 1 : 0) };
  } else if (kind === 'compare') {
    title = 'Zwei Regeln für eine Spielrunde'; context = 'Zwei Spielversionen unterscheiden sich genau am Vergleichszeichen für die Startfreigabe.';
    program = [assign('start', 'zeit', literal(5)), decision(binary(variable('zeit'), '>=', literal(5)), [output('starten', literal('Starten'))], [output('warten', literal('Warten'))]), output('zeit_ende', variable('zeit'))];
    enrich(program, 'zeit');
    if (stage > 1) program.splice(program.findIndex(node => node.kind === 'decision'), 0, assign('reserve_schritt', 'reserve', binary(variable('reserve'), '+', literal(1))));
    if (stage > 1) program.find(node => node.kind === 'decision').branches[0].test.right.value = stage === 3 ? 10 : 8;
    question = { kind, operator: '>', index: 0 };
  } else fail('Unbekannte Aufgabenart.');
  if (variant) {
    const tracked = program.find(node => node.kind === 'assign' && node.value.kind === 'literal' && typeof node.value.value === 'number').name;
    const endings = [[literal(0)], [literal('Ende')], [variable(tracked)], [binary(variable(tracked), '+', literal(0))], [literal(0), literal(1)], [literal('Ende'), literal('Fertig')], [literal(0), literal('Ende')]];
    endings[variant - 1].forEach((value,index) => program.push(output(`abschluss${index}`, value)));
    context += [' Ein Messwert bildet den Abschluss.', ' Eine Meldung bestätigt den Abschluss.', ' Der Zustand wird zum Abschluss angezeigt.', ' Eine Kontrollrechnung beendet den Ablauf.', ' Zwei Messwerte bilden den Abschluss.', ' Zwei Meldungen beenden den Ablauf.', ' Messwert und Meldung bilden den Abschluss.'][variant - 1];
  }
  return { version: 1, title, context, program, question };
}

export function branchContract(kind, difficulty) {
  return { version: 1, required_question: kind, limits: branchLimits[difficulty], literal_numbers: [-10, 30], state_numbers: [-20, 100],
    schema: { expression: ['{kind:"literal",value:number or single-word string}', '{kind:"variable",name:"name"}', '{kind:"binary",left:expression,op:"+|-|>|>=|<|<=",right:expression}'],
      statement: ['{id:"id",kind:"assign",name:"name",value:expression}', '{id:"id",kind:"output",value:expression}', '{id:"id",kind:"decision",branches:[{test:comparison,body:[statements]}],otherwise:[statements]}'],
      question: { output: '{kind:"output",index:0}', state: '{kind:"state",variable:"name"}', condition: '{kind:"condition"}', lines: '{kind:"lines"}', repair: '{kind:"repair",node:"arithmetic_statement_id",expected:number}', compare: '{kind:"compare",operator:"different comparison operator",index:0}' }[kind] },
    example: fallbackBranchDraft(kind, difficulty) };
}

export function createBranchWorkshop({ modelCompletion, random = Math.random }) {
  const histories = new Map();
  return {
    async next({ session, difficulty, language, config, adaptation = {} }) {
      const key = JSON.stringify([session, difficulty]);
      if (!histories.has(key)) { while (histories.size >= 30) histories.delete(histories.keys().next().value); histories.set(key, []); }
      const history = histories.get(key), count = history.at(-1)?.sequence ?? -1;
      const kind = branchKinds.includes(adaptation.taskKind) ? adaptation.taskKind : branchKinds[(count + 1) % branchKinds.length];
      let task, warning = '', source = 'Geprüfte Werkstattaufgabe'; const attempts = [];
      const accept = draft => { const task = buildBranchTask(draft, difficulty, language, kind, random); checkBranchNovelty(draft, history); return task; };
      if (config.provider !== 'demo') {
        const messages = [
          { role: 'system', content: branchGenerationPrompt },
          { role: 'user', content: JSON.stringify({ chapter: 2, learning_objective: 'branch-choice', difficulty, language, adaptation: compactAdaptation(adaptation), contract: branchContract(kind, difficulty), recent: history.slice(-3).map(({ kind, fingerprint, context }) => ({ kind, fingerprint, context })) }) }
        ];
        for (let attempt = 0; attempt < 2; attempt++) {
          let raw;
          try { raw = await modelCompletion(config, messages, { purpose: attempt ? 'task-correction' : 'task-generation', maxTokens: 1800 }); }
          catch (error) { warning = `Modellentwurf nicht verfügbar: ${error.message}`; attempts.push({ result: 'transport-error', reason: error.message.slice(0, 300) }); break; }
          try { if (typeof raw !== 'string' || raw.length > 12000) fail('Der Aufgabenentwurf ist zu lang.'); const draft = parseObject(raw); task = accept(draft); source = 'Modellaufgabe · unabhängig geprüft'; warning = ''; attempts.push({ result: 'accepted' }); break; }
          catch (error) {
            warning = `Modellentwurf verworfen: ${error.message}`;
            attempts.push({ result: 'rejected', reason: error.message.slice(0, 300) });
            // Untrusted output is never replayed as instructions; errors and a
            // bounded JSON draft suffice for the one permitted correction.
            messages.push({ role: 'user', content: JSON.stringify({ correction: error.message, rejected_draft: raw.slice(0, 6000), instruction: 'Only correction attempt: return a complete corrected draft matching the contract.' }) });
          }
        }
      }
      if (!task) {
        for (let variant = 0; variant < 8; variant++) { try { task = accept(fallbackBranchDraft(kind, difficulty, Math.floor(random() * 30), variant)); break; } catch { /* Auch Ersatzaufgaben müssen die Wiederholungskontrolle bestehen. */ } }
        if (!task) fail('Keine passende geprüfte Werkstattaufgabe verfügbar.');
        if (config.provider !== 'demo') { source = 'Geprüfte Ersatzaufgabe'; warning += ' Eine geprüfte Werkstattaufgabe wird verwendet.'; }
      }
      history.push({ kind, fingerprint: branchFingerprint(task.generation.draft), context: contextKey(task.generation.draft), sequence: count + 1 });
      if (history.length > 12) history.shift();
      task.source = source; task.generation.checks = ['structure', 'both-paths', 'observation', 'answers', 'novelty'];
      task.generation.attempts = attempts;
      return { task, warning };
    }
  };
}
