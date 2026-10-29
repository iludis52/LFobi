// Hand-authored references below are not obtained from the task interpreter.
import { mkdir, writeFile, readFile } from 'node:fs/promises';
const families = [
  { name:'feste-wiederholungen', objective:'counted-loop', title:'Feste Wiederholungen mit for',
    description:'Feste Wiederholungszahlen, Änderungen pro Runde und exklusive range-/for-Grenzen verstehen.',
    content:`# Feste Wiederholungen
## Eine Anweisung mehrmals ausführen
Eine Schleife wiederholt ihren eingerückten Rumpf. Ein Durchlauf heißt auch Iteration. Zähle Durchläufe, nicht die Anzahl der sichtbaren Codezeilen.
## Beispiel in Python
\`\`\`python
punkte = 0
for schritt in range(3):
    punkte = punkte + 1
print(punkte)
\`\`\`
## Dasselbe in JavaScript
\`\`\`javascript
let punkte = 0;
for (let schritt = 0; schritt < 3; schritt = schritt + 1) {
    punkte = punkte + 1;
}
console.log(punkte);
\`\`\`
Der Rumpf läuft für schritt = 0, 1 und 2: insgesamt dreimal. Am Ende werden 3 Punkte ausgegeben. Die letzte Ausgabe steht außerhalb der Schleife und läuft einmal.
## Grenzen genau lesen
range(0) liefert keinen Schleifenwert. Der Rumpf wird keinmal ausgeführt. Die Anweisungen davor und danach laufen trotzdem.
range(1, 6, 2) liefert 1, 3 und 5. Die drei Zahlen bedeuten Start, ausgeschlossene Stopgrenze und Schrittweite. Entsprechend verwendet JavaScript Start 1, Vergleich < 6 und Erhöhung um 2.
Die Schrittweite der Schleifenvariable und die Änderung von punkte sind zwei verschiedene Dinge.
## Unterschiede der Sprachen
Python behält nach einer nicht leeren for-Schleife den letzten Wert von schritt. Bei JavaScript ist let schritt im for-Kopf nur innerhalb der Schleife verfügbar. Unsere Fragen nach dem Endzustand verwenden deshalb punkte, nicht schritt.
Voraussetzungen: Zuweisungen und Vergleiche. Hier gibt es keine Listen, verschachtelten Schleifen oder eigenen Funktionen.`,
    tasks:[
      ['repeat-fixed-v1','Wie oft werden Punkte hinzugefügt?','Ein Spiel vergibt in jeder Runde einen Punkt.',{count:3},[3],[3],[3]],
      ['repeat-step-v1','Mehrere Punkte pro Runde','Jede Spielrunde erhöht die vorhandenen Punkte um einen festen Betrag.',{count:3,amount:2},[4,6,8,8],[3],[8]],
      ['repeat-range-v1','Die Stopgrenze zählt nicht mit','Ein Trainingsplan besucht nur jeden zweiten Schleifenwert.',{start:1,stop:6},[1,2,3,3],[3],[3]]
    ] },
  { name:'bedingte-wiederholungen', objective:'while-loop', title:'Bedingungsgesteuerte Wiederholung',
    description:'while vor jedem Durchlauf prüfen, Zähler verändern, Null-Durchläufe und Überschreiten von Grenzen verstehen.',
    content:`# Wiederholen, solange eine Bedingung wahr ist
## while prüft immer wieder
Eine if-Anweisung entscheidet einmal. Eine while-Schleife prüft vor jedem Durchlauf erneut mit den aktuellen Werten. Ist die Bedingung schon am Anfang falsch, läuft ihr Rumpf keinmal.
## Beispiel in Python
\`\`\`python
zaehler = 0
while zaehler < 3:
    zaehler = zaehler + 1
print(zaehler)
\`\`\`
## Dasselbe in JavaScript
\`\`\`javascript
let zaehler = 0;
while (zaehler < 3) {
    zaehler = zaehler + 1;
}
console.log(zaehler);
\`\`\`
Die Prüfungen verwenden 0, 1, 2 und schließlich 3. Dreimal ist < 3 wahr, danach falsch. Vier Prüfungen bedeuten also nur drei Durchläufe. Die letzte Ausgabe zeigt 3.
## Schritt für Schritt
1. Lies die aktuellen Werte vor der Prüfung.
2. Ist die Bedingung wahr, führe den ganzen Rumpf aus.
3. Gehe danach zur Bedingung zurück.
4. Ist sie falsch, fahre nach der Schleife fort.
Bei einer Erhöhung um 2 kann der Zähler die Grenze überspringen. Er muss nicht genau auf dem Grenzwert enden. Ein Countdown verwendet eine Verringerung und endet, sobald sein Vergleich falsch wird.
## Warum endet die Schleife?
Eine passende Zustandsänderung führt zur falschen Bedingung. Bleibt ein Zähler bei wahrer Bedingung unverändert, kann die Schleife endlos laufen. Unsere Aufgaben verwenden nur kurze, endende Schleifen. break, continue und Verschachtelung folgen später.
Die Ablauftabelle trennt die einzelnen Ausführungen derselben Zeile. Die letzte Prüfungsrunde hat keinen weiteren Rumpfdurchlauf.`,
    tasks:[
      ['while-up-v1','Vor jeder Runde neu prüfen','Ein Zähler steigt bis zu einer festgelegten Grenze.',{start:1,distance:2},[3],[2],[3]],
      ['while-down-v1','Ein Countdown läuft rückwärts','Ein Countdown verringert den Zähler und zeigt ihn nach jeder Änderung.',{start:3},[2,1,0,0],[3],[0]],
      ['while-jump-v1','Die Grenze überspringen','Ein Zähler steigt in Zweierschritten und kann über die Grenze hinausgehen.',{start:0,distance:3},[2,4,4],[2],[4]]
    ] },
  { name:'zaehler-und-summen', objective:'loop-accumulator', title:'Zähler und aufsummierte Werte',
    description:'Zähler von Akkumulator unterscheiden und die Reihenfolge von Zähleränderung und Summierung verfolgen.',
    content:`# Zähler und Summe
## Zwei verschiedene Aufgaben
Ein Zähler verfolgt den Fortschritt. Ein Akkumulator sammelt Werte über mehrere Durchläufe. Er wird vor der Schleife initialisiert, damit die vorherige Summe nicht in jeder Runde verloren geht.
## Beispiel in Python
\`\`\`python
zaehler = 1
summe = 0
while zaehler <= 3:
    summe = summe + zaehler
    zaehler = zaehler + 1
print(summe)
\`\`\`
## Dasselbe in JavaScript
\`\`\`javascript
let zaehler = 1;
let summe = 0;
while (zaehler <= 3) {
    summe = summe + zaehler;
    zaehler = zaehler + 1;
}
console.log(summe);
\`\`\`
Die Summe wächst von 0 auf 1, dann 3, dann 6. Der Zähler ist danach 4; die Bedingung <= 3 ist falsch. Summe, letzter addierter Wert und Endzähler sind unterschiedliche Größen.
## Die Reihenfolge verändert die Summe
Wird zuerst der Zähler erhöht, werden in diesem Beispiel 2, 3 und 4 addiert: Summe 9. Es bleiben drei Durchläufe. Eine Änderung der Reihenfolge kann also das Ergebnis ändern, ohne die Durchlaufzahl zu ändern.
## Feste Beträge sammeln
Bei einer festen Wiederholungszahl kann jede Runde denselben Betrag zur Summe hinzufügen. Der Rundenzähler steigt dabei um 1, die Summe etwa um 2 oder 3.
Eine Ausgabe im Rumpf zeigt Zwischenstände. Eine Ausgabe nach der Schleife zeigt die Endsumme genau einmal. Beides kann im selben Programm vorkommen.
Voraussetzungen: for, while und Neuzuweisungen. Keine verschachtelten Schleifen.`,
    tasks:[
      ['sum-fixed-v1','Beträge sammeln und Runden zählen','Jede Runde fügt denselben Betrag zur Gesamtsumme hinzu.',{count:3,amount:2},[6],[3],[6]],
      ['sum-counter-v1','Mit dem aktuellen Zähler addieren','Die Summe übernimmt in jeder Runde zuerst den aktuellen Zähler.',{stop:3},[6],[3],[6]],
      ['sum-after-v1','Erst erhöhen, dann aufsummieren','Der Zähler wird vor der Summierung verändert.',{stop:3},[2,5,9,9],[3],[9]]
    ] },
  { name:'schleifenaenderungen', objective:'loop-change', title:'Schleifengrenzen und Reihenfolge ändern',
    description:'Zwei unabhängige Schleifenabläufe vergleichen: Grenzwert, Schrittweite und Reihenfolge der Zustandsänderungen.',
    content:`# Kleine Änderungen an Schleifen
## Programme getrennt verfolgen
Programm A und B beginnen jeweils mit ihren eigenen Startwerten. Der Endwert von A wird nicht zum Startwert von B.
## Grenze einschließen oder ausschließen
Mit Startwert 0 und Erhöhung um 1 läuft while zaehler < 3 dreimal und endet bei 3. Bei <= 3 gibt es einen zusätzlichen Durchlauf; der Zähler endet bei 4.
## Python: nur das Vergleichszeichen ändert sich
\`\`\`python
zaehler = 0
while zaehler <= 3:
    zaehler = zaehler + 1
print(zaehler)
\`\`\`
## Dasselbe in JavaScript
\`\`\`javascript
let zaehler = 0;
while (zaehler <= 3) {
    zaehler = zaehler + 1;
}
console.log(zaehler);
\`\`\`
## Größere Schritte bedeuten nicht denselben Endwert
Bei < 5 erreicht eine Erhöhung um 1 den Endwert 5. Mit Erhöhung um 2 entsteht die Folge 0, 2, 4, 6: weniger Durchläufe, aber ein größerer Endwert.
## Reihenfolge beim Summieren
Bei Startzähler 1 und <= 3 sammelt Addieren vor Erhöhen die Werte 1, 2, 3. Erhöhen vor Addieren sammelt 2, 3, 4. Die Endsumme ist 6 beziehungsweise 9.
Prüfe Änderungen immer mit den aktuellen Zuständen. Eine größere Schrittweite muss nicht genau auf der Grenze enden. Die Ablaufansicht unterscheidet Ausführungen und Programme.
Es gibt hier keine freien Codeänderungen und keine Ausführung von Endlosschleifen.`,
    tasks:[
      ['loop-boundary-v1','Eine weitere Runde am Grenzwert','In B wird der Grenzwert durch <= eingeschlossen.',{limit:3},[3,4],[3,4],[3,4]],
      ['loop-stride-v1','Andere Schrittweite, anderer Endwert','B erhöht den Zähler um 2 statt um 1.',{limit:5},[5,6],[5,3],[5,6]],
      ['loop-sum-order-v1','Dieselben Runden, andere Summen','In B wird der Zähler zuerst erhöht und danach zur Summe addiert.',{stop:3},[6,9],[3,3],[6,9]]
    ] }
];
for (const family of families) {
  const directory = new URL(`../skills/${family.name}/`, import.meta.url);
  await mkdir(directory, {recursive:true});
  const templates = family.tasks.map(([id,title,context], index) => ({ id, chapter:3, mode:family.objective,
    difficulty:index+1, type:'gap-fill', title, context,
    prompt:family.objective === 'loop-change' ? 'Beide Programme starten getrennt. Welche letzte Ausgabe erscheint jeweils nach der Schleife?' : 'Wie oft läuft der Rumpf, und was zeigt die letzte Ausgabe nach der Schleife?',
    choicePrompt:family.objective === 'loop-change' ? 'Welche Antwort nennt die letzten Ausgaben von A und B richtig?' : 'Welche Antwort nennt Durchlaufzahl und letzte Ausgabe richtig?',
    criteria:[family.objective,'loop-trace'], hints:family.objective === 'loop-change'
      ? ['Starte A mit eigenen Werten und prüfe nach jeder Änderung erneut.','Starte B getrennt. Beachte die geänderte Grenze, Schrittweite oder Reihenfolge.']
      : ['Zähle nur tatsächlich betretene Rumpfdurchläufe. Die letzte falsche Prüfung ist keine weitere Runde.','Verfolge alle Neuzuweisungen. Die Ausgabe nach der Schleife läuft einmal und verändert keine Variable.'] }));
  const skill = `---\nname: ${family.name}\ndescription: ${JSON.stringify(`Kapitel 3: ${family.description}`)}\nversion: "1.0"\nstatus: approved\nchapter: 3\nlearning_objective: ${family.objective}\ndifficulty_levels: [1, 2, 3]\ninteraction_types: ["gap-fill", "single-choice", "multiple-choice", "diagram-choice", "ordering"]\ninstruction_language: de\nlearner_language: de\ncontent: content.de.md\ntemplates: templates.json\nexamples: examples.json\n---\n\n# ${family.title}\n\n${family.description}\n\nNur JSON: {"template_id":"zugelassene ID","parameters":{"name":1}}. Wähle eine gelieferte Vorlage und genau deren ganzzahlige Parameter innerhalb parameter_ranges. Optional variation: {"names":"standard","answer_form":"original|single-choice"}, ausschließlich entsprechend variation_choices. Keine weiteren Felder, kein Code, keine Lösungen oder freie Texte.\n\nDie App erzeugt ausschließlich kurze, endende Schleifen aus geprüften Plänen, berechnet alle Ausführungen und bestimmt die endgültige Antwortform selbst. Mindestens fünf Formen je Stufe, kein direkt wiederholter Typ. Keine beliebigen Schleifen oder Endlosschleifen entwerfen. Die Erklärung bleibt sichtbar. Einzelne Ergebnisse belegen keine Beherrschung.\n`;
  const cases = family.tasks.map(([id,_title,_context,parameters,outputs,iterations,last]) => ({template_id:id,parameters,outputs,iterations,last,
    gaps:family.objective === 'loop-change' ? {a:`n:${last[0]}`,b:`n:${last[1]}`} : {count:`n:${iterations[0]}`,last:`n:${last[0]}`} }));
  await writeFile(new URL('SKILL.md',directory),skill);
  await writeFile(new URL('content.de.md',directory),`${family.content}\n`);
  await writeFile(new URL('templates.json',directory),`${JSON.stringify({version:1,templates},null,2)}\n`);
  await writeFile(new URL('examples.json',directory),`${JSON.stringify({version:1,cases},null,2)}\n`);
}
const registryUrl = new URL('../skills/catalog.json',import.meta.url);
const registry = JSON.parse(await readFile(registryUrl,'utf8'));
for (const family of families) if (!registry.skills.includes(family.name)) registry.skills.push(family.name);
await writeFile(registryUrl,`${JSON.stringify(registry,null,2)}\n`);
console.log('Kapitel 3: vier Aufgabenfamilien und zwölf Referenzen geschrieben.');
