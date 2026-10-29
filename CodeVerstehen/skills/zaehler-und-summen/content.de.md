# Zähler und Summe
## Zwei verschiedene Aufgaben
Ein Zähler verfolgt den Fortschritt. Ein Akkumulator sammelt Werte über mehrere Durchläufe. Er wird vor der Schleife initialisiert, damit die vorherige Summe nicht in jeder Runde verloren geht.
## Beispiel in Python
```python
zaehler = 1
summe = 0
while zaehler <= 3:
    summe = summe + zaehler
    zaehler = zaehler + 1
print(summe)
```
## Dasselbe in JavaScript
```javascript
let zaehler = 1;
let summe = 0;
while (zaehler <= 3) {
    summe = summe + zaehler;
    zaehler = zaehler + 1;
}
console.log(summe);
```
Die Summe wächst von 0 auf 1, dann 3, dann 6. Der Zähler ist danach 4; die Bedingung <= 3 ist falsch. Summe, letzter addierter Wert und Endzähler sind unterschiedliche Größen.
## Die Reihenfolge verändert die Summe
Wird zuerst der Zähler erhöht, werden in diesem Beispiel 2, 3 und 4 addiert: Summe 9. Es bleiben drei Durchläufe. Eine Änderung der Reihenfolge kann also das Ergebnis ändern, ohne die Durchlaufzahl zu ändern.
## Feste Beträge sammeln
Bei einer festen Wiederholungszahl kann jede Runde denselben Betrag zur Summe hinzufügen. Der Rundenzähler steigt dabei um 1, die Summe etwa um 2 oder 3.
Eine Ausgabe im Rumpf zeigt Zwischenstände. Eine Ausgabe nach der Schleife zeigt die Endsumme genau einmal. Beides kann im selben Programm vorkommen.
Voraussetzungen: for, while und Neuzuweisungen. Keine verschachtelten Schleifen.
