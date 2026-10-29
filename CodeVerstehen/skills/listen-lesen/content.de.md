# Mehrere Werte gemeinsam speichern
## Element, Index und Länge
Python-Listen und JavaScript-Arrays speichern geordnete Elemente. Der Index ist eine Position ab 0, nicht der Inhalt des Elements. Die Länge zählt alle Elemente. Bei Länge 3 sind 0, 1 und 2 gültige Indizes.
## Python
```python
werte = [4, 7, 9]
print(werte[0])
print(len(werte))
```
## JavaScript
```javascript
let werte = [4, 7, 9];
console.log(werte[0]);
console.log(werte.length);
```
Die Ausgaben sind 4 und 3. Das letzte Element steht bei len(werte) - 1 beziehungsweise werte.length - 1.
## Leere Sammlung und Grenzen
Eine leere Sammlung [] hat Länge 0 und kein erstes Element. Prüfe vor einem Zugriff, ob die Länge größer als 0 ist. Die Aufgaben auf Stufe 3 zeigen diesen Schutz und einen Ersatzwert.
Python löst bei einem ungültigen Listenindex einen IndexError aus. JavaScript liefert für eine nicht vorhandene Arrayposition undefined. Python erlaubt etwa [-1] für das letzte Element; JavaScript [-1] ist kein Zugriff vom Ende. Unsere gemeinsamen Beispiele berechnen deshalb Länge minus 1.
Die App führt in diesem Kapitel keine ungültigen Zugriffe aus. Mengen und Tupel sind optionale Vertiefungen.
