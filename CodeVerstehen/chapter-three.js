// Finite, curated loop plans. Model responses supply bounded parameters only;
// no generated source code is executed to build or grade a task.
const one = plan => [plan];
const definitions = {
  'repeat-fixed-v1': { mode: 'counted-loop', difficulty: 1, ranges: { count: [0, 4] },
    plans: p => one({ kind: 'for', start: 0, count: p.count, amount: 1 }) },
  'repeat-step-v1': { mode: 'counted-loop', difficulty: 2, ranges: { count: [1, 4], amount: [2, 3] },
    plans: p => one({ kind: 'for', start: 2, count: p.count, amount: p.amount, inside: true }) },
  'repeat-range-v1': { mode: 'counted-loop', difficulty: 3, ranges: { start: [1, 3], stop: [4, 6] },
    plans: p => one({ kind: 'for', start: 0, from: p.start, stop: p.stop, stride: 2, amount: 1, inside: true }) },
  'while-up-v1': { mode: 'while-loop', difficulty: 1, ranges: { start: [0, 3], distance: [0, 3] },
    plans: p => one({ kind: 'while', start: p.start, limit: p.start + p.distance, step: 1, op: '<' }) },
  'while-down-v1': { mode: 'while-loop', difficulty: 2, ranges: { start: [2, 5] },
    plans: p => one({ kind: 'while', start: p.start, limit: 0, step: -1, op: '>', inside: true }) },
  'while-jump-v1': { mode: 'while-loop', difficulty: 3, ranges: { start: [0, 2], distance: [3, 5] },
    plans: p => one({ kind: 'while', start: p.start, limit: p.start + p.distance, step: 2, op: '<', inside: true }) },
  'sum-fixed-v1': { mode: 'loop-accumulator', difficulty: 1, ranges: { count: [1, 4], amount: [1, 3] },
    plans: p => one({ kind: 'for', start: 0, count: p.count, amount: p.amount, sum: 'fixed' }) },
  'sum-counter-v1': { mode: 'loop-accumulator', difficulty: 2, ranges: { stop: [3, 5] },
    plans: p => one({ kind: 'while', start: 1, limit: p.stop, step: 1, op: '<=', sum: 'before' }) },
  'sum-after-v1': { mode: 'loop-accumulator', difficulty: 3, ranges: { stop: [3, 5] },
    plans: p => one({ kind: 'while', start: 1, limit: p.stop, step: 1, op: '<=', sum: 'after', inside: true }) },
  'loop-boundary-v1': { mode: 'loop-change', difficulty: 1, ranges: { limit: [2, 4] },
    plans: p => ['<', '<='].map((op, i) => ({ kind: 'while', start: 0, limit: p.limit, step: 1, op, label: `Programm ${i ? 'B' : 'A'}` })) },
  'loop-stride-v1': { mode: 'loop-change', difficulty: 2, ranges: { limit: [3, 5] },
    plans: p => [1, 2].map((step, i) => ({ kind: 'while', start: 0, limit: p.limit, step, op: '<', label: `Programm ${i ? 'B' : 'A'}` })) },
  'loop-sum-order-v1': { mode: 'loop-change', difficulty: 3, ranges: { stop: [3, 4] },
    plans: p => ['before', 'after'].map((sum, i) => ({ kind: 'while', start: 1, limit: p.stop, step: 1, op: '<=', sum, label: `Programm ${i ? 'B' : 'A'}` })) }
};

export function chapterThreeDefinition(template) {
  const definition = definitions[template.id];
  if (!definition || template.chapter !== 3 || definition.mode !== template.mode || definition.difficulty !== template.difficulty || template.type !== 'gap-fill') throw new Error('Nicht freigegebene Kapitel-3-Vorlage.');
  return definition;
}

