# Einen Ablauf benennen
## Eine Definition ist noch kein Aufruf
Eine Funktion beschreibt einen wiederverwendbaren Ablauf. Erst ein Aufruf führt ihren Rumpf aus. In unseren Beispielen stehen Definitionen immer vor ihren Aufrufen, sodass wir noch keine sprachspezifischen Vorabregeln benötigen.
## Python
```python
def berechnen(zahl, bonus):
    return zahl * 2 + bonus
ergebnis = berechnen(3, 1)
print(ergebnis)
```
## JavaScript
```javascript
function berechnen(zahl, bonus) {
    return zahl * 2 + bonus;
}
let ergebnis = berechnen(3, 1);
console.log(ergebnis);
```
zahl und bonus heißen Parameter. 3 und 1 sind die übergebenen Argumente. Die Rückgabe ist 7. Werden die Argumente vertauscht, ändern sich ihre Zuordnungen und hier auch das Ergebnis.
Jeder Aufruf besitzt eigene Parameter. Zahlen werden durch eine lokale Neuzuweisung nicht im aufrufenden Programm ersetzt. Die Rückgabe muss dort ausdrücklich weiterverwendet oder zugewiesen werden.
In der Ablaufansicht bezeichnet main das Hauptprogramm. Namen wie berechnen#1 kennzeichnen den ersten konkreten Funktionsaufruf.
