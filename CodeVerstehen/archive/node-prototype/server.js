import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { parseSkill, buildTask, publicTask, evaluate, typeLabels } from './task-engine.js';
import { parseObject } from './lesson.js';

const port = Number(process.env.PORT || 4180);
const files = new Map([['/', ['index.html', 'text/html']], ['/index.html', ['index.html', 'text/html']], ['/app.js', ['app.js', 'text/javascript']], ['/styles.css', ['styles.css', 'text/css']]]);
const familyPath = './skills/zuweisung-reihenfolge/';
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function endpointFor(config) {
  if (config.provider === 'deepinfra') return 'https://api.deepinfra.com/v1/openai';
  if (config.provider !== 'lmstudio') throw new Error('Unbekannter Anbieter.');
  const url = new URL(config.baseUrl);
  if (url.protocol !== 'http:' || !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) || url.username || url.password || url.search || url.hash) throw new Error('LM Studio muss über eine lokale HTTP-Adresse erreichbar sein.');
  return url.href.replace(/\/$/, '');
}
async function requestBody(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (Buffer.byteLength(body) > 24000) throw new Error('Anfrage zu groß.');
  }
  return JSON.parse(body);
}
function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}
async function completion(config, messages) {
  endpointFor(config);
  if (typeof config.model !== 'string' || !config.model.trim() || config.model.length > 180) throw new Error('Bitte eine Modell-ID eintragen.');
  if (config.apiKey && (typeof config.apiKey !== 'string' || config.apiKey.length > 1000)) throw new Error('Ungültiger API-Key.');
  if (config.provider === 'deepinfra' && !config.apiKey?.trim()) throw new Error('Bitte den persönlichen DeepInfra-API-Key eintragen.');
  const response = await fetch(`${endpointFor(config)}/chat/completions`, {
    method: 'POST', redirect: 'error', signal: AbortSignal.timeout(45000),
    headers: { 'Content-Type': 'application/json', ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}) },
    body: JSON.stringify({ model: config.model.trim(), messages, temperature: 0.2, max_tokens: 300, stream: false })
  });
  if (!response.ok) throw new Error(`Der Anbieter antwortet mit HTTP ${response.status}. Bitte Modell-ID, Server und Zugang prüfen.`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content;
}

export async function loadFamily() {
  const skill = parseSkill(await readFile(new URL(`${familyPath}SKILL.md`, import.meta.url), 'utf8'));
  if (skill.metadata.content !== 'content.de.md' || skill.metadata.templates !== 'templates.json') throw new Error('Nicht unterstützte Skill-Ressource.');
  const document = JSON.parse(await readFile(new URL(`${familyPath}templates.json`, import.meta.url), 'utf8'));
  if (document.version !== 1 || !Array.isArray(document.templates) || !document.templates.length) throw new Error('Ungültiger Vorlagenbestand.');
  const templates = document.templates;
  if (new Set(templates.map(t => t.id)).size !== templates.length) throw new Error('Vorlagen-IDs müssen eindeutig sein.');
  for (const template of templates) {
    if (!skill.metadata.difficulty_levels.includes(template.difficulty) || !skill.metadata.interaction_types.includes(template.type) || !['assignment', 'transfer'].includes(template.mode)) throw new Error('Vorlage außerhalb der Skill-Freigabe.');
    // Jede mögliche Zahlenvariante wird vor Freigabe strukturell geprüft.
    for (let start = 1; start <= 9; start++) for (let add = 1; add <= 9; add++) buildTask({ template_id: template.id, parameters: { start, add } }, [template]);
  }
  return { ...skill, templates, content: await readFile(new URL(`${familyPath}content.de.md`, import.meta.url), 'utf8') };
}

