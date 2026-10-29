import { parseSkill, buildTask, publicTask, evaluate, typeLabels } from './task-engine.js';
import { completion, parseObject, newId } from './model-client.js';
import { parameterRanges, parameterVariants, sampleParameters } from './chapter-one.js';
import { variationChoices } from './task-variation.js';
import { createBranchWorkshop } from './branch-workshop.js';
import { createFormSchedule, applyInteractionForm, mixedForms } from './interaction-forms.js';

async function resource(url, fetchImpl, json = false) {
  let response;
  try { response = await fetchImpl(url, { cache: 'no-cache', credentials: 'same-origin' }); }
  catch { throw new Error('App-Dateien konnten nicht geladen werden. Öffne die App über einen Webserver, nicht über file://.'); }
  if (!response.ok) throw new Error(`App-Datei fehlt: ${new URL(url).pathname.split('/').pop()} (HTTP ${response.status}).`);
  try { return json ? await response.json() : await response.text(); }
  catch { throw new Error('Eine App-Datei enthält kein gültiges Format. Lade den vollständigen App-Ordner hoch.'); }
}

export async function loadFamily(baseUrl = new URL('./skills/zuweisung-reihenfolge/', import.meta.url), fetchImpl = globalThis.fetch) {
  const skill = parseSkill(await resource(new URL('SKILL.md', baseUrl), fetchImpl));
  if (skill.metadata.generation_contract !== undefined && (skill.metadata.generation_contract !== 'branch-workshop-v1' || skill.metadata.chapter !== 2 || skill.metadata.learning_objective !== 'branch-choice')) throw new Error('Nicht freigegebener Generierungsvertrag.');
  if (skill.metadata.generation_contract && !['gap-fill', 'single-choice', 'multiple-choice'].every(type => skill.metadata.interaction_types?.includes(type))) throw new Error('Interaktionsformen der Aufgabenwerkstatt sind nicht freigegeben.');
  if (skill.metadata.content !== 'content.de.md' || skill.metadata.templates !== 'templates.json') throw new Error('Nicht unterstützte Skill-Ressource.');
  const document = await resource(new URL('templates.json', baseUrl), fetchImpl, true);
  if (document.version !== 1 || !Array.isArray(document.templates) || !document.templates.length) throw new Error('Ungültiger Vorlagenbestand.');
  const templates = document.templates;
  if (new Set(templates.map(t => t.id)).size !== templates.length) throw new Error('Vorlagen-IDs müssen eindeutig sein.');
  for (const template of templates) {
    if (!skill.metadata.difficulty_levels.includes(template.difficulty) || !skill.metadata.interaction_types.includes(template.type) || (template.chapter ?? 1) !== skill.metadata.chapter) throw new Error('Vorlage außerhalb der Skill-Freigabe.');
    const objectiveForMode = { assignment: 'assignment-order', transfer: 'assignment-order', 'current-state': 'current-state', 'statement-order': 'statement-order', 'value-copy': 'value-copy', 'condition-check': 'condition-check', 'branch-choice': 'branch-choice', 'decision-chain': 'decision-chain', 'branch-change': 'branch-change', 'counted-loop': 'counted-loop', 'while-loop': 'while-loop', 'loop-accumulator': 'loop-accumulator', 'loop-change': 'loop-change' };
    const objective = objectiveForMode[template.mode] || (['loop-break','loop-continue','list-access','list-change','list-iteration','map-record','text-processing','collection-transform','function-call','function-return','function-scope','function-effect','function-compose','function-module'].includes(template.mode) ? template.mode : null);
    if (objective !== skill.metadata.learning_objective) throw new Error('Vorlage gehört nicht zum Lernziel des Skills.');
    for (const parameters of parameterVariants(template)) for (const language of ['python', 'javascript']) buildTask({ template_id: template.id, parameters }, [template], language);
  }
  return { ...skill, templates, content: await resource(new URL('content.de.md', baseUrl), fetchImpl) };
}

export async function loadCatalog(fetchImpl = globalThis.fetch, baseUrl = new URL('./skills/', import.meta.url)) {
  const registry = await resource(new URL('catalog.json', baseUrl), fetchImpl, true);
  if (registry.version !== 1 || !Array.isArray(registry.skills) || !registry.skills.length || registry.skills.some(name => typeof name !== 'string' || !/^[a-z][a-z0-9-]*$/.test(name)) || new Set(registry.skills).size !== registry.skills.length) throw new Error('Ungültiger Skill-Katalog.');
  const families = await Promise.all(registry.skills.map(name => loadFamily(new URL(`${name}/`, baseUrl), fetchImpl)));
  if (new Set(families.map(f => f.metadata.name)).size !== families.length || new Set(families.flatMap(f => f.templates.map(t => t.id))).size !== families.reduce((count, f) => count + f.templates.length, 0)) throw new Error('Doppelte Skill- oder Vorlagen-Kennung.');
  return { families, skill: families[0].metadata, content: families[0].content, types: typeLabels, templateCount: families.reduce((count, f) => count + f.templates.length, 0) };
}

