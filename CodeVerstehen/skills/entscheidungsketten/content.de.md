# Einzelne Entscheidungen und Ketten
## Zwei if prüfen unabhängig
Zwei aufeinanderfolgende if-Anweisungen werden beide geprüft. Sind beide Bedingungen wahr, laufen beide Blöcke. Ein if ohne else überspringt bei einer falschen Bedingung seinen Block.
```python
preis = 20
rabatt = 0
if preis >= 20:
    rabatt = rabatt + 2
if preis >= 10:
    rabatt = rabatt + 1
print(rabatt)
```
Hier beträgt der Rabatt 3: beide Vergleiche sind wahr.
## Eine Kette wählt den ersten Treffer
elif bedeutet in Python eine weitere Prüfung innerhalb derselben Entscheidung. JavaScript schreibt else if. Sobald ein Zweig zutrifft, werden alle späteren Prüfungen und Blöcke dieser Kette übersprungen. Ein abschließendes else wird nur gewählt, wenn keine Prüfung zutrifft.
```python
rabatt = 0
if preis >= 20:
    rabatt = rabatt + 2
elif preis >= 10:
    rabatt = rabatt + 1
print(rabatt)
```
Bei preis = 20 ist der Rabatt 2. Der zweite Vergleich wird gar nicht mehr geprüft.
## Dieselbe Kette in JavaScript
```javascript
let rabatt = 0;
if (preis >= 20) {
    rabatt = rabatt + 2;
} else if (preis >= 10) {
    rabatt = rabatt + 1;
}
console.log(rabatt);
```
## Schritt für Schritt
1. Prüfe, ob es unabhängige if-Anweisungen oder eine Kette sind.
2. Führe bei einzelnen if jede Prüfung durch.
3. Beende die Zweigauswahl einer Kette beim ersten Treffer.
4. Fahre nach den Blöcken mit dem erreichten Zustand fort.
Programm A und B starten immer getrennt; sie teilen keinen Variablenzustand. Voraussetzungen: Bedingungen und Verzweigungen. Neu ist die Entscheidungskette. Sie wird hier vor allen Schwierigkeitsstufen erklärt.
