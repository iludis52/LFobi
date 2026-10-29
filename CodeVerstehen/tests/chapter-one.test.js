import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import vm from 'node:vm';
import { loadCatalog, createRuntime } from '../runtime.js';
import { buildTask, publicTask, evaluate } from '../task-engine.js';
import { parameterRanges, parameterVariants } from '../chapter-one.js';
import { referenceAnswer } from './task-answer.js';

const fileFetch = async url => {
  try { return new Response(await readFile(new URL(url), 'utf8')); }
  catch { return new Response('', { status: 404 }); }
};
const catalog = await loadCatalog(fileFetch);
const families = catalog.families.filter(f => f.metadata.chapter === 1 && f.metadata.learning_objective !== 'assignment-order');

// Independent execution of the generated, curated JavaScript in the test only.
// This checks the displayed code against traces and solutions, not just builder formulas.
function executeJavaScript(code) {
  const outputs = [], states = [];
  let context, names;
  const reset = () => { context = vm.createContext({ console: { log: value => outputs.push(value) } }); names = new Set(); };
  reset();
  for (const line of code) {
    if (line.startsWith('//')) { reset(); continue; }
    vm.runInContext(line, context, { timeout: 100 });
    const assignment = line.match(/^(?:let )?(\w+) =/);
    if (assignment) names.add(assignment[1]);
    states.push(Object.fromEntries([...names].map(name => [name, vm.runInContext(name, context)])));
  }
  return { outputs, states };
}

test('Nine approved references: exact states, outputs, cards and gap solutions in both languages', async () => {
  let count = 0;
  for (const family of families) {
    const examples = JSON.parse(await readFile(new URL(`../skills/${family.metadata.name}/examples.json`, import.meta.url)));
    for (const expected of examples.cases) {
      for (const language of ['python', 'javascript']) {
        const task = buildTask({ template_id: expected.template_id, parameters: expected.parameters }, family.templates, language);
        assert.deepEqual(task.trace.map(s => s.variables), expected.states);
        assert.deepEqual(task.trace.filter(s => s.output).map(s => Number(s.output)), expected.outputs);
        assert.deepEqual(task.solution.gaps, expected.solution);
        assert.deepEqual([...task.values].sort((a, b) => a - b), expected.cards);
        if (language === 'javascript') assert.deepEqual(executeJavaScript(task.code), { outputs: expected.outputs, states: expected.states });
      }
      count++;
    }
  }
  assert.equal(count, 9);
});

test('Every new parameter combination: displayed JavaScript matches trace; valid solutions and distinct cards', () => {
  let count = 0;
  for (const family of families) for (const template of family.templates) for (const parameters of parameterVariants(template)) {
    const selection = { template_id: template.id, parameters };
    const task = buildTask(selection, family.templates, 'javascript');
    const python = buildTask(selection, family.templates, 'python');
    const executed = executeJavaScript(task.code);
    assert.deepEqual(executed.states, task.trace.map(s => s.variables));
    assert.deepEqual(executed.outputs, task.trace.filter(s => s.output).map(s => Number(s.output)));
    assert.deepEqual(python.trace, task.trace);
    assert.deepEqual(python.solution, task.solution);
    assert.equal(new Set(task.values).size, task.values.length);
    assert.equal(task.values.every(value => Number.isInteger(value) && value > 0 && value <= 50), true);
    assert.equal(Object.values(task.solution.gaps).every(value => task.values.includes(value)), true);
    const wrongValue = task.values.find(value => !Object.values(task.solution.gaps).includes(value));
    assert.notEqual(wrongValue, undefined);
    assert.equal(evaluate(task, task.solution).correct, true);
    const wrong = { gaps: { ...task.solution.gaps, [task.gaps[0].id]: wrongValue } };
    assert.equal(evaluate(task, wrong).correct, false);
    assert.equal(evaluate(task, wrong).hint, template.hints[0]);
    assert.throws(() => evaluate(task, { gaps: {} }));
    for (const key of ['solution', 'trace', 'explanation', 'gapHints']) assert.equal(publicTask(task)[key], undefined);
    if (template.mode === 'statement-order') assert.notEqual(task.solution.gaps.a, task.solution.gaps.b);
    count++;
  }
  assert.equal(count, 325);
});

