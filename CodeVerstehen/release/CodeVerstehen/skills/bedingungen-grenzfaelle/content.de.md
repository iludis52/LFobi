# Bedingungen und Grenzwerte
## Eine Frage an den Zustand
Eine Bedingung ergibt wahr oder falsch. Python schreibt dafür True und False, JavaScript true und false. In den Antworten verwenden wir die deutschen Wörter.
Die Zeichen > und < bedeuten größer und kleiner. >= und <= schließen den Grenzwert ein: 5 >= 5 ist wahr, 5 > 5 ist falsch.
## Schritt für Schritt
1. Lies die aktuellen Werte der Variablen.
2. Berechne zuerst einen Ausdruck wie punkte + bonus.
3. Vergleiche das Ergebnis mit dem Grenzwert.
4. Eine Prüfung oder Ausgabe verändert keine Variable.
## Beispiel in Python
```python
punkte = 5
print(punkte >= 5)
print(punkte > 5)
```
## Dasselbe in JavaScript
```javascript
let punkte = 5;
console.log(punkte >= 5);
console.log(punkte > 5);
```
Die Ausgaben sind wahr und falsch. Gespeichert bleiben fünf Punkte.
## Auch null und negative Zahlen
Temperaturen können negativ sein. -1 ist kleiner als 0. Genau 0 erfüllt >= 0, aber nicht > 0. Klammern zeigen, welcher Ausdruck zuerst berechnet wird.
Voraussetzungen: Variablen, Addition und Ausgabe aus Kapitel 1. Hier kommt nur das Vergleichen hinzu.
