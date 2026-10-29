import { parameterRanges } from '../../../chapter-one.js';

export function wordCount(text) {
  return text.replace(/[`*_]/g, '').trim().split(/\s+/u).filter(part => /[\p{L}\p{N}]/u.test(part)).length;
}

export function validateEqualWords(options) {
  if (!Array.isArray(options) || options.length < 3 || options.length > 4) throw new Error('Drei oder vier Alternativen erforderlich.');
  const counts = options.map(o => wordCount(o.text ?? o.nodes?.join(' ') ?? ''));
  if (!counts[0] || counts.some(count => count !== counts[0])) throw new Error('Antwortalternativen haben unterschiedliche Wortanzahl.');
  if (new Set(options.map(o => o.id)).size !== options.length) throw new Error('Antwort-IDs müssen eindeutig sein.');
  const texts = options.map(o => o.text ?? o.nodes?.join(' '));
  if (new Set(texts).size !== texts.length) throw new Error('Antwortalternativen müssen unterschiedlich sein.');
}

export function validateParameters(parameters, ranges = { start: [1, 9], add: [1, 9] }) {
  if (!parameters || typeof parameters !== 'object' || Array.isArray(parameters) || Object.keys(parameters).sort().join(',') !== Object.keys(ranges).sort().join(',')) throw new Error('Parameter entsprechen nicht der gewählten Vorlage.');
  for (const [key, [min, max]] of Object.entries(ranges)) if (!Number.isInteger(parameters[key]) || parameters[key] < min || parameters[key] > max) throw new Error(`${key} muss eine ganze Zahl von ${min} bis ${max} sein.`);
  return { ...parameters };
}

export function validateSelection(selection, templates) {
  if (!selection || !['parameters,template_id', 'parameters,template_id,variation'].includes(Object.keys(selection).sort().join(','))) throw new Error('Ungültiges Aufgabenformat des Modells.');
  const template = templates.find(t => t.id === selection.template_id);
  if (!template) throw new Error('Vorlage liegt außerhalb der gewählten Schwierigkeit.');
  return { template, parameters: validateParameters(selection.parameters, parameterRanges(template)) };
}
