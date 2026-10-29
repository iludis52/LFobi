# Nur den Rest einer Runde überspringen
## continue ist kein Schleifenende
continue überspringt den restlichen Rumpf der aktuellen Runde. Die Schleife geht danach weiter: Bei while folgt die nächste Bedingungsprüfung, bei for der nächste Schleifenwert.
## Beispiel in Python
```python
zaehler = 0
summe = 0
while zaehler < 4:
    zaehler = zaehler + 1
    if zaehler == 2:
        continue
    summe = summe + zaehler
print(summe)
```
## Dasselbe in JavaScript
```javascript
let zaehler = 0;
let summe = 0;
while (zaehler < 4) {
    zaehler = zaehler + 1;
    if (zaehler === 2) { continue; }
    summe = summe + zaehler;
}
console.log(summe);
```
Die Summe ist 1 + 3 + 4 = 8. Alle vier Runden wurden betreten, aber nur drei Beiträge addiert. Der Zähler endet bei 4.
## Zustandsänderung vor continue
Würde die notwendige Zähleränderung hinter continue stehen, könnte sie dauerhaft übersprungen werden. Deshalb erhöhen unsere while-Beispiele den Zähler vor der Entscheidung. Alle Aufgaben enden.
Bei for läuft die Fortschaltung auch nach continue weiter. break dagegen beendet die Schleife vollständig. Eine Aufgabe auf Stufe 3 kombiniert beide, ohne verschachtelte Schleifen.
