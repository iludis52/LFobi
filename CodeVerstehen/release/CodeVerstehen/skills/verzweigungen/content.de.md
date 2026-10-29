# Verzweigungen

## Unterschiedliche Fragen zum selben Konzept
Die Aufgaben wechseln zwischen Ausgaben, Endzuständen, Bedingungen, ausgeführten Zeilen, gezielten Zahlenänderungen und Programmvergleichen. Bei mehreren Aussagen kreuze alle richtigen an. Bei einer Änderung wird das gewünschte Ergebnis vorgegeben; der gezeigte Ablauf nach dem Absenden gehört zum ursprünglichen Programm.
## Ein Programm entscheidet
if prüft eine Bedingung. Ist sie wahr, läuft sein Block. Ist sie falsch, läuft der else-Block. Genau einer der beiden Zweige wird ausgeführt.
Python kennzeichnet den Block mit einem Doppelpunkt und eingerückten Zeilen. JavaScript verwendet geschweifte Klammern. Die Zeilen nach dem Block laufen anschließend weiter.
## Beispiel in Python
```python
bestand = 5
bestellung = 3
if bestellung <= bestand:
    bestand = bestand - bestellung
    print("Versand")
else:
    print("Warten")
print(bestand)
```
Die Ausgaben sind Versand und 2. Warten wird übersprungen.
## Derselbe Zweig in JavaScript
```javascript
if (bestellung <= bestand) {
    bestand = bestand - bestellung;
    console.log("Versand");
} else {
    console.log("Warten");
}
console.log(bestand);
```
## Schritt für Schritt
1. Prüfe die Bedingung mit dem aktuellen Zustand.
2. Führe nur den gewählten Block aus, Zeile für Zeile.
3. Überspringe den anderen Block vollständig.
4. Fahre nach der Verzweigung mit dem neuen Zustand fort.
Wörter in Anführungszeichen sind Texte. Eine Ausgabe zeigt den Text ohne die Anführungszeichen. Eine Variable kann auch einen Text speichern, etwa status = "Pause".
Eine Zustandsänderung im Block prüft die ursprüngliche Bedingung nicht noch einmal. Aus sieben Stempeln können im else-Block neun werden, ohne dass anschließend der if-Block startet.
Voraussetzungen: Vergleiche, Zuweisungen, Addition. Neu sind if/else, Blöcke, Subtraktion und Textausgaben.