export function createRuntime(catalog, { modelCompletion = (config, messages, options) => completion(config, messages, globalThis.fetch, options), random = Math.random, makeId = newId } = {}) {
  const tasks = new Map();
  const workshop = createBranchWorkshop({ modelCompletion, random });
  const nextForm = createFormSchedule(random);
  return {
    async next({ session, difficulty, language, previousTemplate, previousTaskId, config = { provider: 'demo' }, chapter = 1, learningObjective = 'assignment-order' }) {
      if (![1, 2, 3, 4, 5].includes(chapter) || ![1, 2, 3].includes(difficulty) || !['python', 'javascript'].includes(language)) throw new Error('Ungültiges Kapitel, Schwierigkeit oder Sprache.');
      if (!['demo', 'lmstudio', 'deepinfra'].includes(config.provider)) throw new Error('Unbekannter Anbieter.');
      const allowedFamilies = catalog.families.filter(f => f.metadata.chapter === chapter && f.metadata.learning_objective === learningObjective && f.templates.some(t => t.difficulty === difficulty));
      if (!allowedFamilies.length) throw new Error('Für diese Schwierigkeit gibt es noch keine freigegebene Aufgabe. Wähle eine andere Stufe.');
      let family = allowedFamilies[0];
      const formKey = JSON.stringify([chapter, learningObjective, difficulty, language]);
      const forms = family.templates.some(t => t.difficulty === difficulty && t.type === 'code-selection') ? [...mixedForms, 'code-selection'] : mixedForms;
      if (family.metadata.generation_contract === 'branch-workshop-v1') {
        const data = await workshop.next({ session, difficulty, language, config, instruction: family.body });
        const task = data.task;
        applyInteractionForm(task, nextForm(session, formKey, forms), random);
        Object.assign(task, { id: makeId(), skillId: family.metadata.name, skillVersion: family.metadata.version, learningObjective: family.metadata.learning_objective });
        while (tasks.size >= 100) tasks.delete(tasks.keys().next().value);
        tasks.set(task.id, { task, session, submissions: new Map() });
        return { task: publicTask(task), warning: data.warning, content: family.content };
      }
      const eligible = f => {
        const templates = f.templates.filter(t => t.difficulty === difficulty);
        return templates.length > 1 ? templates.filter(t => t.id !== previousTemplate) : templates;
      };
      const available = family.templates.filter(t => t.difficulty === difficulty);
      const previousIndex = available.findIndex(t => t.id === previousTemplate);
      const fallback = available[(previousIndex + 1) % available.length];
      let selection = { template_id: fallback.id, parameters: sampleParameters(fallback, random) };
      let source = 'Geprüfte Vorlage', warning = '';
      const previousEntry = tasks.get(previousTaskId);
      const previousTask = previousEntry?.session === session ? previousEntry.task : null;
      if (config.provider !== 'demo') {
        try {
          const chosen = parseObject(await modelCompletion(config, [
            { role: 'system', content: 'Wähle ausschließlich einen Skill aus dem Katalog. Nur JSON: {"skill_id":"name"}. Keine weiteren Felder.' },
            { role: 'user', content: JSON.stringify({ chapter, difficulty, language, learning_objective: learningObjective, catalog: allowedFamilies.map(f => ({ name: f.metadata.name, description: f.metadata.description })) }) }
          ], { purpose: 'skill-selection' }));
          if (!chosen || Object.keys(chosen).length !== 1 || !allowedFamilies.some(f => f.metadata.name === chosen.skill_id)) throw new Error('Skill-Auswahl liegt außerhalb des zugelassenen Katalogs.');
          const proposedFamily = allowedFamilies.find(f => f.metadata.name === chosen.skill_id);
          const proposed = parseObject(await modelCompletion(config, [
            { role: 'system', content: `${proposedFamily.body}\n\nZusätzlicher freigegebener Variationsvertrag: Du darfst im Auswahlobjekt das Feld variation ergänzen: {"names":"standard|punkte|vorrat|nummer","answer_form":"original|single-choice"}. Verwende nur die variation_choices der gewählten Vorlage. Wähle möglichst andere Zahlen, Namen oder Antwortdarstellung als previous_variant. Keine freien Texte, keine weiteren Felder und kein Code.` },
            { role: 'user', content: JSON.stringify({ chapter, difficulty, language, previous_template: previousTemplate, previous_variant: previousTask && previousTask.learningObjective === learningObjective ? { template_id: previousTask.templateId, parameters: previousTask.parameters, variation: { names: previousTask.variation?.names || 'standard', answer_form: previousTask.variation?.answer_form || 'original' } } : undefined, templates: eligible(proposedFamily).map(t => ({ id: t.id, type: t.type, title: t.title, parameter_ranges: parameterRanges(t), variation_choices: variationChoices(t) })) }) }
          ], { purpose: 'task-selection' }));
          buildTask(proposed, eligible(proposedFamily), language);
          selection = proposed; family = proposedFamily; source = 'Modellauswahl · Vorlage geprüft';
        } catch (error) {
          warning = `Modellauswahl nicht verfügbar: ${error.message} Eine geprüfte Ersatzaufgabe wird verwendet.`;
          source = 'Geprüfte Ersatzaufgabe';
        }
      }
      // Auch ein Modell, das wieder dieselben Zahlen wählt, liefert bei gleicher
      // Vorlage keine unveränderte direkte Wiederholung der vorherigen Aufgabe.
      if (previousTask && previousTask.templateId === selection.template_id && previousTask.language === language && Object.keys(selection.parameters).every(key => selection.parameters[key] === previousTask.parameters[key])) {
        const template = family.templates.find(t => t.id === selection.template_id);
        const [key, [min, max]] = Object.entries(parameterRanges(template))[0];
        selection = { ...selection, parameters: { ...selection.parameters, [key]: min + (selection.parameters[key] - min + 1) % (max - min + 1) } };
      }
      if (selection.variation === undefined) {
        const choices = variationChoices(family.templates.find(t => t.id === selection.template_id));
        const choose = items => items[Math.floor(random() * items.length)];
        selection = { ...selection, variation: { names: choose(choices.names), answer_form: choose(choices.answer_form) } };
      }
      const form = nextForm(session, formKey, forms);
      // Keep structured observations until the final response form is known;
      // otherwise a paired choice would be wrapped in another choice/diagram.
      if (form !== 'single-choice') selection.variation.answer_form = 'original';
      const task = buildTask(selection, family.templates.filter(t => t.difficulty === difficulty), language, random);
      if (form === 'code-selection') {
        // All assignment stages share the same assignment contract; this native
        // template supplies the selectable expression without changing the level.
        const reference = family.templates.find(t => t.type === 'code-selection');
        const clickable = buildTask({ template_id: reference.id, parameters: selection.parameters, variation: { names: selection.variation.names, answer_form: 'original' } }, [reference], language, random);
        Object.assign(task, clickable, { difficulty });
        task.variation.interaction_form = form;
      } else applyInteractionForm(task, form, random);
      Object.assign(task, { id: makeId(), chapter: family.metadata.chapter, skillId: family.metadata.name, skillVersion: family.metadata.version, learningObjective: family.metadata.learning_objective, source });
      while (tasks.size >= 100) tasks.delete(tasks.keys().next().value);
      tasks.set(task.id, { task, session, submissions: new Map() });
      return { task: publicTask(task), warning, content: family.content };
    },
    submit({ session, taskId, submissionId, answer }) {
      const entry = tasks.get(taskId);
      if (!entry || entry.session !== session) throw new Error('Diese Aufgabe ist nicht mehr verfügbar. Lade eine neue Aufgabe.');
      if (!/^[0-9a-f-]{36}$/i.test(submissionId || '')) throw new Error('Ungültige Abgabe-ID.');
      if (entry.submissions.has(submissionId)) return structuredClone(entry.submissions.get(submissionId));
      const task = entry.task;
      const result = evaluate(task, answer);
      const record = {
        id: submissionId, session, date: new Date().toISOString(), taskId,
        templateId: task.templateId, skillId: task.skillId, skillVersion: task.skillVersion,
        chapter: task.chapter, learningObjective: task.learningObjective, difficulty: task.difficulty, type: task.type,
        taskKind: task.taskKind || null, generation: task.generation || null,
        title: task.title, prompt: task.prompt, criteria: task.criteria, language: task.language, code: task.code, parameters: task.parameters, variation: task.variation || null,
        options: task.options || null, regions: task.regions || null, steps: task.steps || null, gaps: task.gaps || null, values: task.values || null,
        answer: structuredClone(answer), solution: result.solution, correct: result.correct, source: task.source,
        attempt: entry.submissions.size + 1, supported: entry.submissions.size > 0, missing: result.missing, extra: result.extra
      };
      const response = structuredClone({ result, record });
      entry.submissions.set(submissionId, response);
      return structuredClone(response);
    }
  };
}
