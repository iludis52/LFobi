# Kleine Codeänderungen
## Vergleiche zwei getrennte Abläufe
Programm A und Programm B beginnen jeweils mit eigenen Startwerten. Der Zustand aus A wird nicht nach B übertragen.
Eine kleine Änderung kann den gewählten Zweig verändern. Manchmal bleibt die Ausgabe für die gezeigten Werte aber gleich. Das ist eine gültige Beobachtung.
## Grenzwerte entscheiden
Bei punkte = 5 ist punkte >= 5 wahr, punkte > 5 falsch. Bei 4 Punkten sind beide falsch, bei 6 Punkten beide wahr. Der Unterschied tritt genau an der Grenze auf.
Bei bestellung = bestand erlaubt <= die vollständige Lieferung. < erlaubt sie nicht, weil Gleichheit ausgeschlossen ist.
## Reihenfolge in einer Kette
```python
punkte = 20
if punkte >= 20:
    print("Gold")
elif punkte >= 10:
    print("Silber")
else:
    print("Start")
```
Die Ausgabe lautet Gold. Wird die Silber-Prüfung vorgezogen, lautet sie Silber: Eine Kette nimmt den ersten zutreffenden Zweig. Gold wird dann nicht mehr geprüft.
JavaScript schreibt else if statt elif und umschließt Blöcke mit geschweiften Klammern. Die Entscheidungsregel bleibt gleich.
## Schritt für Schritt
1. Suche die einzige Änderung zwischen den Programmen.
2. Verfolge A vom eigenen Anfang bis zur Ausgabe.
3. Starte B erneut mit seinen Startwerten.
4. Vergleiche Ausgaben und Zustände; auch Gleichheit ist möglich.
Voraussetzungen: Vergleiche, if/else und Entscheidungsketten. Es kommen keine neuen Sprachmittel hinzu.
