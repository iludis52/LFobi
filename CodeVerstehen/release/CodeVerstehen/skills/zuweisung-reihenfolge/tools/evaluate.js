function sameSet(a, b) { return a.length === b.length && new Set(a).size === a.length && a.every(id => b.includes(id)); }

export function evaluate(task, answer) {
  if (!answer || typeof answer !== 'object' || Array.isArray(answer)) throw new Error('Antwort fehlt.');
  let correct = false, missing = [], extra = [];
  if (['single-choice', 'multiple-choice', 'diagram-choice'].includes(task.type)) {
    if (!Array.isArray(answer.selected) || !answer.selected.length || answer.selected.some(id => !task.options.some(o => o.id === id)) || new Set(answer.selected).size !== answer.selected.length) throw new Error('Wähle gültige Antworten aus.');
    if (task.type !== 'multiple-choice' && answer.selected.length !== 1) throw new Error('Wähle genau eine Antwort.');
    missing = task.solution.selected.filter(id => !answer.selected.includes(id));
    extra = answer.selected.filter(id => !task.solution.selected.includes(id));
    correct = sameSet(answer.selected, task.solution.selected);
  } else if (task.type === 'code-selection') {
    if (!task.regions.some(r => r.id === answer.region) || !task.values.includes(answer.value)) throw new Error('Wähle eine Codestelle und einen Wert.');
    correct = answer.region === task.solution.region && answer.value === task.solution.value;
  } else if (task.type === 'gap-fill') {
    if (!answer.gaps || Object.keys(answer.gaps).sort().join(',') !== task.gaps.map(g => g.id).sort().join(',') || task.gaps.some(g => g.choices ? !g.choices.some(choice => choice.id === answer.gaps[g.id]) : !task.values.includes(answer.gaps[g.id]))) throw new Error('Fülle jede Lücke mit einem gültigen Wert.');
    correct = task.gaps.every(g => answer.gaps[g.id] === task.solution.gaps[g.id]);
  } else if (task.type === 'ordering') {
    if (!Array.isArray(answer.order) || !sameSet(answer.order, task.steps.map(s => s.id))) throw new Error('Ordne alle Schritte genau einmal.');
    correct = answer.order.every((id, i) => id === task.solution.order[i]);
  } else throw new Error('Unbekannte Interaktionsform.');
  const wrongOption = task.options?.find(o => extra.includes(o.id));
  const wrongGap = task.gaps?.find(gap => answer.gaps?.[gap.id] !== task.solution.gaps[gap.id]);
  return {
    correct, missing, extra,
    feedback: correct ? 'Richtig. Deine Antwort passt zum Ablauf.' : 'Noch nicht richtig. Vergleiche deine Antwort mit dem Ablauf.',
    hint: task.gapHints?.[wrongGap?.id] || wrongOption?.hint || (missing.length ? 'Mindestens eine passende Aussage fehlt. Prüfe jede Aussage einzeln.' : task.mode === 'transfer' ? 'Eine Berechnung in der Ausgabe weist der Variable keinen neuen Wert zu.' : 'Lies zuerst den bisherigen Wert, berechne rechts das Ergebnis und weise es erst danach zu.'),
    explanation: task.explanation,
    trace: task.trace,
    solution: task.solution
  };
}
