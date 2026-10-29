import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { buildTask, publicTask, evaluate, parseSkill } from '../task-engine.js';
import { wordCount, validateEqualWords, validateSelection } from '../skills/zuweisung-reihenfolge/tools/validate.js';
import { endpointFor, completion, testConnection } from '../model-client.js';
import { loadFamily, loadCatalog, createRuntime } from '../runtime.js';
import { referenceAnswer } from './task-answer.js';

const fileFetch = async url => {
  try { return new Response(await readFile(new URL(url), 'utf8'), { status: 200 }); }
  catch { return new Response('Not found', { status: 404 }); }
};
const family = await loadFamily(undefined, fileFetch);
const selection = (id, start = 3, add = 2) => ({ template_id: id, parameters: { start, add } });
const build = (id, start = 3, add = 2, language = 'python') => buildTask(selection(id, start, add), family.templates, language, () => 0.4);

test('Referenzen: Neuzuweisung und bloße Ausdrucksausgabe haben unterschiedliche Zustände', async () => {
  const references = JSON.parse(await readFile(new URL('../skills/zuweisung-reihenfolge/examples.json', import.meta.url), 'utf8'));
  for (const expected of references.cases) {
    const template = family.templates.find(t => t.mode === expected.mode);
    const task = buildTask({ template_id: template.id, parameters: expected.parameters }, family.templates);
    assert.deepEqual(task.trace.map(s => s.value), expected.states);
    assert.deepEqual(task.trace.filter(s => s.output).map(s => Number(s.output)), expected.outputs);
  }
  assert.deepEqual(build('transfer-multiple-v1').code, ['wert = 3', 'print(wert + 2)', 'print(wert)']);
  assert.deepEqual(build('assignment-single-v1', 3, 2, 'javascript').code, ['let wert = 3;', 'wert = wert + 2;', 'console.log(wert);']);
  assert.deepEqual(build('transfer-multiple-v1', 3, 2, 'javascript').code, ['let wert = 3;', 'console.log(wert + 2);', 'console.log(wert);']);
});

test('Alle zulässigen Zahlenvarianten: gleiche Wortzahl, eindeutige IDs und stabile Lösungen', () => {
  let checked = 0;
  for (const template of family.templates) for (let start = 1; start <= 9; start++) for (let add = 1; add <= 9; add++) {
    const task = build(template.id, start, add);
    if (task.options) validateEqualWords(task.options);
    assert.equal(evaluate(task, task.solution).correct, true);
    assert.equal(publicTask(task).solution, undefined);
    assert.equal(publicTask(task).trace, undefined);
    assert.equal(publicTask(task).explanation, undefined);
    if (task.options) assert.equal(publicTask(task).options.some(o => o.hint !== undefined || o.correct !== undefined), false);
    checked++;
  }
  assert.equal(checked, 648);
});

test('Ungültige Parameter und Modellauswahl können den App-Rahmen nicht erweitern', () => {
  const allowed = family.templates.filter(t => t.difficulty === 1);
  assert.throws(() => validateSelection(selection('transfer-multiple-v1'), allowed));
  for (const start of [0, 10, 2.5, '3', 'eval()']) assert.throws(() => build('assignment-single-v1', start));
  assert.throws(() => validateSelection({ ...selection('assignment-single-v1'), solution: 'falsch' }, allowed));
  assert.throws(() => buildTask(selection('assignment-single-v1'), allowed, 'ruby'));
});

test('Wortzahlregel erkennt Abweichungen und ignoriert alleinstehende Satzzeichen', () => {
  assert.equal(wordCount('Zuerst rechts berechnen, danach das Ergebnis links zuweisen.'), 8);
  assert.equal(wordCount('Ein Wort — und ein Bindestrich-Wort.'), 5);
  assert.throws(() => validateEqualWords([{ id: 'a', text: 'Ein Wort' }, { id: 'b', text: 'Ein anderes Wort' }, { id: 'c', text: 'Noch eins' }]));
});

test('Mehrfachauswahl: exakte Menge, fehlende und falsche Aussagen getrennt', () => {
  const task = build('assignment-multiple-v1');
  assert.equal(evaluate(task, { selected: ['assign-result', 'read-old'] }).correct, true);
  const incomplete = evaluate(task, { selected: ['read-old'] });
  assert.equal(incomplete.correct, false); assert.deepEqual(incomplete.missing, ['assign-result']);
  const extra = evaluate(task, { selected: ['read-old', 'assign-result', 'equality'] });
  assert.equal(extra.correct, false); assert.deepEqual(extra.extra, ['equality']);
  for (const selected of [[], ['read-old', 'read-old'], ['invented']]) assert.throws(() => evaluate(task, { selected }));
});

