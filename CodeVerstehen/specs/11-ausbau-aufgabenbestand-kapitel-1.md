# Ausbau des Aufgabenbestands in Kapitel 1

Datum: 14. Oktober 2026.
Status: Am 14. Oktober 2026 vom Nutzer nach Durchsicht freigegeben. Der erste Abschnitt mit drei neuen Familien und neun Referenzvorlagen ist umgesetzt. Die folgenden Beschreibungen halten die freigegebene Planung fest; zusätzlicher Vorlagenbestand, Themenmischung und Lernpilot bleiben anschließende Schritte.

## Ausgangspunkt und nächster Meilenstein

Der Nutzer hat den lauffähigen Prototyp im Browser geprüft und funktionierende Verbindungen zu LM Studio und DeepInfra bestätigt. Das bestätigt diese erprobte Umgebung; die Prüfung auf dem WordPress-Zielhosting bleibt separat. Die aktive App enthält acht Vorlagen, sechs Interaktionsformen und eine registrierte Aufgabenfamilie: Ausdrucksauswertung und Neuzuweisung. Inhaltlich entstehen bisher zwei ähnliche Programmabläufe, deren Zahlen variiert werden.

Der nächste Meilenstein ist ein abwechslungsreicher, fachlich geprüfter Aufgabenbestand innerhalb von Kapitel 1. Lernende sollen verschiedene Verständnisfragen bearbeiten und den Unterschied zwischen den drei Schwierigkeiten nachvollziehen können. Modellanbindung, statischer Betrieb, lokale Speicherung und manuelle Schwierigkeitswahl bleiben die Grundlage.

Dieses Dokument konkretisiert den Bestand gemäß [Umfang](06-umfang-und-lernoberflaeche.md), [Interaktionsformen](02-interaktionsformen-und-antwortgenerierung.md) und [Schwierigkeit](04-lernzustand-und-aufgabenhorizont.md). Es ergänzt die [bisherigen Referenzen](05-referenzaufgaben-schwierigkeit.md). Ältere Vorschläge zu Freitextpflicht oder automatischen Kompetenzwerten werden dadurch nicht wieder eingeführt.

## Drei getrennte Ebenen

- **Aufgabenfamilie / Lernziel:** Welcher Zusammenhang wird verstanden, etwa die Verwendung des aktuellen Werts?
- **Aufgabentyp:** Welche geistige Handlung wird verlangt, etwa Zustand nachverfolgen, Ausgabe vorhersagen oder Beispiele vergleichen?
- **Interaktionsform:** Wie wird geantwortet, etwa mit Lücken, Einzelauswahl oder Diagrammauswahl?

Eine weitere Auswahlform allein erweitert den fachlichen Bestand nicht. Umgekehrt kann dieselbe Lückenform mehrere Aufgabentypen und Schwierigkeiten unterstützen. Eine korrekte Ausgabe ist ein Beleg für diese Vorhersage, aber kein vollständiger Beleg für die zeitliche Beziehung von Auswertung und Zuweisung (K4).

## Aufgabenmatrix für Kapitel 1

| Familie / vorgeschlagenes Lernziel | Aufgabentypen | Voraussetzungen | Geeignete Formen | Typische Fehlantwort / mögliche Fehlvorstellung | Ausbau |
| --- | --- | --- | --- | --- | --- |
| Ausdruck und Zuweisung / `assignment-order` | Bestandteile erkennen, Ablauf nachverfolgen, Beispiele vergleichen | Ganze Zahlen, Addition, eine Variable, Ausgabe | Codeauswahl, Reihenfolge, Auswahl, Lücken, Diagramm | Zuweisung als Gleichheitsprüfung; Ausgabe als Neuzuweisung | Bestehenden Bestand erhalten; später ergänzen |
| Aktueller Wert und Zustand / `current-state` | Zustand nachverfolgen, Ausgabe vorhersagen | Zusätzlich Multiplikation und mehrere Zuweisungen | Lücken, Auswahl, Zustandsdiagramm | Erneutes Rechnen mit dem Anfangswert; Ausgabe und Zustand verwechseln | Erster Abschnitt |
| Wirkung der Anweisungsreihenfolge / `statement-order` | Beispiele vergleichen, Ausgabe vorhersagen, Änderung beurteilen | Aktueller Wert, Addition und Multiplikation | Lücken, Auswahl, Diagramm | Vertauschen abhängiger Anweisungen für wirkungslos halten | Erster Abschnitt |
| Unabhängige Zuordnungen bei zwei Variablen / `value-copy` | Zustand nachverfolgen, Ausgabe vorhersagen | Vorherige Einführung zweier Namen und der Übernahme eines Zahlenwerts | Lücken, Auswahl, Zustandsdiagramm | Eine kopierte Zahl als dauerhafte Verbindung zwischen Namen behandeln | Erster Abschnitt |
| Wirkung einer kleinen Codeänderung / `change-effect` | Änderung beurteilen, Beispiele vergleichen, Fehler untersuchen | Jeweilige zugrunde liegende Familie | Auswahl, Lücken, Codeauswahl mit ergänzender Vorhersage | Jede Änderung müsse jede Ausgabe beeinflussen | Zweiter Abschnitt |
| Zahl und Text / `number-vs-text` | Bestandteile erkennen, Ausgabe vorhersagen, Beispiele vergleichen | Einführung von Zeichenketten und der jeweiligen Sprachsemantik | Auswahl, Codeauswahl, Lücken | Zahl und Zeichenkette gleich behandeln | Separater späterer Abschnitt |

