import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import vm from 'node:vm';
import { loadCatalog, createRuntime } from '../runtime.js';
import { buildTask, evaluate, publicTask } from '../task-engine.js';
import { parameterVariants } from '../chapter-one.js';
import { referenceAnswer } from './task-answer.js';
import { validateEqualWords } from '../skills/zuweisung-reihenfolge/tools/validate.js';

const catalog = await loadCatalog(async url => new Response(await readFile(new URL(url), 'utf8')));
const families = catalog.families.filter(f => f.metadata.chapter === 2);

// Test-only execution of the actual displayed JS, instrumented independently
// of the app interpreter to observe reached lines, checks and final variables.
function execute(code) {
  const runs = [], visits = [], checks = [];
  let segment = [], names = new Set();
  const flush = () => {
    if (!segment.length) return;
    const outputs = [];
    const context = vm.createContext({ console: { log: value => outputs.push(value) },
      visit: line => visits.push(line), check: (line, value) => { visits.push(line); checks.push([line, value]); return value; } });
    vm.runInContext(segment.join('\n'), context, { timeout: 100 });
    const variables = Object.fromEntries([...names].map(name => [name, vm.runInContext(name, context)]));
    runs.push({ outputs, variables }); segment = []; names = new Set();
  };
  code.forEach((source, index) => {
    const line = index + 1, text = source.trim();
    if (text.startsWith('//')) { flush(); return; }
    const assignment = text.match(/^(?:let )?(\w+) =/); if (assignment) names.add(assignment[1]);
    if (text.startsWith('if (')) segment.push(source.replace(/^([\s]*if )\((.*)\) \{$/, `$1(check(${line}, $2)) {`));
    else if (text.startsWith('} else if (')) segment.push(source.replace(/else if \((.*)\) \{$/, `else if (check(${line}, $1)) {`));
    else if (text === '} else {') segment.push(`${source}\nvisit(${line});`);
    else if (text === '}') segment.push(source);
    else segment.push(`visit(${line}); ${source}`);
  });
  flush(); return { runs, visits, checks };
}
const outputsFromTrace = (task, language) => task.trace.filter(step => step.output !== '').map(step => {
  if (['true', 'false', 'True', 'False'].includes(step.output)) return ['true', 'True'].includes(step.output);
  return /^-?\d+$/.test(step.output) ? Number(step.output) : step.output;
});

test('Chapter 2: twelve independently curated references, both languages, no answer leakage', async () => {
  let count = 0;
  for (const family of families) {
    const examples = JSON.parse(await readFile(new URL(`../skills/${family.metadata.name}/examples.json`, import.meta.url)));
    for (const expected of examples.cases) {
      for (const language of ['python', 'javascript']) {
        const task = buildTask({ template_id: expected.template_id, parameters: expected.parameters }, family.templates, language);
        assert.deepEqual(outputsFromTrace(task), expected.outputs);
        const labels = [...new Set(task.trace.map(step => step.program))];
        const finalStates = labels.map(label => task.trace.filter(step => step.program === label && step.executed).at(-1).variables);
        assert.deepEqual(finalStates, expected.finalStates);
        assert.deepEqual(task.solution.gaps, expected.solution);
        assert.equal(evaluate(task, { gaps: expected.solution }).correct, true);
        const view = publicTask(task);
        for (const key of ['solution', 'trace', 'explanation', 'gapHints']) assert.equal(view[key], undefined);
        assert.equal(view.gaps.some(gap => gap.answer !== undefined), false);
        if (language === 'javascript') assert.deepEqual(execute(task.code).runs.map(run => run.variables), expected.finalStates);
      }
      count++;
    }
  }
  assert.equal(count, 12);
});

test('All 155 variants: actual JavaScript agrees with states, outputs, visited/skipped lines and conditions', () => {
  let count = 0;
  for (const family of families) for (const template of family.templates) for (const parameters of parameterVariants(template)) {
    const task = buildTask({ template_id: template.id, parameters }, [template], 'javascript');
    const actual = execute(task.code);
    assert.deepEqual(actual.runs.flatMap(run => run.outputs), outputsFromTrace(task), template.id);
    assert.deepEqual([...actual.visits].sort((a,b) => a-b), task.trace.filter(step => step.executed === true).map(step => step.line), template.id);
    assert.deepEqual(actual.checks, task.trace.filter(step => typeof step.condition === 'boolean').map(step => [step.line, step.condition]), template.id);
    const labels = [...new Set(task.trace.map(step => step.program))];
    assert.deepEqual(actual.runs.map(run => run.variables), labels.map(label => task.trace.filter(step => step.program === label && step.executed).at(-1).variables));
    assert.equal(evaluate(task, task.solution).correct, true);
    for (const gap of task.gaps) {
      const wrong = gap.choices.find(choice => choice.id !== task.solution.gaps[gap.id]).id;
      const result = evaluate(task, { gaps: { ...task.solution.gaps, [gap.id]: wrong } });
      assert.equal(result.correct, false); assert.equal(result.hint, task.gapHints[gap.id]);
    }
    for (const language of ['python', 'javascript']) {
      const paired = buildTask({ template_id: template.id, parameters, variation: { names: 'standard', answer_form: 'single-choice' } }, [template], language);
      validateEqualWords(paired.options);
      assert.equal(evaluate(paired, { selected: ['pair-0'] }).correct, true);
      for (const id of ['pair-1', 'pair-2', 'pair-3']) assert.equal(evaluate(paired, { selected: [id] }).correct, false);
    }
    count++;
  }
  assert.equal(count, 155);
});

test('Boundary and no recheck: zero, seven stamps, exclusive discount, changed priority', () => {
  const build = (id, parameters) => buildTask({ template_id: id, parameters }, families.flatMap(f => f.templates));
  assert.deepEqual(outputsFromTrace(build('condition-zero-v1', { temperature: 0 })), [false, true]);
  assert.deepEqual(outputsFromTrace(build('branch-stamps-v1', { stamps: 7 })), [0, 9]);
  const chain = build('decisions-exclusive-v1', { price: 20 });
  assert.deepEqual(outputsFromTrace(chain), [2, 18]);
  assert.equal(chain.trace.filter(step => typeof step.condition === 'boolean').length, 1);
  for (const points of [4, 5, 6]) assert.deepEqual(outputsFromTrace(build('change-boundary-v1', { points })), points === 5 ? ['Weiter', 'Warten'] : points === 4 ? ['Warten', 'Warten'] : ['Weiter', 'Weiter']);
  assert.deepEqual(outputsFromTrace(build('change-priority-v1', { points: 20 })), ['Gold', 'Silber']);
});

test('All chapter 2 topics/stages: model bounds, demo, cross-chapter fallback, saved chapter and idempotence', async () => {
  for (const family of families.filter(f => !f.metadata.generation_contract)) for (const difficulty of [1,2,3]) {
    const template = family.templates.find(t => t.difficulty === difficulty);
    const parameters = parameterVariants(template)[0]; let requests = 0;
    const runtime = createRuntime(catalog, { modelCompletion: async (_config, messages) => {
      requests++; const data = JSON.parse(messages[1].content);
      assert.equal(data.learning_objective, family.metadata.learning_objective);
      if (data.catalog) { assert.deepEqual(data.catalog.map(f => f.name), [family.metadata.name]); return JSON.stringify({ skill_id: family.metadata.name }); }
      assert.deepEqual(data.templates.map(t => t.id), [template.id]);
      return JSON.stringify({ template_id: template.id, parameters, variation: { names: 'standard', answer_form: 'original' } });
    } });
    const request = { session: randomUUID(), chapter: 2, learningObjective: family.metadata.learning_objective, difficulty, language: 'python', config: { provider: 'lmstudio' } };
    const data = await runtime.next(request); assert.equal(requests, 1); assert.equal(data.warning, '');
    const answer = referenceAnswer(data.task, family.templates);
    const submit = { session: request.session, taskId: data.task.id, submissionId: randomUUID(), answer };
    const first = runtime.submit(submit); assert.equal(first.record.chapter, 2); assert.equal(first.result.correct, true);
    assert.deepEqual(runtime.submit(submit), first);
    const fallback = createRuntime(catalog, { modelCompletion: async () => '{"skill_id":"zuweisung-reihenfolge"}' });
    const failed = await fallback.next(request); assert.match(failed.warning, /Ersatzaufgabe/); assert.equal(failed.task.chapter, 2); assert.equal(failed.task.learningObjective, request.learningObjective);
    const demo = await runtime.next({ ...request, config: { provider: 'demo' } }); assert.equal(demo.task.chapter, 2);
    await assert.rejects(runtime.next({ ...request, chapter: 1 }), /keine freigegebene Aufgabe/);
    assert.throws(() => buildTask({ template_id: template.id, parameters, variation: { names: 'punkte', answer_form: 'original' } }, [template]), /Kontextnamen/);
    assert.throws(() => buildTask({ template_id: template.id, parameters: { ...parameters, injected: 1 } }, [template]), /Parameter/);
    const key = Object.keys(parameters)[0]; assert.throws(() => buildTask({ template_id: template.id, parameters: { ...parameters, [key]: 999 } }, [template]), /ganze Zahl/);
    assert.throws(() => evaluate(buildTask({ template_id: template.id, parameters }, [template]), { gaps: {} }), /jede Lücke/);
  }
});