export function createServer() {
  let familyPromise;
  const family = () => familyPromise ??= loadFamily();
  const tasks = new Map();
  function prune() {
    for (const [id, entry] of tasks) if (Date.now() - entry.created > 4 * 60 * 60 * 1000) tasks.delete(id);
    while (tasks.size >= 500) tasks.delete(tasks.keys().next().value);
  }
  const server = http.createServer(async (req, res) => {
    try {
      const activePort = server.address().port;
      const hosts = [`127.0.0.1:${activePort}`, `localhost:${activePort}`, `[::1]:${activePort}`];
      if (!hosts.includes(req.headers.host)) return json(res, 403, { error: 'Unzulässiger Host.' });
      if (req.method === 'GET' && req.url === '/api/catalog') {
        const loaded = await family();
        return json(res, 200, { skill: loaded.metadata, content: loaded.content, types: typeLabels, templateCount: loaded.templates.length });
      }
      if (req.method === 'POST' && req.url?.startsWith('/api/')) {
        if (!hosts.map(host => `http://${host}`).includes(req.headers.origin)) return json(res, 403, { error: 'Unzulässiger Ursprung.' });
        const input = await requestBody(req);
        if (req.url === '/api/connect') {
          if (!input.config) throw new Error('Verbindungseinstellungen fehlen.');
          const result = await completion(input.config, [{ role: 'user', content: 'Antworte nur mit OK.' }]);
          if (!result?.trim()) throw new Error('Das Modell liefert keinen Antworttext.');
          return json(res, 200, { ok: true });
        }
        if (!uuid.test(input.session || '')) throw new Error('Ungültige Sitzung. Bitte Seite neu laden.');
        if (req.url === '/api/next') {
          if (![1, 2, 3].includes(input.difficulty) || !['python', 'javascript'].includes(input.language)) throw new Error('Ungültige Schwierigkeit oder Sprache.');
          const loaded = await family();
          const allowed = loaded.templates.filter(t => t.difficulty === input.difficulty);
          if (!allowed.length) return json(res, 409, { error: 'Für diese Schwierigkeit gibt es noch keine Vorlage.' });
          const previous = allowed.findIndex(t => t.id === input.previousTemplate);
          const fallback = allowed[(previous + 1) % allowed.length];
          let selection = { template_id: fallback.id, parameters: { start: 1 + Math.floor(Math.random() * 9), add: 1 + Math.floor(Math.random() * 9) } };
          let source = 'Geprüfte Vorlage', warning = '';
          const config = input.config || { provider: 'demo' };
          if (!['demo', 'lmstudio', 'deepinfra'].includes(config.provider)) throw new Error('Unbekannter Anbieter.');
          if (config.provider !== 'demo') {
            try {
              const chosen = parseObject(await completion(config, [
                { role: 'system', content: 'Wähle ausschließlich einen Skill aus dem Katalog. Nur JSON: {"skill_id":"name"}. Keine weiteren Felder.' },
                { role: 'user', content: JSON.stringify({ chapter: 1, difficulty: input.difficulty, language: input.language, catalog: [{ name: loaded.metadata.name, description: loaded.metadata.description }] }) }
              ]));
              if (Object.keys(chosen).length !== 1 || chosen.skill_id !== loaded.metadata.name) throw new Error('Skill-Auswahl liegt außerhalb des zugelassenen Katalogs.');
              const proposed = parseObject(await completion(config, [
                { role: 'system', content: loaded.body },
                { role: 'user', content: JSON.stringify({ difficulty: input.difficulty, language: input.language, previous_template: fallback.id === input.previousTemplate ? null : input.previousTemplate, templates: allowed.map(t => ({ id: t.id, type: t.type, title: t.title })) }) }
              ]));
              buildTask(proposed, allowed, input.language);
              selection = proposed;
              source = 'Modellauswahl · Vorlage geprüft';
            } catch (error) {
              const message = error.name === 'TimeoutError' ? 'Zeitlimit erreicht.' : error.message === 'fetch failed' ? 'Der Modellserver ist nicht erreichbar.' : error.message;
              warning = `Modellauswahl nicht verfügbar: ${message} Eine geprüfte Ersatzaufgabe wird verwendet.`;
              source = 'Geprüfte Ersatzaufgabe';
            }
          }
          const task = buildTask(selection, allowed, input.language);
          task.id = randomUUID(); task.skillId = loaded.metadata.name; task.skillVersion = loaded.metadata.version; task.learningObjective = loaded.metadata.learning_objective; task.source = source;
          prune();
          tasks.set(task.id, { task, session: input.session, submissions: new Map(), created: Date.now() });
          return json(res, 200, { task: publicTask(task), warning });
        }
        if (req.url === '/api/submit') {
          const entry = tasks.get(input.taskId);
          if (!entry || entry.session !== input.session || Date.now() - entry.created > 4 * 60 * 60 * 1000) return json(res, 409, { error: 'Diese Aufgabe ist nicht mehr verfügbar. Lade eine neue Aufgabe.' });
          if (!uuid.test(input.submissionId || '')) throw new Error('Ungültige Abgabe-ID.');
          if (entry.submissions.has(input.submissionId)) return json(res, 200, entry.submissions.get(input.submissionId));
          if (entry.submissions.size >= 20) throw new Error('Bitte beginne eine neue Aufgabe.');
          const result = evaluate(entry.task, input.answer);
          const record = {
            id: input.submissionId, session: input.session, date: new Date().toISOString(), taskId: entry.task.id,
            templateId: entry.task.templateId, skillId: entry.task.skillId, skillVersion: entry.task.skillVersion,
            learningObjective: entry.task.learningObjective, difficulty: entry.task.difficulty, type: entry.task.type,
            title: entry.task.title, prompt: entry.task.prompt, criteria: entry.task.criteria, language: entry.task.language, code: entry.task.code, parameters: entry.task.parameters,
            options: entry.task.options || null, regions: entry.task.regions || null, steps: entry.task.steps || null, gaps: entry.task.gaps || null, values: entry.task.values || null,
            answer: input.answer, solution: result.solution, correct: result.correct, source: entry.task.source,
            attempt: entry.submissions.size + 1, supported: entry.submissions.size > 0, missing: result.missing, extra: result.extra
          };
          const response = { result, record };
          entry.submissions.set(input.submissionId, response);
          return json(res, 200, response);
        }
        return json(res, 404, { error: 'Unbekannte Aktion.' });
      }
      if (req.method !== 'GET') return json(res, 405, { error: 'Methode nicht erlaubt.' });
      const file = files.get(req.url?.split('?')[0]);
      if (!file) return json(res, 404, { error: 'Nicht gefunden.' });
      res.writeHead(200, { 'Content-Type': `${file[1]}; charset=utf-8`, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'" });
      res.end(await readFile(new URL(file[0], import.meta.url)));
    } catch (error) {
      json(res, 400, { error: error.name === 'TimeoutError' ? 'Das Modell hat nicht rechtzeitig geantwortet.' : error.message === 'fetch failed' ? 'Der Modellserver ist nicht erreichbar. Bitte LM Studio und die Serveradresse prüfen.' : error.message });
    }
  });
  return server;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) createServer().listen(port, '127.0.0.1', () => console.log(`Code verstehen: http://127.0.0.1:${port}`));