Die neuen Lernziel-IDs sind Vorschläge. Nicht jede Familie benötigt alle Formen oder alle Schwierigkeiten. „Fehler untersuchen“ beginnt später mit einer unzutreffenden Vorhersage zu gültigem Code; Syntaxfehler und Ausnahmebehandlung erweitern diesen ersten Abschnitt nicht.

## Regeln zur Schwierigkeit und Einführung

1. **Einfach:** Ein eingeführtes Muster direkt anwenden, mit wenigen Zustandsübergängen und klar benannten Beobachtungspunkten.
2. **Mittel:** Mehrere bekannte Zustandsübergänge verbinden oder eine zusätzliche Abhängigkeit verfolgen.
3. **Anspruchsvoll:** Mehrere bekannte Zusammenhänge verbinden oder einen relevanten Unterschied ohne vorgegebene Zwischenergebnisse erkennen.

Größere Zahlen, längerer Text, ein Sprachwechsel oder eine andere Antwortform begründen allein keine höhere Stufe. Die Einstufungen unten sind Kurationshypothesen, die im Lernpilot überprüft werden müssen. Eine häufig geübte Aufgabe ist auch auf Stufe 3 kein dauerhaft neuer Transfer.

Vor jeder Familie steht eine kurze Lernendenerklärung mit eigenem Beispiel. Multiplikation wird vor der Zustandsfamilie eingeführt. Zwei Variablen und Wertübernahme werden vor der Kopierfamilie eingeführt. Die Schwierigkeit darf diese Voraussetzungen nicht ersetzen. Es entsteht keine automatische Sperre oder Kompetenzdiagnose: Lernende wählen ihr Lernziel und ihre Schwierigkeit selbst.

## Referenzaufgaben des ersten Abschnitts

Die folgenden neun Vorlagen verwenden Lücken mit Zahlenkarten. Innerhalb jeder Familie bleibt das Antwortschema auf allen drei Stufen gleich. Jede Aufgabe verlangt genau eine Abgabe; alle Lücken müssen stimmen. Karten dürfen mehrfach verwendet werden, was der Auftrag ausdrücklich nennt. Nach einer Fehlantwort wird zunächst ein Hinweis zum frühesten fehlerhaften Beobachtungspunkt gegeben. Fehlantworten begründen keine sichere Diagnose.

Die Lösungstabellen sind Autorenmaterial und werden vor der Abgabe nicht angezeigt. Die Referenzen zeigen Python; entsprechende JavaScript-Fassungen verwenden `let` nur bei der ersten Zuweisung und `console.log` für die Ausgabe. Beide Sprachfassungen werden bei der Implementierung separat geprüft. Keine beliebige Codeausführung oder freie Codegenerierung ist erforderlich.

### A: Aktuellen Wert verwenden und Zustand verfolgen

Beleg: K2/K3 im Sinne der bisherigen Kriterien, ergänzt durch die Unterscheidung von Zustand und Ausgabe. Für diese Familie wird vorgeschlagen: `state-current-value` und `state-output-unchanged`. K4 ist ohne zusätzliche Ablaufinteraktion nicht vollständig belegt.

Gemeinsamer Auftrag: „Welchen Wert hat `wert` nach der genannten Zeile, und welche Zahl wird am Ende ausgegeben? Wähle für beide Lücken eine Zahl. Du darfst Zahlen mehrfach verwenden.“

**A1 – Einfach, `state-direct-v1`**

