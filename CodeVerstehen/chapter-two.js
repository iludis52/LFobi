// Gemeinsamer Renderer/Interpreter für kuratierte Referenzen und separat
// durch branch-workshop.js geprüfte Programmbäume. Kein Ausführen von Quelltext.
const lit = value => ({ kind: 'literal', value });
const ref = name => ({ kind: 'variable', name });
const expr = value => typeof value === 'object' ? value : lit(value);
const binary = (left, op, right) => ({ kind: 'binary', left: expr(left), op, right: expr(right) });
const set = (name, value) => ({ kind: 'assign', name, value: expr(value) });
const print = value => ({ kind: 'output', value: expr(value) });
const branch = (test, yes, no = []) => ({ kind: 'decision', branches: [{ test, body: yes }], otherwise: no });
const chain = (branches, otherwise = []) => ({ kind: 'decision', branches: branches.map(([test, body]) => ({ test, body })), otherwise });
const compare = (name, op, value) => binary(ref(name), op, value);
const update = (name, op, value) => set(name, binary(ref(name), op, value));
const single = body => [{ body }];
const pair = (a, b) => [{ label: 'Programm A', body: a }, { label: 'Programm B', body: b }];
const numeric = value => ({ id: `n:${value}`, text: String(value) });
const word = value => ({ id: `text:${value}`, text: value });
const truth = value => ({ id: value ? 'true' : 'false', text: value ? 'wahr' : 'falsch' });
const boolGap = (id, label, value) => ({ id, label, answer: truth(value).id, choices: [truth(true), truth(false)] });
const numberGap = (id, label, value, alternatives) => ({ id, label, answer: numeric(value).id, choices: [...new Set([value, ...alternatives])].map(numeric) });
const textGap = (id, label, value, alternatives) => ({ id, label, answer: word(value).id, choices: [...new Set([value, ...alternatives])].map(word) });

function discount(price, exclusive, onlyDiscount = false) {
  const first = [update('rabatt', '+', 2)], second = [update('rabatt', '+', 1)];
  return [set('preis', price), set('rabatt', 0), ...(exclusive ? [chain([[compare('preis', '>=', 20), first], [compare('preis', '>=', 10), second]])] : [branch(compare('preis', '>=', 20), first), branch(compare('preis', '>=', 10), second)]), print(ref('rabatt')), ...(!onlyDiscount ? [print(binary(ref('preis'), '-', ref('rabatt')))] : [])];
}
function permission(points, operator) {
  return [set('punkte', points), branch(compare('punkte', operator, 5), [print(lit('Weiter'))], [print(lit('Warten'))])];
}
function stockChange(stock, operator) {
  return [set('bestand', stock), set('bestellung', stock), branch(binary(ref('bestellung'), operator, ref('bestand')), [update('bestand', '-', ref('bestellung'))]), print(ref('bestand'))];
}
function awards(points, reversed = false) {
  const rules = reversed ? [[10, 'Silber'], [20, 'Gold']] : [[20, 'Gold'], [10, 'Silber']];
  return [set('punkte', points), chain(rules.map(([threshold, label]) => [compare('punkte', '>=', threshold), [print(lit(label))]]), [print(lit('Start'))])];
}

