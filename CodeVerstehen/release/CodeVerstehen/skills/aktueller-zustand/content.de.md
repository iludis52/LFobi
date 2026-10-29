# Aktueller Wert und Zustand

## Was du hier lernst

Du verfolgst, welchen Wert ein Name nach jeder Anweisung hat. Jede weitere Rechnung verwendet den dann aktuellen Wert. Voraussetzung: Addition, Multiplikation, Zuweisung und Ausgabe. Das Zeichen `*` bedeutet Multiplikation.

## Erst rechnen, dann zuweisen

```python
wert = 2
wert = wert + 1
wert = wert * 3
print(wert)
```

Zuerst ist `wert` 2. Die Addition ergibt 3 und weist diesen Wert neu zu. Die Multiplikation verwendet anschließend die 3: `wert` wird 9. Die Ausgabe zeigt 9.

## Ausgabe und Zustand unterscheiden

Eine Ausgabe wie `print(wert * 2)` berechnet und zeigt eine Zahl. Sie weist `wert` keinen neuen Wert zu. Erst eine weitere Zuweisung verändert die Zuordnung.

In JavaScript wird ein Name zuerst mit `let wert = 2;` eingeführt. Spätere Zuweisungen verwenden kein weiteres `let`. Die Ausgabe heißt `console.log(wert);`. Die Zahlenabläufe dieser Aufgaben sind in beiden Sprachen gleich.
