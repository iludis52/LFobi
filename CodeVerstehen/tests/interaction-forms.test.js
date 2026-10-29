import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { loadCatalog, createRuntime } from '../runtime.js';
import { buildTask, evaluate, publicTask } from '../task-engine.js';
import { parameterVariants } from '../chapter-one.js';
import { applyInteractionForm, mixedForms, createFormSchedule, describeStateObservation } from '../interaction-forms.js';
import { fallbackBranchDraft, buildBranchTask, branchKinds } from '../branch-workshop.js';
import { validateEqualWords } from '../skills/zuweisung-reihenfolge/tools/validate.js';

const catalog = await loadCatalog(async url => new Response(await readFile(new URL(url), 'utf8')));

test('Learner wording omits internal scopes and single visits, retaining necessary loop and call distinctions', () => {
  const straight = [{ line: 4, scope: 'main', occurrence: 1, executed: true }];
  assert.equal(describeStateObservation(straight, straight[0], 'ergebnis_a', 3), 'Nach Zeile 4 hat ergebnis_a den Wert 3.');
  const loop = [1, 2].map(occurrence => ({ line: 4, scope: 'main', occurrence, executed: true }));
  assert.equal(describeStateObservation(loop, loop[1], 'summe', 5), 'Nach der 2. Ausführung von Zeile 4 hat summe den Wert 5.');
  const calls = [straight[0], { line: 2, scope: 'berechne#4', occurrence: 1, executed: true }, { line: 2, scope: 'berechne#8', occurrence: 1, executed: true }];
  assert.equal(describeStateObservation(calls, calls[0], 'wert', 3), 'Im Hauptprogramm: Nach Zeile 4 hat wert den Wert 3.');
  assert.equal(describeStateObservation(calls, calls[2], 'wert', 3), 'Beim 2. Aufruf von berechne: Nach Zeile 2 hat wert den Wert 3.');
  assert.equal(describeStateObservation(calls.slice(0, 2), calls[1], 'wert', 3), 'In Funktion berechne: Nach Zeile 2 hat wert den Wert 3.');
});

function verify(task) {
  assert.equal(evaluate(task, task.solution).correct, true);
  const view = publicTask(task);
  for (const key of ['solution', 'trace', 'explanation', 'gapHints']) assert.equal(view[key], undefined);
  if (task.options) {
    validateEqualWords(task.options);
    assert.ok(task.options.some(option => !task.solution.selected.includes(option.id)));
    for (const option of task.options.filter(option => !task.solution.selected.includes(option.id))) {
      assert.equal(evaluate(task, { selected: [option.id] }).correct, false);
    }
    assert.ok(view.options.every(option => !option.hint));
  }
  if (task.type === 'ordering') {
    assert.equal(new Set(task.steps.map(step => step.text)).size, task.steps.length);
    assert.notDeepEqual(task.steps.map(step => step.id), task.solution.order);
    assert.equal(evaluate(task, { order: [...task.solution.order].reverse() }).correct, false);
  }
  if (task.type === 'gap-fill') {
    for (const gap of task.gaps) {
      const wrong = gap.choices?.find(choice => choice.id !== task.solution.gaps[gap.id])?.id ?? task.values.find(value => value !== task.solution.gaps[gap.id]);
      assert.equal(evaluate(task, { gaps: { ...task.solution.gaps, [gap.id]: wrong } }).correct, false);
    }
  }
}

test('Every reference parameter variant supports five graded forms in both languages without solution leaks', () => {
  for (const family of catalog.families) for (const template of family.templates) {
    for (const parameters of parameterVariants(template)) for (const language of ['python', 'javascript']) {
      const original = buildTask({ template_id: template.id, parameters }, [template], language, () => 0);
      for (const form of mixedForms) {
        try { verify(applyInteractionForm(structuredClone(original), form, () => 0)); }
        catch (error) { throw new Error(`${template.id} ${JSON.stringify(parameters)} ${language} ${form}: ${error.message}`, { cause: error }); }
      }
    }
  }
});

