import { completion, endpointFor, newId } from './model-client.js';

export const usageStoragePrefix = 'code-verstehen-model-usage-v1:';
export const requestLabels = { 'connection-test': 'Verbindungstest', 'skill-selection': 'Skill-Auswahl', 'task-selection': 'Aufgabenvariation', 'task-generation': 'Aufgabenentwurf', 'task-correction': 'Entwurfskorrektur', 'answer-explanation': 'Kurzerklärung zur Antwort', request: 'Modellanfrage' };
const empty = () => ({ requests: 0, input: 0, output: 0, total: 0, unknown: 0, cached: 0, reasoning: 0 });
const fields = Object.keys(empty());
const validCount = value => Number.isSafeInteger(value) && value >= 0;
const validStats = value => value && fields.every(key => validCount(value[key])) && value.unknown <= value.requests;
const validGroup = group => group && ['lmstudio', 'deepinfra'].includes(group.provider) && typeof group.model === 'string' && group.model.length <= 180 && validStats(group);
const add = (target, source) => { fields.forEach(key => { target[key] += source[key]; }); };
const groupKey = (provider, model) => JSON.stringify([provider, model]);
function connectionKey(config) {
  let endpoint; try { endpoint = endpointFor(config); } catch { endpoint = config.baseUrl || ''; }
  return JSON.stringify([config.provider, endpoint, config.model?.trim() || '']);
}

export function createModelMonitor({ session = newId(), storage, onChange = () => {}, now = Date.now, fetchImpl = globalThis.fetch } = {}) {
  const bucket = { version: 1, session, startedAt: new Date(now()).toISOString(), groups: [], recent: [] };
  const storageKey = usageStoragePrefix + session;
  const connections = new Map(), inFlight = new Map();
  let active = { provider: 'demo', model: '' }, storageOk = !!storage;
  const changed = () => { try { onChange(); } catch { /* Anzeige kann separat aktualisiert werden. */ } };
  const save = () => {
    try { if (storage) { storage.setItem(storageKey, JSON.stringify(bucket)); storageOk = true; } } catch { storageOk = false; }
    changed();
  };
  function group(config) {
    const model = (config.model || '').trim();
    let result = bucket.groups.find(g => g.provider === config.provider && g.model === model);
    if (!result) { result = { provider: config.provider, model, ...empty() }; bucket.groups.push(result); }
    return result;
  }
  function observe(config, purpose, event) {
    const key = connectionKey(config);
    const old = connections.get(key);
    const compatible = old?.credential === (config.apiKey || '');
    const previousSuccess = compatible ? old.checkedAt : null;
    if (event.type === 'start') {
      const stats = group(config); stats.requests++; stats.unknown++;
      const row = { id: event.requestId, provider: config.provider, model: config.model.trim(), purpose, startedAt: new Date(now()).toISOString(), outcome: 'pending', durationMs: null, usage: null };
      inFlight.set(event.requestId, { row, stats });
      bucket.recent.unshift(row); bucket.recent = bucket.recent.slice(0, 50);
      connections.set(key, { phase: 'checking', checkedAt: previousSuccess, credential: config.apiKey || '', purpose });
    } else if (event.type === 'usage') {
      const entry = inFlight.get(event.requestId);
      if (entry && event.usage && !entry.row.usage) {
        entry.row.usage = event.usage;
        entry.stats.unknown--;
        for (const field of ['input', 'output', 'total', 'cached', 'reasoning']) entry.stats[field] += event.usage[field] ?? 0;
      }
    } else if (['success', 'error'].includes(event.type)) {
      const entry = inFlight.get(event.requestId);
      if (entry) {
        entry.row.outcome = event.type;
        entry.row.durationMs = event.durationMs;
        if (event.error) entry.row.error = event.error;
        inFlight.delete(event.requestId);
      }
      connections.set(key, { phase: event.type === 'success' ? 'connected' : 'error', checkedAt: event.type === 'success' ? now() : previousSuccess, credential: config.apiKey || '', error: event.error || '', purpose });
    }
    save();
  }
  function snapshot() {
    const groups = new Map(); let recent = [...bucket.recent], unreadable = 0;
    const merge = source => source.groups.forEach(value => {
      const key = groupKey(value.provider, value.model);
      if (!groups.has(key)) groups.set(key, { provider: value.provider, model: value.model, ...empty() });
      add(groups.get(key), value);
    });
    merge(bucket);
    if (storage) {
      try {
        for (let i = 0; i < storage.length; i++) {
          const key = storage.key(i);
          if (!key?.startsWith(usageStoragePrefix) || key === storageKey) continue;
          try {
            const source = JSON.parse(storage.getItem(key));
            if (source?.version !== 1 || !Array.isArray(source.groups) || !source.groups.every(validGroup)) throw new Error('Invalid usage bucket');
            merge(source);
            // Keine fremden Rohdaten in die Ansicht oder den Export übernehmen.
            if (Array.isArray(source.recent)) recent.push(...source.recent.filter(row => row && ['lmstudio', 'deepinfra'].includes(row.provider) && typeof row.model === 'string' && row.model.length <= 180 && Object.hasOwn(requestLabels, row.purpose) && ['pending', 'success', 'error'].includes(row.outcome) && Number.isFinite(Date.parse(row.startedAt))).map(row => ({ id: String(row.id).slice(0, 36), provider: row.provider, model: row.model, purpose: row.purpose, startedAt: row.startedAt, outcome: row.outcome, durationMs: validCount(row.durationMs) ? row.durationMs : null, usage: row.usage && ['input', 'output', 'total'].every(field => validCount(row.usage[field])) ? { input: row.usage.input, output: row.usage.output, total: row.usage.total, cached: validCount(row.usage.cached) ? row.usage.cached : null, reasoning: validCount(row.usage.reasoning) ? row.usage.reasoning : null } : null, ...(typeof row.error === 'string' ? { error: row.error.slice(0, 500) } : {}) })));
          } catch { unreadable++; }
        }
      } catch { storageOk = false; }
    }
    const total = empty(), current = empty();
    groups.forEach(value => add(total, value)); bucket.groups.forEach(value => add(current, value));
    const cachedConnection = connections.get(connectionKey(active));
    const connection = active.provider === 'demo' ? { phase: 'demo', checkedAt: null } : cachedConnection?.credential === (active.apiKey || '') ? { phase: cachedConnection.phase, checkedAt: cachedConnection.checkedAt, purpose: cachedConnection.purpose, error: cachedConnection.error || '' } : { phase: 'unverified', checkedAt: null };
    if (connection.phase === 'connected' && now() - connection.checkedAt > 5 * 60 * 1000) connection.phase = 'stale';
    return structuredClone({ connection: { ...connection, provider: active.provider, model: active.model || '' }, total, session: current, groups: [...groups.values()], recent: recent.sort((a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt)).slice(0, 100), storageOk, unreadable });
  }
  return {
    setActive(config) { active = { ...config }; changed(); },
    snapshot,
    async request(config, messages, { purpose = 'request', maxTokens = 400 } = {}) {
      if (!Object.hasOwn(requestLabels, purpose)) purpose = 'request';
      return completion(config, messages, fetchImpl, { maxTokens, onEvent: event => observe(config, purpose, event) });
    },
    async test(config) {
      await this.request(config, [{ role: 'user', content: 'Antworte nur mit OK.' }], { purpose: 'connection-test' });
    },
    export() { const { connection, ...usage } = snapshot(); return { version: 1, exportedAt: new Date(now()).toISOString(), ...usage }; }
  };
}
