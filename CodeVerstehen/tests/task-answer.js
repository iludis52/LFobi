import { buildTask } from '../task-engine.js';
import { applyInteractionForm, describeStateObservation } from '../interaction-forms.js';

// Rebuild the private reference to adapt integration submissions to the form
// actually presented. Public task objects must never contain this key.
export function referenceAnswer(view, templates) {
  const { interaction_form, ...variation } = view.variation || {};
  const task = buildTask({ template_id: view.templateId, parameters: view.parameters,
    ...(view.variation ? { variation } : {}) }, templates, view.language, () => 0);
  if (view.type === 'multiple-choice' && view.criteria.includes('state-observation')) {
    const texts = new Set(task.trace.filter(step => step.executed !== false && step.executed !== null)
      .flatMap(step => Object.entries(step.variables || { [task.variableNames?.wert || 'wert']: step.value })
        .map(([name, value]) => describeStateObservation(task.trace, step, name, value))));
    return { selected: view.options.filter(option => texts.has(option.text)).map(option => option.id) };
  }
  return applyInteractionForm(task, view.type, () => 0, view.adaptation?.focus).solution;
}
