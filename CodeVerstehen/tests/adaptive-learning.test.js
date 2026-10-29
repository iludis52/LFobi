import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { createLearningMemory, answerChecks, explainAnswer } from '../adaptive-learning.js';
import { loadCatalog, createRuntime } from '../runtime.js';
import { buildTask, evaluate } from '../task-engine.js';
import { applyInteractionForm, mixedForms } from '../interaction-forms.js';
import { createBranchWorkshop } from '../branch-workshop.js';
import { referenceAnswer } from './task-answer.js';

const fileFetch = async url => new Response(await readFile(new URL(url), 'utf8'));
const catalog = await loadCatalog(fileFetch);
const selection = { chapter: 1, learningObjective: 'assignment-order', language: 'python', difficulty: 1 };
const evidence = correct => ({ correct, checks: [{ id: 'old', correct }] });

test('Memory: three distinct tasks, first evidence, repeats, partitions, level filtering and reset', () => {
  const memory = createLearningMemory();
  for (let i = 0; i < 4; i++) memory.observe('s', { ...selection, id: String(i), type: i % 2 ? 'gap-fill' : 'ordering', mode: 'assignment' }, evidence(true), 1);
  let plan = memory.plan('s', selection);
  assert.equal(plan.recent.length, 3);
  assert.match(plan.recommendation, /Stufe 2/);
  memory.observe('s', { ...selection, id: '3' }, evidence(false), 2);
  plan = memory.plan('s', selection);
  assert.equal(plan.recent.length, 3); assert.equal(plan.recommendation, ''); assert.equal(plan.recent.at(-1).correct, true);
  for (const changed of [{ language: 'javascript' }, { learningObjective: 'value-copy' }, { difficulty: 2 }]) assert.equal(memory.plan('s', { ...selection, ...changed }).recent.length, 0);
  assert.equal(memory.plan('other', selection).recent.length, 0);
  memory.observe('s', { ...selection, id: '4', mode: 'assignment' }, evidence(false), 1);
  assert.deepEqual(memory.plan('s', selection).focus, ['old']);
  memory.reset(); assert.equal(memory.plan('s', selection).recent.length, 0);
  assert.equal(createLearningMemory().plan('s', selection).recent.length, 0);
});

test('All six response forms: verified partial observations, targeted gap IDs, no guessed error cause', () => {
  const family = catalog.families[0];
  for (const form of [...mixedForms, 'code-selection']) {
    const template = family.templates.find(t => t.type === (form === 'code-selection' ? form : 'gap-fill'));
    const task = buildTask({ template_id: template.id, parameters: { start: 3, add: 2 } }, family.templates);
    applyInteractionForm(task, form, () => 0.4);
    const answer = task.solution ? structuredClone(task.solution) : referenceAnswer(task, catalog.families[0].templates);
    assert.ok(answerChecks(task, answer).every(check => check.correct), form);
    if (form === 'gap-fill') answer.gaps[task.gaps[0].id] = task.values.find(value => value !== task.solution.gaps[task.gaps[0].id]);
    else if (form === 'code-selection') answer.value = task.values.find(value => value !== task.solution.value);
    else if (form === 'ordering') answer.order.reverse();
    else answer.selected = [task.options.find(option => !task.solution.selected.includes(option.id)).id];
    assert.equal(evaluate(task, answer).correct, false);
    assert.ok(answerChecks(task, answer).some(check => !check.correct));
  }
  const template = family.templates.find(t => t.type === 'gap-fill');
  const task = buildTask({ template_id: template.id, parameters: { start: 3, add: 2 } }, family.templates);
  applyInteractionForm(task, 'single-choice', () => 0.4, ['old']);
  assert.ok(task.options.every(option => option.text.includes('Bisheriger Wert')));
});

test('Runtime: errors constrain next mode, preserve selection, avoid duplicate evidence and respect reset', async () => {
  const runtime = createRuntime(catalog, { random: () => 0.4 });
  const session = randomUUID();
  const { task } = await runtime.next({ session, ...selection });
  const answer = task.solution ? structuredClone(task.solution) : referenceAnswer(task, catalog.families[0].templates);
  if (task.type === 'gap-fill') {
    const gap = task.gaps[0]; answer.gaps[gap.id] = gap.choices.find(choice => choice.id !== answer.gaps[gap.id]).id;
  } else if (task.type === 'ordering') answer.order.reverse();
  else answer.selected = [task.options.find(option => !answer.selected.includes(option.id)).id];
  const submission = { session, taskId: task.id, submissionId: randomUUID(), answer };
  const first = runtime.submit(submission); assert.equal(first.result.correct, false);
  assert.deepEqual(runtime.submit(submission), first);
  const next = await runtime.next({ session, ...selection, previousTaskId: task.id, previousTemplate: task.templateId });
  assert.equal(next.task.mode, task.mode); assert.equal(next.task.difficulty, 1);
  assert.equal(next.task.adaptation.recent.length, 1); assert.equal(next.task.adaptation.strategy, 'practice');
  assert.notEqual(next.task.type, task.type);
  runtime.resetLearning();
  assert.equal((await runtime.next({ session, ...selection })).task.adaptation.recent.length, 0);
});

