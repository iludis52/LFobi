import { explanationPrompt, explanationEvidence } from './model-prompts.js';

// Only compact, verified evidence lives here; never persisted or rebuilt from imports.
export function createLearningMemory() {
  const histories = new Map();
  const keyFor = (session, task) => JSON.stringify([session, task.chapter, task.learningObjective, task.language]);
  return {
    observe(session, task, result, attempt) {
      const key = keyFor(session, task), history = histories.get(key) || [];
      const existing = history.find(item => item.taskId === task.id);
      if (existing) { existing.repeated = true; return; }
      if (attempt !== 1) return;
      history.push({ taskId: task.id, difficulty: task.difficulty, correct: result.correct,
        mode: task.mode, taskKind: task.taskKind || null, type: task.type,
        checks: result.checks.map(({ id, correct }) => ({ id, correct })), repeated: false });
      histories.set(key, history.slice(-3));
    },
    plan(session, selection) {
      const recent = (histories.get(keyFor(session, selection)) || []).filter(item => item.difficulty === selection.difficulty);
      const last = recent.at(-1), failed = last && !last.correct;
      const repeat = failed && recent.slice(-2).length === 2 && recent.slice(-2).every(item => !item.correct && item.mode === last.mode && item.taskKind === last.taskKind);
      const recommend = recent.length === 3 && recent.every(item => item.correct && !item.repeated) && new Set(recent.map(item => item.type)).size >= 2 && selection.difficulty < 3;
      return { strategy: failed ? 'practice' : 'vary', mode: failed ? last.mode : null,
        taskKind: failed ? last.taskKind : null, focus: failed ? last.checks.filter(check => !check.correct).map(check => check.id) : [],
        recent: recent.map(({ taskId, ...item }) => item),
        reason: failed ? `${repeat ? 'Wir üben nochmals' : 'Die nächste Variante übt'} denselben fachlichen Zusammenhang mit neuen Zahlen und einer anderen Antwortform.` : 'Neue Zahlen und wechselnde Darstellungen zum gewählten Thema.',
        recommendation: recommend ? `Drei unterschiedliche Erstaufgaben richtig gelöst. Du kannst Stufe ${selection.difficulty + 1} ausprobieren.` : '' };
    },
    reset() { histories.clear(); }
  };
}

// Describe observable discrepancies, without guessing the learner's reasoning.
export function answerChecks(task, answer) {
  const checks = [];
  const add = (id, label, actual, expected) => checks.push({ id, label, actual, expected, correct: actual === expected });
  if (task.solution.selected) {
    for (const option of task.options) add(option.id, option.text || option.nodes.join(' → '), answer.selected.includes(option.id), task.solution.selected.includes(option.id));
  } else if (task.type === 'gap-fill') {
    for (const gap of task.gaps) {
      const text = value => gap.choices?.find(choice => choice.id === value)?.text ?? String(value);
      add(gap.id, gap.label, text(answer.gaps[gap.id]), text(task.solution.gaps[gap.id]));
    }
  } else if (task.type === 'code-selection') {
    const text = id => task.regions.find(region => region.id === id).text;
    add('region', 'Ausgewählte Codestelle', text(answer.region), text(task.solution.region));
    add('value', 'Bisheriger Wert', answer.value, task.solution.value);
  } else {
    task.solution.order.forEach((id, index) => {
      const text = id => task.steps.find(step => step.id === id).text;
      add(`position-${index + 1}`, `Schritt ${index + 1}`, text(answer.order[index]), text(id));
    });
  }
  return checks;
}

export function localExplanation(result) {
  const wrong = result.checks.find(check => !check.correct);
  if (!wrong) return 'Richtig gelöst. Deine Antwort stimmt mit dem geprüften Programmablauf überein.';
  if (typeof wrong.expected === 'boolean') return wrong.expected
    ? `Diese Aussage gehört zur richtigen Antwort: „${wrong.label}“.`
    : `Diese Aussage passt nicht zum Programmablauf: „${wrong.label}“.`;
  return `Prüfe „${wrong.label}“: Deine Antwort war „${wrong.actual}“; zum Programmablauf passt „${wrong.expected}“.`;
}

export async function explainAnswer(modelCompletion, config, task, result) {
  const fallback = { text: localExplanation(result), source: 'Geprüfte Rückmeldung' };
  if (config.provider === 'demo') return fallback;
  try {
    const raw = await modelCompletion(config, [
      { role: 'system', content: explanationPrompt },
      { role: 'user', content: JSON.stringify({ language: task.language, code: task.code, correct: result.correct, checks: explanationEvidence(result), verified_explanation: result.explanation }) }
    ], { purpose: 'answer-explanation', maxTokens: 220 });
    if (typeof raw !== 'string' || raw.length > 3000) throw new Error('Ungültige Rückmeldung.');
    const parsed = JSON.parse(raw);
    const text = parsed?.explanation?.trim();
    if (Object.keys(parsed).join(',') !== 'explanation' || typeof text !== 'string' || !text || text.length > 600 || text.split(/\s+/).length > 55 || text.includes('\n') || /[<>]/.test(text) || (text.match(/[.!?](?:\s|$)/g) || []).length > 2) throw new Error('Rückmeldung zu lang.');
    return { text, source: 'KI-Kurzerklärung' };
  } catch { return fallback; }
}
