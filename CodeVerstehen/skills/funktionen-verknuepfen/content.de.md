# Eine Rückgabe wird zum nächsten Argument
## Von innen nach außen
Bei doppelt(plus_eins(3)) wird zuerst plus_eins(3) ausgeführt. Dessen Rückgabe 4 wird an doppelt übergeben. Ergebnis: 8.
## Python
```python
def plus_eins(zahl):
    return zahl + 1
def doppelt(zahl):
    return zahl * 2
print(doppelt(plus_eins(3)))
```
## JavaScript
```javascript
function plus_eins(zahl) { return zahl + 1; }
function doppelt(zahl) { return zahl * 2; }
console.log(doppelt(plus_eins(3)));
```
## Die Reihenfolge zählt
plus_eins(doppelt(3)) ergibt 7. Dieselben Funktionen können in anderer Reihenfolge etwas anderes berechnen.
## In einer Schleife verwenden
Eine Funktion kann für jedes Element aufgerufen werden. Die aufrufende Schleife sammelt die Rückgaben in einer Summe. Die Zahl der Funktionsaufrufe entspricht dann der Zahl der tatsächlich besuchten Elemente.
Verfolge in der Tabelle jeden Aufruf getrennt. Funktionskomposition ist die Weitergabe von Rückgabewerten; sie ist nicht die später in der Objektorientierung verwendete Objektkomposition.
