# Kapitel 3: Wiederholungen und veränderlicher Zustand

Stand: 15. Oktober 2026. Der Nutzer hat die Umsetzung des nächsten Kapitels beauftragt. Grundlage ist Stufe 3 der didaktischen Progression: Was wiederholt sich, was verändert sich dabei, und warum endet die Wiederholung?

Fortschreibung: [Dokument 19](19-kapitel-4-5-und-schleifenkontrolle.md) ergänzt break und continue und implementiert den Grundumfang von Kapitel 4 und 5. Die folgenden Umfangs- und Abnahmezahlen dokumentieren den ursprünglichen Kapitel-3-Ausbau, nicht den aktuellen Gesamtbestand.

## Umgesetzter Lernumfang

Vier frei wählbare Themen, jeweils drei Schwierigkeitsstufen und vollständige Erklärung mit Python- und JavaScript-Beispiel:

| Thema | Einfach | Mittel | Anspruchsvoll |
| --- | --- | --- | --- |
| Feste Wiederholungen mit for | Feste Anzahl, einschließlich null Durchläufe | Mehrere Punkte pro Runde, Zwischen- und Endausgabe | range mit Start, Stop und Schrittweite; Stop ausgeschlossen |
| Bedingungsgesteuerte Wiederholung | while mit steigenden Werten und Null-Durchläufen | Countdown mit abnehmendem Zähler | Größere Schritte und Überschreiten der Grenze |
| Zähler und aufsummierte Werte | Feste Beträge sammeln, Runden separat zählen | Aktuellen Zähler zur Summe addieren | Erst Zähler erhöhen, dann summieren; Zwischenstände |
| Schleifen ändern | < und <= vergleichen | Schrittweite 1 und 2 vergleichen | Addieren vor bzw. nach Zähleränderung |

Die zwölf kuratierten Referenzen besitzen zusammen 77 erlaubte Zahlenkombinationen. In der gesamten App sind es damit drei Kapitel, zwölf Themen und 41 Vorlagen. Jede Kombination aus Thema, Stufe und Sprache bietet Lücken, Einzel-/Mehrfachauswahl, Beobachtungsdiagramme und Sortierung. Der bestehende Vorrat an Antwortformen verhindert direkt aufeinanderfolgende gleiche Typen, auch über Kapitelwechsel hinweg.

Die Reihenfolge der Themen beginnt mit festen Wiederholungen und führt dann while ein. Kapitel und Themen bleiben frei wählbar; die App startet weiterhin in Kapitel 2. Zum Einstieg Kapitel 3 wählen und bestätigen. Keine automatische Beherrschungsentscheidung oder Stufenerhöhung.

## Didaktische und technische Grenzen

- Nur einzelne, kurze, endende Schleifen mit ganzen Zahlen, Zuweisungen, Addition/Subtraktion, Vergleich und Ausgabe. Höchstens acht Rumpfdurchläufe pro Plan; Zustandsgrenzen −20 bis 100. Die aktuellen Referenzen bleiben darunter.
- Feste Wiederholung mit Python range entspricht einer expliziten JavaScript-for-Schleife. Die ausgeschlossene Stopgrenze und größere Schrittweiten werden sichtbar eingeführt.
- Python behält den letzten tatsächlich besuchten range-Wert; bei null Durchläufen wird keine neue Schleifenvariable erzeugt. JavaScripts let-Schleifenvariable ist nach dem for-Block nicht verfügbar. Endzustandsfragen verwenden deshalb die außerhalb initialisierten Variablen.
- while prüft vor dem ersten sowie nach jedem Durchlauf erneut. Die letzte falsche Prüfung zählt nicht als weiterer Durchlauf. Bei for beschreibt der Prüfwert, ob ein weiterer Schleifenwert verfügbar ist.
- Die Erklärung benennt das Risiko einer Endlosschleife bei unverändert wahrer Bedingung. Die App führt keine nicht terminierenden Beispiele aus. break, continue, verschachtelte Schleifen und Schleifen mit Verzweigungen bleiben spätere Vertiefungen dieser Stufe.
- Keine Listen, frei eingegebenen Programme oder beliebigen Modell-Programmbäume in diesem Kapitel. Das Modell wählt den zugelassenen Skill und eine Vorlage samt begrenzten Parametern. Keine zusätzliche Modellanfrage für den Formwechsel.

## Aufgaben und Ablaufdaten

`chapter-three.js` erzeugt Quelltext und Ablauf aus denselben fest kuratierten Plänen, ohne den dargestellten Quelltext im Browser auszuführen. Der Aufgabenkern fragt Durchlaufzahl und letzte Ausgabe, bei Programmvergleichen die letzte Ausgabe beider Programme. Unabhängig geschriebene Referenzen unter `examples.json` halten erwartete Ausgaben, Durchlaufzahlen und Lösungen fest.

Ein Trace-Eintrag beschreibt einen tatsächlichen Besuch einer Quellzeile mit:

- globaler Zeilennummer und gegebenenfalls Programm A/B,
- `occurrence`: wie oft diese konkrete Zeile bis dahin ausgeführt wurde,
- `iteration`: Rumpfdurchlauf bzw. Prüfungsrunde; null für Code vor/nach der Schleife,
- aktuellen Variablen, Prüfungsergebnis und Ausgabe.

