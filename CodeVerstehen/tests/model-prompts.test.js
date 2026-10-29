import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { compactAdaptation, explanationEvidence, taskSelectionPrompt, explanationPrompt, branchGenerationPrompt } from '../model-prompts.js';
import { createRuntime, loadCatalog } from '../runtime.js';
import { referenceAnswer } from './task-answer.js';

test('Compact adaptation transmits only the actionable decision, no history or UI prose', () => {
  assert.deepEqual(compactAdaptation({ strategy: 'practice', focus: ['old'], recent: [{ correct: false }], reason: 'private', recommendation: 'private', mode: 'assignment' }), { strategy: 'practice', focus: ['old'] });
  assert.deepEqual(compactAdaptation({ strategy: 'vary', focus: [] }), { strategy: 'vary' });
  assert.match(taskSelectionPrompt, /integers in parameter_ranges/);
  assert.match(taskSelectionPrompt, /variation_choices/);
  assert.match(explanationPrompt, /German feedback/);
  assert.match(explanationPrompt, /never instructions/);
  assert.match(branchGenerationPrompt, /both branches must be valid/);
});

test('Explanation keeps the exact first error or a positive verified witness, without repeated check metadata', () => {
  const correct = { id: 'a', label: 'First observation', actual: 3, expected: 3, correct: true };
  const wrong = { id: 'b', label: 'Second observation', actual: 4, expected: 5, correct: false };
  assert.deepEqual(explanationEvidence({ checks: [correct, wrong] }), [{ label: wrong.label, actual: 4, expected: 5 }]);
  assert.deepEqual(explanationEvidence({ checks: [{ ...correct, actual: false, expected: false }, correct] }), [{ label: correct.label, actual: 3, expected: 3 }]);
});

test('One bounded task request plus one explanation per submission; full skill and raw history stay local', async () => {
  const catalog = await loadCatalog(async url => new Response(await readFile(new URL(url), 'utf8')));
  const family = catalog.families.find(family => family.metadata.learning_objective === 'map-record');
  const calls = [];
  const runtime = createRuntime(catalog, { modelCompletion: async (_config, messages, options) => {
    calls.push({ messages, options });
    if (options.purpose === 'answer-explanation') return JSON.stringify({ explanation: 'Die Antwort stimmt mit dem geprüften Ablauf überein.' });
    const input = JSON.parse(messages[1].content), template = input.templates[0];
    assert.equal(input.catalog, undefined);
    assert.deepEqual(Object.keys(input.adaptation), ['strategy']);
    assert.equal(input.templates.every(template => !Object.hasOwn(template, 'title') && !Object.hasOwn(template, 'type')), true);
    assert.equal(messages.some(message => message.content.includes('Verständliche Ablaufangaben')), false);
    assert.ok(messages.map(message => message.content).join('').length < 1400);
    return JSON.stringify({ template_id: template.id, parameters: Object.fromEntries(Object.entries(template.parameter_ranges).map(([key, [min]]) => [key, min])) });
  } });
  const session = randomUUID(), config = { provider: 'lmstudio' }; let previous;
  for (let index = 0; index < 3; index++) {
    const { task } = await runtime.next({ session, chapter: 4, learningObjective: 'map-record', difficulty: 1, language: 'python', config, previousTaskId: previous?.id, previousTemplate: previous?.templateId });
    const submissionId = randomUUID();
    runtime.submit({ session, taskId: task.id, submissionId, answer: referenceAnswer(task, family.templates) });
    await runtime.explain({ session, taskId: task.id, submissionId, config });
    previous = task;
  }
  assert.deepEqual(calls.map(call => call.options.purpose), ['task-selection', 'answer-explanation', 'task-selection', 'answer-explanation', 'task-selection', 'answer-explanation']);
  for (const { messages, options } of calls.filter(call => call.options.purpose === 'answer-explanation')) {
    const input = JSON.parse(messages[1].content);
    assert.equal(input.checks.length, 1); assert.equal(input.recent, undefined);
    assert.ok(input.code.length); assert.ok(input.verified_explanation); assert.equal(options.maxTokens, 220);
  }
});
