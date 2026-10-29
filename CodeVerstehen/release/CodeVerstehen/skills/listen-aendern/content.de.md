# Elemente hinzufügen, ersetzen und entfernen
## Änderungen wirken auf die Sammlung
Eine Zuweisung an werte[1] ersetzt das zweite Element und verändert die Länge nicht. Ein neues Element hinten vergrößert die Sammlung.
## Python
```python
werte = [2, 3, 4]
werte.append(9)
werte[1] = 7
entfernt = werte.pop()
print(entfernt)
```
## JavaScript
```javascript
let werte = [2, 3, 4];
werte.push(9);
werte[1] = 7;
let entfernt = werte.pop();
console.log(entfernt);
```
pop() entfernt in beiden Sprachen das letzte Element und liefert es zurück: hier 9. Danach bleibt [2, 7, 4].
## Eine bestimmte Position entfernen
Python werte.pop(0) entfernt Index 0 und liefert das entfernte Element. JavaScript werte.splice(0, 1) entfernt ab Index 0 genau ein Element und liefert ein Array der entfernten Elemente. In unseren Aufgaben werden diese unterschiedlichen Rückgaben nicht weiterverwendet.
Nach einer Entfernung rücken spätere Elemente auf kleinere Indizes. Ein anschließend angehängter Wert kommt hinten an.
append liefert in Python None, push liefert in JavaScript die neue Länge. Hier wird nur die gemeinsame Änderung betrachtet. Eine Methode ist ein Aufruf am vorhandenen Objekt.
