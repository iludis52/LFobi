// Isolierter Browser-Testserver: eigener Origin, keine echten Modellkosten.
// Nicht Bestandteil der statischen Auslieferung.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';
import { fallbackBranchDraft } from '../branch-workshop.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.md': 'text/plain' };
export const server = createServer(async (request, response) => {
  try {
    if (request.method === 'POST' && request.url === '/v1/chat/completions') {
      let body = ''; for await (const chunk of request) body += chunk;
      const data = JSON.parse(body);
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (data.model === 'monitor-test-error') { response.writeHead(401); response.end('{}'); return; }
      let content = 'OK', usage = { prompt_tokens: 12, completion_tokens: 1, total_tokens: 13 };
      if (data.messages[0].content.includes('Write friendly German feedback')) {
        content = JSON.stringify({ explanation: 'Prüfe den gespeicherten Wert nach jeder ausgeführten Zuweisung. Eine Ausgabe verändert diesen Wert nicht.' });
        usage = { prompt_tokens: 180, completion_tokens: 30, total_tokens: 210 };
      } else if (data.messages[0].content.includes('Select one listed skill')) {
        const input = JSON.parse(data.messages[1].content);
        content = JSON.stringify({ skill_id: input.catalog[0].name });
        usage = { prompt_tokens: 100, completion_tokens: 20, total_tokens: 120 };
      } else if (data.messages[0].content.includes('Create a varied German if/else task')) {
        const input = JSON.parse(data.messages[1].content);
        const draft = fallbackBranchDraft(input.contract.required_question, input.difficulty);
        draft.title = 'Neue Aufgabe aus dem Testmodell';
        draft.context = `Das lokale Testmodell entwirft eine Situation zur Frage ${input.contract.required_question}.`;
        content = data.model === 'workshop-invalid' && data.messages.length === 2 ? '{"version":1}' : JSON.stringify(draft);
        usage = { prompt_tokens: 650, completion_tokens: 380, total_tokens: 1030 };
      } else if (data.messages.length > 1) {
        const input = JSON.parse(data.messages[1].content), template = input.templates[0];
        content = JSON.stringify({ template_id: template.id, parameters: Object.fromEntries(Object.entries(template.parameter_ranges).map(([key, [min]]) => [key, min])), variation: { names: template.variation_choices.names[0], answer_form: template.variation_choices.answer_form.at(-1) } });
        usage = { prompt_tokens: 500, completion_tokens: 50, total_tokens: 550, prompt_tokens_details: { cached_tokens: 100 }, completion_tokens_details: { reasoning_tokens: 10 } };
      }
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ choices: [{ message: { content } }], ...(data.model === 'monitor-test-no-usage' ? {} : { usage }) }));
      return;
    }
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const path = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!path.startsWith(root.endsWith(sep) ? root : root + sep)) { response.writeHead(403); response.end(); return; }
    response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(await readFile(path));
  } catch { if (!response.headersSent) response.writeHead(404); response.end('Not found'); }
});
const port = Number(process.env.CODE_PREVIEW_PORT || 5202);
server.listen(port, '127.0.0.1', () => process.stdout.write(`Isolated monitor preview: http://127.0.0.1:${port}\n`));
