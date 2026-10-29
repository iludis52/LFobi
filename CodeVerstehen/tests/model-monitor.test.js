import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { completion, normalizeUsage } from '../model-client.js';
import { createModelMonitor, usageStoragePrefix } from '../model-monitor.js';
import { createRuntime, loadCatalog } from '../runtime.js';

const local = { provider: 'lmstudio', baseUrl: 'http://127.0.0.1:1234/v1', model: 'test-model', apiKey: 'test-only-key' };
const reply = (content = 'OK', usage = { prompt_tokens: 100, completion_tokens: 20, total_tokens: 120 }) => new Response(JSON.stringify({ choices: [{ message: { content } }], ...(usage === null ? {} : { usage }) }));
function memoryStorage() {
  const values = new Map();
  return { get length() { return values.size; }, key: i => [...values.keys()][i], getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value), values };
}

test('Actual usage normalization: exact counts, optional total, cached/reasoning subsets and malformed data', () => {
  assert.deepEqual(normalizeUsage({ prompt_tokens: 100, completion_tokens: 20, total_tokens: 120, prompt_tokens_details: { cached_tokens: 80 }, completion_tokens_details: { reasoning_tokens: 10 } }), { input: 100, output: 20, total: 120, cached: 80, reasoning: 10 });
  assert.equal(normalizeUsage({ prompt_tokens: 0, completion_tokens: 0 }).total, 0);
  assert.equal(normalizeUsage({ prompt_tokens: 100, completion_tokens: 20 }).total, 120);
  for (const usage of [undefined, {}, { total_tokens: 100 }, { prompt_tokens: '100', completion_tokens: 20 }, { prompt_tokens: -1, completion_tokens: 20 }, { prompt_tokens: 100, completion_tokens: 20, total_tokens: 50 }, { prompt_tokens: 1.5, completion_tokens: 20 }]) assert.equal(normalizeUsage(usage), null);
  assert.equal(normalizeUsage({ prompt_tokens: 1, completion_tokens: 2, prompt_tokens_details: { cached_tokens: 3 } }).cached, null);
});

test('Transport reports usage before invalid content; observing never changes its string return contract', async () => {
  const events = [];
  assert.equal(await completion(local, [], async () => reply(), { onEvent: event => events.push(event) }), 'OK');
  assert.deepEqual(events.map(event => event.type), ['start', 'usage', 'success']);
  assert.equal(new Set(events.map(event => event.requestId)).size, 1);
  assert.equal(events[1].usage.total, 120);
  const invalid = [];
  await assert.rejects(() => completion(local, [], async () => reply(null), { onEvent: event => invalid.push(event) }), /keinen Antworttext/);
  assert.deepEqual(invalid.map(event => event.type), ['start', 'usage', 'error']);
  assert.equal(invalid[1].usage.total, 120);
  assert.equal(await completion(local, [], async () => reply(), { onEvent: () => { throw new Error('Observer unavailable'); } }), 'OK');
});

test('Permanent status: checking, confirmed, stale, failures and changed model/key', async () => {
  let clock = 100000, finish;
  const monitor = createModelMonitor({ now: () => clock, fetchImpl: () => new Promise(resolve => { finish = resolve; }) });
  assert.equal(monitor.snapshot().connection.phase, 'demo');
  monitor.setActive(local);
  assert.equal(monitor.snapshot().connection.phase, 'unverified');
  const request = monitor.request(local, []);
  assert.equal(monitor.snapshot().connection.phase, 'checking');
  finish(reply()); await request;
  assert.equal(monitor.snapshot().connection.phase, 'connected');
  clock += 5 * 60 * 1000 + 1;
  assert.equal(monitor.snapshot().connection.phase, 'stale');
  monitor.setActive({ ...local, apiKey: 'different-key' });
  assert.equal(monitor.snapshot().connection.phase, 'unverified');
  monitor.setActive({ ...local, model: 'different-model' });
  assert.equal(monitor.snapshot().connection.phase, 'unverified');
  const broken = createModelMonitor({ fetchImpl: async () => { throw new TypeError('network'); } });
  broken.setActive(local);
  await assert.rejects(() => broken.request(local, []));
  assert.equal(broken.snapshot().connection.phase, 'error');
  assert.equal(broken.snapshot().total.unknown, 1);
  assert.equal(broken.snapshot().total.total, 0);
});