```python
wert = 3
wert = wert + 2
print(wert)
```

Lücken: Wert nach Zeile 2; letzte Ausgabe. Karten: 3, 5, 7.

**A2 – Mittel, `state-chain-v1`**

```python
wert = 3
wert = wert + 2
wert = wert * 4
print(wert)
```

Lücken: Wert nach Zeile 3; letzte Ausgabe. Karten: 5, 12, 20.

**A3 – Anspruchsvoll, `state-output-between-v1`**

```python
wert = 3
wert = wert + 2
print(wert * 4)
wert = wert + 1
print(wert)
```

Lücken: Wert nach Zeile 3; letzte Ausgabe. Karten: 5, 6, 20, 21. Die erste Ausgabe wird hier nicht als eigene Lücke abgefragt.

| Referenz | Verifizierter Zustand nach jeder Zeile | Ausgaben | Lösung der beiden Lücken | Gezielter Hinweis bei passender Fehlantwort | Begründung der Stufe |
| --- | --- | --- | --- | --- | --- |
| A1 | 3 → 5 → 5 | 5 | 5; 5 | „Welcher Wert entsteht bei der zweiten Zuweisung?“ | Ein Zustandswechsel, direkte Ausgabe |
| A2 | 3 → 5 → 20 → 20 | 20 | 20; 20 | Bei 12: „Welchen Wert hat wert unmittelbar vor der Multiplikation?“ | Die zweite Rechnung verwendet das Ergebnis der ersten |
| A3 | 3 → 5 → 5 → 6 → 6 | 20, 6 | 5; 6 | Bei 20 in der ersten Lücke: „Enthält die dritte Zeile eine Zuweisung an wert?“ | Berechnung in einer Ausgabe von späterer Zustandsänderung trennen |

### B: Wirkung der Anweisungsreihenfolge vergleichen

Beleg: K1 und Verwendung des aktuellen Werts. Vorgeschlagenes ergänzendes Kriterium: `order-dependent-result`. Das bloße Sortieren der Teilschritte einer Zuweisung ersetzt diesen Vergleich zweier Programme nicht.

Gemeinsamer Auftrag: „Welche Zahl gibt Programm A aus, welche Programm B? Wähle für beide Lücken eine Zahl. Du darfst Zahlen mehrfach verwenden.“

**B1 – Einfach, `order-replace-v1`**

```python
# Programm A
wert = 3
wert = 8
print(wert)

# Programm B
wert = 8
wert = 3
print(wert)
```

Karten: 3, 8, 11. Die Programme starten getrennt und teilen keinen Zustand.

**B2 – Mittel, `order-add-multiply-v1`**

```python
# Programm A
wert = 3
wert = wert + 2
wert = wert * 4
print(wert)

# Programm B
wert = 3
wert = wert * 4
wert = wert + 2
print(wert)
```

Karten: 5, 12, 14, 20.

**B3 – Anspruchsvoll, `order-copy-point-v1`**

```python
# Programm A
a = 3
b = a + 2
a = a * 4
print(b)

# Programm B
a = 3
a = a * 4
b = a + 2
print(b)
```

Karten: 3, 5, 12, 14. Voraussetzung: Die Zwei-Variablen-Familie ist bereits eingeführt. B3 wird nicht allein durch Hochstellen der Schwierigkeit zum Einstieg in zwei Variablen.

| Referenz | Ablauf Programm A | Ablauf Programm B | Lösung A; B | Gezielter Hinweis bei passender Fehlantwort | Begründung der Stufe |
| --- | --- | --- | --- | --- | --- |
| B1 | wert: 3 → 8 → Ausgabe 8 | wert: 8 → 3 → Ausgabe 3 | 8; 3 | „Welche Zuweisung steht jeweils direkt vor der Ausgabe?“ | Letzte Zuordnung in zwei kurzen Abläufen vergleichen |
| B2 | wert: 3 → 5 → 20 → Ausgabe 20 | wert: 3 → 12 → 14 → Ausgabe 14 | 20; 14 | „Beginne beide Programme bei 3 und verwende nach jeder Zeile den neuen Wert.“ | Zwei abhängige Rechnungen in anderer Reihenfolge |
| B3 | a=3 → b=5 → a=12, b=5 → Ausgabe 5 | a=3 → a=12 → b=14 → Ausgabe 14 | 5; 14 | „Welchen Wert hat a in jedem Programm, wenn b berechnet wird?“ | Berechnungszeitpunkt und unabhängige spätere Zuordnung verbinden |

