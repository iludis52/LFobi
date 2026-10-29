// Learning text and independent example answers. Never derived from execution.
export const advancedFamilies=[
  [3,'loop-break','schleifen-abbrechen','Schleifen mit break abbrechen',`# Eine Schleife vorzeitig beenden
## break beendet die ganze Schleife
Eine Schleife muss nicht bis zur falschen Bedingung laufen. break beendet sofort die innerste Schleife. Nachfolgende Anweisungen des aktuellen Rumpfs und alle weiteren Runden entfallen. Danach geht es hinter der Schleife weiter.
## Beispiel in Python
\`\`\`python
zaehler = 0
while zaehler < 6:
    zaehler = zaehler + 1
    if zaehler == 3:
        break
print(zaehler)
\`\`\`
## Dasselbe in JavaScript
\`\`\`javascript
let zaehler = 0;
while (zaehler < 6) {
    zaehler = zaehler + 1;
    if (zaehler === 3) { break; }
}
console.log(zaehler);
\`\`\`
Das Ergebnis ist 3. Der dritte Durchlauf wurde betreten. Der nächste Vergleich zaehler < 6 wird nicht mehr ausgeführt; wir dürfen ihn in der Ablaufansicht nicht als falsch ausgeben.
## Reihenfolge beachten
Steht break vor einer Addition, fehlt die Addition dieser Runde. Steht sie davor, wurde sie bereits ausgeführt. Bei for werden die restlichen vorgesehenen Schleifenwerte ebenfalls nicht mehr besucht.
== prüft Gleichheit in Python; JavaScript verwendet in diesen Beispielen ===. Zuweisung bleibt =.
Voraussetzungen: Vergleiche, if, for und while. Hier werden noch keine Listen vorausgesetzt.`],
  [3,'loop-continue','schleifen-fortsetzen','Runden mit continue überspringen',`# Nur den Rest einer Runde überspringen
## continue ist kein Schleifenende
continue überspringt den restlichen Rumpf der aktuellen Runde. Die Schleife geht danach weiter: Bei while folgt die nächste Bedingungsprüfung, bei for der nächste Schleifenwert.
## Beispiel in Python
\`\`\`python
zaehler = 0
summe = 0
while zaehler < 4:
    zaehler = zaehler + 1
    if zaehler == 2:
        continue
    summe = summe + zaehler
print(summe)
\`\`\`
## Dasselbe in JavaScript
\`\`\`javascript
let zaehler = 0;
let summe = 0;
while (zaehler < 4) {
    zaehler = zaehler + 1;
    if (zaehler === 2) { continue; }
    summe = summe + zaehler;
}
console.log(summe);
\`\`\`
Die Summe ist 1 + 3 + 4 = 8. Alle vier Runden wurden betreten, aber nur drei Beiträge addiert. Der Zähler endet bei 4.
## Zustandsänderung vor continue
Würde die notwendige Zähleränderung hinter continue stehen, könnte sie dauerhaft übersprungen werden. Deshalb erhöhen unsere while-Beispiele den Zähler vor der Entscheidung. Alle Aufgaben enden.
Bei for läuft die Fortschaltung auch nach continue weiter. break dagegen beendet die Schleife vollständig. Eine Aufgabe auf Stufe 3 kombiniert beide, ohne verschachtelte Schleifen.`],
  [4,'list-access','listen-lesen','Listen und Indizes',`# Mehrere Werte gemeinsam speichern
## Element, Index und Länge
Python-Listen und JavaScript-Arrays speichern geordnete Elemente. Der Index ist eine Position ab 0, nicht der Inhalt des Elements. Die Länge zählt alle Elemente. Bei Länge 3 sind 0, 1 und 2 gültige Indizes.
## Python
\`\`\`python
werte = [4, 7, 9]
print(werte[0])
print(len(werte))
\`\`\`
## JavaScript
\`\`\`javascript
let werte = [4, 7, 9];
console.log(werte[0]);
console.log(werte.length);
\`\`\`
Die Ausgaben sind 4 und 3. Das letzte Element steht bei len(werte) - 1 beziehungsweise werte.length - 1.
## Leere Sammlung und Grenzen
Eine leere Sammlung [] hat Länge 0 und kein erstes Element. Prüfe vor einem Zugriff, ob die Länge größer als 0 ist. Die Aufgaben auf Stufe 3 zeigen diesen Schutz und einen Ersatzwert.
Python löst bei einem ungültigen Listenindex einen IndexError aus. JavaScript liefert für eine nicht vorhandene Arrayposition undefined. Python erlaubt etwa [-1] für das letzte Element; JavaScript [-1] ist kein Zugriff vom Ende. Unsere gemeinsamen Beispiele berechnen deshalb Länge minus 1.
Die App führt in diesem Kapitel keine ungültigen Zugriffe aus. Mengen und Tupel sind optionale Vertiefungen.`],
  [4,'list-change','listen-aendern','Listen verändern',`# Elemente hinzufügen, ersetzen und entfernen
## Änderungen wirken auf die Sammlung
Eine Zuweisung an werte[1] ersetzt das zweite Element und verändert die Länge nicht. Ein neues Element hinten vergrößert die Sammlung.
## Python
\`\`\`python
werte = [2, 3, 4]
werte.append(9)
werte[1] = 7
entfernt = werte.pop()
print(entfernt)
\`\`\`
## JavaScript
\`\`\`javascript
let werte = [2, 3, 4];
werte.push(9);
werte[1] = 7;
let entfernt = werte.pop();
console.log(entfernt);
\`\`\`
pop() entfernt in beiden Sprachen das letzte Element und liefert es zurück: hier 9. Danach bleibt [2, 7, 4].
## Eine bestimmte Position entfernen
Python werte.pop(0) entfernt Index 0 und liefert das entfernte Element. JavaScript werte.splice(0, 1) entfernt ab Index 0 genau ein Element und liefert ein Array der entfernten Elemente. In unseren Aufgaben werden diese unterschiedlichen Rückgaben nicht weiterverwendet.
Nach einer Entfernung rücken spätere Elemente auf kleinere Indizes. Ein anschließend angehängter Wert kommt hinten an.
append liefert in Python None, push liefert in JavaScript die neue Länge. Hier wird nur die gemeinsame Änderung betrachtet. Eine Methode ist ein Aufruf am vorhandenen Objekt.`],
  [4,'list-iteration','listen-durchlaufen','Listen elementweise durchlaufen',`# Jedes Element bearbeiten
## Werte statt Positionen
for wert in werte und for (const wert of werte) liefern hier nacheinander die Werte. wert ist kein Index.
## Python
\`\`\`python
werte = [2, 3, 4]
summe = 0
for wert in werte:
    summe = summe + wert
print(summe)
\`\`\`
## JavaScript
\`\`\`javascript
let werte = [2, 3, 4];
let summe = 0;
for (const wert of werte) {
    summe = summe + wert;
}
console.log(summe);
\`\`\`
Die Summe ist 9. Bei einer leeren Sammlung gibt es keinen Rumpfdurchlauf; eine vorher auf 0 gesetzte Summe bleibt 0.
## Neue Werte erzeugen
Eine Transformation kann jedes Element verdoppeln und das Ergebnis an eine neue Sammlung anhängen. Das ändert die ursprüngliche Sammlung nicht.
## Anzahl und Summe unterscheiden
anzahl = anzahl + 1 zählt passende Elemente. summe = summe + wert sammelt ihre Werte. Eine Bedingung kann festlegen, welche Elemente beitragen.
Wir verändern die gerade durchlaufene Sammlung nicht während der Iteration. Bei JavaScript gilt const wert nur im Schleifenblock. Python behält den letzten besuchten Schleifenwert; die Fragen verwenden die außerhalb initialisierten Ergebnisvariablen.`],
  [4,'map-record','zuordnungen-datensaetze','Zuordnungen und Datensätze',`# Zugriff über Schlüssel
## Position oder Bedeutung?
Eine Liste fragt nach der Position. Ein Dictionary bzw. eine Map fragt nach einem Schlüssel wie "punkte". Ein Schlüssel ist nicht automatisch eine fortlaufende Zahl.
## Python-Dictionary
\`\`\`python
konto = {"punkte": 4, "bonus": 2}
konto["punkte"] = konto["punkte"] + 2
print(konto["punkte"])
print(len(konto))
\`\`\`
## JavaScript-Map
\`\`\`javascript
let konto = new Map([["punkte", 4], ["bonus", 2]]);
konto.set("punkte", konto.get("punkte") + 2);
console.log(konto.get("punkte"));
console.log(konto.size);
\`\`\`
Die Ausgaben sind 6 und 2. Ein vorhandener Schlüssel wird ersetzt; ein neuer Schlüssel vergrößert die Zuordnung. Python .keys() bzw. JavaScript .keys() liefert hier die Schlüssel. Erst ein weiterer Zugriff liefert den Wert.
## Datensätze bündeln Felder
{"name": "Ada", "punkte": 4} ist in Python ein Dictionary und in JavaScript ein Objekt als Datensatz. Für diese festen Felder verwenden beide Sprachen hier ["punkte"]. Eine Liste kann mehrere solcher Datensätze enthalten; personen[1]["name"] liest den Namen des zweiten.
Ein Datensatz gehört zu einer Person, nicht zu einem einzelnen Tabellenwert. Map und JavaScript-Objekt sind verschiedene Typen: get/set gehört zur Map, der Feldzugriff hier zum Objekt.
Alle verwendeten Schlüssel existieren. Fehlende Schlüssel werden nicht sprachübergreifend gleichgesetzt.`],
  [4,'text-processing','texte-verarbeiten','Texte zerlegen und zusammensetzen',`# Text als verarbeitbare Daten
## Zerlegen, verbinden, suchen
split zerlegt Text anhand eines Trennzeichens in eine Liste bzw. ein Array. join verbindet Teile mit einem gewählten Trennzeichen. Die ursprünglichen Texte werden dabei nicht verändert.
## Python
\`\`\`python
teile = "rot|blau".split("|")
text = "-".join(teile).upper()
print(text)
print(text.find("BLAU"))
\`\`\`
## JavaScript
\`\`\`javascript
let teile = "rot|blau".split("|");
let text = teile.join("-").toUpperCase();
console.log(text);
console.log(text.indexOf("BLAU"));
\`\`\`
Die Ergebnisse sind ROT-BLAU und 4. Suchpositionen beginnen bei 0. Ein nicht gefundener Text liefert bei find/indexOf −1. upper/lower bzw. toUpperCase/toLowerCase erzeugen neue Texte.
## Ersetzen und Sprachunterschiede
Python text.replace("rot", "blau") ersetzt alle Vorkommen. JavaScripts replace mit einem Textargument ersetzt nur das erste. Unsere JavaScript-Aufgaben verwenden deshalb split("rot").join("blau"), damit beide rot-Vorkommen ersetzt werden.
Die Beispiele verwenden einfache ASCII-Texte. Unicode-Indizes, reguläre Ausdrücke und das unterschiedliche Verhalten von split bei leerem Trenner gehören nicht zum gemeinsamen Vertrag.`],
  [4,'collection-transform','sammlungen-transformieren','Filtern, sortieren und zusammenfassen',`# Eine Verarbeitung in Schritte zerlegen
## Filtern
Eine Bedingung wählt aus, welche Elemente in eine neue Sammlung übernommen werden. Die übrigen fehlen im Ergebnis. Filtern verändert hier die ursprüngliche Sammlung nicht.
## Transformieren
Jedes ausgewählte Element kann etwa verdoppelt werden. Das Ergebnis dieses Schritts ist Eingabe des nächsten Schritts.
## Numerisch sortieren
Python sortiert eine Zahlenliste mit werte.sort() aufsteigend. JavaScript verwendet dafür hier einen Vergleich:
\`\`\`javascript
werte.sort((links, rechts) => links - rechts);
\`\`\`
Die Vergleichsfunktion liefert bei kleinerem linken Wert eine negative Zahl. Sie wird vom Sortierverfahren mit Elementpaaren aufgerufen. Die Funktion ist vorgegeben; eigene Funktionen folgen in Kapitel 5.
JavaScript sort() ohne Vergleich ordnet nach Text: 10 kann dann vor 2 stehen. Beide gezeigten numerischen Sortierungen verändern die Sammlung an Ort und Stelle.
## Zusammenfassen
Eine nachfolgende Schleife kann alle Ergebnisse aufsummieren. Beispiel: Aus [4, 1, 3] werden nach Filtern > 1 und Verdoppeln [8, 6], nach Sortieren [6, 8], schließlich Summe 14.
## Vorgehen
1. Verfolge die ursprünglichen Werte.
2. Wende die Bedingung an.
3. Berechne neue Werte nur für übernommene Elemente.
4. Sortiere numerisch, wenn gefordert.
5. Unterscheide Anzahl, kleinsten Wert und Summe.`],
  [5,'function-call','funktionen-aufrufen','Definition, Aufruf und Parameter',`# Einen Ablauf benennen
## Eine Definition ist noch kein Aufruf
Eine Funktion beschreibt einen wiederverwendbaren Ablauf. Erst ein Aufruf führt ihren Rumpf aus. In unseren Beispielen stehen Definitionen immer vor ihren Aufrufen, sodass wir noch keine sprachspezifischen Vorabregeln benötigen.
## Python
\`\`\`python
def berechnen(zahl, bonus):
    return zahl * 2 + bonus
ergebnis = berechnen(3, 1)
print(ergebnis)
\`\`\`
## JavaScript
\`\`\`javascript
function berechnen(zahl, bonus) {
    return zahl * 2 + bonus;
}
let ergebnis = berechnen(3, 1);
console.log(ergebnis);
\`\`\`
zahl und bonus heißen Parameter. 3 und 1 sind die übergebenen Argumente. Die Rückgabe ist 7. Werden die Argumente vertauscht, ändern sich ihre Zuordnungen und hier auch das Ergebnis.
Jeder Aufruf besitzt eigene Parameter. Zahlen werden durch eine lokale Neuzuweisung nicht im aufrufenden Programm ersetzt. Die Rückgabe muss dort ausdrücklich weiterverwendet oder zugewiesen werden.
In der Ablaufansicht bezeichnet main das Hauptprogramm. Namen wie berechnen#1 kennzeichnen den ersten konkreten Funktionsaufruf.`],
  [5,'function-return','rueckgabe-ausgabe','Rückgabe und Ausgabe unterscheiden',`# Wohin geht das Ergebnis?
## return liefert an den Aufrufer
print bzw. console.log zeigt etwas an. return liefert einen Wert an die Stelle zurück, an der die Funktion aufgerufen wurde. Eine Ausgabe ersetzt keine Rückgabe.
## Python
\`\`\`python
def zeigen(zahl):
    print(zahl * 2)
rueckgabe = zeigen(3)
print(rueckgabe)
\`\`\`
## JavaScript
\`\`\`javascript
function zeigen(zahl) {
    console.log(zahl * 2);
}
let rueckgabe = zeigen(3);
console.log(rueckgabe);
\`\`\`
Zuerst wird 6 ausgegeben. Danach zeigt die letzte Ausgabe Python None beziehungsweise JavaScript undefined: Die Funktion hat keinen Wert ausdrücklich zurückgegeben. Das ist weder die Zahl 0 noch die ausgegebene 6.
## Frühe Rückkehr
return beendet den aktuellen Aufruf sofort. Eine spätere Rückgabe in derselben Funktion wird in diesem Aufruf nicht mehr erreicht. Eine Bedingung kann so verschiedene Rückgabewerte auswählen.
Die Aufgaben fragen nach den beiden letzten Ausgaben. Frühere Ausgaben aus einer Funktion sind zusätzliche Seiteneffekte und bleiben im Ablauf sichtbar.`],
  [5,'function-scope','gueltigkeitsbereiche','Lokale und globale Namen',`# Derselbe Name kann verschiedene Werte meinen
## main und lokale Aufrufe
Ein im Hauptprogramm angelegter Name gehört hier zum globalen Bereich main. Parameter und innerhalb einer Funktion angelegte Namen sind lokal. Ein lokaler Name kann einen globalen Namen verdecken.
## Python
\`\`\`python
wert = 3
def aendern(wert):
    wert = wert + 2
    return wert
print(aendern(wert))
print(wert)
\`\`\`
## JavaScript
\`\`\`javascript
let wert = 3;
function aendern(wert) {
    wert = wert + 2;
    return wert;
}
console.log(aendern(wert));
console.log(wert);
\`\`\`
Die Ausgaben sind 5 und 3. Der Parameter wurde neu zugewiesen; der globale Name bleibt unverändert. Eine Rückgabe ist kein automatisches Zurückschreiben des Parameters.
## Jeder Aufruf beginnt neu
Lokale Variablen werden bei jedem Aufruf neu angelegt. Eine lokale Erhöhung speichert ohne ausdrücklichen gemeinsamen Zustand keinen Fortschritt für spätere Aufrufe.
Die Tabelle kennzeichnet den Bereich und die Nummer des Aufrufs. Sie zeigt innerhalb einer Funktion den sichtbaren lokalen Wert, bei Rückkehr wieder den Hauptprogrammbereich. Python global/nonlocal, Closures und weitere JavaScript-Blockregeln bleiben spätere Vertiefungen.`],
  [5,'function-effect','seiteneffekte','Seiteneffekte und Neuzuweisung',`# Rückgabe und weitere Wirkung
## Eine Funktion kann mehr tun als zurückgeben
Eine Ausgabe ist ein sichtbarer Seiteneffekt. Auch das Verändern einer übergebenen Sammlung kann außerhalb des Aufrufs sichtbar bleiben.
## Python
\`\`\`python
def ergaenzen(daten):
    daten.append(9)
    return len(daten)
werte = [2, 3]
print(ergaenzen(werte))
print(werte[2])
\`\`\`
## JavaScript
\`\`\`javascript
function ergaenzen(daten) {
    daten.push(9);
    return daten.length;
}
let werte = [2, 3];
console.log(ergaenzen(werte));
console.log(werte[2]);
\`\`\`
Beide Namen sprechen während des Aufrufs dieselbe Sammlung an. Die Länge wird 3 und das angehängte Element ist beim Aufrufer als 9 sichtbar.
## Lokal neu zuweisen ist etwas anderes
daten = [8, 9] innerhalb der Funktion bindet den lokalen Parameter an eine neue Sammlung. Die ursprüngliche Sammlung des Aufrufers bleibt erhalten. Verändern eines Objekts und Neuzuweisen eines Namens sind verschiedene Vorgänge.
Dieses konkrete Beispiel führt den nötigen Unterschied ein. Umfassende Referenzmodelle, Kopien und tief verschachtelte Daten gehören zu Kapitel 6.`],
  [5,'function-compose','funktionen-verknuepfen','Funktionen verknüpfen',`# Eine Rückgabe wird zum nächsten Argument
## Von innen nach außen
Bei doppelt(plus_eins(3)) wird zuerst plus_eins(3) ausgeführt. Dessen Rückgabe 4 wird an doppelt übergeben. Ergebnis: 8.
## Python
\`\`\`python
def plus_eins(zahl):
    return zahl + 1
def doppelt(zahl):
    return zahl * 2
print(doppelt(plus_eins(3)))
\`\`\`
## JavaScript
\`\`\`javascript
function plus_eins(zahl) { return zahl + 1; }
function doppelt(zahl) { return zahl * 2; }
console.log(doppelt(plus_eins(3)));
\`\`\`
## Die Reihenfolge zählt
plus_eins(doppelt(3)) ergibt 7. Dieselben Funktionen können in anderer Reihenfolge etwas anderes berechnen.
## In einer Schleife verwenden
Eine Funktion kann für jedes Element aufgerufen werden. Die aufrufende Schleife sammelt die Rückgaben in einer Summe. Die Zahl der Funktionsaufrufe entspricht dann der Zahl der tatsächlich besuchten Elemente.
Verfolge in der Tabelle jeden Aufruf getrennt. Funktionskomposition ist die Weitergabe von Rückgabewerten; sie ist nicht die später in der Objektorientierung verwendete Objektkomposition.`],
  [5,'function-module','module-schnittstellen','Module, Methoden und Schnittstellen',`# Vorhandene Bausteine benutzen
## Bibliothek, Namensraum und Import
Python import math macht den Namensraum math verfügbar, zum Beispiel math.floor(4.5) und math.sqrt(9). JavaScript besitzt Math bereits eingebaut: Math.floor(4.5), Math.sqrt(9). Die Ergebnisse sind 4 und 3.
## Eigener, vollständig sichtbarer Baustein
Die Aufgaben verwenden genau diesen Python-Baustein lernbausteine.py:
\`\`\`python
grundbonus = 2
def mit_bonus(wert, bonus):
    return wert + bonus
def verdoppeln(wert):
    return wert * 2
\`\`\`
Dasselbe Modul heißt in JavaScript lesson-tools.js:
\`\`\`javascript
export const grundbonus = 2;
export function mitBonus(wert, bonus) { return wert + bonus; }
export function verdoppeln(wert) { return wert * 2; }
\`\`\`
## Vertrag und Dokumentation
mit_bonus/mitBonus erwartet zwei Zahlen und liefert deren Summe, ohne diese Zahlen zu verändern. verdoppeln erwartet eine Zahl und liefert das Doppelte. grundbonus ist die Zahl 2. Diese Angaben bilden die Schnittstelle; sie sind kein verborgenes Wissen.
Python importiert etwa mit from lernbausteine import mit_bonus. JavaScript importiert mit import { mitBonus } from "./lesson-tools.js". as kann jeweils einen lokalen Alias vergeben. Importieren allein ruft keine der Funktionen auf.
## Objekt, Attribut und Methode
werte.length ist in JavaScript eine Eigenschaft. werte.push(9) und text.split("|") sind Methodenaufrufe am vorhandenen Objekt. Eine Methode kann eine Rückgabe liefern und/oder ihr Objekt verändern. Python len(werte) ist dagegen ein Funktionsaufruf, werte.append(9) ein Methodenaufruf.
Die mitgelieferten Moduldateien dienen auch zum Nachlesen der Beispiele. Pakete installieren, eigene Klassen, Netzwerkzugriffe und asynchrone Imports sind kein Teil dieser Grundstufe.`]
];