const definitions = {
  'condition-level-v1': { mode: 'condition-check', difficulty: 1, ranges: { points: [3, 7], goal: [4, 6] },
    programs: p => single([set('punkte', p.points), set('ziel', p.goal), print(binary(ref('punkte'), '>=', ref('ziel')))]),
    observe: (p, runs) => [boolGap('condition', 'Level freigeschaltet?', runs[0].outputs[0]), numberGap('points', 'Punkte nach der Ausgabe', p.points, [p.goal, p.points + 1])],
    explain: (p, runs) => `${p.points} >= ${p.goal} ist ${runs[0].outputs[0] ? 'wahr' : 'falsch'}. Die Bedingung prüft, ob die Punkte mindestens das Ziel erreichen. Die Ausgabe verändert die ${p.points} Punkte nicht.` },
  'condition-zero-v1': { mode: 'condition-check', difficulty: 2, ranges: { temperature: [-1, 1] },
    programs: p => single([set('temperatur', p.temperature), print(compare('temperatur', '>', 0)), print(compare('temperatur', '>=', 0))]),
    observe: (_p, runs) => [boolGap('strict', 'Erste Bedingung: größer als null?', runs[0].outputs[0]), boolGap('inclusive', 'Zweite Bedingung: mindestens null?', runs[0].outputs[1])],
    explain: p => `Bei ${p.temperature} Grad ist > 0 ${p.temperature > 0 ? 'wahr' : 'falsch'} und >= 0 ${p.temperature >= 0 ? 'wahr' : 'falsch'}. Genau bei null unterscheiden sich die Prüfungen: >= schließt den Grenzwert ein.` },
  'condition-bonus-v1': { mode: 'condition-check', difficulty: 3, ranges: { points: [2, 5], bonus: [1, 3], goal: [4, 8] },
    programs: p => single([set('punkte', p.points), set('bonus', p.bonus), print(binary(binary(ref('punkte'), '+', ref('bonus')), '>=', p.goal))]),
    observe: (p, runs) => [boolGap('condition', 'Ziel mit Bonus erreicht?', runs[0].outputs[0]), numberGap('points', 'Gespeicherte Punkte am Ende', p.points, [p.points + p.bonus, p.goal])],
    explain: (p, runs) => `Zuerst werden ${p.points} + ${p.bonus} = ${p.points + p.bonus} berechnet. Der Vergleich mit ${p.goal} ist ${runs[0].outputs[0] ? 'wahr' : 'falsch'}. Es gibt keine Neuzuweisung an punkte; gespeichert bleiben ${p.points}.` },
  'branch-stock-v1': { mode: 'branch-choice', difficulty: 1, ranges: { stock: [3, 7], order: [3, 7] },
    programs: p => single([set('bestand', p.stock), set('bestellung', p.order), branch(binary(ref('bestellung'), '<=', ref('bestand')), [update('bestand', '-', ref('bestellung')), print(lit('Versand'))], [print(lit('Warten'))]), print(ref('bestand'))]),
    observe: (p, runs) => [textGap('message', 'Erste Ausgabe', runs[0].outputs[0], ['Versand', 'Warten']), numberGap('stock', 'Bestand am Ende', runs[0].variables.bestand, [p.stock, 0, p.stock + p.order])],
    explain: (p, runs) => `Die Bestellung von ${p.order} Stück ${p.order <= p.stock ? 'passt' : 'passt nicht'} zum Bestand von ${p.stock}. Deshalb wird nur der ${p.order <= p.stock ? 'if' : 'else'}-Block ausgeführt. Die erste Ausgabe lautet ${runs[0].outputs[0]}, der Bestand danach ${runs[0].variables.bestand}.` },
  'branch-heating-v1': { mode: 'branch-choice', difficulty: 2, ranges: { temperature: [-2, 2] },
    programs: p => single([set('temperatur', p.temperature), set('status', lit('Pause')), branch(compare('temperatur', '<', 0), [update('temperatur', '+', 2), set('status', lit('Heizen'))], [set('status', lit('Pause'))]), print(ref('status')), print(ref('temperatur'))]),
    observe: (p, runs) => [textGap('status', 'Erste Ausgabe: Heizstatus', runs[0].outputs[0], ['Heizen', 'Pause']), numberGap('temperature', 'Temperatur am Ende', runs[0].variables.temperatur, [p.temperature, p.temperature + 2, 0])],
    explain: (p, runs) => `Die Bedingung wird mit der ursprünglichen Temperatur ${p.temperature} geprüft. ${p.temperature < 0 ? 'Der if-Block erhöht sie um zwei Grad und setzt den Status auf Heizen.' : 'Der else-Block lässt die Temperatur unverändert und setzt den Status auf Pause.'} Eine Änderung innerhalb des Blocks löst keine erneute Prüfung dieses if aus. Am Ende sind es ${runs[0].variables.temperatur} Grad.` },
  'branch-stamps-v1': { mode: 'branch-choice', difficulty: 3, ranges: { stamps: [6, 9] },
    programs: p => single([set('stempel', p.stamps), set('gutschein', 0), branch(compare('stempel', '>=', 8), [update('stempel', '-', 8), set('gutschein', 1)], [update('stempel', '+', 2)]), print(ref('gutschein')), print(ref('stempel'))]),
    observe: (p, runs) => [numberGap('coupon', 'Gutscheine am Ende', runs[0].variables.gutschein, [0, 1, 2]), numberGap('stamps', 'Stempel am Ende', runs[0].variables.stempel, [p.stamps, 0, p.stamps + 2])],
    explain: (p, runs) => `Geprüft wird die ursprüngliche Zahl von ${p.stamps} Stempeln. ${p.stamps >= 8 ? 'Acht Stempel werden gegen einen Gutschein eingelöst.' : 'Der else-Block fügt zwei Stempel hinzu; der if-Block wird danach nicht erneut geprüft.'} Am Ende gibt es ${runs[0].variables.gutschein} Gutschein und ${runs[0].variables.stempel} Stempel.` },
  'decisions-independent-v1': { mode: 'decision-chain', difficulty: 1, ranges: { price: [9, 21] },
    programs: p => single(discount(p.price, false)),
    observe: (_p, runs) => [numberGap('discount', 'Rabatt insgesamt', runs[0].outputs[0], [0, 1, 2, 3]), numberGap('price', 'Ausgegebener Endpreis', runs[0].outputs[1], [runs[0].variables.preis, runs[0].variables.preis - 1, runs[0].variables.preis - 2])],
    explain: (_p, runs) => `Die beiden if-Anweisungen werden unabhängig geprüft. Wenn beide Bedingungen zutreffen, kommen beide Rabatte hinzu. Der Rabatt beträgt ${runs[0].outputs[0]}, der ausgegebene Endpreis ${runs[0].outputs[1]}.` },
  'decisions-exclusive-v1': { mode: 'decision-chain', difficulty: 2, ranges: { price: [9, 21] },
    programs: p => single(discount(p.price, true)),
    observe: (_p, runs) => [numberGap('discount', 'Rabatt insgesamt', runs[0].outputs[0], [0, 1, 2, 3]), numberGap('price', 'Ausgegebener Endpreis', runs[0].outputs[1], [runs[0].variables.preis, runs[0].variables.preis - 1, runs[0].variables.preis - 3])],
    explain: (_p, runs) => `Eine Entscheidungskette nimmt nur den ersten zutreffenden Zweig. Wenn der erste Vergleich wahr ist, wird der zweite nicht mehr geprüft. Der Rabatt beträgt ${runs[0].outputs[0]}, der ausgegebene Endpreis ${runs[0].outputs[1]}.` },
  'decisions-compare-v1': { mode: 'decision-chain', difficulty: 3, ranges: { price: [20, 24] },
    programs: p => pair(discount(p.price, false, true), discount(p.price, true, true)),
    observe: (_p, runs) => [numberGap('a', 'Rabatt in Programm A', runs[0].outputs[0], [0, 1, 2, 3]), numberGap('b', 'Rabatt in Programm B', runs[1].outputs[0], [0, 1, 2, 3])],
    explain: (_p, runs) => `Beide Programme starten getrennt. In A sind beide unabhängigen Prüfungen wahr: Rabatt ${runs[0].outputs[0]}. B nimmt nur den ersten passenden Zweig der Kette: Rabatt ${runs[1].outputs[0]}. Zwei if sind nicht gleichbedeutend mit if und elif beziehungsweise else if.` },
  'change-boundary-v1': { mode: 'branch-change', difficulty: 1, ranges: { points: [4, 6] },
    programs: p => pair(permission(p.points, '>='), permission(p.points, '>')),
    observe: (_p, runs) => [textGap('a', 'Ausgabe von Programm A', runs[0].outputs[0], ['Weiter', 'Warten']), textGap('b', 'Ausgabe von Programm B', runs[1].outputs[0], ['Weiter', 'Warten'])],
    explain: p => `A erlaubt mindestens fünf Punkte, B verlangt mehr als fünf. ${p.points === 5 ? 'Genau am Grenzwert entscheidet die Änderung: A gibt Weiter aus, B Warten.' : 'Bei diesen Punkten ist die Ausgabe gleich. Die Änderung wirkt nur genau bei fünf Punkten.'}` },
  'change-stock-v1': { mode: 'branch-change', difficulty: 2, ranges: { stock: [3, 6] },
    programs: p => pair(stockChange(p.stock, '<='), stockChange(p.stock, '<')),
    observe: (_p, runs) => [numberGap('a', 'Bestand nach Programm A', runs[0].variables.bestand, [runs[1].variables.bestand, 1]), numberGap('b', 'Bestand nach Programm B', runs[1].variables.bestand, [0, 1])],
    explain: p => `Bestellung und Bestand sind beide ${p.stock}. In A ist <= wahr und die Bestellung leert den Bestand auf null. In B ist < falsch; die Zuweisung im Block wird übersprungen und der Bestand bleibt ${p.stock}.` },
  'change-priority-v1': { mode: 'branch-change', difficulty: 3, ranges: { points: [20, 24] },
    programs: p => pair(awards(p.points), awards(p.points, true)),
    observe: (_p, runs) => [textGap('a', 'Ausgabe von Programm A', runs[0].outputs[0], ['Gold', 'Silber', 'Start']), textGap('b', 'Ausgabe von Programm B', runs[1].outputs[0], ['Gold', 'Silber', 'Start'])],
    explain: p => `Mit ${p.points} Punkten sind beide Vergleiche wahr. Trotzdem wird nur der erste passende Zweig gewählt. A prüft zuerst Gold, B zuerst Silber. Die Reihenfolge der Prüfungen entscheidet; die spätere Gold-Prüfung in B wird gar nicht erreicht.` }
};

