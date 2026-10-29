# Verbindlicher Typwechsel und kompakte Oberfläche

Stand: 15. Oktober 2026. Konkretisiert die sechs Interaktionsformen aus Dokument 02 und erweitert die bisher auf Lücken/Einzelauswahl begrenzten Themen.

## Lernziel und Umfang

Breitere Aufgaben sollen das Übertragen von Wissen auf andere Darstellungen fördern. Wechselnde Zahlen allein reichen dafür nicht. Fachliche Fragestellung, Programmstruktur und Antwortform sind getrennte Dimensionen; ein Formwechsel allein belegt keinen Lernerfolg.

Jede bestehende Kombination aus Kapitel, Thema, Schwierigkeit und Python/JavaScript unterstützt mindestens fünf tatsächlich bedienbare und auswertbare Formen:

1. Lücken: Werte oder Aussagen zu Beobachtungspunkten zuordnen.
2. Einzelauswahl: genau eine zutreffende Antwort bzw. Beobachtungskombination.
3. Mehrfachauswahl: alle richtigen Aussagen; exakter Mengenvergleich. Neue Varianten prüfen gespeicherte Werte nach tatsächlich ausgeführten Zeilen mit ein bis drei richtigen unter vier Aussagen. Die Anzahl wird nicht verraten. Bestehende kuratierte Mehrfachauswahlen bleiben erhalten.
4. Diagrammauswahl: zusammengehörige Beobachtungen in strukturierten, gleich gestalteten Feldern erkennen. Verbindungslinien bedeuten hier keine zeitliche Reihenfolge. Bestehende Ablaufdiagramme behalten ihre Richtungspfeile und ihren Auftrag.
5. Ereignisse ordnen: höchstens vier aus dem verifizierten Ablauf abgeleitete Ereignisse nach ihrem ersten Auftreten ordnen. Bei zwei unabhängigen Programmen gilt ausdrücklich A vor B. Gleiche Ereignistexte werden dedupliziert; die Reihenfolge bleibt eindeutig. Nicht alle Ereignisse müssen als Karten vorkommen.

Die native Codeauswahl bleibt als sechste Form für einfache Zuweisungen erhalten. Andere Stufen werden für diesen Formwechsel nicht auf ein einfacheres Programm zurückgesetzt.

## Verteilung und Auswertung

- Die App verwaltet pro Sitzung eine zuletzt angezeigte Form und je Kapitel/Thema/Stufe/Sprache einen gemischten Vorrat an Formen. Ein Durchlauf besucht alle fünf bzw. sechs Formen, bevor der Vorrat neu gemischt wird.
- Keine zwei aufeinanderfolgenden neuen Aufgaben erhalten denselben Typ. Das gilt auch ohne übergebene vorherige Aufgaben-ID, über Auswahlwechsel hinweg, für Demo, Modellauswahl, Aufgabenwerkstatt und Ersatzaufgaben. Wiederholen einer bereits abgegebenen Aufgabe bleibt dieselbe Aufgabe und zählt nicht als Neugenerierung.
- Wenn ein Auswahlwechsel nur die zuletzt gezeigte Form im Restvorrat hinterlässt, wird eine andere Form eingeschoben. Die ausstehende Form bleibt für die nächste Aufgabe erhalten.
- Der Sitzungszustand lebt im geöffneten Tab; Neuladen beginnt eine neue Sitzung. Maximal 30 Laufzeitsitzungen werden gehalten.
- Das Modell liefert weiterhin ausschließlich freigegebene Parameter bzw. geprüfte Programmbäume. Die App bestimmt die endgültige Antwortform und erzeugt deren Lösung deterministisch aus Beobachtungen und Ablauf. Dafür fallen keine zusätzlichen Modellanfragen an.
- Wortzahl, eindeutige IDs, drei oder vier austauschbare Alternativen und passende Fehlerrückmeldungen werden geprüft. Keine Lösung, Ablaufdaten oder Hinweise im öffentlichen Aufgabenobjekt vor der Abgabe.
- `variation.interaction_form` protokolliert die tatsächliche Antwortform. Gespeicherte Optionen, Lücken, Schritte, Code und Lösung machen die Abgabe nachvollziehbar. Die bisherigen Antwortverträge und das Exportformat Version 2 bleiben gültig.
- Sortieraufgaben ergänzen das Kriterium `execution-order`, neue Zustandsaussagen `state-observation`. Sie prüfen den Ablauf bzw. gespeicherte Zustände, nicht automatisch alle Detailbeobachtungen der ursprünglichen Aufgabe.

## Oberfläche

- Eine kompakte erste Zeile: „Lernlabor Python/JavaScript“, farblich abgegrenzter Bereich Verbindung/Demo/Status/Tokens, zweiter Bereich mit kurzen Kapitel-/Thema-/Sprachauswahlen und Schwierigkeitsbutton, abschließend „Auswahl bestätigen“.
- Schwierigkeit wird per Tastatur oder Klick durch `1/3`, `2/3`, `3/3` geschaltet. Zugängliche Beschriftung nennt Stufe, Bedeutung und nächsten Wert. Auswahländerungen werden weiterhin erst nach Bestätigung wirksam.
- Kein „Dein Übungsraum“ und keine zusätzliche Marke „c Code verstehen“. Die Hauptüberschrift der Aufgabe und der vollständige Themenname bleiben sichtbar.
- Die Kopfleiste bricht nicht um; nur bei tatsächlichem Platzmangel erhält sie einen schmalen horizontalen Scrollbalken. Die Seite selbst wird dadurch nicht breiter.
- „Lernübersicht“ liegt links oberhalb der Lerninhalte und öffnet die bestehende Übersicht mit Export/Import.
- Desktop: Kopfleistenhöhe wird gemessen, die übrige Fensterhöhe steht den beiden Spalten zur Verfügung. Aufgabe, Abgabe und Weiter-Schaltfläche erhalten mehr Platz. Umfangreiche Erklärungen, lange Aufgaben und aufgeklappte Lösungsdetails dürfen weiterhin innerhalb ihres Bereichs scrollen, damit Schrift und Bedienung lesbar bleiben. Auf Mobilgeräten ist vertikales Seitenscrollen erforderlich.
- Programmvergleiche zeigen A und B auf dem Desktop nebeneinander innerhalb des Codebereichs. Auf Mobilgeräten stehen sie untereinander. Sehr lange Codezeilen behalten einen eigenen horizontalen Scrollbereich.

## Prüfung und Auslieferung

- `npm test`: 46 Tests, einschließlich aller Referenz-Parameterkombinationen in beiden Sprachen und fünf Antwortformen sowie aller Werkstatt-Fragestellungen/Stufen. Prüft richtige/falsche Antworten, Wortzahl, keine vorzeitige Lösung, breite Verteilung und keine direkten Typwiederholungen bei Demo, erfolgreicher Modellauswahl und Modellausfall.
- `node tests/preview-compact.mjs`: isolierter Browser mit eigenem Testserver, Desktopgrößen 1280×720, 1366×768, 1920×1080 und Mobilansicht 390×844; prüft Kopfleiste, Seitenbreite, Bestätigung, Abgabe, Stufenwechsel, Typwechsel, Sprachwechsel und Lernübersicht. Anschließend 120 Aufgaben über alle acht Themen und drei Stufen: bei 1280×720 kein vertikaler Überlauf der Aufgabenkarte. Lange Lerntexte bleiben dort intern scrollbar. Bilder liegen in `specs/assets/compact-*.png`.
- Das statische Paket enthält auch `interaction-forms.js`; Paket und ZIP werden über `scripts/package-static.ps1` neu erstellt.