test('Codeauswahl verlangt Stelle und bisherigen Wert; Lücken erlauben wiederholten Wert', () => {
  const code = build('assignment-code-v1');
  assert.equal(evaluate(code, { region: 'expression', value: 3 }).correct, true);
  assert.equal(evaluate(code, { region: 'expression', value: 5 }).correct, false);
  assert.equal(evaluate(code, { region: 'target', value: 3 }).correct, false);
  assert.throws(() => evaluate(code, { region: 'expression' }));
  const gaps = build('assignment-gaps-v1');
  assert.equal(evaluate(gaps, { gaps: { old: 3, result: 5, new: 5 } }).correct, true);
  assert.equal(evaluate(gaps, { gaps: { old: 5, result: 3, new: 5 } }).correct, false);
  assert.throws(() => evaluate(gaps, { gaps: { old: 3, result: 5 } }));
});

test('Reihenfolge und Diagramme überprüfen fachliche Abhängigkeiten', () => {
  const order = build('assignment-order-v1');
  assert.equal(evaluate(order, { order: ['read', 'calculate', 'assign'] }).correct, true);
  assert.equal(evaluate(order, { order: ['assign', 'read', 'calculate'] }).correct, false);
  assert.throws(() => evaluate(order, { order: ['read', 'read', 'assign'] }));
  const diagram = build('transfer-diagram-v1');
  assert.equal(evaluate(diagram, { selected: ['unchanged'] }).correct, true);
  assert.equal(evaluate(diagram, { selected: ['assigned'] }).correct, false);
});

test('Nur freigegebene Kapitel-1-Skills werden geladen', async () => {
  assert.equal(family.metadata.status, 'approved'); assert.match(family.body, /Nur JSON/);
  const source = await readFile(new URL('../skills/zuweisung-reihenfolge/SKILL.md', import.meta.url), 'utf8');
  assert.throws(() => parseSkill(source.replace('status: approved', 'status: draft')));
  assert.throws(() => parseSkill(source.replace('chapter: 1', 'chapter: 2')));
});

test('Modellzugriff bleibt auf lokale LM-Studio-Adresse oder festen DeepInfra-Endpunkt begrenzt', () => {
  assert.equal(endpointFor({ provider: 'deepinfra' }), 'https://api.deepinfra.com/v1/openai');
  assert.equal(endpointFor({ provider: 'lmstudio', baseUrl: 'http://127.0.0.1:1234/v1' }), 'http://127.0.0.1:1234/v1');
  for (const baseUrl of ['https://example.com', 'http://192.168.1.10:1234/v1', 'http://user:password@localhost/v1', 'http://localhost/v1?x=1']) assert.throws(() => endpointFor({ provider: 'lmstudio', baseUrl }));
});

test('Statischer Skill-Katalog: Dateien werden relativ zur App geladen', async () => {
  const urls = [];
  const catalog = await loadCatalog(async url => { urls.push(String(url)); return fileFetch(url); });
  assert.equal(catalog.templateCount, 84); assert.equal(catalog.families.length, 26);
  assert.equal(urls.some(url => url.includes('/api/')), false);
  assert.equal(urls.some(url => url.endsWith('/skills/catalog.json')), true);
  await assert.rejects(() => loadCatalog(async () => new Response('Not found', { status: 404 })), /App-Datei fehlt/);
  await assert.rejects(() => loadCatalog(async () => new Response(JSON.stringify({ version: 1, skills: ['../outside'] }))), /Ungültiger Skill-Katalog/);
});

test('Browser-Laufzeit: Abgaben ohne Server, Doppelzählung vermeiden, Wiederholung erkennen', async () => {
  const runtime = createRuntime({ families: [family] }, { random: () => 0 }); const session = randomUUID();
  const next = await runtime.next({ session, difficulty: 1, language: 'python' });
  assert.equal(next.task.difficulty, 1); assert.equal(next.task.solution, undefined);
  // Die Ansicht darf die gehaltene Referenz nicht versehentlich verändern.
  next.task.code[0] = 'fake';
  const submissionId = randomUUID();
  const first = runtime.submit({ session, taskId: next.task.id, submissionId, answer: { selected: ['assign-first'] } });
  assert.equal(first.record.correct, false); assert.equal(first.record.attempt, 1); assert.notEqual(first.record.code[0], 'fake');
  const duplicate = runtime.submit({ session, taskId: next.task.id, submissionId, answer: { selected: ['calculate-first'] } });
  assert.deepEqual(duplicate, first);
  duplicate.record.correct = true;
  assert.equal(runtime.submit({ session, taskId: next.task.id, submissionId }).record.correct, false);
  const retry = runtime.submit({ session, taskId: next.task.id, submissionId: randomUUID(), answer: { selected: ['calculate-first'] } });
  assert.equal(retry.record.correct, true); assert.equal(retry.record.attempt, 2); assert.equal(retry.record.supported, true);
  assert.throws(() => runtime.submit({ session: randomUUID(), taskId: next.task.id, submissionId: randomUUID() }));
  await assert.rejects(() => runtime.next({ session, difficulty: 4, language: 'python' }));
  const medium = await runtime.next({ session, difficulty: 2, language: 'javascript' }); assert.equal(medium.task.difficulty, 2); assert.match(medium.task.code[0], /^let /);
  await assert.rejects(() => runtime.next({ session, difficulty: 2, language: 'python', learningObjective: 'unknown' }));
});

