# Feste Wiederholungen
## Eine Anweisung mehrmals ausführen
Eine Schleife wiederholt ihren eingerückten Rumpf. Ein Durchlauf heißt auch Iteration. Zähle Durchläufe, nicht die Anzahl der sichtbaren Codezeilen.
## Beispiel in Python
```python
punkte = 0
for schritt in range(3):
    punkte = punkte + 1
print(punkte)
```
## Dasselbe in JavaScript
```javascript
let punkte = 0;
for (let schritt = 0; schritt < 3; schritt = schritt + 1) {
    punkte = punkte + 1;
}
console.log(punkte);
```
Der Rumpf läuft für schritt = 0, 1 und 2: insgesamt dreimal. Am Ende werden 3 Punkte ausgegeben. Die letzte Ausgabe steht außerhalb der Schleife und läuft einmal.
## Grenzen genau lesen
range(0) liefert keinen Schleifenwert. Der Rumpf wird keinmal ausgeführt. Die Anweisungen davor und danach laufen trotzdem.
range(1, 6, 2) liefert 1, 3 und 5. Die drei Zahlen bedeuten Start, ausgeschlossene Stopgrenze und Schrittweite. Entsprechend verwendet JavaScript Start 1, Vergleich < 6 und Erhöhung um 2.
Die Schrittweite der Schleifenvariable und die Änderung von punkte sind zwei verschiedene Dinge.
## Unterschiede der Sprachen
Python behält nach einer nicht leeren for-Schleife den letzten Wert von schritt. Bei JavaScript ist let schritt im for-Kopf nur innerhalb der Schleife verfügbar. Unsere Fragen nach dem Endzustand verwenden deshalb punkte, nicht schritt.
Voraussetzungen: Zuweisungen und Vergleiche. Hier gibt es keine Listen, verschachtelten Schleifen oder eigenen Funktionen.