test('All calls count including tests and rejected outputs; missing usage stays unknown, not estimated', async () => {
  let response = reply();
  const monitor = createModelMonitor({ fetchImpl: async () => response });
  await monitor.test(local);
  response = reply(null);
  await assert.rejects(() => monitor.request(local, []));
  response = reply('OK', null);
  await monitor.request(local, []);
  assert.equal(monitor.snapshot().total.requests, 3);
  assert.equal(monitor.snapshot().total.total, 240);
  assert.equal(monitor.snapshot().total.input, 200);
  assert.equal(monitor.snapshot().total.output, 40);
  assert.equal(monitor.snapshot().total.unknown, 1);
  assert.equal(monitor.snapshot().recent.find(row => row.purpose === 'connection-test').usage.total, 120);
  assert.equal(monitor.snapshot().recent.find(row => row.outcome === 'error').usage.total, 120);
  const invalidConfig = createModelMonitor({ fetchImpl: async () => { throw new Error('Must not be called'); } });
  await assert.rejects(() => invalidConfig.request({ ...local, model: '' }, []));
  assert.equal(invalidConfig.snapshot().total.requests, 0);
});

test('Independent tab buckets survive reload and aggregate without counting the current bucket twice', async () => {
  const storage = memoryStorage();
  const first = createModelMonitor({ session: 'tab-a', storage, fetchImpl: async () => reply() });
  const second = createModelMonitor({ session: 'tab-b', storage, fetchImpl: async () => reply('OK', { prompt_tokens: 200, completion_tokens: 30, total_tokens: 230 }) });
  await first.test(local);
  await second.test({ ...local, provider: 'deepinfra', model: 'another-model' });
  await first.test(local);
  assert.equal(first.snapshot().total.total, 470);
  assert.equal(second.snapshot().total.total, 470);
  assert.equal(first.snapshot().session.total, 240);
  assert.equal(first.snapshot().groups.length, 2);
  const reloaded = createModelMonitor({ session: 'tab-c', storage });
  assert.equal(reloaded.snapshot().total.total, 470);
  assert.equal(reloaded.snapshot().session.total, 0);
  assert.equal(reloaded.snapshot().connection.phase, 'demo');
  const serialized = [...storage.values.values()].join('') + JSON.stringify(first.export());
  assert.equal(serialized.includes('test-only-key'), false);
  assert.equal(serialized.includes('Antworte nur'), false);
  assert.equal(serialized.includes('apiKey'), false);
});

test('Recent logs are bounded while lifetime counts remain; blocked/corrupt storage never blocks requests', async () => {
  const storage = memoryStorage();
  const monitor = createModelMonitor({ storage, fetchImpl: async () => reply() });
  for (let i = 0; i < 55; i++) await monitor.test(local);
  assert.equal(monitor.snapshot().recent.length, 50);
  assert.equal(monitor.snapshot().total.total, 55 * 120);
  storage.setItem(usageStoragePrefix + 'corrupt', '{not-json');
  assert.equal(monitor.snapshot().unreadable, 1);
  assert.equal(monitor.snapshot().total.total, 55 * 120);
  const blocked = createModelMonitor({ storage: { get length() { throw new Error('Blocked'); }, setItem() { throw new Error('Quota'); } }, fetchImpl: async () => reply() });
  await blocked.test(local);
  assert.equal(blocked.snapshot().storageOk, false);
  assert.equal(blocked.snapshot().total.total, 120);
});

test('Real transport wrapper accounts for the single selection call and unusable JSON selections', async () => {
  const catalog = await loadCatalog(async url => new Response(await readFile(new URL(url), 'utf8')));
  let calls = 0, invalid = false;
  const monitor = createModelMonitor({ fetchImpl: async () => {
    calls++;
    const content = invalid ? 'not-json' : '{"template_id":"assignment-single-v1","parameters":{"start":3,"add":2}}';
    return reply(content);
  } });
  const runtime = createRuntime(catalog, { modelCompletion: (config, messages, options) => monitor.request(config, messages, options) });
  const request = { session: 'learning-session', difficulty: 1, language: 'python', config: local };
  monitor.setActive(local);
  const success = await runtime.next(request);
  assert.match(success.task.source, /Modellauswahl/);
  assert.equal(monitor.snapshot().total.total, 120);
  assert.deepEqual(new Set(monitor.snapshot().recent.map(row => row.purpose)), new Set(['task-selection']));
  invalid = true;
  const fallback = await runtime.next(request);
  assert.equal(fallback.task.source, 'Geprüfte Ersatzaufgabe');
  assert.equal(monitor.snapshot().total.total, 240);
  assert.equal(monitor.snapshot().connection.phase, 'connected'); // Modell antwortet; fachliche Auswahl ist ungültig.
});