test('Modell-Mock: eindeutiger Skill lokal; kompakter Vertrag; Katalogprüfung bei mehreren Skills', async () => {
  const messages = []; let failureMode = '';
  const modelCompletion = async (_config, input) => {
    messages.push(input);
    const selectingSkill = !!JSON.parse(input[1].content).catalog;
    return JSON.stringify(selectingSkill ? { skill_id: failureMode === 'skill' ? 'outside-catalog' : 'zuweisung-reihenfolge' } : selection(failureMode === 'template' ? 'transfer-multiple-v1' : 'assignment-multiple-v1'));
  };
  const runtime = createRuntime({ families: [family] }, { modelCompletion, random: () => 0 });
  const config = { provider: 'lmstudio', baseUrl: 'http://localhost:1234/v1', model: 'test' };
  const next = () => runtime.next({ session: randomUUID(), difficulty: 1, language: 'python', config, history: ['MUST_NOT_BE_SENT'] });
  const valid = await next(); assert.equal(valid.task.templateId, 'assignment-multiple-v1'); assert.match(valid.task.source, /Modellauswahl/);
  assert.equal(messages.length, 1); assert.match(messages[0][0].content, /Select one listed template/); assert.equal(JSON.parse(messages[0][1].content).catalog, undefined);
  assert.equal(JSON.stringify(messages).includes('MUST_NOT_BE_SENT'), false);
  failureMode = 'template'; const outside = await next(); assert.equal(outside.task.difficulty, 1); assert.match(outside.warning, /außerhalb/); assert.equal(outside.task.source, 'Geprüfte Ersatzaufgabe');
  failureMode = 'skill'; const priorCalls = messages.length; const multiple = createRuntime({ families: [family, { ...family, metadata: { ...family.metadata, name: 'alternative' } }] }, { modelCompletion });
  const wrongSkill = await multiple.next({ session: randomUUID(), difficulty: 1, language: 'python', config }); assert.equal(messages.length - priorCalls, 1); assert.match(wrongSkill.warning, /Skill-Auswahl/);
});

test('Direkter Modelltransport: Loopback, feste externe Adresse, Keys nur im Header, Fehler verständlich', async () => {
  const calls = [];
  const fetchMock = async (url, options) => {
    calls.push({ url, options });
    return new Response(JSON.stringify({ choices: [{ message: { content: 'OK' } }] }), { status: 200 });
  };
  const local = { provider: 'lmstudio', baseUrl: 'http://127.0.0.1:1234/v1', model: 'test' };
  assert.equal(await completion(local, [{ role: 'user', content: 'OK' }], fetchMock), 'OK');
  assert.equal(calls[0].options.targetAddressSpace, 'loopback'); assert.equal(calls[0].options.credentials, 'omit');
  assert.equal(calls[0].options.mode, 'cors');
  await testConnection({ provider: 'deepinfra', model: 'test', apiKey: 'test-only-secret' }, fetchMock);
  assert.equal(calls[1].url, 'https://api.deepinfra.com/v1/openai/chat/completions');
  assert.equal(calls[1].options.headers.Authorization, 'Bearer test-only-secret');
  assert.equal(calls[1].options.body.includes('test-only-secret'), false);
  assert.equal(calls[1].options.targetAddressSpace, undefined);
  await assert.rejects(() => completion(local, [], async () => { throw new TypeError('Failed to fetch'); }), /Enable CORS/);
  await assert.rejects(() => completion(local, [], async () => new Response('', { status: 401 })), /HTTP 401/);
  await assert.rejects(() => completion(local, [], async () => new Response('{}')), /keinen Antworttext/);
});

test('Netzwerkfehler am Modell blockiert keine lokale Aufgabe oder Auswertung', async () => {
  const runtime = createRuntime({ families: [family] }, { modelCompletion: async () => { throw new Error('CORS blockiert'); } });
  const session = randomUUID();
  const next = await runtime.next({ session, difficulty: 3, language: 'python', config: { provider: 'lmstudio' } });
  assert.equal(next.task.source, 'Geprüfte Ersatzaufgabe'); assert.equal(next.task.difficulty, 3); assert.match(next.warning, /CORS/);
  const answer = referenceAnswer(next.task, family.templates);
  assert.equal(runtime.submit({ session, taskId: next.task.id, submissionId: randomUUID(), answer }).record.correct, true);
});