test('Workshop: practice keeps the question kind, varies verified structures in demo and model failure', async () => {
  const workshop = createBranchWorkshop({ random: () => 0.4, modelCompletion: async () => { throw new Error('offline'); } });
  for (const provider of ['demo', 'lmstudio']) {
    for (let i = 0; i < 3; i++) {
      const { task } = await workshop.next({ session: provider, difficulty: 1, language: 'python', config: { provider }, adaptation: { taskKind: 'state' } });
      assert.equal(task.taskKind, 'state');
    }
  }
});

test('Adaptive runs across every topic, level and language retain valid grading and changing forms', async () => {
  for (const family of catalog.families) for (const difficulty of [1, 2, 3]) for (const language of ['python', 'javascript']) {
    const runtime = createRuntime(catalog, { random: () => 0.4 });
    const session = randomUUID(); let previous;
    for (let index = 0; index < 7; index++) {
      const { task } = await runtime.next({ session, chapter: family.metadata.chapter, learningObjective: family.metadata.learning_objective,
        difficulty, language, previousTaskId: previous?.id, previousTemplate: previous?.templateId });
      assert.equal(task.difficulty, difficulty); assert.equal(task.language, language);
      assert.equal(task.learningObjective, family.metadata.learning_objective);
      assert.notEqual(task.type, previous?.type);
      let answer;
      if (task.type === 'gap-fill') answer = { gaps: Object.fromEntries(task.gaps.map(gap => [gap.id, gap.choices ? gap.choices[0].id : task.values[0]])) };
      else if (task.type === 'ordering') answer = { order: task.steps.map(step => step.id) };
      else if (task.type === 'code-selection') answer = { region: task.regions[0].id, value: task.values[0] };
      else answer = { selected: [task.options[0].id] };
      const response = runtime.submit({ session, taskId: task.id, submissionId: randomUUID(), answer });
      assert.ok(response.result.checks.length);
      assert.ok(response.result.learningPlan.recent.length <= 3);
      previous = task;
    }
  }
});

test('Short explanation: bounded response, current verified context, fallback, no extra calls for duplicate requests', async () => {
  let calls = 0;
  const runtime = createRuntime(catalog, { modelCompletion: async (config, messages, options) => {
    calls++; assert.equal(options.purpose, 'answer-explanation'); assert.equal(options.maxTokens, 220);
    const input = JSON.parse(messages[1].content); assert.equal(input.checks.length, 1); assert.equal(input.correct, true); assert.ok(input.verified_explanation); assert.equal(input.recent, undefined);
    return JSON.stringify({ explanation: 'Die rechte Seite wird zuerst berechnet. Danach wird der neue Wert gespeichert.' });
  } });
  const session = randomUUID(), { task } = await runtime.next({ session, ...selection });
  const submissionId = randomUUID();
  const response = runtime.submit({ session, taskId: task.id, submissionId, answer: referenceAnswer(task, catalog.families[0].templates) });
  assert.ok(response.result.shortExplanation.text);
  const request = { session, taskId: task.id, submissionId, config: { provider: 'lmstudio' } };
  const [one, two] = await Promise.all([runtime.explain(request), runtime.explain(request)]);
  assert.deepEqual(one, two); assert.equal(one.source, 'KI-Kurzerklärung'); assert.equal(calls, 1);
  await assert.rejects(runtime.explain({ ...request, session: 'other' }));
  for (const raw of ['{}', 'null', '{"explanation":"<b>Hallo</b>"}', JSON.stringify({ explanation: 'Wort '.repeat(56) }), JSON.stringify({ explanation: 'Eins. Zwei. Drei.' }), '{"explanation":"Text","correct":true}']) {
    const explanation = await explainAnswer(async () => raw, { provider: 'lmstudio' }, task, response.result);
    assert.equal(explanation.source, 'Geprüfte Rückmeldung');
  }
  assert.equal((await explainAnswer(async () => { throw new Error('offline'); }, { provider: 'lmstudio' }, task, response.result)).source, 'Geprüfte Rückmeldung');
});
