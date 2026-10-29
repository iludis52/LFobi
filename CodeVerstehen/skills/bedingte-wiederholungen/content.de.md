# Wiederholen, solange eine Bedingung wahr ist
## while prüft immer wieder
Eine if-Anweisung entscheidet einmal. Eine while-Schleife prüft vor jedem Durchlauf erneut mit den aktuellen Werten. Ist die Bedingung schon am Anfang falsch, läuft ihr Rumpf keinmal.
## Beispiel in Python
```python
zaehler = 0
while zaehler < 3:
    zaehler = zaehler + 1
print(zaehler)
```
## Dasselbe in JavaScript
```javascript
let zaehler = 0;
while (zaehler < 3) {
    zaehler = zaehler + 1;
}
console.log(zaehler);
```
Die Prüfungen verwenden 0, 1, 2 und schließlich 3. Dreimal ist < 3 wahr, danach falsch. Vier Prüfungen bedeuten also nur drei Durchläufe. Die letzte Ausgabe zeigt 3.
## Schritt für Schritt
1. Lies die aktuellen Werte vor der Prüfung.
2. Ist die Bedingung wahr, führe den ganzen Rumpf aus.
3. Gehe danach zur Bedingung zurück.
4. Ist sie falsch, fahre nach der Schleife fort.
Bei einer Erhöhung um 2 kann der Zähler die Grenze überspringen. Er muss nicht genau auf dem Grenzwert enden. Ein Countdown verwendet eine Verringerung und endet, sobald sein Vergleich falsch wird.
## Warum endet die Schleife?
Eine passende Zustandsänderung führt zur falschen Bedingung. Bleibt ein Zähler bei wahrer Bedingung unverändert, kann die Schleife endlos laufen. Unsere Aufgaben verwenden nur kurze, endende Schleifen. break, continue und Verschachtelung folgen später.
Die Ablauftabelle trennt die einzelnen Ausführungen derselben Zeile. Die letzte Prüfungsrunde hat keinen weiteren Rumpfdurchlauf.
