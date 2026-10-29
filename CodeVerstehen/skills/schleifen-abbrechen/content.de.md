# Eine Schleife vorzeitig beenden
## break beendet die ganze Schleife
Eine Schleife muss nicht bis zur falschen Bedingung laufen. break beendet sofort die innerste Schleife. Nachfolgende Anweisungen des aktuellen Rumpfs und alle weiteren Runden entfallen. Danach geht es hinter der Schleife weiter.
## Beispiel in Python
```python
zaehler = 0
while zaehler < 6:
    zaehler = zaehler + 1
    if zaehler == 3:
        break
print(zaehler)
```
## Dasselbe in JavaScript
```javascript
let zaehler = 0;
while (zaehler < 6) {
    zaehler = zaehler + 1;
    if (zaehler === 3) { break; }
}
console.log(zaehler);
```
Das Ergebnis ist 3. Der dritte Durchlauf wurde betreten. Der nächste Vergleich zaehler < 6 wird nicht mehr ausgeführt; wir dürfen ihn in der Ablaufansicht nicht als falsch ausgeben.
## Reihenfolge beachten
Steht break vor einer Addition, fehlt die Addition dieser Runde. Steht sie davor, wurde sie bereits ausgeführt. Bei for werden die restlichen vorgesehenen Schleifenwerte ebenfalls nicht mehr besucht.
== prüft Gleichheit in Python; JavaScript verwendet in diesen Beispielen ===. Zuweisung bleibt =.
Voraussetzungen: Vergleiche, if, for und while. Hier werden noch keine Listen vorausgesetzt.