### C: Eine übernommene Zahl bleibt unabhängig

Beleg: vorgeschlagene Kriterien `copy-value-at-assignment` und `copy-independent-update`. Diese Familie behandelt ausschließlich Zahlenwerte; Aussagen über Listen, Objekte oder Referenzen gehören nicht zu ihrem Lernziel.

Gemeinsamer Auftrag: „Welche Zahlen werden ausgegeben? Wähle für die erste und die zweite Ausgabe jeweils eine Zahl. Du darfst Zahlen mehrfach verwenden.“

**C1 – Einfach, `copy-direct-v1`**

```python
a = 3
b = a
a = 8
print(b)
print(a)
```

Karten: 3, 8, 11.

**C2 – Mittel, `copy-calculated-v1`**

```python
a = 3
b = a + 2
a = a * 4
print(b)
print(a)
```

Karten: 3, 5, 12, 14.

**C3 – Anspruchsvoll, `copy-return-v1`**

```python
a = 3
b = a + 2
a = b * 2
b = b + 1
print(a)
print(b)
```

Karten: 5, 6, 10, 12.

| Referenz | Verifizierte Zuordnungen vor den Ausgaben | Lösung erste; zweite Ausgabe | Gezielter Hinweis bei passender Fehlantwort | Begründung der Stufe |
| --- | --- | --- | --- | --- |
| C1 | (a=3) → (a=3, b=3) → (a=8, b=3) | 3; 8 | Bei erster Ausgabe 8: „Welche spätere Zeile weist b einen neuen Wert zu?“ | Eingeführte direkte Wertübernahme und eine spätere Änderung |
| C2 | (a=3) → (a=3, b=5) → (a=12, b=5) | 5; 12 | Bei erster Ausgabe 14: „Mit welchem damaligen Wert von a wurde b berechnet?“ | Berechneten Wert übernehmen und danach a verändern |
| C3 | (a=3) → (a=3, b=5) → (a=10, b=5) → (a=10, b=6) | 10; 6 | Bei erster Ausgabe 12: „Welchen Wert hatte b, als a neu berechnet wurde?“ | Gegenseitige Nutzung zu verschiedenen Zeitpunkten ohne dauerhafte Bindung |

## Bestand und fachliche Grenzen des ersten Abschnitts

- Drei neue Familien mit je drei Referenzvorlagen: neun neue Vorlagen, zusätzlich zu den bestehenden acht. Die genaue Darstellung im Katalog wird bei der Umsetzung festgelegt.
- Jede Familie erhält eine kurze Erklärung mit einem anderen Beispiel als der aktuellen Aufgabe. Hinweise und Lösung beziehen sich auf die konkrete Variante.
- Anfangswerte 1 bis 5, Additionen 1 bis 3, Faktoren 2 bis 4; abgeleitete Zwischenwerte und Ausgaben bleiben höchstens 50. Direkte Ersatzwerte 6 bis 9. Nur positive ganze Zahlen, Addition, Multiplikation, Zuweisung und Ausgabe.
- Die neun Referenzen sind zunächst feste fachliche Anker. Vorlagenbezogene Parameterregeln und Distraktorregeln werden vor der Parametrisierung festgelegt: richtige Werte müssen angeboten werden, Kartenwerte sind eindeutig, falsche Werte dürfen nicht versehentlich richtig werden.
- Bei B1 müssen die beiden Zuweisungswerte verschieden bleiben. Bei B2 müssen die beiden Programme verschiedene Ausgaben ergeben; die App prüft das für jede erlaubte Variante. B3 verwendet eine Änderung von a, die den später berechneten Wert von b tatsächlich unterscheidet.
- Keine Schleifen, Bedingungen, Eingaben, eigenen Funktionen, Objekte, Listen oder freie Programmausführung. Zahl/Text folgt später mit eigenen Sprachreferenzen; insbesondere darf Python-Semantik nicht ungeprüft auf JavaScript übertragen werden.

## Umsetzung in einem abgegrenzten Abschnitt

