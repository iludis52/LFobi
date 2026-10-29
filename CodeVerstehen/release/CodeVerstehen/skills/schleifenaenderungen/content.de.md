# Kleine Änderungen an Schleifen
## Programme getrennt verfolgen
Programm A und B beginnen jeweils mit ihren eigenen Startwerten. Der Endwert von A wird nicht zum Startwert von B.
## Grenze einschließen oder ausschließen
Mit Startwert 0 und Erhöhung um 1 läuft while zaehler < 3 dreimal und endet bei 3. Bei <= 3 gibt es einen zusätzlichen Durchlauf; der Zähler endet bei 4.
## Python: nur das Vergleichszeichen ändert sich
```python
zaehler = 0
while zaehler <= 3:
    zaehler = zaehler + 1
print(zaehler)
```
## Dasselbe in JavaScript
```javascript
let zaehler = 0;
while (zaehler <= 3) {
    zaehler = zaehler + 1;
}
console.log(zaehler);
```
## Größere Schritte bedeuten nicht denselben Endwert
Bei < 5 erreicht eine Erhöhung um 1 den Endwert 5. Mit Erhöhung um 2 entsteht die Folge 0, 2, 4, 6: weniger Durchläufe, aber ein größerer Endwert.
## Reihenfolge beim Summieren
Bei Startzähler 1 und <= 3 sammelt Addieren vor Erhöhen die Werte 1, 2, 3. Erhöhen vor Addieren sammelt 2, 3, 4. Die Endsumme ist 6 beziehungsweise 9.
Prüfe Änderungen immer mit den aktuellen Zuständen. Eine größere Schrittweite muss nicht genau auf der Grenze enden. Die Ablaufansicht unterscheidet Ausführungen und Programme.
Es gibt hier keine freien Codeänderungen und keine Ausführung von Endlosschleifen.
