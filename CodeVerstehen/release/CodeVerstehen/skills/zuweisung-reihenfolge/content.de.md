# Ein geradliniges Programm verstehen

## Kurzskizze

Code wird Anweisung für Anweisung ausgeführt. Du lernst, Werte zu verfolgen und zu unterscheiden: Was wird nur berechnet, was wird einer Variable neu zugewiesen?

## Zuweisung: erst rechnen, dann zuordnen

Ein Name wie `wert` macht einen Wert im Programm ansprechbar. Bei `wert = wert + 2` passiert Folgendes:

1. Rechts wird der bisherige Wert gelesen.
2. Der Ausdruck wird ausgewertet.
3. Erst danach wird das Ergebnis dem Namen links zugeordnet.

Das Zeichen `=` ist eine Zuweisung, kein Gleichheitsvergleich. Der nächste Schritt verwendet den dann aktuellen Wert.

## Beispiel zum Beobachten

```python
zahl = 6
zahl = zahl + 1
print(zahl)
```

Zuerst ist `zahl` 6. Rechts wird 6 + 1 berechnet. Danach ist `zahl` 7. Die Ausgabe zeigt 7.

## Berechnen ist nicht automatisch Zuweisen

`print(zahl + 1)` berechnet einen Ausdruck und gibt dessen Ergebnis aus. Es enthält keine Neuzuweisung an `zahl`; ihr Wert bleibt erhalten. In JavaScript hat `console.log(zahl + 1)` dieselbe Wirkung.

## Dein Lernzyklus

Beobachte das Beispiel. Sage dann die Wirkung einer Aufgabe voraus, bevor du absendest. Vergleiche danach den Ablauf mit deiner Antwort. Andere Werte und neue Situationen helfen dir, das Prinzip zu übertragen.
