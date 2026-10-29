# Referenzaufgaben zur Schwierigkeit

Status: Die Beispiele A bis C und ihre qualitative Einordnung sind gemeinsam bestätigt. Keine numerischen Scores vergeben; Berechnungs- und Übergangsregeln bleiben offen.

Aktueller Planungsstand: Die App verwendet drei Schwierigkeitsstufen gemäß Spezifikation 04. Komplexität und Transferdistanz bleiben Kurationshilfen; sie werden nicht als getrennte Lernzustandswerte oder dynamische Transferdistanz berechnet. Die nachfolgenden Beispiele dienen der Einordnung durch die Autoren.
Datum: 12. Oktober 2026
Grundlage: [Lernzustand und Aufgabenhorizont](04-lernzustand-und-aufgabenhorizont.md).

## Gemeinsames Verständnisziel

Ein Ausdruck berechnet einen Wert. Bei einer Zuweisung wird zuerst der Ausdruck rechts ausgewertet; anschließend wird der Name dem Ergebnis zugeordnet. Das Berechnen eines Ausdrucks allein bewirkt noch keine Neuzuweisung.

Die dritte Aufgabe prüft insbesondere die Abgrenzung zwischen Berechnung und Neuzuweisung. Sie ist ein verwandter Transferbeleg und kein isolierter Nachweis für die zeitliche Reihenfolge von K4. Die Kriterienzuordnung muss diese Grenze berücksichtigen.

Angenommene bereits bearbeitete Grundlage:

```python
wert = 3
wert = wert + 2
print(wert)
```

Bekannt sind ganze Zahlen, Addition, eine Variable, Ausdrücke, Zuweisung und Ausgabe. Für Aufgabe C muss zusätzlich bekannt sein, dass `print` einen Ausdruck auswerten und dessen Ergebnis ausgeben kann. Falls dies fehlt, ist vorher eine Einführung erforderlich; die Aufgabe ist dann noch keine reine Transferaufgabe.

Alle Beispiele verwenden Python. Eine JavaScript-Fassung wird später separat anhand ihrer Semantik geprüft.

## A: Nahe Übertragung

```python
punkte = 4
punkte = punkte + 3
print(punkte)
```

Auftrag: „In welcher Reihenfolge geschieht die zweite Anweisung?“ Einzelauswahl, drei Alternativen mit jeweils acht Wörtern:

- Richtig: „Zuerst rechts berechnen, danach das Ergebnis links zuweisen.“
- Falsch: „Zuerst links zuweisen, danach den Ausdruck rechts berechnen.“
- Falsch: „Beide Seiten vergleichen, danach die Gleichheit direkt ausgeben.“

Referenz: Vor Zeile 2 ist `punkte` 4; rechts entsteht 7; anschließend wird `punkte` 7 zugeordnet. Ausgabe 7.

Beleg: zeitliche Reihenfolge von K4. Für den Beleg der konkreten Verwendung des bisherigen Werts ist eine zusätzliche Interaktion erforderlich.

Einordnung: geringe Komplexität; nahe Übertragung, sofern diese Auswahlform bekannt ist. Zahlen und Name ändern sich, Struktur und Frage bleiben gleich. Die Formulierung nennt bereits die relevanten Schritte, also wenig eigenständiges Erkennen.

## B: Veränderte Darstellung

Gleicher Code wie A, gleiche Referenz.

Auftrag: „Ordne die Schritte der zweiten Anweisung.“ Drei Karten, anfangs gemischt:

1. Bisherigen Wert von `punkte` lesen.
2. Drei addieren und Ergebnis berechnen.
3. Ergebnis dem Namen `punkte` zuordnen.

Referenzreihenfolge: 1 → 2 → 3.

Beleg: Lesen des bisherigen Werts, Berechnung und anschließende Neuzuweisung als Ablauf. Kartenlängen müssen nicht gleich sein, weil keine falschen Alternativen angeboten werden.

Einordnung: geringe Programmkomplexität. Die Interaktion verlangt den vollständigen Ablauf statt einer Auswahl aus fertigen Abläufen. Deshalb kann sie anspruchsvoller als A sein. Ein Darstellungswechsel allein rechtfertigt jedoch keinen automatisch höheren Transferwert. Wenn diese Karten bereits mehrfach geübt wurden, ist die Übertragung ebenfalls nah.

## C: Prinzip in anderem Zusammenhang erkennen

```python
wert = 3
print(wert + 2)
print(wert)
```

Auftrag: „Kreuze alle richtigen Aussagen an.“ Vier Alternativen mit jeweils acht Wörtern:

- Richtig: „Die erste Ausgabe zeigt das berechnete Ergebnis fünf.“
- Richtig: „Die zweite Ausgabe zeigt den unveränderten Wert drei.“
- Falsch: „Die erste Ausgabe weist der Variable fünf zu.“
- Falsch: „Die zweite Ausgabe zeigt ebenfalls den Wert fünf.“

Verifizierte Ausgabe: zuerst 5, danach 3. Der Ausdruck `wert + 2` wird berechnet und ausgegeben; es erfolgt keine Neuzuweisung an `wert`.

Beleg: Unterscheidung von Ausdrucksauswertung und Neuzuweisung. Die Frage nennt diese Unterscheidung nicht ausdrücklich; die Lernenden müssen erkennen, warum die zusätzliche Berechnung den gespeicherten Wert nicht verändert.

Einordnung: geringe bis etwas höhere Komplexität durch zwei Ausgaben, weiterhin eine Variable und drei Anweisungen. Größere Transferdistanz ist plausibel, sofern dieser Zusammenhang noch nicht geübt wurde und alle Voraussetzungen bekannt sind. Nach Wiederholungen derselben Familie ist er nicht mehr neuartig.

## Vergleich und Grenzen

| Aufgabe | Programmkomplexität | Transferanspruch | Zusätzliche Anforderung |
| --- | --- | --- | --- |
| A | gering | nahe Übertragung | Reihenfolge unter vorgegebenen Abläufen erkennen |
| B | gering | Darstellung verändert; Distanz abhängig von bisheriger Übung | Ablauf selbst zusammensetzen |
| C | gering bis etwas höher | bekanntes Prinzip in anderer Verwendung erkennen | Ausdruck innerhalb einer Ausgabe verstehen; zwei Ausgaben verfolgen |

Diese Beispiele illustrieren mögliche Schwierigkeitsunterschiede, isolieren sie aber nicht experimentell: Interaktionsform, angebotene Hinweise und in C die Zahl der Ausgaben unterscheiden sich ebenfalls. Ein späterer Vergleich kann denselben Aufgabentext mit gleicher Interaktionsform verwenden, um Transferdistanz gezielter zu betrachten.

Gemeinsam bestätigte qualitative Einordnung: A als einfache Anwendung; B als strukturiertes Nachverfolgen; C als Transfer in einen anderen Zusammenhang. Eine feste Rangfolge B > A wird noch nicht vorausgesetzt. C erhält nur dann einen höheren Transferwert, wenn die Voraussetzungen erfüllt sind und der Zusammenhang noch nicht geübt wurde.

## Gemeinsame nächste Einordnung

C ist als angemessene Transferreferenz bestätigt, sofern die genannten Voraussetzungen erfüllt sind. Die App arbeitet mit der inzwischen vereinbarten dreistufigen Schwierigkeitsskala. Die konkrete Zuordnung einzelner Aufgaben wird bei der Kuration festgelegt; zusätzliche Kompetenzwerte sind nicht vorgesehen.