Nicht betretene Rumpfzeilen werden bei null Durchläufen als übersprungen mit Ausführung null aufgeführt. Abschließende JavaScript-Klammern sind keine ausgeführten Anweisungen. Die falsche Abschlussprüfung bleibt ein tatsächlicher Besuch des Schleifenkopfs.

Die sichtbare Ablaufansicht ergänzt „Ausführung“ und „Runde“. Codezeilen erhalten nach der Abgabe die Anzahl ihrer Ausführungen, wenn es mehr als eine ist. Die aufklappbare Tabelle zeigt die einzelnen Zustände. Vor der Abgabe bleiben Ablauf, Lösung und Hinweise verborgen.

Mehrfachauswahlen beziehen sich ausdrücklich auf „Ausführung N von Zeile M“. Dadurch sind wechselnde Werte derselben Quellzeile eindeutig. Alle vier Alternativen haben dieselbe Wortzahl und eine bis drei sind richtig. Sortierkarten verwenden eindeutige IDs aus Zeile und Ausführung; bei mehrfach gleichen Ereignissen gilt der erste Auftritt gemäß Aufgabenauftrag. Höchstens vier Ereignisse stehen zur Auswahl.

## Integration und Daten

- Vier neue registrierte Skillordner: `feste-wiederholungen`, `bedingte-wiederholungen`, `zaehler-und-summen`, `schleifenaenderungen`.
- Lernziele: `counted-loop`, `while-loop`, `loop-accumulator`, `loop-change`.
- Kapitel 3 ist in Katalogprüfung, Aufgabenaufbau, Modellvertrag, Auswahloberfläche, Lernübersicht und Importvalidierung zugelassen.
- Bestätigen ersetzt sofort die Aufgabe. Das bloße Ändern der Auswahl lässt Aufgabe und Erklärung bestehen.
- Export bleibt Version 2. Neue Abgaben speichern Kapitel 3 und die tatsächlich dargestellte Antwortform samt Optionen/Schritten und Lösung. Frühere Kapitel bleiben lesbar; Import zählt gleiche IDs nicht doppelt.
- `chapter-three.js` und alle 16 Skilldateien werden über die Positivliste des statischen Pakets ausgeliefert. Kein Python und kein Testserver im Produkt erforderlich.

## Prüfung

- `npm test`: 50 Tests erfolgreich, einschließlich aller bisherigen Kapitel. Alle Referenzparameter werden für fünf Formen in beiden Sprachen geprüft; zusätzliche Kapitel-3-Prüfungen kontrollieren zwölf unabhängige Referenzen, Parametergrenzen, Modellfehler, Typwechsel, Abgaben und Ausführungsschlüssel.
- Alle 77 tatsächlichen JavaScript-Programme werden in einer separaten VM mit Instrumentierung ausgeführt: besuchte Zeile, vollständiger Zustand, Bedingung und Ausgabe stimmen bei jedem Besuch mit dem Interpreter überein.
- `node scripts/check-chapter-three-python.mjs`: alle 77 tatsächlichen Python-Programme einschließlich Programmvergleichen werden mit Python und sys.settrace unabhängig ausgeführt. Jeder Zeilenbesuch, Zustand, Test und jede Ausgabe stimmen. Benötigt Python nur für die Entwicklung.
- `node tests/preview-chapter-three.mjs`: 120 Abgaben über alle vier Themen, drei Stufen, zwei Sprachen und fünf Formen. Prüft fehlende direkte Typwiederholungen, sichtbare Rückmeldung, Zählung, neue Trace-Spalten, Export/Import ohne Duplikate, erhaltene Daten nach Neuladen und mobile Seitenbreite. Aufgaben passen bei 1280×720 ohne vertikalen Kartenüberlauf. Lange Lerntexte und aufgeklappte Ablaufdetails dürfen intern scrollen.
- Bilder: `specs/assets/kapitel-3-counted-loop.png`, `kapitel-3-while-loop.png`, `kapitel-3-loop-accumulator.png`, `kapitel-3-loop-change.png` und `kapitel-3-mobil.png`.

## Noch offene Kapitel und Vertiefungen

Die Progression beschreibt Verständnisstufen, keine bereits abschließend vereinbarten Kapitelzuschnitte:

| Nächste Stufe | Noch umzusetzen |
| --- | --- |
| 4 · Sammlungen | Listen/Arrays, Indizes, Veränderungen, Iteration über Elemente, Dictionaries/Maps und Textverarbeitung |
| 5 · Funktionen und Bausteine | Definition/Aufruf, Parameter, Rückgabewerte, Gültigkeitsbereiche, Module und vorhandene Methoden |
| 6 · Daten und Fehlerfälle | Verschachtelte Daten, Veränderbarkeit, Referenzen/Kopien, Parsing, Dateien und Fehlerbehandlung |
| 7 · Ereignisse | Callback-Registrierung, Klick/Tastatur/Timer und Zustand; später einfache asynchrone Abläufe |
| 8 · Weiterführende Richtungen | Eigene Objektmodelle, Beziehungen/Vererbung, algorithmischer Aufwand und asynchrone Vertiefung; über dem Anfängerkern |

Frühere Stufen sind ebenfalls noch ausbaubar: unter anderem Zahl/Text und Eingaben, zusammengesetzte Bedingungen sowie die oben genannten Schleifenvertiefungen. HTML/DOM ist als ergänzender Lernstrang vorgesehen. Ein implementierter Grundumfang bedeutet keine vollständige Abdeckung sämtlicher Themen der Progression.
