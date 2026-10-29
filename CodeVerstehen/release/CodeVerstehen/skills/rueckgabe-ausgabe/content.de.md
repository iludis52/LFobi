# Wohin geht das Ergebnis?
## return liefert an den Aufrufer
print bzw. console.log zeigt etwas an. return liefert einen Wert an die Stelle zurück, an der die Funktion aufgerufen wurde. Eine Ausgabe ersetzt keine Rückgabe.
## Python
```python
def zeigen(zahl):
    print(zahl * 2)
rueckgabe = zeigen(3)
print(rueckgabe)
```
## JavaScript
```javascript
function zeigen(zahl) {
    console.log(zahl * 2);
}
let rueckgabe = zeigen(3);
console.log(rueckgabe);
```
Zuerst wird 6 ausgegeben. Danach zeigt die letzte Ausgabe Python None beziehungsweise JavaScript undefined: Die Funktion hat keinen Wert ausdrücklich zurückgegeben. Das ist weder die Zahl 0 noch die ausgegebene 6.
## Frühe Rückkehr
return beendet den aktuellen Aufruf sofort. Eine spätere Rückgabe in derselben Funktion wird in diesem Aufruf nicht mehr erreicht. Eine Bedingung kann so verschiedene Rückgabewerte auswählen.
Die Aufgaben fragen nach den beiden letzten Ausgaben. Frühere Ausgaben aus einer Funktion sind zusätzliche Seiteneffekte und bleiben im Ablauf sichtbar.