test('All six workshop question kinds support all five forms at every level', () => {
  for (const kind of branchKinds) for (const difficulty of [1, 2, 3]) for (const language of ['python', 'javascript']) {
    for (let seed = 0; seed < 3; seed++) for (let variant = 0; variant < 2; variant++) {
      const original = buildBranchTask(fallbackBranchDraft(kind, difficulty, seed, variant), difficulty, language, kind, () => 0);
      for (const form of mixedForms) {
        try { verify(applyInteractionForm(structuredClone(original), form, () => 0)); }
        catch (error) { throw new Error(`${kind}/${difficulty}/${language}/${form}: ${error.message}`, { cause: error }); }
      }
    }
  }
});

test('Runtime: broad type coverage and no consecutive repeats across every topic, level, language and provider failure', async () => {
  for (const provider of ['demo', 'lmstudio']) {
    const runtime = createRuntime(catalog, { random: () => 0, modelCompletion: async () => { throw Error('offline'); } });
    const session = randomUUID(); let previous;
    for (const family of catalog.families) for (const difficulty of [1, 2, 3]) for (const language of ['python', 'javascript']) {
      const types = [];
      for (let i = 0; i < 18; i++) {
        const { task } = await runtime.next({ session, chapter: family.metadata.chapter,
          learningObjective: family.metadata.learning_objective, difficulty, language,
          previousTaskId: previous?.id, previousTemplate: previous?.templateId, config: { provider } });
        assert.notEqual(task.type, previous?.type);
        assert.equal(task.difficulty, difficulty); assert.equal(task.language, language);
        types.push(task.type); previous = task;
      }
      assert.ok(new Set(types.slice(0, 6)).size >= 5, `${family.metadata.name}/${difficulty}/${language}`);
      assert.ok(new Set(types).size >= 5);
    }
  }
});

test('Type scheduling survives topic switches without adjacent duplicates or starving a retained type', () => {
  const next = createFormSchedule(() => 0); let last;
  const history = new Map();
  for (let i = 0; i < 100; i++) {
    const key = String(i % 3), type = next('session', key);
    assert.notEqual(type, last); last = type;
    history.set(key, [...(history.get(key) || []), type]);
  }
  for (const types of history.values()) assert.equal(new Set(types).size, 5);
});

test('A successful model repeating paired-choice requests cannot override broad type rotation', async () => {
  let calls = 0;
  const runtime = createRuntime(catalog, { random: () => 0, modelCompletion: async (_config, messages) => {
    calls++;
    const request = JSON.parse(messages[1].content);
    if (request.catalog) return JSON.stringify({ skill_id: request.catalog[0].name });
    if (request.previous_variant) assert.deepEqual(Object.keys(request.previous_variant.variation).sort(), ['answer_form', 'names']);
    const template = request.templates[0];
    return JSON.stringify({ template_id: template.id,
      parameters: Object.fromEntries(Object.entries(template.parameter_ranges).map(([key, [min]]) => [key, min])),
      variation: { names: 'standard', answer_form: 'single-choice' } });
  } });
  const session = randomUUID(); let previous;
  for (const family of catalog.families.filter(f => f.metadata.learning_objective !== 'assignment-order' && !f.metadata.generation_contract)) {
    const forms = new Set();
    for (let i = 0; i < 10; i++) {
      const { task, warning } = await runtime.next({ session, chapter: family.metadata.chapter,
        learningObjective: family.metadata.learning_objective, difficulty: 2, language: 'javascript',
        previousTaskId: previous?.id, previousTemplate: previous?.templateId, config: { provider: 'lmstudio' } });
      assert.equal(warning, ''); assert.equal(task.source, 'Modellauswahl · Vorlage geprüft');
      assert.notEqual(task.type, previous?.type); forms.add(task.type); previous = task;
    }
    assert.equal(forms.size, 5);
  }
  assert.equal(calls, catalog.families.filter(f => f.metadata.learning_objective !== 'assignment-order' && !f.metadata.generation_contract).length * 10);
});
