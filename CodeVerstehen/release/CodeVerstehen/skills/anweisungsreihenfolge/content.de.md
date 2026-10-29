# Wirkung der Anweisungsreihenfolge

## Was du hier lernst

Du vergleichst zwei Programme, die jeweils neu starten. Ihr Zustand wird nicht zwischen den Programmen weitergegeben. Voraussetzung: Zuweisung, Addition, Multiplikation und Ausgabe. Für anspruchsvolle Aufgaben werden zwei Variablen verwendet; lies dazu die Einführung unten.

## Die Reihenfolge kann das Ergebnis verändern

```python
wert = 2
wert = wert + 1
wert = wert * 3
print(wert)
```

Hier entstehen nacheinander 2, 3 und 9. Werden die Addition und die Multiplikation vertauscht, entstehen 2, 6 und 7. Die gleichen Rechnungen in anderer Reihenfolge können unterschiedliche Ergebnisse liefern.

## Einführung: zwei Namen, zwei Zuordnungen

```python
a = 2
b = a + 1
a = 7
print(b)
```

Bei der Berechnung von `b` ist `a` noch 2. Daher erhält `b` die Zahl 3. Die spätere Zuweisung von 7 an `a` verändert `b` nicht. Würde `b` erst danach berechnet, würde es den dann aktuellen Wert von `a` verwenden.

Diese Regel betrifft die Zahlen in diesen Aufgaben. Andere Datenarten werden hier nicht behandelt. Du kannst die Familie „Zahlenwerte übernehmen“ vorher gesondert üben.

In JavaScript beginnt die erste Zuweisung je Name mit `let`, die Ausgabe lautet `console.log(...)`. Spätere Zuweisungen verwenden kein weiteres `let`.
