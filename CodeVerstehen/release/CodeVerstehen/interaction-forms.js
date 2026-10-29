import { validateEqualWords } from './skills/zuweisung-reihenfolge/tools/validate.js';

export const mixedForms = ['gap-fill', 'single-choice', 'multiple-choice', 'diagram-choice', 'ordering'];
const shuffle = (items, random) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

// A shuffled bag guarantees breadth as well as a change from the last displayed
// task. State belongs to the runtime/session, not to an LLM or a template ID.
export function createFormSchedule(random = Math.random) {
  const sessions = new Map();
  return (session, key, forms = mixedForms) => {
    if (!sessions.has(session)) {
      while (sessions.size >= 30) sessions.delete(sessions.keys().next().value);
      sessions.set(session, { last: null, bags: new Map() });
    }
    const state = sessions.get(session);
    let bag = state.bags.get(key) || [];
    if (!bag.length) bag = shuffle(forms, random);
    let index = bag.findIndex(form => form !== state.last);
    // A singleton remainder matching the previous type can arise after a switch
    // of topic. Insert another form; retain the remainder for the next request.
    if (index < 0) {
      const form = forms.find(form => form !== state.last);
      state.last = form; state.bags.set(key, bag); return form;
    }
    const [form] = bag.splice(index, 1);
    state.last = form; state.bags.set(key, bag);
    return form;
  };
}

function observations(task) {
  if (task.gaps) return task.gaps.map(gap => ({ ...gap,
    answer: task.solution.gaps[gap.id],
    choices: gap.choices || task.values.map(value => ({ id: value, text: String(value) })),
    hint: task.gapHints?.[gap.id] || task.explanation
  }));
  const legacy = ['assignment', 'transfer'].includes(task.mode);
  if (task.type === 'single-choice' && !legacy) return [{ id: 'answer', label: task.prompt,
    choices: task.options, answer: task.solution.selected[0], hint: task.explanation }];
  if (task.type === 'multiple-choice' && !legacy) return task.options.slice(0, 2).map(option => ({ id: option.id,
    label: option.text, answer: task.solution.selected.includes(option.id) ? 'yes' : 'no',
    choices: [{ id: 'yes', text: 'Trifft zu' }, { id: 'no', text: 'Trifft nicht' }], hint: option.hint || task.explanation
  }));
  // Legacy assignment templates have different native response shapes. Their
  // verified trace supplies the same assignment/output observations for mixing.
  const final = task.trace.at(-1), value = final.value ?? final.variables?.wert;
  const output = task.trace.filter(step => step.output !== '').at(-1)?.output;
  const values = [...new Set([value, Number(output), task.parameters.start, value + 1, value + 2])];
  return [{ id: 'state', label: 'Gespeicherter Wert am Ende', answer: value },
    { id: 'output', label: 'Letzte Ausgabe', answer: Number(output) }]
    .map(gap => ({ ...gap, choices: values.map(value => ({ id: value, text: String(value) })), hint: task.explanation }));
}

function executionSteps(task) {
  const seen = new Set(), events = [];
  for (const step of task.trace) {
    if (step.executed === false || step.executed === null) continue;
    const prefix = step.program ? `${step.program}: ` : step.scope && step.scope !== 'main' ? `${step.scope}: ` : '';
    let text;
    if (typeof step.condition === 'boolean') text = `${prefix}Bedingung ${task.code[step.line - 1].trim()} → ${step.condition ? 'wahr' : 'falsch'}`;
    else if (step.output !== '') text = `${prefix}Ausgabe ${step.output}`;
    else {
      const source = task.code[step.line - 1].trim();
      const name = source.match(/^(?:let )?([a-z][a-z0-9_]*)\s*=(?!=)/i)?.[1];
      if (!name) continue;
      const value = step.variables?.[name] ?? step.value;
      text = `${prefix}${name} erhält ${value && typeof value === 'object' ? JSON.stringify(value) : value}`;
    }
    if (!seen.has(text)) { seen.add(text); events.push({ id: `event-${step.scope || ''}-${step.line}${step.occurrence ? `-${step.occurrence}` : ''}`, text }); }
  }
  // At most four cards, spanning the program rather than just its first lines.
  return events.length <= 4 ? events : Array.from({ length: 4 }, (_, i) => events[Math.round(i * (events.length - 1) / 3)]);
}

