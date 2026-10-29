// Ausschließlich diese neun kuratierten Abläufe werden erzeugt. Kein Code aus
// Modellantworten wird ausgeführt; Parameter sind nur begrenzte ganze Zahlen.
import { chapterTwoDefinition } from './chapter-two.js';
import { chapterThreeDefinition } from './chapter-three.js';
import { advancedDefinition, advancedDefinitions } from './advanced-lessons.js';
const assign = (name, ...expression) => ({ name, expression });
const output = (...expression) => ({ expression });
const program = instructions => [{ instructions }];
const pair = (a, b) => [{ label: 'Programm A', instructions: a }, { label: 'Programm B', instructions: b }];
const start = [1, 5], add = [1, 3], factor = [2, 4], replacement = [6, 9];
const definitions = {
  'state-direct-v1': { mode: 'current-state', ranges: { start, add },
    programs: p => program([assign('wert', p.start), assign('wert', 'wert', '+', p.add), output('wert')]),
    observe: 2, distractors: p => [p.start, p.start + 2 * p.add] },
  'state-chain-v1': { mode: 'current-state', ranges: { start, add, factor },
    programs: p => program([assign('wert', p.start), assign('wert', 'wert', '+', p.add), assign('wert', 'wert', '*', p.factor), output('wert')]),
    observe: 3, distractors: p => [p.start + p.add, p.start * p.factor] },
  'state-output-between-v1': { mode: 'current-state', ranges: { start, add, factor },
    programs: p => program([assign('wert', p.start), assign('wert', 'wert', '+', p.add), output('wert', '*', p.factor), assign('wert', 'wert', '+', 1), output('wert')]),
    observe: 3, distractors: p => [(p.start + p.add) * p.factor, (p.start + p.add) * p.factor + 1] },
  'order-replace-v1': { mode: 'statement-order', ranges: { start, replacement },
    programs: p => pair([assign('wert', p.start), assign('wert', p.replacement), output('wert')], [assign('wert', p.replacement), assign('wert', p.start), output('wert')]),
    distractors: p => [p.start + p.replacement] },
  'order-add-multiply-v1': { mode: 'statement-order', ranges: { start, add, factor },
    programs: p => pair([assign('wert', p.start), assign('wert', 'wert', '+', p.add), assign('wert', 'wert', '*', p.factor), output('wert')], [assign('wert', p.start), assign('wert', 'wert', '*', p.factor), assign('wert', 'wert', '+', p.add), output('wert')]),
    distractors: p => [p.start + p.add, p.start * p.factor] },
  'order-copy-point-v1': { mode: 'statement-order', ranges: { start, add, factor },
    programs: p => pair([assign('a', p.start), assign('b', 'a', '+', p.add), assign('a', 'a', '*', p.factor), output('b')], [assign('a', p.start), assign('a', 'a', '*', p.factor), assign('b', 'a', '+', p.add), output('b')]),
    distractors: p => [p.start, p.start * p.factor] },
  'copy-direct-v1': { mode: 'value-copy', ranges: { start, replacement },
    programs: p => program([assign('a', p.start), assign('b', 'a'), assign('a', p.replacement), output('b'), output('a')]),
    distractors: p => [p.start + p.replacement] },
  'copy-calculated-v1': { mode: 'value-copy', ranges: { start, add, factor },
    programs: p => program([assign('a', p.start), assign('b', 'a', '+', p.add), assign('a', 'a', '*', p.factor), output('b'), output('a')]),
    distractors: p => [p.start, p.start * p.factor + p.add] },
  'copy-return-v1': { mode: 'value-copy', ranges: { start, add, factor },
    programs: p => program([assign('a', p.start), assign('b', 'a', '+', p.add), assign('a', 'b', '*', p.factor), assign('b', 'b', '+', 1), output('a'), output('b')]),
    distractors: p => [p.start + p.add, (p.start + p.add + 1) * p.factor] }
};

export function parameterRanges(template) {
  if (Object.hasOwn(advancedDefinitions,template.id)) return structuredClone(advancedDefinition(template).ranges);
  if (template.chapter === 3) return structuredClone(chapterThreeDefinition(template).ranges);
  if (template.chapter === 2) return structuredClone(chapterTwoDefinition(template).ranges);
  if (['assignment', 'transfer'].includes(template.mode)) return { start: [1, 9], add: [1, 9] };
  const definition = definitions[template.id];
  if (!definition || definition.mode !== template.mode || template.type !== 'gap-fill') throw new Error('Nicht unterstützte Programmvorlage.');
  return structuredClone(definition.ranges);
}

export function parameterVariants(template) {
  let variants = [{}];
  for (const [key, [min, max]] of Object.entries(parameterRanges(template))) {
    variants = variants.flatMap(p => Array.from({ length: max - min + 1 }, (_, i) => ({ ...p, [key]: min + i })));
  }
  return variants;
}

export function sampleParameters(template, random = Math.random) {
  return Object.fromEntries(Object.entries(parameterRanges(template)).map(([key, [min, max]]) => [key, min + Math.floor(random() * (max - min + 1))]));
}

