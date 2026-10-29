import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { randomUUID } from 'node:crypto';
import { loadCatalog, createRuntime } from '../runtime.js';
import { buildTask, evaluate, publicTask } from '../task-engine.js';
import { nameSets } from '../task-variation.js';
import { parameterVariants } from '../chapter-one.js';
import { validateEqualWords } from '../skills/zuweisung-reihenfolge/tools/validate.js';

const catalog = await loadCatalog(async url => new Response(await readFile(new URL(url), 'utf8')));

test('Renamed programs execute identically for every family and preserve hints and displayed names', () => {
  for (const family of catalog.families.filter(f => f.metadata.chapter === 1)) for (const template of family.templates) for (const names of Object.keys(nameSets)) {
    const parameters = parameterVariants(template)[0];
    const task = buildTask({ template_id: template.id, parameters, variation: { names, answer_form: 'original' } }, [template], 'javascript');
    const actual = []; let context = vm.createContext({ console: { log: value => actual.push(value) } });
    for (const line of task.code) {
      if (line.startsWith('//')) { context = vm.createContext({ console: { log: value => actual.push(value) } }); continue; }
      vm.runInContext(line, context);
    }
    assert.deepEqual(actual, task.trace.filter(step => step.output).map(step => Number(step.output)));
    assert.equal(evaluate(task, task.solution).correct, true);
    if (names !== 'standard') {
      assert.equal(task.code.some(line => /\b(wert|a|b)\b/.test(line)), false);
      assert.equal(JSON.stringify(task.trace.map(step => step.variables)).includes('"wert"'), false);
      for (const gap of task.gaps || []) assert.equal(/\b(wert|a|b)\b/.test(gap.label), false);
    }
    if (task.options) validateEqualWords(task.options);
    assert.equal(publicTask(task).solution, undefined);
    assert.equal(publicTask(task).gapHints, undefined);
  }
});

test('All new numeric variants support unambiguous paired choice answers with equal word count', () => {
  let checked = 0;
  for (const family of catalog.families.filter(f => f.metadata.chapter === 1).slice(1)) for (const template of family.templates) for (const parameters of parameterVariants(template)) {
    const task = buildTask({ template_id: template.id, parameters, variation: { names: 'punkte', answer_form: 'single-choice' } }, [template]);
    assert.equal(task.type, 'single-choice');
    validateEqualWords(task.options);
    assert.equal(task.options.length, 4);
    assert.equal(task.gaps, undefined);
    assert.equal(evaluate(task, { selected: ['pair-0'] }).correct, true);
    for (const id of ['pair-1', 'pair-2', 'pair-3']) {
      const result = evaluate(task, { selected: [id] });
      assert.equal(result.correct, false);
      assert.match(result.hint, /\S/);
    }
    assert.equal(publicTask(task).options.some(option => option.hint || option.correct), false);
    checked++;
  }
  assert.equal(checked, 325);
});

test('Model variations are validated and saved; same numbers cannot repeat unchanged', async () => {
  const response = { template_id: 'copy-calculated-v1', parameters: { start: 3, add: 2, factor: 4 }, variation: { names: 'vorrat', answer_form: 'single-choice' } };
  let lastRequest;
  const runtime = createRuntime(catalog, { random: () => 0, modelCompletion: async (_config, messages) => {
    if (messages[0].content.includes('Wähle ausschließlich')) return '{"skill_id":"zahlenwert-uebernehmen"}';
    lastRequest = JSON.parse(messages[1].content);
    return JSON.stringify(response);
  } });
  const request = { session: randomUUID(), difficulty: 2, language: 'python', learningObjective: 'value-copy', config: { provider: 'lmstudio' } };
  const first = await runtime.next(request);
  assert.match(first.task.code[0], /^vorrat = /);
  assert.equal(first.task.type, 'single-choice');
  assert.equal(first.warning, '');
  const record = runtime.submit({ session: request.session, taskId: first.task.id, submissionId: randomUUID(), answer: { selected: ['pair-0'] } }).record;
  assert.deepEqual(record.variation, { ...response.variation, interaction_form: 'single-choice' });
  const second = await runtime.next({ ...request, previousTemplate: first.task.templateId, previousTaskId: first.task.id });
  assert.notDeepEqual(second.task.parameters, first.task.parameters);
  assert.deepEqual(lastRequest.previous_variant.parameters, first.task.parameters);
  assert.deepEqual(Object.keys(lastRequest.previous_variant).sort(), ['parameters', 'template_id', 'variation']);
  assert.equal(Object.hasOwn(lastRequest.previous_variant, 'solution'), false);
  assert.equal(Object.hasOwn(lastRequest.previous_variant, 'answer'), false);
});

test('Invalid names, forms and additional content cannot expand the model contract', () => {
  const template = catalog.families[1].templates[0];
  const selection = { template_id: template.id, parameters: { start: 3, add: 2 } };
  for (const variation of [null, [], { names: 'eval()', answer_form: 'original' }, { names: 'standard', answer_form: 'free-code' }, { names: 'standard', answer_form: 'original', solution: 5 }]) {
    assert.throws(() => buildTask({ ...selection, variation }, [template]));
  }
  const legacy = catalog.families[0].templates[0];
  assert.throws(() => buildTask({ template_id: legacy.id, parameters: { start: 3, add: 2 }, variation: { names: 'standard', answer_form: 'single-choice' } }, [legacy]));
});