test('Per-template parameter boundaries reject missing, extra, non-integer and out-of-range values', () => {
  for (const family of families) for (const template of family.templates) {
    const valid = parameterVariants(template)[0];
    const build = parameters => buildTask({ template_id: template.id, parameters }, [template]);
    for (const [key, [min, max]] of Object.entries(parameterRanges(template))) {
      for (const invalid of [min - 1, max + 1, String(min), min + 0.5]) assert.throws(() => build({ ...valid, [key]: invalid }));
      const missing = { ...valid }; delete missing[key]; assert.throws(() => build(missing));
    }
    assert.throws(() => build({ ...valid, arbitrary: 1 }));
    assert.throws(() => buildTask({ template_id: template.id, parameters: valid, code: 'untrusted' }, [template]));
  }
});

test('All new learning objectives and levels work in demo, valid model selection and model failure', async () => {
  for (const family of families) for (const difficulty of [1, 2, 3]) {
    const template = family.templates.find(t => t.difficulty === difficulty);
    let calls = 0;
    const runtime = createRuntime(catalog, { random: () => 0, modelCompletion: async (_config, messages) => {
      calls++;
      const request = JSON.parse(messages[1].content);
      assert.deepEqual(request.templates[0].parameter_ranges, parameterRanges(template));
      return JSON.stringify({ template_id: template.id, parameters: parameterVariants(template)[0] });
    } });
    const session = randomUUID();
    const request = { session, difficulty, language: 'javascript', learningObjective: family.metadata.learning_objective };
    const demo = await runtime.next(request);
    assert.equal(demo.task.templateId, template.id);
    assert.equal(demo.task.learningObjective, request.learningObjective);
    const model = await runtime.next({ ...request, previousTemplate: template.id, config: { provider: 'lmstudio' } });
    assert.equal(model.task.source, 'Modellauswahl · Vorlage geprüft');
    assert.equal(model.warning, '');
    const built = { solution: referenceAnswer(model.task, family.templates) };
    assert.throws(() => runtime.submit({ session, taskId: model.task.id, submissionId: randomUUID(), answer: { gaps: {} } }));
    const submissionId = randomUUID();
    const submitted = runtime.submit({ session, taskId: model.task.id, submissionId, answer: built.solution });
    assert.equal(submitted.record.attempt, 1);
    assert.equal(submitted.record.correct, true);
    assert.equal(submitted.record.learningObjective, request.learningObjective);
    assert.deepEqual(runtime.submit({ session, taskId: model.task.id, submissionId }), submitted);
    const broken = createRuntime(catalog, { modelCompletion: async () => JSON.stringify({ skill_id: 'zuweisung-reihenfolge' }) });
    const fallback = await broken.next({ ...request, config: { provider: 'deepinfra' } });
    assert.equal(fallback.task.learningObjective, request.learningObjective);
    assert.equal(fallback.task.difficulty, difficulty);
    assert.equal(fallback.task.source, 'Geprüfte Ersatzaufgabe');
  }
});

test('Previous template is excluded for demo and model whenever alternatives exist', async () => {
  let requested;
  const runtime = createRuntime(catalog, { modelCompletion: async (_config, messages) => {
    if (messages[0].content.includes('Wähle ausschließlich')) return '{"skill_id":"zuweisung-reihenfolge"}';
    requested = JSON.parse(messages[1].content).templates;
    return JSON.stringify({ template_id: 'assignment-single-v1', parameters: { start: 3, add: 2 } });
  } });
  const request = { session: randomUUID(), difficulty: 1, language: 'python', previousTemplate: 'assignment-single-v1' };
  assert.notEqual((await runtime.next(request)).task.templateId, request.previousTemplate);
  const model = await runtime.next({ ...request, config: { provider: 'lmstudio' } });
  assert.equal(requested.some(t => t.id === request.previousTemplate), false);
  assert.notEqual(model.task.templateId, request.previousTemplate);
  assert.equal(model.task.source, 'Geprüfte Ersatzaufgabe');
  const seen = new Set(); let previousTemplate;
  for (let i = 0; i < 3; i++) {
    const next = await runtime.next({ ...request, previousTemplate });
    seen.add(next.task.templateId); previousTemplate = next.task.templateId;
  }
  // Type mixing may choose the native code-selection reference; template count
  // is no longer the coverage measure (the mixed-form suite checks all types).
  assert.ok(seen.size >= 2);
});