1. **Fachliche Kuration:** Die neun Referenzen, Erklärungen, Kriterien und Hinweise durchsehen; Parameter- und Distraktorregeln konkretisieren. Neue Familien zunächst als Entwurf halten. Erst fachlich freigegebene Familien erhalten `status: approved` und einen Eintrag im Laufzeitkatalog.
2. **Aufgabenaufbau erweitern:** Die bisher auf `assignment` und `transfer` begrenzte Erzeugung durch ausdrücklich unterstützte Programmstrukturen dieser Familien ergänzen. Struktur, Ablauf und Lösung werden deterministisch aus der Vorlage erzeugt. Keine allgemeine Interpreter-Architektur ist für diesen Umfang nötig.
3. **Lernzielwahl anbieten:** Einen sichtbaren Themenzugang ergänzen; die Erklärung folgt dem aktiven Thema. Themen- und Schwierigkeitswechsel wirken ab der nächsten Aufgabe. Voraussetzungen werden als Einführung kenntlich gemacht. Keine automatische Schwierigkeitserhöhung.
4. **Abwechslung durch die App sichern:** Innerhalb des gewählten Lernziels und der gewählten Schwierigkeit die vorherige Vorlage ausschließen, sofern Alternativen vorhanden sind. Modell und Demo verwenden denselben zulässigen Katalog. Wiederholte Modellwahl außerhalb dieses Katalogs führt zum geprüften Ersatz derselben Familie und Stufe. Bei nur einer Vorlage bleibt Wiederholung möglich; Zahlenvariation allein wird nicht als neue fachliche Aufgabenart bezeichnet.
5. **Bestand verbreitern:** Nach erfolgreicher Prüfung die neun Referenzen durch zusätzliche kuratierte Vorlagen und passende bestehende Antwortformen ergänzen. Ein gemischter Modus kommt erst danach und mischt ausschließlich ausdrücklich ausgewählte, eingeführte Lernziele. Dafür ist ein gesonderter kleiner Auswahlvertrag nötig.
6. **Auslieferung:** Paketliste um neue Skill-Dateien ergänzen, statisches Paket erneuern und im Unterordner prüfen. Historische Abnahmeberichte bleiben datierte Berichte; neue Prüfungen werden separat dokumentiert.

Mit zunächst nur einer neuen Vorlage je Familie und Stufe entsteht noch keine große Abwechslung innerhalb eines einzelnen Themas. Der erste Abschnitt schafft fachliche Breite und vergleichbare Schwierigkeitsanker; zusätzliche Vorlagen sind ein eigener anschließender Arbeitsschritt.

## Abnahme und Lernpilot

Technische und fachliche Prüfung:

- Alle neun Referenzen liefern die angegebenen Zustände und Ausgaben in Python und JavaScript. Jede erlaubte Parameterkombination wird auf Lösung, Distraktoren und Grenzen geprüft.
- Die gleiche Lückenform erscheint auf allen drei Stufen; die Stufe wird durch den Inhalt begründet. Zahlenkarten gelten als jeweils ein Element. Ergänzte Text- und Diagrammalternativen erfüllen weiterhin die Wortzahlregel.
- Unvollständige Antworten erzeugen kein falsches Ergebnis. Eine vollständig abgegebene Situation erzeugt genau ein Ergebnis; Wiederholung und Doppelübertragung folgen den bestehenden Regeln.
- Die Aufgabenansicht zeigt vor Abgabe keine Lösung oder ausgefüllte Zustandstabelle. Erklärung, Tastaturbedienung und schmale Ansicht bleiben nutzbar.
- Lernziel, Schwierigkeit und Modellanbieter begrenzen dieselben freigegebenen Vorlagen. Falsche Modellwahl verändert weder Schwierigkeit noch Lösungsschlüssel. Die bisherigen acht Vorlagen funktionieren weiterhin.
- Neue Familien, Vorlagen und Kriterien bleiben in gespeicherten Abgaben identifizierbar. Alte Exportdaten bleiben importierbar; die Übersicht stellt Ergebnisse je Lernziel und Schwierigkeit dar.

Anschließend ein kurzer Lernpilot: Nach Einführung einer Familie Aufgaben aller drei Stufen bearbeiten lassen, ohne die Stufenfolge als Kompetenztest zu behandeln. Beobachten, ob Aufträge verständlich sind, welche Hilfen benötigt werden und ob der höhere Anspruch aus Zustandsverfolgung statt überwiegend aus Rechenlast entsteht. Wiederkehrende Fehlantworten zur Überarbeitung der Aufgaben verwenden, nicht als sichere Diagnose einzelner Personen.

Der Meilenstein ist erreicht, wenn die drei neuen Familien wählbar sind, die neun Referenzen und ihre zugelassenen Varianten zuverlässig funktionieren und die Schwierigkeitsunterschiede fachlich begründet und im Pilot geprüft wurden. Die Verbindung zu echten Modellen wird dabei erneut mit dem erweiterten Katalog erprobt.
