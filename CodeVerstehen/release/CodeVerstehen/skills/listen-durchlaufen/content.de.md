# Jedes Element bearbeiten
## Werte statt Positionen
for wert in werte und for (const wert of werte) liefern hier nacheinander die Werte. wert ist kein Index.
## Python
```python
werte = [2, 3, 4]
summe = 0
for wert in werte:
    summe = summe + wert
print(summe)
```
## JavaScript
```javascript
let werte = [2, 3, 4];
let summe = 0;
for (const wert of werte) {
    summe = summe + wert;
}
console.log(summe);
```
Die Summe ist 9. Bei einer leeren Sammlung gibt es keinen Rumpfdurchlauf; eine vorher auf 0 gesetzte Summe bleibt 0.
## Neue Werte erzeugen
Eine Transformation kann jedes Element verdoppeln und das Ergebnis an eine neue Sammlung anhängen. Das ändert die ursprüngliche Sammlung nicht.
## Anzahl und Summe unterscheiden
anzahl = anzahl + 1 zählt passende Elemente. summe = summe + wert sammelt ihre Werte. Eine Bedingung kann festlegen, welche Elemente beitragen.
Wir verändern die gerade durchlaufene Sammlung nicht während der Iteration. Bei JavaScript gilt const wert nur im Schleifenblock. Python behält den letzten besuchten Schleifenwert; die Fragen verwenden die außerhalb initialisierten Ergebnisvariablen.
