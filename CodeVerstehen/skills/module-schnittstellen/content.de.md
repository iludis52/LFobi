# Vorhandene Bausteine benutzen
## Bibliothek, Namensraum und Import
Python import math macht den Namensraum math verfügbar, zum Beispiel math.floor(4.5) und math.sqrt(9). JavaScript besitzt Math bereits eingebaut: Math.floor(4.5), Math.sqrt(9). Die Ergebnisse sind 4 und 3.
## Eigener, vollständig sichtbarer Baustein
Die Aufgaben verwenden genau diesen Python-Baustein lernbausteine.py:
```python
grundbonus = 2
def mit_bonus(wert, bonus):
    return wert + bonus
def verdoppeln(wert):
    return wert * 2
```
Dasselbe Modul heißt in JavaScript lesson-tools.js:
```javascript
export const grundbonus = 2;
export function mitBonus(wert, bonus) { return wert + bonus; }
export function verdoppeln(wert) { return wert * 2; }
```
## Vertrag und Dokumentation
mit_bonus/mitBonus erwartet zwei Zahlen und liefert deren Summe, ohne diese Zahlen zu verändern. verdoppeln erwartet eine Zahl und liefert das Doppelte. grundbonus ist die Zahl 2. Diese Angaben bilden die Schnittstelle; sie sind kein verborgenes Wissen.
Python importiert etwa mit from lernbausteine import mit_bonus. JavaScript importiert mit import { mitBonus } from "./lesson-tools.js". as kann jeweils einen lokalen Alias vergeben. Importieren allein ruft keine der Funktionen auf.
## Objekt, Attribut und Methode
werte.length ist in JavaScript eine Eigenschaft. werte.push(9) und text.split("|") sind Methodenaufrufe am vorhandenen Objekt. Eine Methode kann eine Rückgabe liefern und/oder ihr Objekt verändern. Python len(werte) ist dagegen ein Funktionsaufruf, werte.append(9) ein Methodenaufruf.
Die mitgelieferten Moduldateien dienen auch zum Nachlesen der Beispiele. Pakete installieren, eigene Klassen, Netzwerkzugriffe und asynchrone Imports sind kein Teil dieser Grundstufe.