export function applyInteractionForm(task, type, random = Math.random) {
  const originalType = task.type;
  if (originalType === type) {
    task.variation = { ...task.variation, interaction_form: type };
    return task;
  }
  const observed = observations(task);
  const originalPrompt = task.prompt;
  for (const key of ['gaps', 'gapHints', 'options', 'steps', 'regions', 'values', 'pairLabels']) delete task[key];
  task.type = type;
  task.title = { 'gap-fill': 'Beobachtungen ergänzen', 'single-choice': 'Den Ablauf vorhersagen', 'multiple-choice': 'Aussagen prüfen', 'diagram-choice': 'Beobachtungen verbinden', ordering: 'Den Ablauf ordnen' }[type];
  task.variation = { ...task.variation, interaction_form: type };
  if (type === 'ordering') {
    const steps = executionSteps(task);
    if (steps.length < 2) throw new Error('Zu wenige unterscheidbare Ablaufereignisse.');
    task.prompt = 'Ordne die Ereignisse nach ihrem ersten Auftreten im Ablauf. Bei zwei Programmen betrachte zuerst A, dann B. Nicht jedes Ereignis muss als Karte vorkommen.';
    task.steps = shuffle(steps, random);
    if (task.steps.every((step, i) => step.id === steps[i].id)) task.steps.push(task.steps.shift());
    task.solution = { order: steps.map(step => step.id) };
    task.criteria = [...task.criteria, 'execution-order'];
    return task;
  }
  if (type === 'gap-fill') {
    task.prompt = `Beantworte die Beobachtungen zum Programm. ${originalType === 'single-choice' ? originalPrompt : 'Prüfe jede Aussage einzeln.'}`;
    task.gaps = observed.map(({ answer, hint, ...gap }) => ({ ...gap, choices: shuffle(gap.choices, random) }));
    task.gapHints = Object.fromEntries(observed.map(gap => [gap.id, gap.hint]));
    task.solution = { gaps: Object.fromEntries(observed.map(gap => [gap.id, gap.answer])) };
    return task;
  }
  // Statements describe actual snapshots, avoiding nested true/false questions.
  if (type === 'multiple-choice') {
    const snapshots = shuffle(task.trace.filter(step => step.executed !== false && step.executed !== null)
      .flatMap(step => Object.entries(step.variables || { [task.variableNames?.wert || 'wert']: step.value })
        .filter(([,value]) => typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string' && !/\s/.test(value))
        .map(([name, value]) => ({ line: step.line, occurrence: step.occurrence, scope:step.scope, name, value }))), random);
    if (!snapshots.length) throw new Error('Keine eindeutigen Zustandsbeobachtungen für Mehrfachauswahl.');
    const count = Math.min(1 + Math.floor(random() * 3), snapshots.length);
    const display = value => typeof value === 'string' ? `„${value}“` : String(value);
    const describe = (snapshot, value) => snapshot.scope
      ? `Bereich ${snapshot.scope}, Ausführung ${snapshot.occurrence} von Zeile ${snapshot.line}: ${snapshot.name} hat den Wert ${display(value)}.`
      : `${task.chapter >= 3 ? `Nach Ausführung ${snapshot.occurrence} von Zeile` : 'Nach Zeile'} ${snapshot.line} enthält ${snapshot.name} den Wert ${display(value)}.`;
    task.options = snapshots.slice(0, count).map((snapshot, index) => ({ id: `state-${index}`,
      text: describe(snapshot, snapshot.value), hint: 'Verfolge die ausgeführten Zuweisungen bis zur genannten Zeile.' }));
    task.solution = { selected: task.options.map(option => option.id) };
    for (let i = 0; task.options.length < 4; i++) {
      const snapshot = snapshots[i % snapshots.length];
      const value = typeof snapshot.value === 'number' ? snapshot.value + 1 + Math.floor(i / snapshots.length)
        : `AndererWert${i}`;
      task.options.push({ id: `state-${task.options.length}`, text: describe(snapshot, value),
        hint: task.chapter >= 4 ? 'Verfolge die angegebene Zeilenausführung im genannten Bereich. Eine Ausgabe ändert keinen gespeicherten Wert.' : task.chapter === 3 ? 'Verfolge die genannte Ausführung dieser Zeile. Eine Ausgabe verändert keinen Wert; die Schleife prüft vor jeder Runde erneut.' : 'Eine Ausgabe verändert keinen gespeicherten Wert. Berücksichtige bei Entscheidungen nur die ausgeführten Zweige.' });
    }
    task.criteria = [...task.criteria, 'state-observation'];
    task.prompt = 'Welche Aussagen über die gespeicherten Werte stimmen? Kreuze alle richtigen Antworten an. Betrachte nur Zeilen, die ausgeführt werden.';
  } else {
    const correct = observed.map(gap => gap.answer);
    const wrong = observed.map(gap => gap.choices.find(choice => choice.id !== gap.answer).id);
    const combinations = observed.length === 1
      ? observed[0].choices.map(choice => [choice.id])
      : [correct, [wrong[0], ...correct.slice(1)], [correct[0], wrong[1], ...correct.slice(2)], wrong];
    task.options = combinations.map((values, index) => {
      const nodes = observed.map((gap, i) => `${gap.label}: ${gap.choices.find(choice => choice.id === values[i]).text}`);
      return { id: `observation-${index}`, ...(type === 'diagram-choice' ? { nodes } : { text: nodes.join(' · ') }), hint: task.explanation };
    });
    const index = combinations.findIndex(values => values.every((value, i) => value === correct[i]));
    task.solution = { selected: [`observation-${index}`] };
    task.prompt = type === 'diagram-choice'
      ? 'Welches Diagramm zeigt die passenden Beobachtungen zum Programm? Die verbundenen Felder gehören zusammen.'
      : 'Welche Antwort beschreibt die Beobachtungen zum Programm richtig? Wähle genau eine Antwort.';
    if (type === 'diagram-choice') task.diagramLayout = 'observations';
  }
  validateEqualWords(task.options);
  task.options = shuffle(task.options, random);
  return task;
}
