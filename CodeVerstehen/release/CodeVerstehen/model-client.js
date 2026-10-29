export function newId() {
  if (globalThis.crypto.randomUUID) return globalThis.crypto.randomUUID();
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function endpointFor(config) {
  if (config.provider === 'deepinfra') return 'https://api.deepinfra.com/v1/openai';
  if (config.provider !== 'lmstudio') throw new Error('Unbekannter Anbieter.');
  const url = new URL(config.baseUrl);
  if (url.protocol !== 'http:' || !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) || url.username || url.password || url.search || url.hash) throw new Error('LM Studio muss über eine lokale HTTP-Adresse erreichbar sein.');
  return url.href.replace(/\/$/, '');
}

export function parseObject(content) {
  if (typeof content !== 'string') throw new Error('Das Modell hat keinen Antworttext geliefert.');
  const text = content.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  try { return JSON.parse(text); } catch { throw new Error('Das Modell hat kein gültiges JSON geliefert.'); }
}

export function normalizeUsage(usage) {
  const count = value => Number.isSafeInteger(value) && value >= 0;
  if (!usage || !count(usage.prompt_tokens) || !count(usage.completion_tokens)) return null;
  const input = usage.prompt_tokens, output = usage.completion_tokens;
  const total = usage.total_tokens === undefined ? input + output : usage.total_tokens;
  if (!count(total) || total < input + output) return null;
  const cached = usage.prompt_tokens_details?.cached_tokens;
  const reasoning = usage.completion_tokens_details?.reasoning_tokens;
  return { input, output, total, cached: count(cached) && cached <= input ? cached : null, reasoning: count(reasoning) && reasoning <= output ? reasoning : null };
}

export async function completion(config, messages, fetchImpl = globalThis.fetch, { onEvent, maxTokens = 400 } = {}) {
  if (!Number.isInteger(maxTokens) || maxTokens < 64 || maxTokens > 2400) throw new Error('Ungültige Grenze für Ausgabetokens.');
  const requestId = newId(), started = Date.now(); let sent = false;
  const emit = event => { try { onEvent?.({ requestId, ...event }); } catch { /* Beobachtung darf die Anfrage nicht verhindern. */ } };
  try {
    const base = endpointFor(config);
    if (typeof config.model !== 'string' || !config.model.trim() || config.model.length > 180) throw new Error('Bitte eine Modell-ID eintragen.');
    if (config.apiKey && (typeof config.apiKey !== 'string' || config.apiKey.length > 1000)) throw new Error('Ungültiger API-Key.');
    if (config.provider === 'deepinfra' && !config.apiKey?.trim()) throw new Error('Bitte den persönlichen DeepInfra-API-Key eintragen.');
    emit({ type: 'start' }); sent = true;
    let response;
    try {
      response = await fetchImpl(`${base}/chat/completions`, {
        method: 'POST', mode: 'cors', credentials: 'omit', redirect: 'error', signal: AbortSignal.timeout(45000),
        ...(config.provider === 'lmstudio' ? { targetAddressSpace: 'loopback' } : {}),
        headers: { 'Content-Type': 'application/json', ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}) },
        body: JSON.stringify({ model: config.model.trim(), messages, temperature: 0.5, max_tokens: maxTokens, stream: false })
      });
    } catch (error) {
      if (error.name === 'TimeoutError' || error.name === 'AbortError') throw new Error('Das Modell hat nicht rechtzeitig geantwortet.');
      throw new Error(config.provider === 'lmstudio'
        ? 'LM Studio ist vom Browser nicht erreichbar. Prüfe den Modellserver, „Enable CORS“ und die Browserberechtigung für lokale Verbindungen.'
        : 'Der Anbieter ist vom Browser nicht erreichbar. Prüfe Verbindung und Browserzugriff (CORS). Die Demo bleibt verfügbar.');
    }
    if (!response.ok) throw new Error(`Der Anbieter antwortet mit HTTP ${response.status}. Bitte Modell-ID und Zugang prüfen.`);
    let data;
    try { data = await response.json(); } catch { throw new Error('Der Anbieter liefert kein gültiges Antwortformat.'); }
    // Verbrauch erfassen, selbst wenn Text oder Aufgabenauswahl anschließend ungültig ist.
    emit({ type: 'usage', usage: normalizeUsage(data.usage) });
    const content = data.choices?.[0]?.message?.content;
    if (typeof content !== 'string' || !content.trim()) throw new Error('Das Modell liefert keinen Antworttext.');
    emit({ type: 'success', durationMs: Date.now() - started });
    return content;
  } catch (error) {
    emit({ type: 'error', sent, error: error.message, durationMs: Date.now() - started });
    throw error;
  }
}

export async function testConnection(config, fetchImpl) {
  await completion(config, [{ role: 'user', content: 'Antworte nur mit OK.' }], fetchImpl);
  return { ok: true };
}