export function chapterTwoDefinition(template) {
  const definition = definitions[template.id];
  if (!definition || template.chapter !== 2 || definition.mode !== template.mode || definition.difficulty !== template.difficulty || template.type !== 'gap-fill') throw new Error('Nicht freigegebene Kapitel-2-Vorlage.');
  return definition;
}

function evaluateExpression(node, variables) {
  if (node.kind === 'literal') return node.value;
  if (node.kind === 'variable') {
    if (!Object.hasOwn(variables, node.name)) throw new Error('Name wird vor seiner Zuweisung gelesen.');
    return variables[node.name];
  }
  const a = evaluateExpression(node.left, variables), b = evaluateExpression(node.right, variables);
  switch (node.op) {
    case '+': return a + b;
    case '-': return a - b;
    case '>': return a > b;
    case '>=': return a >= b;
    case '<': return a < b;
    case '<=': return a <= b;
    default: throw new Error('Nicht freigegebener Operator.');
  }
}
function sourceExpression(node, language) {
  if (node.kind === 'literal') return typeof node.value === 'string' ? JSON.stringify(node.value) : String(node.value);
  if (node.kind === 'variable') return node.name;
  return `(${sourceExpression(node.left, language)} ${node.op} ${sourceExpression(node.right, language)})`;
}
function outputText(value, language) { return typeof value === 'boolean' && language === 'python' ? (value ? 'True' : 'False') : String(value); }

