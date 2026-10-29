import { loadCatalog, createRuntime } from './runtime.js';
import { newId } from './model-client.js';
import { createModelMonitor, requestLabels, usageStoragePrefix } from './model-monitor.js';
import { branchKindLabels } from './branch-workshop.js';

const $ = id => document.getElementById(id);
const levels = ['Einfach', 'Mittel', 'Anspruchsvoll'];
const objectiveLabels = { 'assignment-order': 'Ausdrücke und Zuweisungen', 'current-state': 'Aktueller Wert und Zustand', 'statement-order': 'Anweisungsreihenfolge vergleichen', 'value-copy': 'Zahlenwerte übernehmen', 'condition-check': 'Bedingungen und Grenzwerte', 'branch-choice': 'Verzweigungen mit if und else', 'decision-chain': 'Einzelne Entscheidungen und Ketten', 'branch-change': 'Kleine Codeänderungen verstehen' };
Object.assign(objectiveLabels, { 'counted-loop': 'Feste Wiederholungen mit for', 'while-loop': 'Bedingungsgesteuerte Wiederholung', 'loop-accumulator': 'Zähler und aufsummierte Werte', 'loop-change': 'Schleifengrenzen und Reihenfolge ändern' });
Object.assign(objectiveLabels, { 'loop-break':'Schleifen mit break abbrechen','loop-continue':'Runden mit continue überspringen','list-access':'Listen und Indizes','list-change':'Listen verändern','list-iteration':'Listen elementweise durchlaufen','map-record':'Zuordnungen und Datensätze','text-processing':'Texte zerlegen und zusammensetzen','collection-transform':'Filtern, sortieren und zusammenfassen','function-call':'Definition, Aufruf und Parameter','function-return':'Rückgabe und Ausgabe unterscheiden','function-scope':'Lokale und globale Namen','function-effect':'Seiteneffekte und Neuzuweisung','function-compose':'Funktionen verknüpfen','function-module':'Module, Methoden und Schnittstellen' });
const chapterLabels = { 1: 'Grundlagen', 2: 'Entscheidungen', 3: 'Wiederholungen', 4:'Sammlungen', 5:'Funktionen' };
const objectiveLabel = objective => objectiveLabels[objective] || objective || 'Früherer Aufgabenbestand';
const shortObjectives = { 'assignment-order': 'Zuweisungen', 'current-state': 'Aktueller Wert', 'statement-order': 'Reihenfolge', 'value-copy': 'Werte übernehmen', 'condition-check': 'Bedingungen', 'branch-choice': 'if / else', 'decision-chain': 'Entscheidungsketten', 'branch-change': 'Codeänderungen' };
Object.assign(shortObjectives, { 'counted-loop': 'for-Schleifen', 'while-loop': 'while-Schleifen', 'loop-accumulator': 'Zähler / Summe', 'loop-change': 'Schleifen ändern' });
Object.assign(shortObjectives, { 'loop-break':'break','loop-continue':'continue','list-access':'Indizes / Länge','list-change':'Listen ändern','list-iteration':'Listen durchlaufen','map-record':'Map / Datensatz','text-processing':'Texte','collection-transform':'Transformation','function-call':'Aufruf / Parameter','function-return':'return / Ausgabe','function-scope':'Gültigkeitsbereich','function-effect':'Seiteneffekte','function-compose':'Verknüpfen','function-module':'Module / Methoden' });
const session = newId();
let usageStorage; try { usageStorage = localStorage; } catch { /* Verbrauch bleibt im Tab verfügbar. */ }
const modelMonitor = createModelMonitor({ session, storage: usageStorage, onChange: refreshModelMonitor });
const storageKey = 'code-verstehen-v2';
let config = { provider: 'demo', baseUrl: 'http://127.0.0.1:1234/v1', model: '', apiKey: '' };
let catalog = null, runtime = null, task = null, result = null, busy = false, pending = null, draft = {}, records = [];
let activeSelection = { chapter: 2, learningObjective: 'condition-check', difficulty: 1, language: 'python' };
const selectedSettings = () => ({ chapter: Number($('chapter').value), learningObjective: $('learning-objective').value, difficulty: Number($('difficulty').value), language: $('language').value });
const selectionChanged = () => Object.entries(selectedSettings()).some(([key, value]) => activeSelection[key] !== value);
const types = { 'single-choice': 'Eine Antwort wählen', 'multiple-choice': 'Alle richtigen wählen', 'code-selection': 'Code auswählen', 'gap-fill': 'Lücken befüllen', ordering: 'Schritte ordnen', 'diagram-choice': 'Diagramm auswählen' };
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function validRecord(r) {
  return r && uuid.test(r.id) && uuid.test(r.session) && uuid.test(r.taskId) && typeof r.correct === 'boolean' && [1, 2, 3].includes(r.difficulty) && typeof r.title === 'string' && r.title.length <= 200 && typeof r.date === 'string' && Number.isFinite(Date.parse(r.date)) && Object.hasOwn(types, r.type) && ['python', 'javascript'].includes(r.language) && Number.isInteger(r.attempt) && r.attempt > 0 && r.answer && typeof r.answer === 'object' && Array.isArray(r.code) && r.code.length <= 60 && r.code.every(s => typeof s === 'string' && s.length < 500) && (r.chapter === undefined || [1, 2, 3, 4, 5].includes(r.chapter)) && (r.learningObjective === undefined || (typeof r.learningObjective === 'string' && r.learningObjective.length <= 100));
}
try {
  const data = JSON.parse(localStorage.getItem(storageKey));
  if (data?.version === 2 && Array.isArray(data.records)) records = data.records.filter(validRecord).filter((r, i, all) => all.findIndex(other => other.id === r.id) === i);
} catch { /* Die App funktioniert ohne vorhandene Daten. */ }
function save() {
  try { localStorage.setItem(storageKey, JSON.stringify({ version: 2, records })); }
  catch { notice('Die Abgaben bleiben für diesen Tab erhalten, konnten aber nicht dauerhaft gespeichert werden. Exportiere die Sitzung vor dem Schließen.', true); }
}
function el(tag, text, className) { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; if (className) node.className = className; return node; }
function paragraph(parent, text, className) { parent.append(el('p', text, className)); }
function button(text, action, className = 'secondary') { const node = el('button', text, className); node.type = 'button'; node.addEventListener('click', action); return node; }
function notice(text = '', error = false) { $('notice').textContent = text; $('notice').className = text ? `notice${error ? ' error' : ''}` : ''; }
const number = value => value.toLocaleString('de-DE');
function refreshModelMonitor() {
  const state = modelMonitor.snapshot(), connection = state.connection;
  const offline = connection.provider !== 'demo' && navigator.onLine === false;
  const phase = offline ? 'offline' : connection.phase;
  const labels = { demo: 'Demo · ohne LLM', unverified: 'LLM · nicht geprüft', checking: 'LLM · Anfrage läuft', connected: 'LLM · verbunden', stale: 'LLM · zuletzt verbunden', error: 'LLM · Fehler', offline: 'LLM · offline' };
  $('model-status').textContent = labels[phase]; $('model-status').dataset.phase = phase;
  $('model-status').title = connection.error || 'Status der letzten Modellanfrage';
  const provider = { demo: 'Demo', lmstudio: 'LM Studio', deepinfra: 'DeepInfra' }[connection.provider];
  $('model-identity').textContent = connection.provider === 'demo' ? 'Lokale Aufgaben' : `${provider} · ${connection.model}`;
  $('model-identity').title = $('model-identity').textContent;
  const checked = connection.checkedAt !== null && connection.checkedAt !== undefined ? new Date(connection.checkedAt).toLocaleTimeString('de-DE') : '';
  $('model-last-check').textContent = phase === 'checking' ? requestLabels[connection.purpose] : [checked ? `Bestätigt ${checked}` : '', task?.source === 'Geprüfte Ersatzaufgabe' ? 'Ersatzaufgabe' : ''].filter(Boolean).join(' · ');
  const noReportedUsage = state.total.requests > 0 && state.total.unknown === state.total.requests;
  $('token-total').textContent = noReportedUsage ? 'unbekannt' : number(state.total.total);
  $('token-split').textContent = noReportedUsage ? 'Anbieter meldet keine Werte' : `Ein ${number(state.total.input)} · Aus ${number(state.total.output)}`;
  $('token-incomplete').textContent = !noReportedUsage && (state.total.unknown || state.unreadable) ? ' + ?' : '';
  $('token-details-open').title = `${number(state.total.requests)} Anfragen · ${number(state.total.unknown)} ohne Verbrauchswert${!state.storageOk ? ' · nur im Tab gespeichert' : ''}`;
  if ($('model-details').open) renderTokenDetails(state);
}
function renderTokenDetails(state = modelMonitor.snapshot()) {
  const summary = $('token-summary'); summary.replaceChildren();
  for (const [title, stats] of [['Dieser Tab', state.session], ['Gespeichert, alle Tabs und Modelle', state.total]]) {
    const unknown = stats.requests > 0 && stats.unknown === stats.requests;
    const row = el('p'); row.append(el('strong', `${title}: ${unknown ? 'Tokens unbekannt' : `${number(stats.total)} Tokens`}`), document.createTextNode(`${unknown ? '' : ` · Ein ${number(stats.input)} · Aus ${number(stats.output)}`} · ${number(stats.requests)} Anfragen${stats.unknown ? ` · Verbrauch offen bei ${number(stats.unknown)} Anfragen` : ''}`)); summary.append(row);
  }
  $('token-storage-note').textContent = `${state.storageOk ? 'Verbrauchssummen bleiben lokal über Neuladen erhalten. Verschiedene Tabs werden zusammengezählt.' : 'Die Werte dieses Tabs können aktuell nicht dauerhaft gespeichert werden. Exportiere die Verbrauchsdaten vor dem Schließen.'}${state.unreadable ? ` ${state.unreadable} gespeicherte Einträge sind unlesbar; die Gesamtsumme ist unvollständig.` : ''} Angezeigt werden gemeldete Tokens; fehlende Daten werden nicht geschätzt.`;
  const models = $('token-models'); models.replaceChildren();
  if (!state.groups.length) paragraph(models, 'Noch keine Modellaufrufe.');
  for (const group of state.groups) {
    const article = el('article', undefined, 'usage-model'); article.append(el('strong', `${group.provider === 'lmstudio' ? 'LM Studio' : 'DeepInfra'} · ${group.model}`));
    paragraph(article, `${group.requests > 0 && group.unknown === group.requests ? 'Verbrauch unbekannt' : `Ein ${number(group.input)} · Aus ${number(group.output)} · Gesamt ${number(group.total)}`} · ${number(group.requests)} Anfragen${group.unknown ? ` · ${group.unknown} Verbrauchswerte offen` : ''}`, 'small');
    if (group.cached || group.reasoning) paragraph(article, `Davon Cache: ${number(group.cached)} Eingabetokens · Reasoning: ${number(group.reasoning)} Ausgabetokens (bereits in den Summen enthalten).`, 'small');
    models.append(article);
  }
  const requests = $('token-requests');
  const openRequests = new Set(Array.from(requests.querySelectorAll('details[open]')).map(node => node.dataset.requestId));
  requests.replaceChildren();
  if (!state.recent.length) paragraph(requests, 'Noch keine Anfragen.');
  for (const row of state.recent) {
    const item = el('details', undefined, 'usage-request');
    item.dataset.requestId = row.id; item.open = openRequests.has(row.id);
    const outcome = { pending: 'Verbrauch ausstehend', success: 'Antwort erhalten', error: 'Fehler' }[row.outcome];
    item.append(el('summary', `${new Date(row.startedAt).toLocaleString('de-DE')} · ${requestLabels[row.purpose]} · ${row.usage ? `${number(row.usage.total)} Tokens` : 'Tokens unbekannt'} · ${outcome}`));
    paragraph(item, `${row.provider === 'lmstudio' ? 'LM Studio' : 'DeepInfra'} · ${row.model}${row.durationMs !== null ? ` · ${(row.durationMs / 1000).toFixed(2)} Sekunden` : ''}`);
    if (row.usage) paragraph(item, `Eingabe: ${number(row.usage.input)} · Ausgabe: ${number(row.usage.output)}${row.usage.cached !== null ? ` · Cache: ${number(row.usage.cached)}` : ''}${row.usage.reasoning !== null ? ` · Reasoning: ${number(row.usage.reasoning)}` : ''}`);
    if (row.error) paragraph(item, row.error);
    requests.append(item);
  }
}
function inline(parent, text) {
  text.split(/(`[^`]+`)/g).forEach(part => parent.append(part.startsWith('`') ? el('code', part.slice(1, -1)) : document.createTextNode(part)));
}
function renderContent(markdown) {
  const container = $('chapter-content'); container.replaceChildren();
  container.scrollTop = 0;
  let code = null, list = null;
  for (const line of markdown.split(/\r?\n/)) {
    if (line.startsWith('```')) {
      if (code) { container.append(code); code = null; } else { code = el('pre', ''); list = null; }
    } else if (code) code.textContent += `${line}\n`;
    else if (line.startsWith('# ')) continue;
    else if (line.startsWith('## ')) { list = null; container.append(el('h2', line.slice(3))); }
    else if (/^\d+\. /.test(line)) { if (!list) { list = el('ol'); container.append(list); } const li = el('li'); inline(li, line.replace(/^\d+\. /, '')); list.append(li); }
    else if (line.trim()) { list = null; const p = el('p'); inline(p, line); container.append(p); }
  }
}
function refreshProgress() {
  const own = records.filter(r => r.session === session);
  $('progress').replaceChildren(...[[own.length, 'Abgaben'], [own.filter(r => r.correct).length, 'richtig'], [own.filter(r => !r.correct).length, 'falsch']].map(([value, label]) => { const node = el('span'); node.append(el('strong', String(value)), document.createTextNode(label)); return node; }));
}
function updateControls() {
  $('task-card').setAttribute('aria-busy', String(busy));
  $('next').disabled = busy || !!pending || !catalog || selectionChanged();
  $('selection-apply').disabled = busy || !!pending || !catalog || !selectionChanged();
  for (const id of ['chapter', 'difficulty', 'learning-objective', 'language']) $(id).disabled = busy || !!pending || !catalog;
  $('settings-open').disabled = busy || !!pending;
  // Die sichtbare Auswahl ist ein Entwurf, bis eine neue Aufgabe bestätigt wurde.
  $('submit').disabled = busy || !!result || !task;
  $('submit').textContent = 'Absenden';
  $('answer-fields').querySelectorAll('input,select,button').forEach(node => { node.disabled = busy || !!result || !!pending || node.dataset.boundary === 'true'; });
  $('code').querySelectorAll('button').forEach(node => node.disabled = busy || !!result || !!pending);
}
function renderCode() {
  $('code').replaceChildren();
  $('code').classList.toggle('two-programs', !!task?.code.some(line => /^(#|\/\/) Programm [AB]$/.test(line)));
  if (!task) return;
  let codeContainer = $('code');
  $('file-name').textContent = task.language === 'python' ? 'lektion.py' : 'lektion.js';
  $('code-note').textContent = result && task.chapter >= 2 ? '✓ ausgeführt · – übersprungen · × Anzahl' : 'Vorhersagen vor dem Absenden';
  task.code.forEach((line, index) => {
    const isProgramHeader = /^(#|\/\/) Programm [AB]$/.test(line);
    if (isProgramHeader) { codeContainer = el('span', undefined, 'code-program'); $('code').append(codeContainer); }
    const row = el('span', undefined, `code-line${task.type === 'code-selection' && index === 1 ? ' code-select-line' : ''}${isProgramHeader ? ' code-program-heading' : ''}`);
    const visits = result?.trace.filter(step => step.line === index + 1) || [];
    const step = visits.find(step => step.executed) || visits[0];
    const executions = visits.filter(step => step.executed).length;
    if (step && step.executed !== undefined && step.executed !== null) {
      row.classList.add(step.executed ? 'code-executed' : 'code-skipped');
      row.title = step.executed ? `Ausgeführt${typeof step.condition === 'boolean' ? ` · Bedingung ${step.condition ? 'wahr' : 'falsch'}` : ''}` : 'Übersprungen';
      if (task.chapter === 3) row.title = `${executions}-mal ausgeführt. Einzelne Werte und Prüfungen stehen im Ablauf.`;
    }
    if (step && step.executed !== undefined) row.append(el('span', executions > 1 ? `${executions}×` : step.executed === null ? ' ' : step.executed ? '✓' : '–', 'execution-marker'));
    row.append(el('span', String(index + 1), 'line-number'));
    if (task.type === 'code-selection' && index === 1) {
      const group = el('span'); group.setAttribute('role', 'group'); group.setAttribute('aria-label', 'Auswählbare Stellen in Zeile 2');
      task.regions.forEach(region => {
        const b = button(region.text, () => {
          draft.region = region.id;
          group.querySelectorAll('button').forEach(node => node.setAttribute('aria-pressed', String(node.dataset.region === region.id)));
        }, 'code-token');
        b.dataset.region = region.id; b.setAttribute('aria-pressed', String(draft.region === region.id)); b.setAttribute('aria-label', region.id === 'target' ? `Linke Seite: ${region.text}` : region.id === 'assignment' ? 'Zuweisungszeichen: =' : `Rechte Seite: ${region.text}`); group.append(b, document.createTextNode(' '));
      });
      if (task.language === 'javascript') group.append(document.createTextNode(';'));
      row.append(group);
    } else row.append(document.createTextNode(line));
    codeContainer.append(row);
  });
}
function choiceGroup(options, multiple = false, name = 'selected', title = '') {
  const pairs = options.every(option => option.pair);
  const fieldset = el('fieldset', undefined, `options${pairs ? ' pair-options' : ''}`);
  if (title) fieldset.append(el('legend', pairs ? `${title} Je Antwort: ${task.pairLabels.join(' / ')}.` : title));
  options.forEach(option => {
    const label = el('label', undefined, `option${option.nodes ? ' diagram-option' : ''}`);
    const input = el('input'); input.type = multiple ? 'checkbox' : 'radio'; input.name = name; input.value = String(option.id);
    if (!multiple) input.required = true;
    input.checked = name === 'value' ? draft.value === option.id : draft.selected?.includes(option.id) || false;
    label.append(input);
    if (option.nodes) {
      const diagram = el('ol', undefined, `diagram${task.diagramLayout === 'observations' ? ' observation-diagram' : ''}`); diagram.setAttribute('aria-label', option.nodes.join(task.diagramLayout === 'observations' ? ' · ' : ' → '));
      option.nodes.forEach(text => { const li = el('li'); li.append(el('span', text)); diagram.append(li); }); label.append(diagram);
    } else if (option.pair) {
      input.setAttribute('aria-label', option.text);
      const values = el('span', option.pair.join(' / '), 'pair-values'); values.setAttribute('aria-hidden', 'true'); label.append(values);
    } else label.append(el('span', option.text));
    fieldset.append(label);
  });
  return fieldset;
}
function renderOrder() {
  const list = $('order-list'); list.replaceChildren();
  draft.order.forEach((id, index) => {
    const step = task.steps.find(s => s.id === id);
    const li = el('li'); li.append(el('span', String(index + 1), 'order-index'), el('span', step.text, 'order-text'));
    const moves = el('span', undefined, 'move-controls');
    for (const [delta, symbol, label] of [[-1, '↑', 'Nach oben'], [1, '↓', 'Nach unten']]) {
      const b = button(symbol, () => {
        const newIndex = index + delta;
        [draft.order[index], draft.order[newIndex]] = [draft.order[newIndex], draft.order[index]];
        renderOrder(); updateControls();
        const moved = list.children[newIndex].querySelectorAll('button');
        (Array.from(moved).find(node => !node.disabled) || moved[0]).focus();
      }, '');
      b.setAttribute('aria-label', `${label}: ${step.text}`); b.dataset.boundary = String(index + delta < 0 || index + delta >= draft.order.length); moves.append(b);
    }
    li.append(moves); list.append(li);
  });
}
function renderAnswer() {
  const container = $('answer-fields'); container.replaceChildren();
  if (!task) return;
  if (['single-choice', 'multiple-choice', 'diagram-choice'].includes(task.type)) {
    container.append(choiceGroup(task.options, task.type === 'multiple-choice', 'selected', task.type === 'multiple-choice' ? 'Mehrere Aussagen können richtig sein.' : 'Wähle genau eine Antwort.'));
  } else if (task.type === 'code-selection') {
    paragraph(container, 'Die Codestelle wählst du direkt in Zeile 2. Welcher bisherige Wert wird dort eingesetzt?', 'small');
    container.append(choiceGroup(task.values.map(value => ({ id: value, text: String(value) })), false, 'value', `Bisheriger Wert von ${task.variableNames?.wert || 'wert'}`));
  } else if (task.type === 'gap-fill') {
    const fields = el('div', undefined, 'gap-fields');
    task.gaps.forEach(gap => {
      const label = el('label', gap.label); const select = el('select'); select.name = gap.id; select.required = true; select.setAttribute('aria-label', gap.label);
      const placeholder = el('option', 'Wählen …'); placeholder.value = ''; select.append(placeholder);
      (gap.choices || task.values.map(value => ({ id: value, text: String(value) }))).forEach(choice => { const option = el('option', choice.text); option.value = String(choice.id); select.append(option); });
      if (draft.gaps?.[gap.id] !== undefined) select.value = String(draft.gaps[gap.id]);
      label.append(select); fields.append(label);
    });
    container.append(fields);
  } else if (task.type === 'ordering') {
    paragraph(container, 'Nutze die Pfeile, um die Schritte zu verschieben. Alle Schaltflächen sind auch per Tastatur erreichbar.', 'small');
    const list = el('ol', undefined, 'order-list'); list.id = 'order-list'; container.append(list); renderOrder();
  }
  updateControls();
}
function readAnswer() {
  const form = new FormData($('answer-form'));
  if (['single-choice', 'multiple-choice', 'diagram-choice'].includes(task.type)) {
    const selected = form.getAll('selected'); if (!selected.length) throw new Error('Bitte wähle mindestens eine Antwort.'); return { selected };
  }
  if (task.type === 'code-selection') {
    if (!draft.region || form.get('value') === null) throw new Error('Bitte wähle eine Codestelle und den bisherigen Wert.');
    return { region: draft.region, value: Number(form.get('value')) };
  }
  if (task.type === 'gap-fill') {
    if (task.gaps.some(g => form.get(g.id) === null || form.get(g.id) === '')) throw new Error('Bitte fülle jede Lücke aus.');
    return { gaps: Object.fromEntries(task.gaps.map(g => [g.id, g.choices ? form.get(g.id) : Number(form.get(g.id))])) };
  }
  return { order: [...draft.order] };
}
function traceTable(trace) {
  const table = el('table', undefined, 'trace-table');
  const head = el('thead'); const header = el('tr');
  const names = [...new Set(trace.flatMap(step => Object.keys(step.variables || { wert: step.value })))];
  const hasPrograms = trace.some(step => step.program);
  const hasDecisions = trace.some(step => step.executed !== undefined);
  const hasLoops = trace.some(step => step.occurrence !== undefined);
  const hasScopes = trace.some(step => step.scope);
  const valueText = value => value === null ? task.language === 'python' ? 'None' : 'undefined' : typeof value === 'object' ? JSON.stringify(value) : String(value);
  [...(hasPrograms ? ['Programm'] : []), ...(hasScopes ? ['Bereich', 'Ereignis', 'Rückgabewert'] : []), 'Zeile', ...(hasLoops ? ['Ausführung', 'Runde'] : []), ...(hasDecisions ? ['Ablauf', 'Bedingung'] : []), ...names, 'Ausgabe'].forEach(text => { const th = el('th', text); th.scope = 'col'; header.append(th); }); head.append(header);
  const body = el('tbody'); trace.forEach(step => {
    const row = el('tr'); const variables = step.variables || { wert: step.value };
    if (step.executed === false) row.className = 'trace-skipped';
    [...(hasPrograms ? [step.program] : []), ...(hasScopes ? [step.scope || 'main', {call:'Aufruf',return:'Rückgabe',import:'Import',break:'Abbruch',continue:'Nächste Runde'}[step.event] || '—', step.event === 'return' ? valueText(step.returnValue) : '—'] : []), step.line, ...(hasLoops ? [step.occurrence || '—', step.iteration || '—'] : []), ...(hasDecisions ? [step.executed === null ? 'Struktur' : step.executed ? 'Ausgeführt' : 'Übersprungen', typeof step.condition === 'boolean' ? (step.condition ? 'wahr' : 'falsch') : '—'] : []), ...names.map(name => Object.hasOwn(variables,name) ? valueText(variables[name]) : '—'), step.output || '—'].forEach(value => row.append(el('td', String(value)))); body.append(row);
  });
  table.append(head, body); return table;
}
const gapText = (gap, value) => gap.choices?.find(choice => choice.id === value)?.text ?? value;
function solutionText() {
  if (result.solution.selected) return task.options.filter(o => result.solution.selected.includes(o.id)).map(o => o.text || o.nodes.join(' → ')).join('\n');
  if (task.type === 'code-selection') return `Rechte Seite: ${task.regions.find(r => r.id === result.solution.region).text}; bisheriger Wert: ${result.solution.value}.`;
  if (task.type === 'gap-fill') return task.gaps.map(g => `${g.label}: ${gapText(g, result.solution.gaps[g.id])}`).join('\n');
  return result.solution.order.map((id, i) => `${i + 1}. ${task.steps.find(s => s.id === id).text}`).join('\n');
}
function renderFeedback() {
  const container = $('feedback'); container.replaceChildren(); container.hidden = !result;
  $('answer-form').hidden = !!result;
  if (!result) return;
  container.className = `feedback${result.correct ? ' good' : ''}`;
  container.append(el('h4', result.feedback));
  if (!result.correct) paragraph(container, result.hint);
  paragraph(container, result.explanation);
  const own = el('details'); own.append(el('summary', 'Deine abgegebene Antwort'));
  const ownText = draft.selected ? task.options.filter(option => draft.selected.includes(option.id)).map(option => option.text || option.nodes.join(' → ')).join('\n') : draft.gaps ? task.gaps.map(gap => `${gap.label}: ${gapText(gap, draft.gaps[gap.id])}`).join('\n') : draft.order ? draft.order.map(id => task.steps.find(step => step.id === id).text).join(' → ') : `${task.regions.find(region => region.id === draft.region).text}; bisheriger Wert: ${draft.value}`;
  own.append(el('p', ownText, 'solution-text')); container.append(own);
  const details = el('details'); details.append(el('summary', 'Ablauf und richtige Antwort ansehen'), traceTable(result.trace)); const text = el('p', solutionText(), 'solution-text'); details.append(text); container.append(details);
  if (!result.correct) {
    const row = el('div', undefined, 'button-row'); row.append(button('Noch einmal versuchen', () => { result = null; renderFeedback(); renderCode(); renderAnswer(); updateControls(); $('task-title').focus(); }));
    paragraph(row, 'Ein weiteres Absenden zählt als neue Abgabe mit Hinweis.', 'small'); container.append(row);
  }
}
async function nextTask(focus = true, requestedSelection = activeSelection) {
  if (busy || pending || !catalog) return;
  busy = true; notice(config.provider === 'demo' ? 'Geprüfte Aufgabe wird vorbereitet …' : requestedSelection.learningObjective === 'branch-choice' ? 'Das Modell entwirft eine Aufgabe. Die App prüft Programm und Lösung …' : 'Das Modell wählt Skill und Aufgabenvariante …'); updateControls();
  try {
    const data = await runtime.next({ session, ...requestedSelection, previousTemplate: task?.templateId, previousTaskId: task?.id, config });
    activeSelection = { ...requestedSelection };
    task = data.task; result = null; pending = null; draft = task.type === 'ordering' ? { order: task.steps.map(s => s.id) } : {};
    $('task-type').textContent = types[task.type]; $('task-difficulty').textContent = `${task.difficulty} · ${levels[task.difficulty - 1]}`; $('task-source').textContent = task.source;
    $('task-kind').textContent = branchKindLabels[task.taskKind] || ''; $('task-kind').hidden = !task.taskKind;
    $('task-title').textContent = task.title; $('task-prompt').textContent = task.prompt;
    $('task-context').textContent = task.context || ''; $('task-context').hidden = !task.context;
    $('chapter-tag').textContent = `Kapitel ${task.chapter}`;
    $('chapter-eyebrow').textContent = `KAPITEL ${String(task.chapter).padStart(2, '0')} · ${chapterLabels[task.chapter].toUpperCase()}`;
    $('chapter-lead').textContent = {3:'Was wiederholt sich? Was verändert sich? Warum endet es?',4:'Wie werden mehrere Werte gelesen, verändert und verarbeitet?',5:'Wann läuft eine Funktion? Was gibt sie zurück, was verändert sie?'}[task.chapter] || (task.chapter === 2 ? 'Welcher Zweig läuft? Was wird übersprungen?' : 'Was wird berechnet? Was verändert sich?');
    document.title = `Code verstehen · Kapitel ${task.chapter}`;
    $('lab-language').textContent = task.language === 'python' ? 'Python' : 'JavaScript';
    $('topic-heading').textContent = objectiveLabel(task.learningObjective);
    $('next-note').textContent = `Nächste Aufgabe: ${objectiveLabel(task.learningObjective)} · ${levels[task.difficulty - 1]}.`;
    $('selection-note').textContent = '';
    renderContent(data.content); renderCode(); renderAnswer(); renderFeedback(); notice(data.warning || '');
    refreshModelMonitor();
    if (focus) $('task-title').focus();
  } catch (error) { notice(`${error.message} Deine bisherige Aufgabe bleibt erhalten.`, true); }
  finally { busy = false; updateControls(); }
}
$('answer-form').addEventListener('submit', async event => {
  event.preventDefault(); if (busy || result || !task) return;
  try { if (!pending) { draft = readAnswer(); pending = { submissionId: newId(), answer: structuredClone(draft) }; } }
  catch (error) { notice(error.message, true); return; }
  busy = true; notice(); updateControls();
  try {
    const data = runtime.submit({ session, taskId: task.id, ...pending });
    if (!validRecord(data.record)) throw new Error('Die Auswertung hat ein ungültiges Ergebnis geliefert.');
    if (!records.some(r => r.id === data.record.id)) { records.push(data.record); save(); }
    result = data.result; pending = null; refreshProgress(); renderFeedback(); renderCode();
  } catch (error) {
    pending = null;
    notice(error.message, true);
  } finally { busy = false; updateControls(); }
});
$('next').addEventListener('click', () => nextTask());
$('selection-apply').addEventListener('click', () => nextTask(true, selectedSettings()));
function selectionEdited() {
  const difficulty = Number($('difficulty').value); $('difficulty-label').textContent = `${difficulty}/3`;
  $('difficulty').setAttribute('aria-label', `Schwierigkeit ${difficulty} von 3: ${levels[difficulty - 1]}. Klicken für ${levels[difficulty % 3]}.`);
  $('difficulty').title = `Schwierigkeit: ${levels[difficulty - 1]} · klicken zum Wechseln`;
  $('selection-note').textContent = selectionChanged() ? `Bestätigen startet sofort eine neue Aufgabe: ${objectiveLabel($('learning-objective').value)} · ${levels[difficulty - 1]} · ${$('language').value === 'python' ? 'Python' : 'JavaScript'}. Eine ungeprüfte Antwort wird verworfen und nicht gezählt.` : 'Die Auswahl entspricht der aktuellen Aufgabe.';
  updateControls();
}
$('difficulty').addEventListener('click', () => { $('difficulty').value = String(Number($('difficulty').value) % 3 + 1); selectionEdited(); });
$('language').addEventListener('change', selectionEdited);
$('learning-objective').addEventListener('change', selectionEdited);
function populateObjectives(preferred) {
  const objectives = catalog.families.filter(f => f.metadata.chapter === Number($('chapter').value)).map(f => f.metadata.learning_objective);
  $('learning-objective').replaceChildren(...objectives.map(objective => { const option = el('option', shortObjectives[objective]); option.value = objective; option.title = objectiveLabel(objective); return option; }));
  if (objectives.includes(preferred)) $('learning-objective').value = preferred;
}
$('chapter').addEventListener('change', () => { populateObjectives(activeSelection.learningObjective); selectionEdited(); });

let draftProvider = 'demo';
function settingsFields() {
  const provider = $('provider').value;
  if (provider !== draftProvider) { $('model').value = provider === 'deepinfra' ? 'deepseek-ai/DeepSeek-V4.1-Flash' : ''; $('api-key').value = ''; }
  draftProvider = provider; $('lm-fields').hidden = provider !== 'lmstudio'; $('model-fields').hidden = provider === 'demo'; $('connect').disabled = provider === 'demo'; $('key-note').textContent = provider === 'deepinfra' ? 'Erforderlich' : 'Optional'; $('settings-status').textContent = '';
}
$('settings-open').addEventListener('click', () => { draftProvider = config.provider; $('provider').value = config.provider; $('base-url').value = config.baseUrl; $('model').value = config.model; $('api-key').value = config.apiKey; settingsFields(); $('settings').showModal(); });
$('settings-close').addEventListener('click', () => $('settings').close());
$('settings').addEventListener('close', () => { $('api-key').value = ''; });
$('provider').addEventListener('change', settingsFields);
function draftConfig() { return { provider: $('provider').value, baseUrl: $('base-url').value.trim(), model: $('model').value.trim(), apiKey: $('api-key').value.trim() }; }
$('settings-form').addEventListener('submit', event => {
  event.preventDefault(); const draft = draftConfig();
  if (draft.provider !== 'demo' && !draft.model) { $('settings-status').textContent = 'Bitte eine Modell-ID eintragen.'; return; }
  if (draft.provider === 'deepinfra' && !draft.apiKey) { $('settings-status').textContent = 'Bitte deinen API-Key eintragen.'; return; }
  config = draft; modelMonitor.setActive(config); $('provider-label').textContent = { demo: 'Demo', lmstudio: 'LM Studio', deepinfra: 'DeepInfra' }[config.provider]; $('settings').close(); notice('Modellkonfiguration übernommen. Der permanente Status zeigt, ob sie bereits erfolgreich geprüft wurde.');
});
$('connect').addEventListener('click', async () => {
  const controls = Array.from($('settings-form').querySelectorAll('button,input,select')); controls.forEach(node => node.disabled = true); $('settings-status').textContent = 'Modell wird angesprochen …';
  try { await modelMonitor.test(draftConfig()); $('settings-status').textContent = 'Verbindung erfolgreich. Das Modell antwortet direkt dem Browser. Beim Übernehmen wird dieser Status dauerhaft angezeigt.'; }
  catch (error) { $('settings-status').textContent = error.message; }
  finally { controls.forEach(node => node.disabled = false); $('connect').disabled = $('provider').value === 'demo'; }
});
function renderOverview() {
  $('summary').replaceChildren(...[[records.length, 'Abgaben'], [records.filter(r => r.correct).length, 'richtig'], [records.filter(r => !r.correct).length, 'falsch']].map(([value, label]) => { const item = el('div'); item.append(el('strong', String(value)), el('span', label)); return item; }));
  $('level-summary').className = 'level-summary'; $('level-summary').replaceChildren();
  const objectives = [...new Set([...(catalog?.families || []).map(f => f.metadata.learning_objective), ...records.map(r => r.learningObjective)])];
  objectives.forEach(objective => {
    const chapter = catalog?.families.find(f => f.metadata.learning_objective === objective)?.metadata.chapter || 1;
    $('level-summary').append(el('h3', `Kapitel ${chapter} · ${objectiveLabel(objective)}`));
    levels.forEach((level, index) => { const matching = records.filter(r => r.difficulty === index + 1 && r.learningObjective === objective); const row = el('div', undefined, 'level-row'); row.append(el('span', `${index + 1} · ${level}`), el('span', `${matching.filter(r => r.correct).length} richtig · ${matching.filter(r => !r.correct).length} falsch`)); $('level-summary').append(row); });
  });
  $('records').replaceChildren();
  if (!records.length) paragraph($('records'), 'Noch keine Abgaben.');
  for (const record of [...records].reverse().slice(0, 100)) {
    const article = el('article', undefined, 'record'); article.append(el('strong', `${record.title} · ${record.correct ? 'richtig' : 'falsch'}`));
    paragraph(article, `${new Date(record.date).toLocaleString('de-DE')} · ${record.difficulty} ${levels[record.difficulty - 1]} · ${record.language} · Versuch ${record.attempt}${record.attempt > 1 ? ' (mit Hinweis)' : ''}`);
    paragraph(article, `${`Kapitel ${record.chapter || catalog?.families.find(f => f.metadata.learning_objective === record.learningObjective)?.metadata.chapter || 1}`} · ${objectiveLabel(record.learningObjective)} · ${types[record.type]} · Sitzung ${record.session.slice(0, 8)}`);
    const details = el('details'); details.append(el('summary', 'Aufgabe und Antwort'));
    if (record.prompt) paragraph(details, record.prompt);
    const choices = record.options?.map(o => `${o.id}: ${o.text || o.nodes.join(' → ')}`).join('\n') || record.steps?.map(s => `${s.id}: ${s.text}`).join('\n') || record.gaps?.filter(gap => gap.choices).map(gap => `${gap.label}: ${gap.choices.map(choice => choice.text).join(', ')}`).join('\n') || (record.values ? `Werte zur Auswahl: ${record.values.join(', ')}` : '');
    details.append(el('pre', `${record.code.join('\n')}\n\n${choices}\n\nAntwort: ${JSON.stringify(record.answer)}\nLösung: ${JSON.stringify(record.solution)}`)); article.append(details); $('records').append(article);
  }
  try {
    const old = JSON.parse(localStorage.getItem('code-verstehen-v1'));
    $('legacy-note').textContent = old?.records?.length ? `${old.records.length} Antworten des früheren Prototyps bleiben im bisherigen lokalen Speicher erhalten. Sie werden nicht in die neue Zählung übernommen.` : '';
  } catch { $('legacy-note').textContent = ''; }
}
$('teacher-open').addEventListener('click', () => { renderOverview(); $('teacher').showModal(); });
$('teacher-close').addEventListener('click', () => $('teacher').close());
$('token-details-open').addEventListener('click', () => { renderTokenDetails(); $('model-details').showModal(); });
$('token-details-close').addEventListener('click', () => $('model-details').close());
$('token-export').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(modelMonitor.export(), null, 2)], { type: 'application/json' }));
  const link = el('a'); link.href = url; link.download = `code-verstehen-tokenverbrauch-${session.slice(0, 8)}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
window.addEventListener('storage', event => { if (event.key?.startsWith(usageStoragePrefix)) refreshModelMonitor(); });
window.addEventListener('online', refreshModelMonitor); window.addEventListener('offline', refreshModelMonitor);
setInterval(refreshModelMonitor, 30000);
new ResizeObserver(() => document.documentElement.style.setProperty('--header-height', `${document.querySelector('.topbar').getBoundingClientRect().height}px`)).observe(document.querySelector('.topbar'));
$('export').addEventListener('click', () => {
  const own = records.filter(r => r.session === session);
  const data = { version: 2, exported: new Date().toISOString(), records: own };
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
  const link = el('a'); link.href = url; link.download = `code-verstehen-${session.slice(0, 8)}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  $('teacher-status').textContent = `${own.length} Abgaben der aktuellen Sitzung exportiert.`;
});
$('import').addEventListener('change', async event => {
  try {
    const incoming = [];
    for (const file of event.target.files) {
      if (file.size > 2000000) throw new Error('Eine Datei ist zu groß (maximal 2 MB).');
      const data = JSON.parse(await file.text());
      if (data.version !== 2 || !Array.isArray(data.records) || data.records.length > 2000 || !data.records.every(validRecord)) throw new Error('Ungültiger Export. Erwartet wird das neue Sitzungsformat Version 2.');
      incoming.push(...data.records);
    }
    const known = new Set(records.map(r => r.id)); let count = 0;
    for (const record of incoming) if (!known.has(record.id)) { records.push(record); known.add(record.id); count++; }
    save(); renderOverview(); $('teacher-status').textContent = `${count} neue Abgaben importiert.`;
  } catch (error) { $('teacher-status').textContent = error.message; }
  event.target.value = ''; refreshProgress();
});
async function init() {
  modelMonitor.setActive(config);
  refreshProgress();
  try {
    catalog = await loadCatalog(); runtime = createRuntime(catalog, { modelCompletion: (config, messages, options) => modelMonitor.request(config, messages, options) });
    const chapters = [...new Set(catalog.families.map(f => f.metadata.chapter))];
    $('chapter').replaceChildren(...chapters.map(chapter => { const option = el('option', `${chapter} · ${chapterLabels[chapter]}`); option.value = String(chapter); return option; }));
    $('chapter').value = String(activeSelection.chapter); populateObjectives(activeSelection.learningObjective);
    $('scope-note').textContent = `${chapters.length} Kapitel · ${catalog.families.length} Themen · ${catalog.templateCount} Referenzvorlagen + if/else-Werkstatt`;
    $('learning-objective').disabled = false;
    renderContent(catalog.content); busy = false; await nextTask(false);
  } catch (error) {
    busy = false; notice(`Der Aufgabenbestand konnte nicht geladen werden: ${error.message}`, true);
    $('chapter-content').replaceChildren(el('p', 'Bitte lade den vollständigen App-Ordner auf den Webserver oder öffne index.html mit VS Code Live Server.'));
    $('task-type').textContent = 'Dateien prüfen'; $('task-title').textContent = 'Der Aufgabenbestand ist nicht verfügbar';
    updateControls();
  }
}
init();
