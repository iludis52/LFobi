// Offline, reproducible request-volume audit. No provider calls or credentials.
import { readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { loadCatalog, createRuntime } from '../runtime.js';
import { referenceAnswer } from '../tests/task-answer.js';

const catalog = await loadCatalog(async url => new Response(await readFile(new URL(url), 'utf8')));
let seed = 42;
const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const calls = [];
const runtime = createRuntime(catalog, { random, modelCompletion: async (_config, messages, { purpose }) => {
  const content = messages.map(message => message.content).join('');
  calls.push({ purpose, characters: content.length, utf8Bytes: Buffer.byteLength(content) });
  const input = JSON.parse(messages[1].content);
  if (input.catalog) return JSON.stringify({ skill_id: input.catalog[0].name });
  if (purpose === 'answer-explanation') return JSON.stringify({ explanation: 'Deine Antwort passt zum geprüften Programmablauf.' });
  const template = input.templates[0];
  return JSON.stringify({ template_id: template.id, parameters: Object.fromEntries(Object.entries(template.parameter_ranges).map(([key, [min]]) => [key, min])) });
} });
const family = catalog.families.find(family => family.metadata.learning_objective === 'map-record');
const session = randomUUID(); let previous;
for (let index = 0; index < 5; index++) {
  const { task } = await runtime.next({ session, chapter: 4, learningObjective: 'map-record', difficulty: 1, language: 'python', config: { provider: 'lmstudio' }, previousTaskId: previous?.id, previousTemplate: previous?.templateId });
  const submissionId = randomUUID();
  runtime.submit({ session, taskId: task.id, submissionId, answer: referenceAnswer(task, family.templates) });
  await runtime.explain({ session, taskId: task.id, submissionId, config: { provider: 'lmstudio' } });
  previous = task;
}
const report = { scenario: 'Five map-record tasks, stage 1, Python; seed 42; correct first submissions; mocked responses', measurement: 'Message content only; characters and UTF-8 bytes, not provider tokens', requests: calls.length,
  byPurpose: [...new Set(calls.map(call => call.purpose))].map(purpose => ({ purpose, requests: calls.filter(call => call.purpose === purpose).length, characters: calls.filter(call => call.purpose === purpose).reduce((n, call) => n + call.characters, 0), utf8Bytes: calls.filter(call => call.purpose === purpose).reduce((n, call) => n + call.utf8Bytes, 0) })),
  totalCharacters: calls.reduce((n, call) => n + call.characters, 0), totalUtf8Bytes: calls.reduce((n, call) => n + call.utf8Bytes, 0) };
if (process.argv[2]) await writeFile(process.argv[2], `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