export function runDecisionPrograms(programs, language) {
  if (!['python', 'javascript'].includes(language)) throw new Error('Ungültige Sprache.');
  const code = [], trace = [], runs = [];
  for (const program of structuredClone(programs)) {
    const declared = new Set(), records = new Map(), variables = {}, outputs = [];
    const line = (text, structural = false) => {
      code.push(text); trace.push({ line: code.length, program: program.label || '', executed: structural ? null : false, condition: null, variables: {}, output: '' });
      return code.length;
    };
    if (program.label) line(`${language === 'python' ? '#' : '//'} ${program.label}`, true);
    function render(body, depth = 0) {
      for (const node of body) {
        const indent = '    '.repeat(depth), suffix = language === 'javascript' ? ';' : '';
        if (node.kind === 'assign') {
          const declaration = language === 'javascript' && !declared.has(node.name) ? 'let ' : '';
          node.line = line(`${indent}${declaration}${node.name} = ${sourceExpression(node.value, language)}${suffix}`); declared.add(node.name);
          if (node.id) trace.at(-1).nodeId = node.id;
        } else if (node.kind === 'output') {
          const value = sourceExpression(node.value, language);
          node.line = line(`${indent}${language === 'python' ? `print(${value})` : `console.log(${value});`}`);
          if (node.id) trace.at(-1).nodeId = node.id;
        } else {
          node.branches.forEach((item, index) => {
            const test = sourceExpression(item.test, language);
            item.line = line(language === 'python' ? `${indent}${index ? 'elif' : 'if'} ${test}:` : `${indent}${index ? '} else if' : 'if'} (${test}) {`);
            if (node.id) trace.at(-1).nodeId = node.id;
            render(item.body, depth + 1);
          });
          if (node.otherwise.length) {
            node.elseLine = line(language === 'python' ? `${indent}else:` : `${indent}} else {`);
            render(node.otherwise, depth + 1);
          }
          if (language === 'javascript') line(`${indent}}`, true);
        }
      }
    }
    const record = (lineNumber, condition = null, output = '') => records.set(lineNumber, { executed: true, condition, variables: { ...variables }, output });
    function execute(body) {
      for (const node of body) {
        if (node.kind === 'assign') {
          const value = evaluateExpression(node.value, variables);
          if (typeof value === 'number' && (!Number.isInteger(value) || value < -20 || value > 100)) throw new Error('Zustand außerhalb des freigegebenen Bereichs.');
          variables[node.name] = value; record(node.line);
        } else if (node.kind === 'output') {
          const value = evaluateExpression(node.value, variables);
          outputs.push(value); record(node.line, null, outputText(value, language));
        } else {
          let selected = false;
          for (const item of node.branches) {
            const condition = evaluateExpression(item.test, variables);
            if (typeof condition !== 'boolean') throw new Error('Bedingung muss einen Wahrheitswert ergeben.');
            record(item.line, condition);
            if (condition) { execute(item.body); selected = true; break; }
          }
          if (!selected && node.otherwise.length) { record(node.elseLine); execute(node.otherwise); }
        }
      }
    }
    render(program.body); execute(program.body);
    for (const step of trace) if (records.has(step.line)) Object.assign(step, records.get(step.line));
    runs.push({ outputs, variables: { ...variables } });
  }
  return { code, trace, runs };
}

export function buildChapterTwoTask(template, parameters, language) {
  const definition = chapterTwoDefinition(template);
  const { code, trace, runs } = runDecisionPrograms(definition.programs(parameters), language);
  const observations = definition.observe(parameters, runs);
  const solution = { gaps: Object.fromEntries(observations.map(gap => [gap.id, gap.answer])) };
  const gaps = observations.map(({ answer, ...gap }) => gap);
  if (gaps.some(gap => !gap.choices.some(choice => choice.id === solution.gaps[gap.id]) || gap.choices.length < 2 || new Set(gap.choices.map(choice => choice.id)).size !== gap.choices.length)) throw new Error('Ungültige Beobachtungsalternativen.');
  if (!Array.isArray(template.hints) || template.hints.length !== gaps.length) throw new Error('Hinweise fehlen.');
  return {
    chapter: 2, templateId: template.id, difficulty: template.difficulty, mode: template.mode, type: template.type, language,
    title: template.title, context: template.context, prompt: template.prompt, choicePrompt: template.choicePrompt,
    criteria: template.criteria, parameters, code, trace, gaps, solution,
    explanation: definition.explain(parameters, runs), gapHints: Object.fromEntries(gaps.map((gap, index) => [gap.id, template.hints[index]]))
  };
}
