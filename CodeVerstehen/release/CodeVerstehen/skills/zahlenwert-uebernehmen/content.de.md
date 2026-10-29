# Zahlenwerte übernehmen

## Was du hier lernst

Zwei Namen können verschiedene Zahlen zugeordnet haben. Du verfolgst beide unabhängig. Voraussetzung: Zahlen, Zuweisung, Addition, Multiplikation und Ausgabe. Zwei Variablen werden hier eingeführt; anspruchsvollere Aufgaben verbinden diese bekannten Schritte.

## Einführung: eine Zahl übernehmen

```python
a = 2
b = a
a = 7
print(b)
print(a)
```

Zuerst ist `a` 2. Bei `b = a` wird der aktuelle Wert von `a` gelesen: `b` erhält ebenfalls die Zahl 2. Danach erhält `a` die Zahl 7. Die Zuordnung von `b` bleibt 2. Die Ausgaben zeigen zuerst 2, danach 7.

## Ein Rechenergebnis übernehmen

Auch `b = a + 1` wird genau dann berechnet, wenn die Anweisung ausgeführt wird. Eine spätere Neuzuweisung an `a` berechnet `b` nicht erneut. Umgekehrt verändert eine spätere Neuzuweisung an `b` eine vorher an `a` zugewiesene Zahl nicht.

Diese Erklärung gilt für die Zahlen in diesen Aufgaben. Listen, Objekte und andere Datenarten gehören zu späteren Themen.

In JavaScript wird jeder Name bei seiner ersten Zuweisung mit `let` eingeführt, etwa `let a = 2;` und `let b = a;`. Spätere Zuweisungen verwenden kein weiteres `let`. Die Ausgabe lautet `console.log(b);`.