function expressionValue(expression, variables) {
  const read = value => typeof value === 'number' ? value : variables[value];
  const left = read(expression[0]);
  const value = expression.length === 1 ? left : expression[1] === '+' ? left + read(expression[2]) : left * read(expression[2]);
  if (!Number.isInteger(value) || value < 1 || value > 50) throw new Error('Ablauf außerhalb des freigegebenen Wertebereichs.');
  return value;
}

export function buildChapterTask(template, parameters, language) {
  const definition = definitions[template.id];
  parameterRanges(template);
  const code = [], trace = [], outputs = [];
  for (const { label, instructions } of definition.programs(parameters)) {
    const variables = {};
    if (label) code.push(`${language === 'python' ? '#' : '//'} ${label}`);
    for (const instruction of instructions) {
      const expression = instruction.expression.join(' ');
      const value = expressionValue(instruction.expression, variables);
      let printed = '';
      if (instruction.name) {
        const declaration = language === 'javascript' && !Object.hasOwn(variables, instruction.name) ? 'let ' : '';
        code.push(`${declaration}${instruction.name} = ${expression}${language === 'javascript' ? ';' : ''}`);
        variables[instruction.name] = value;
      } else {
        code.push(language === 'python' ? `print(${expression})` : `console.log(${expression});`);
        printed = String(value); outputs.push(value);
      }
      trace.push({ line: code.length, program: label || '', variables: { ...variables }, output: printed });
    }
  }
  let gaps, solution, explanation;
  if (template.mode === 'current-state') {
    const state = trace.find(step => step.line === definition.observe).variables.wert;
    gaps = [{ id: 'state', label: `Wert von wert nach Zeile ${definition.observe}` }, { id: 'output', label: 'Letzte Ausgabe' }];
    solution = { state, output: outputs.at(-1) };
    explanation = `Nach Zeile ${definition.observe} hat wert den Wert ${state}. ${template.id === 'state-output-between-v1' ? `Die erste Ausgabe zeigt ${outputs[0]}, verändert wert aber nicht. Die folgende Zuweisung erhöht wert um 1. ` : 'Jede Zuweisung verwendet den zu diesem Zeitpunkt aktuellen Wert. '}Die letzte Ausgabe zeigt ${outputs.at(-1)}.`;
  } else if (template.mode === 'statement-order') {
    gaps = [{ id: 'a', label: 'Ausgabe von Programm A' }, { id: 'b', label: 'Ausgabe von Programm B' }];
    solution = { a: outputs[0], b: outputs[1] };
    if (outputs[0] === outputs[1]) throw new Error('Der Reihenfolgevergleich muss unterschiedliche Ausgaben erzeugen.');
    explanation = `Beide Programme starten getrennt. Programm A gibt ${outputs[0]} aus, Programm B ${outputs[1]}. ${template.id === 'order-replace-v1' ? 'Die jeweils letzte Zuweisung bestimmt den ausgegebenen Wert.' : template.id === 'order-copy-point-v1' ? 'b wird jeweils mit dem Wert berechnet, den a zu diesem Zeitpunkt hat. Eine spätere Änderung von a verändert b nicht.' : 'Addition und Multiplikation verwenden jeweils das Ergebnis der vorherigen Zuweisung; ihre Reihenfolge verändert hier das Ergebnis.'}`;
  } else {
    gaps = [{ id: 'first', label: 'Erste Ausgabe' }, { id: 'second', label: 'Zweite Ausgabe' }];
    solution = { first: outputs[0], second: outputs[1] };
    const copied = trace[1].variables.b;
    explanation = `Die zweite Zeile weist b die Zahl ${copied} zu. ${template.id === 'copy-return-v1' ? `Danach wird a mit dem damaligen Wert von b berechnet und erhält ${outputs[0]}. Die spätere Änderung von b berechnet a nicht erneut.` : 'Die spätere Neuzuweisung an a verändert b nicht.'} Die Ausgaben zeigen ${outputs[0]} und danach ${outputs[1]}.`;
  }
  // Fachlich benannte Distraktoren können bei einzelnen Varianten zusammenfallen.
  // Deduplizieren und mindestens eine tatsächlich falsche Zahl gewährleisten.
  const answers = Object.values(solution);
  const values = [...new Set([...answers, ...definition.distractors(parameters)])];
  if (!values.some(value => !answers.includes(value))) {
    const unused = Array.from({ length: 50 }, (_, i) => i + 1).find(value => !values.includes(value));
    values.push(unused);
  }
  if (values.some(value => !Number.isInteger(value) || value < 1 || value > 50)) throw new Error('Ungültige Zahlenkarte.');
  if (!Array.isArray(template.hints) || template.hints.length !== gaps.length || template.hints.some(hint => typeof hint !== 'string' || !hint.trim())) throw new Error('Hinweise für die Lücken fehlen.');
  return {
    templateId: template.id, difficulty: template.difficulty, mode: template.mode, type: template.type, language,
    title: template.title, prompt: template.prompt, criteria: template.criteria, parameters,
    code, trace, gaps, values, explanation, gapHints: Object.fromEntries(gaps.map((gap, i) => [gap.id, template.hints[i]])), solution: { gaps: solution }
  };
}