export const advancedExamples={
 'break-first-v1':[{limit:3},[3,3]],'break-sum-v1':[{limit:3},[3,3]],'break-search-v1':[{start:2},[6,2]],
 'continue-one-v1':[{skip:2},[8,4]],'continue-filter-v1':[{skip:2},[8,3]],'continue-break-v1':[{limit:4},[4,4]],
 'list-index-v1':[{start:3,index:1},[4,3]],'list-last-v1':[{start:3},[5,2]],'list-empty-v1':[{count:0},[0,0]],
 'list-append-v1':[{start:3},[4,9]],'list-replace-v1':[{start:3,value:8},[8,5]],'list-remove-v1':[{start:3},[4,3]],
 'list-sum-v1':[{start:2},[9,3]],'list-map-v1':[{start:2,factor:3},[9,3]],'list-count-v1':[{start:2},[2,7]],
 'map-key-v1':[{points:4},[4,2]],'map-update-v1':[{points:4},[6,2]],'record-loop-v1':[{points:4},[10,'Ben']],'map-total-v1':[{points:4},[6,2]],
 'text-split-v1':[{index:1},['blau',3]],'text-join-v1':[{index:1},['ROT-BLAU',4]],'text-replace-v1':[{missing:1},['rot-rot',-1]],
 'transform-filter-v1':[{start:2},[2,3]],'transform-sort-v1':[{large:11},[1,11]],'transform-summary-v1':[{start:1},[6,14]],
 'function-definition-v1':[{start:3},[3,5]],'function-arguments-v1':[{start:3,bonus:1},[7,5]],'function-repeat-v1':[{start:3},[5,3]],
 'return-value-v1':[{start:3},[6,3]],'print-not-return-v1':[{start:3},[null,3]],'return-early-v1':[{start:1},[1,9]],
 'scope-local-v1':[{start:3},[9,3]],'scope-parameter-v1':[{start:3},[6,3]],'scope-calls-v1':[{start:3},[4,4]],
 'effect-output-v1':[{start:3},[4,3]],'effect-list-v1':[{start:3},[4,9]],'effect-rebind-v1':[{start:3},[2,3]],
 'compose-nested-v1':[{start:3},[8,3]],'compose-order-v1':[{start:3},[8,7]],'compose-loop-v1':[{start:2},[18,3]],
 'module-math-v1':[{start:4},[4,3]],'module-import-v1':[{start:3},[5,3]],'module-interface-v1':[{start:3},[10,2]]
};
