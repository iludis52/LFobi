// Kuratierter Inhaltsbestand; Referenzen werden bewusst nicht vom Interpreter abgeleitet.
import { mkdir, writeFile, readFile } from 'node:fs/promises';
const families = [
  { name: 'bedingungen-grenzfaelle', objective: 'condition-check', title: 'Bedingungen und Grenzwerte', description: 'Vergleiche auswerten, Grenzwerte einschließen und gespeicherte Werte von berechneten Ausdrücken unterscheiden.',
    content: `# Bedingungen und Grenzwerte
## Eine Frage an den Zustand
Eine Bedingung ergibt wahr oder falsch. Python schreibt dafür True und False, JavaScript true und false. In den Antworten verwenden wir die deutschen Wörter.
Die Zeichen > und < bedeuten größer und kleiner. >= und <= schließen den Grenzwert ein: 5 >= 5 ist wahr, 5 > 5 ist falsch.
## Schritt für Schritt
1. Lies die aktuellen Werte der Variablen.
2. Berechne zuerst einen Ausdruck wie punkte + bonus.
3. Vergleiche das Ergebnis mit dem Grenzwert.
4. Eine Prüfung oder Ausgabe verändert keine Variable.
## Beispiel in Python
\`\`\`python
punkte = 5
print(punkte >= 5)
print(punkte > 5)
\`\`\`
## Dasselbe in JavaScript
\`\`\`javascript
let punkte = 5;
console.log(punkte >= 5);
console.log(punkte > 5);
\`\`\`
Die Ausgaben sind wahr und falsch. Gespeichert bleiben fünf Punkte.
## Auch null und negative Zahlen
Temperaturen können negativ sein. -1 ist kleiner als 0. Genau 0 erfüllt >= 0, aber nicht > 0. Klammern zeigen, welcher Ausdruck zuerst berechnet wird.
Voraussetzungen: Variablen, Addition und Ausgabe aus Kapitel 1. Hier kommt nur das Vergleichen hinzu.`,
    tasks: [
      ['condition-level-v1', 'Reicht es für das nächste Level?', 'Ein Spiel schaltet ein Level frei, sobald das Punkteziel erreicht ist.', 'Bestimme den Wahrheitswert der Ausgabe und die anschließend gespeicherten Punkte.', ['Vergleiche die Punkte mit dem Ziel. >= schließt Gleichheit ein.', 'Eine Ausgabe enthält keine Neuzuweisung an punkte.'], { points: 5, goal: 5 }, [true], [{ punkte: 5, ziel: 5 }], { condition: 'true', points: 'n:5' }],
      ['condition-zero-v1', 'Was passiert genau bei null Grad?', 'Ein Temperatursensor prüft zwei unterschiedliche Schwellen für Frostfreiheit.', 'Bestimme die beiden Wahrheitswerte in der Reihenfolge der Ausgaben.', ['Größer als null schließt null aus.', 'Mindestens null schließt null ein.'], { temperature: 0 }, [false, true], [{ temperatur: 0 }], { strict: 'false', inclusive: 'true' }],
      ['condition-bonus-v1', 'Ein Bonus vor der Levelprüfung', 'Ein Spiel prüft das Ziel mit Bonuspunkten, ohne die gespeicherte Punktzahl neu zuzuweisen.', 'Bestimme den Wahrheitswert und die am Ende gespeicherten Punkte.', ['Berechne die Summe, bevor du sie mit dem Ziel vergleichst.', 'Prüfe, ob eine neue Zuweisung an punkte vorhanden ist.'], { points: 3, bonus: 2, goal: 5 }, [true], [{ punkte: 3, bonus: 2 }], { condition: 'true', points: 'n:3' }]
    ] },
  { name: 'verzweigungen', objective: 'branch-choice', title: 'Verzweigungen mit if und else', description: 'Genau einen Zweig ausführen, Zustandsänderungen verfolgen und übersprungene Anweisungen erkennen.',
    content: `# Verzweigungen
## Ein Programm entscheidet
if prüft eine Bedingung. Ist sie wahr, läuft sein Block. Ist sie falsch, läuft der else-Block. Genau einer der beiden Zweige wird ausgeführt.
Python kennzeichnet den Block mit einem Doppelpunkt und eingerückten Zeilen. JavaScript verwendet geschweifte Klammern. Die Zeilen nach dem Block laufen anschließend weiter.
## Beispiel in Python
\`\`\`python
bestand = 5
bestellung = 3
if bestellung <= bestand:
    bestand = bestand - bestellung
    print("Versand")
else:
    print("Warten")
print(bestand)
\`\`\`
Die Ausgaben sind Versand und 2. Warten wird übersprungen.
## Derselbe Zweig in JavaScript
\`\`\`javascript
if (bestellung <= bestand) {
    bestand = bestand - bestellung;
    console.log("Versand");
} else {
    console.log("Warten");
}
console.log(bestand);
\`\`\`
## Schritt für Schritt
1. Prüfe die Bedingung mit dem aktuellen Zustand.
2. Führe nur den gewählten Block aus, Zeile für Zeile.
3. Überspringe den anderen Block vollständig.
4. Fahre nach der Verzweigung mit dem neuen Zustand fort.
Wörter in Anführungszeichen sind Texte. Eine Ausgabe zeigt den Text ohne die Anführungszeichen. Eine Variable kann auch einen Text speichern, etwa status = "Pause".
Eine Zustandsänderung im Block prüft die ursprüngliche Bedingung nicht noch einmal. Aus sieben Stempeln können im else-Block neun werden, ohne dass anschließend der if-Block startet.
Voraussetzungen: Vergleiche, Zuweisungen, Addition. Neu sind if/else, Blöcke, Subtraktion und Textausgaben.`,
    tasks: [
      ['branch-stock-v1', 'Kann der Shop die Bestellung versenden?', 'Ein Shop versendet nur, wenn genügend Stück auf Lager sind.', 'Bestimme die erste Ausgabe und den Bestand am Ende.', ['Wähle genau einen Zweig anhand der ursprünglichen Bestellung und des Bestands.', 'Nur im Versandzweig wird der Bestand verringert.'], { stock: 5, order: 3 }, ['Versand', 2], [{ bestand: 2, bestellung: 3 }], { message: 'text:Versand', stock: 'n:2' }],
      ['branch-heating-v1', 'Heizen oder pausieren?', 'Eine Steuerung hebt eine negative Temperatur um zwei Grad an.', 'Bestimme den ausgegebenen Heizstatus und die Temperatur am Ende.', ['Die ursprüngliche Temperatur entscheidet über den Zweig.', 'Verfolge die Temperaturänderung ausschließlich im ausgeführten Block.'], { temperature: -1 }, ['Heizen', 1], [{ temperatur: 1, status: 'Heizen' }], { status: 'text:Heizen', temperature: 'n:1' }],
      ['branch-stamps-v1', 'Die Stempelkarte im Café', 'Ab acht Stempeln wird ein Gutschein eingelöst. Sonst gibt es zwei neue Stempel.', 'Bestimme die Anzahl der Gutscheine und Stempel am Ende.', ['Ein if wird nach einer Änderung im else-Block nicht erneut geprüft.', 'Nur einer der beiden Zweige verändert die Stempelzahl.'], { stamps: 7 }, [0, 9], [{ stempel: 9, gutschein: 0 }], { coupon: 'n:0', stamps: 'n:9' }]
    ] },
  { name: 'entscheidungsketten', objective: 'decision-chain', title: 'Einzelne Entscheidungen und Ketten', description: 'Unabhängige if-Prüfungen von if/elif-Ketten unterscheiden und den ersten zutreffenden Zweig verfolgen.',
    content: `# Einzelne Entscheidungen und Ketten
## Zwei if prüfen unabhängig
Zwei aufeinanderfolgende if-Anweisungen werden beide geprüft. Sind beide Bedingungen wahr, laufen beide Blöcke. Ein if ohne else überspringt bei einer falschen Bedingung seinen Block.
\`\`\`python
preis = 20
rabatt = 0
if preis >= 20:
    rabatt = rabatt + 2
if preis >= 10:
    rabatt = rabatt + 1
print(rabatt)
\`\`\`
Hier beträgt der Rabatt 3: beide Vergleiche sind wahr.
## Eine Kette wählt den ersten Treffer
elif bedeutet in Python eine weitere Prüfung innerhalb derselben Entscheidung. JavaScript schreibt else if. Sobald ein Zweig zutrifft, werden alle späteren Prüfungen und Blöcke dieser Kette übersprungen. Ein abschließendes else wird nur gewählt, wenn keine Prüfung zutrifft.
\`\`\`python
rabatt = 0
if preis >= 20:
    rabatt = rabatt + 2
elif preis >= 10:
    rabatt = rabatt + 1
print(rabatt)
\`\`\`
Bei preis = 20 ist der Rabatt 2. Der zweite Vergleich wird gar nicht mehr geprüft.
## Dieselbe Kette in JavaScript
\`\`\`javascript
let rabatt = 0;
if (preis >= 20) {
    rabatt = rabatt + 2;
} else if (preis >= 10) {
    rabatt = rabatt + 1;
}
console.log(rabatt);
\`\`\`
## Schritt für Schritt
1. Prüfe, ob es unabhängige if-Anweisungen oder eine Kette sind.
2. Führe bei einzelnen if jede Prüfung durch.
3. Beende die Zweigauswahl einer Kette beim ersten Treffer.
4. Fahre nach den Blöcken mit dem erreichten Zustand fort.
Programm A und B starten immer getrennt; sie teilen keinen Variablenzustand. Voraussetzungen: Bedingungen und Verzweigungen. Neu ist die Entscheidungskette. Sie wird hier vor allen Schwierigkeitsstufen erklärt.`,
    tasks: [
      ['decisions-independent-v1', 'Dürfen sich zwei Rabatte addieren?', 'Ein Shop vergibt zwei Rabatte mit unabhängigen Bedingungen.', 'Bestimme den gesamten Rabatt und den ausgegebenen Endpreis.', ['Jedes eigenständige if wird geprüft, auch nach einem Treffer.', 'Der Endpreis wird aus preis minus dem gesamten rabatt berechnet.'], { price: 20 }, [3, 17], [{ preis: 20, rabatt: 3 }], { discount: 'n:3', price: 'n:17' }],
      ['decisions-exclusive-v1', 'Nur der erste passende Rabatt', 'Der Shop stellt seine Rabattregel auf eine Entscheidungskette um.', 'Bestimme den gesamten Rabatt und den ausgegebenen Endpreis.', ['Nach dem ersten zutreffenden Zweig endet die Auswahl der Kette.', 'Der zweite Rabatt wird bei einem Treffer im ersten Zweig nicht hinzugefügt.'], { price: 20 }, [2, 18], [{ preis: 20, rabatt: 2 }], { discount: 'n:2', price: 'n:18' }],
      ['decisions-compare-v1', 'Zwei Rabattregeln im Vergleich', 'Programm A addiert unabhängige Rabatte. Programm B verwendet eine Kette.', 'Beide Programme starten getrennt. Bestimme den Rabatt aus A und aus B.', ['In A können beide Blöcke ausgeführt werden.', 'In B wird nur der erste passende Block ausgeführt.'], { price: 20 }, [3, 2], [{ preis: 20, rabatt: 3 }, { preis: 20, rabatt: 2 }], { a: 'n:3', b: 'n:2' }]
    ] },
  { name: 'codeaenderungen-entscheidungen', objective: 'branch-change', title: 'Kleine Codeänderungen verstehen', description: 'Auswirkungen geänderter Vergleichszeichen und vertauschter Prüfungen anhand zweier getrennter Programme erklären.',
    content: `# Kleine Codeänderungen
## Vergleiche zwei getrennte Abläufe
Programm A und Programm B beginnen jeweils mit eigenen Startwerten. Der Zustand aus A wird nicht nach B übertragen.
Eine kleine Änderung kann den gewählten Zweig verändern. Manchmal bleibt die Ausgabe für die gezeigten Werte aber gleich. Das ist eine gültige Beobachtung.
## Grenzwerte entscheiden
Bei punkte = 5 ist punkte >= 5 wahr, punkte > 5 falsch. Bei 4 Punkten sind beide falsch, bei 6 Punkten beide wahr. Der Unterschied tritt genau an der Grenze auf.
Bei bestellung = bestand erlaubt <= die vollständige Lieferung. < erlaubt sie nicht, weil Gleichheit ausgeschlossen ist.
## Reihenfolge in einer Kette
\`\`\`python
punkte = 20
if punkte >= 20:
    print("Gold")
elif punkte >= 10:
    print("Silber")
else:
    print("Start")
\`\`\`
Die Ausgabe lautet Gold. Wird die Silber-Prüfung vorgezogen, lautet sie Silber: Eine Kette nimmt den ersten zutreffenden Zweig. Gold wird dann nicht mehr geprüft.
JavaScript schreibt else if statt elif und umschließt Blöcke mit geschweiften Klammern. Die Entscheidungsregel bleibt gleich.
## Schritt für Schritt
1. Suche die einzige Änderung zwischen den Programmen.
2. Verfolge A vom eigenen Anfang bis zur Ausgabe.
3. Starte B erneut mit seinen Startwerten.
4. Vergleiche Ausgaben und Zustände; auch Gleichheit ist möglich.
Voraussetzungen: Vergleiche, if/else und Entscheidungsketten. Es kommen keine neuen Sprachmittel hinzu.`,
    tasks: [
      ['change-boundary-v1', 'Eine kleine Änderung an der Levelgrenze', 'In B wird >= durch > ersetzt. Alles andere bleibt gleich.', 'Beide Programme starten getrennt. Bestimme die Ausgabe von A und von B.', ['>= schließt die Grenze ein, > schließt sie aus.', 'Prüfe B mit seinen eigenen Startpunkten. Gleiche Ausgaben sind möglich.'], { points: 5 }, ['Weiter', 'Warten'], [{ punkte: 5 }, { punkte: 5 }], { a: 'text:Weiter', b: 'text:Warten' }],
      ['change-stock-v1', 'Die letzte Bestellung aus dem Lager', 'Die Bestellung ist genau so groß wie der Bestand. B verwendet < statt <=.', 'Beide Programme starten getrennt. Bestimme den Bestand nach A und nach B.', ['Bei Gleichheit ist <= wahr und die Bestellung wird abgezogen.', 'Bei Gleichheit ist < falsch und die Zuweisung wird übersprungen.'], { stock: 4 }, [0, 4], [{ bestand: 0, bestellung: 4 }, { bestand: 4, bestellung: 4 }], { a: 'n:0', b: 'n:4' }],
      ['change-priority-v1', 'Welche Auszeichnung hat Vorrang?', 'In B wird zuerst Silber geprüft; in A steht die Gold-Prüfung an erster Stelle.', 'Beide Programme starten getrennt. Bestimme die Ausgabe von A und von B.', ['A nimmt den ersten passenden Zweig: prüfe die Gold-Schwelle zuerst.', 'B nimmt ebenfalls den ersten Treffer und prüft danach Gold nicht mehr.'], { points: 20 }, ['Gold', 'Silber'], [{ punkte: 20 }, { punkte: 20 }], { a: 'text:Gold', b: 'text:Silber' }]
    ] }
];
for (const family of families) {
  const dir = new URL(`../skills/${family.name}/`, import.meta.url); await mkdir(dir, { recursive: true });
  // Die spätere Aufgabenwerkstatt und ihre Einführung beim historischen Bootstrap erhalten.
  if (family.name === 'verzweigungen') { try { if ((await readFile(new URL('SKILL.md', dir), 'utf8')).includes('generation_contract: branch-workshop-v1')) continue; } catch { /* Erstinstallation. */ } }
  const templates = family.tasks.map(([id, title, context, prompt, hints], i) => ({ id, chapter: 2, mode: family.objective, difficulty: i + 1, type: 'gap-fill', title, context, prompt, choicePrompt: `${prompt} Wähle genau ein Antwortpaar.`, criteria: [family.objective, 'trace-selected-path'], hints }));
  const cases = family.tasks.map(([template_id, , , , , parameters, outputs, finalStates, solution]) => ({ template_id, parameters, outputs, finalStates, solution }));
  const skill = `---\nname: ${family.name}\ndescription: ${JSON.stringify(family.description)}\nversion: "1.0"\nstatus: approved\nchapter: 2\nlearning_objective: ${family.objective}\ndifficulty_levels: [1, 2, 3]\ninteraction_types: ["gap-fill", "single-choice"]\ninstruction_language: de\nlearner_language: de\ncontent: content.de.md\ntemplates: templates.json\nexamples: examples.json\n---\n\n# ${family.title}\n\nWähle nur eine der mitgelieferten Vorlagen. Nur JSON mit template_id und parameters. Verwende genau die Parameter der gewählten Vorlage und ganze Zahlen innerhalb ihrer parameter_ranges. Kein Code, keine Lösung, keine freien Texte.\n\nOptional variation: {"names":"standard","answer_form":"original"} oder {"names":"standard","answer_form":"single-choice"}. Nur variation_choices der Vorlage sind zulässig. Kontextnamen bleiben erhalten. Die App berechnet Ablauf, Antworten und Hinweise aus freigegebenen Programmen.\n`;
  for (const [name, text] of [['SKILL.md', skill], ['content.de.md', `${family.content}\n`], ['templates.json', JSON.stringify({ version: 1, templates }, null, 2)], ['examples.json', JSON.stringify({ version: 1, cases }, null, 2)]]) await writeFile(new URL(name, dir), text, 'utf8');
}
const registryUrl = new URL('../skills/catalog.json', import.meta.url);
const registry = JSON.parse(await readFile(registryUrl, 'utf8'));
registry.skills = [...new Set([...registry.skills, ...families.map(f => f.name)])];
await writeFile(registryUrl, JSON.stringify(registry, null, 2) + '\n');