function runPlans(plans, language) {
  const code = [], trace = [], runs = [];
  const js = language === 'javascript';
  for (const plan of plans) {
    const variables = {}, visits = new Map(), outputs = [];
    if (plan.label) code.push(`${js ? '//' : '#'} ${plan.label}`);
    const line = source => { code.push(source); return code.length; };
    const renderSet = (name, value, indent = '', declare = false) => line(`${indent}${js && declare ? 'let ' : ''}${name} = ${value}${js ? ';' : ''}`);
    const renderOutput = (name, indent = '') => line(`${indent}${js ? `console.log(${name});` : `print(${name})`}`);
    const record = (line, iteration = 0, condition = null, output = '') => {
      const occurrence = (visits.get(line) || 0) + 1; visits.set(line, occurrence);
      trace.push({ line, program: plan.label || '', iteration, occurrence, executed: true, condition, variables: { ...variables }, output });
    };
    const counter = plan.kind === 'for' ? plan.sum ? 'runden' : 'punkte' : 'zaehler';
    const initialLine = renderSet(counter, plan.start, '', true);
    variables[counter] = plan.start; record(initialLine);
    if (plan.sum) { const init = renderSet('summe', 0, '', true); variables.summe = 0; record(init); }
    const from = plan.from ?? 0, stop = plan.stop ?? plan.count, stride = plan.stride ?? 1;
    const range = from === 0 && stride === 1 ? `${stop}` : `${from}, ${stop}${stride === 1 ? '' : `, ${stride}`}`;
    const header = line(plan.kind === 'for'
      ? js ? `for (let schritt = ${from}; schritt < ${stop}; schritt = schritt + ${stride}) {` : `for schritt in range(${range}):`
      : js ? `while (${counter} ${plan.op} ${plan.limit}) {` : `while ${counter} ${plan.op} ${plan.limit}:`);
    const body = [];
    const sumLine = () => {
      const rhs = plan.sum === 'fixed' ? String(plan.amount) : counter;
      body.push({ kind: 'sum', line: renderSet('summe', `summe + ${rhs}`, '    '), value: plan.sum === 'fixed' ? plan.amount : null });
    };
    if (plan.sum && plan.sum !== 'after') sumLine();
    const increment = plan.kind === 'for' ? plan.sum ? 1 : plan.amount : plan.step;
    const sign = increment < 0 ? '-' : '+';
    body.push({ kind: 'increment', line: renderSet(counter, `${counter} ${sign} ${Math.abs(increment)}`, '    '), value: increment });
    if (plan.sum === 'after') sumLine();
    const printed = plan.sum ? 'summe' : counter;
    if (plan.inside) body.push({ kind: 'output', line: renderOutput(printed, '    ') });
    if (js) line('}');
    const after = renderOutput(printed);
    let iterations = 0, index = from;
    const test = () => plan.kind === 'for' ? index < stop : plan.op === '<' ? variables[counter] < plan.limit
      : plan.op === '<=' ? variables[counter] <= plan.limit : variables[counter] > plan.limit;
    while (true) {
      const condition = test();
      if (plan.kind === 'for' && (js || condition)) variables.schritt = index;
      record(header, iterations + 1, condition);
      if (!condition) break;
      if (++iterations > 8) throw new Error('Schleife überschreitet die freigegebene Durchlaufgrenze.');
      for (const instruction of body) {
        let output = '';
        if (instruction.kind === 'sum') variables.summe += instruction.value ?? variables[counter];
        else if (instruction.kind === 'increment') variables[counter] += instruction.value;
        else { output = String(variables[printed]); outputs.push(variables[printed]); }
        if (Object.values(variables).some(value => !Number.isInteger(value) || value < -20 || value > 100)) throw new Error('Schleifenzustand außerhalb des Wertebereichs.');
        record(instruction.line, iterations, null, output);
      }
      index += stride;
    }
    // Python keeps the last range element; JS's let schritt is block scoped.
    if (js && plan.kind === 'for') delete variables.schritt;
    // Represent an unentered body without fabricating any executed event.
    if (iterations === 0) for (const instruction of body) trace.push({ line: instruction.line, program: plan.label || '', iteration: 0, occurrence: 0, executed: false, condition: null, variables: { ...variables }, output: '' });
    outputs.push(variables[printed]); record(after, 0, null, String(variables[printed]));
    runs.push({ iterations, outputs, variables: { ...variables }, last: variables[printed] });
  }
  return { code, trace, runs };
}

const gap = (id, label, value, alternatives) => ({ id, label, answer: `n:${value}`,
  choices: [...new Set([value, ...alternatives])].map(value => ({ id: `n:${value}`, text: String(value) })) });

export function buildChapterThreeTask(template, parameters, language) {
  const definition = chapterThreeDefinition(template);
  const plans = definition.plans(parameters), { code, trace, runs } = runPlans(plans, language);
  const observations = runs.length === 2
    ? runs.map((run, i) => gap(i ? 'b' : 'a', `Letzte Ausgabe in Programm ${i ? 'B' : 'A'}`, run.last, [runs[1 - i].last, run.last + 1, run.last - 1]))
    : [gap('count', 'Durchläufe des Schleifenrumpfs', runs[0].iterations, [Math.max(0, runs[0].iterations - 1), runs[0].iterations + 1]),
      gap('last', 'Letzte Ausgabe nach der Schleife', runs[0].last, [plans[0].start, runs[0].last + 1, runs[0].last - 1])];
  const explanation = runs.map((run, i) => `${plans[i].label ? `${plans[i].label}: ` : ''}Der Rumpf läuft ${run.iterations}-mal. ${plans[i].kind === 'for' ? 'Der Stopwert von range bzw. die obere for-Grenze wird nicht als weiterer Schleifenwert verwendet.' : `Vor jedem Durchlauf wird ${plans[i].op} ${plans[i].limit} neu geprüft, auch vor dem ersten. Beim Ende ist die Bedingung falsch.`} ${plans[i].sum ? `Die Summe wird ${plans[i].sum === 'after' ? 'nach der Zähleränderung' : 'vor der Zähleränderung'} ergänzt. ` : ''}Die Ausgaben sind ${run.outputs.join(', ')}. Die letzte Ausgabe nach der Schleife lautet ${run.last}.`).join(' ');
  return { chapter: 3, templateId: template.id, mode: template.mode, difficulty: template.difficulty, type: template.type,
    language, parameters, title: template.title, context: template.context, prompt: template.prompt, choicePrompt: template.choicePrompt,
    criteria: template.criteria, code, trace, explanation,
    gaps: observations.map(({ answer, ...rest }) => rest),
    gapHints: Object.fromEntries(observations.map((observation, i) => [observation.id, template.hints[i]])),
    solution: { gaps: Object.fromEntries(observations.map(observation => [observation.id, observation.answer])) } };
}
