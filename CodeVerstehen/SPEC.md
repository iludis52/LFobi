# Code verstehen: Umsetzungsspezifikation für den ersten Ausbau

Stand: 16. Oktober 2026. Kapitel 1–5 mit 26 Aufgabenfamilien und 84 Vorlagen als statische Web-App umgesetzt. Kapitel 3 enthält break und continue. Kapitel 4 und 5 decken den vereinbarten Grundumfang der Lernprogression für die User-Tests ab. Aufgabenlaufzeit und Auswertung laufen im Browser. Mindestens fünf Antwortformen je Kapitel/Thema/Stufe, keine direkte Typwiederholung. Der Nutzer hat LM Studio und DeepInfra im bisherigen Prototyp erfolgreich geprüft. Der erweiterte Katalog benötigt einen erneuten Modellpilot; Ziel-WordPress-Hosting und Kapitel 6–8 bleiben Ausbauarbeit.

## Verbindliches Hostingziel

Die App wird als statische Web-App in einem Unterordner des vorhandenen WordPress-Webservers ausgeliefert und auf einer WordPress-Seite eingebunden. Kein `npm start`, eigener Hintergrundprozess, eigenes WordPress-Plugin oder PHP-App-Endpunkt ist erforderlich. Lernkern und JavaScript-Tools laufen im Browser; Skills und Vorlagen werden als Dateien geladen. Modelle werden direkt vom Browser angesprochen; die Kompatibilität der Anbieter und Browser ist noch zu prüfen. Siehe [WordPress-Hosting](specs/09-wordpress-hosting.md).

## Verbindlicher Kern

Die App vermittelt Programmverständnis durch kurze Interaktionen. Kapitel 1 beginnt mit Ausdrucksauswertung und Neuzuweisung. Keine Pflicht zum Schreiben einer Erklärung. Links bleiben Kurzskizze und Erklärung zugänglich, rechts befinden sich Aufgaben und Rückmeldungen.

Sechs Formen: Einzelauswahl, Mehrfachauswahl, Codeauswahl, Lücken, Reihenfolge, Diagramm. Jede akzeptierte Abgabe zählt einmal als richtig oder falsch. Eine erneute Bearbeitung zählt als weitere Abgabe und bleibt als Wiederholung erkennbar. Ein Übertragungsversuch derselben Abgabe erzeugt keinen zweiten Eintrag.

Drei Schwierigkeiten: 1 Einfach, 2 Mittel, 3 Anspruchsvoll. Lernende wählen direkt über den durchklickbaren Button 1/3–3/3; „Auswahl bestätigen“ startet sofort eine neue Aufgabe mit gewähltem Kapitel, Thema, Schwierigkeit und Sprache. Der Stufenbutton allein ersetzt keine Aufgabe. Ungeprüfte Antworten verworfener Aufgaben zählen nicht. Keine automatischen Schwierigkeitsänderungen. Die letzten drei Aufgabenbefunde steuern gezielte Varianten innerhalb der Auswahl; Stufenwechsel werden nur empfohlen (Zusatz 20). Komplexität und Transfer unterstützen die Kuration, werden nicht individuell berechnet.

Mensch und Autoren-KI entwickeln Markdown-Skills mit Frontmatter und Hauptteil. Die App begrenzt Skill-Katalog und Vorlagen durch Kapitel, Lernziel und Schwierigkeit. Bei eindeutigem Thema wählt die App den Skill lokal; das Laufzeit-LLM parametrisiert eng vorgegebene Vorlagen anhand kompakter englischer Verträge. Bei mehreren zulässigen Skills bleibt eine geprüfte Modellauswahl möglich. Die App prüft Struktur, Wortzahl und Lösung und wertet Antworten aus. Modellhorizont: eine Aufgabe mit kompakter Adaptionszusammenfassung der letzten drei Aufgaben, keine rohe Dialoghistorie und kein LangGraph-Reducer. Nach Abgabe ergänzt ein eigener Modellaufruf eine kurze Erklärung; die Bewertung bleibt lokal. Verbindlich ist [Zusatz 20](specs/20-adaptive-aufgaben-und-kurzerklaerung.md).

## Statische Laufzeitverträge

Verbindlicher Zusatz vom 14. Oktober 2026: [Kontrollierte Aufgabengenerierung und Vielfalt](specs/16-kontrollierte-aufgabengenerierung.md). Für Verzweigungen gestaltet das LLM strukturierte Programme innerhalb des eingeführten Lernumfangs. Die App prüft jeden Entwurf deterministisch, berechnet die Lösung unabhängig und kontrolliert Wiederholungen heuristisch. Höchstens ein Korrekturversuch, danach geprüfte Ersatzaufgabe. Andere Familien behalten ihren bisherigen Vorlagenvertrag.

- `skills/catalog.json`: Register der freigegebenen Skillordner, relativ zur App geladen.
- Kapitel 1 mit vier Lernzielen: `assignment-order`, `current-state`, `statement-order`, `value-copy`. Themenwahl und Schwierigkeit werden ausdrücklich bestätigt; dann werden Aufgabe und Erklärung sofort ersetzt.
- `task-variation.js`: geprüfte Variablennamenprofile und zusätzliche Einzelauswahl von Antwortpaaren für die drei neuen Familien. Das Modell kann sie zusammen mit den Zahlen wählen; keine freie Code- oder Lösungserzeugung.
- `chapter-one.js`: neun fest definierte neue Programmstrukturen, vorlagenbezogene Parametergrenzen, Zustandsabläufe und Lösungsschlüssel. Nur positive ganze Zahlen bis 50, keine Ausführung von Modellcode.
- Kapitel 2: condition-check, branch-choice, decision-chain, branch-change. Freie Kapitelwahl; Bestätigung ersetzt sofort die Aufgabe.
- Kapitel 3: counted-loop, while-loop, loop-accumulator, loop-change. Zwölf Referenzen mit 77 Zahlenkombinationen in Python und JavaScript. Einzelne Ausführungen derselben Zeile bleiben im Ablauf unterscheidbar.
- `chapter-three.js`: begrenzte endende Schleifenpläne, exklusiver range-Stop, erneute while-Prüfungen, sprachgerechter for-Gültigkeitsbereich, Durchlaufzahlen, Zwischenwerte und Ausgaben. Kein Ausführen von Modellcode.
- Kapitel 3 ergänzt `loop-break` und `loop-continue`. Kapitel 4 enthält Listen/Indizes, Änderungen, elementweise Durchläufe, Zuordnungen/Datensätze, Text und Transformationen. Kapitel 5 enthält Aufruf/Parameter, Rückgabe/Ausgabe, Gültigkeitsbereiche, Seiteneffekte, Komposition und Module/Methoden.
- `advanced-lessons.js` und `learning-program.js`: geschlossene kuratierte Programmknoten für die neuen Themen; sprachgerechte Ausgabe, Sammlungen, Aufrufbereiche und Rückgabewerte. `lesson-tools.js` und `lernbausteine.py` sind kleine mitgelieferte Lehrmodule mit sichtbarem Vertrag. Modelle liefern weiterhin nur Vorlagen-IDs und begrenzte Zahlenparameter.
- `chapter-two.js`: zwölf feste Entscheidungsreferenzen sowie gemeinsamer Renderer/Interpreter für geprüfte Programmbäume, typisierte Lückenalternativen, tatsächlich geprüfte Bedingungen und übersprungene Zeilen.
- `branch-workshop.js`: sechs Fragestellungen je Stufe für if/else, begrenzte freiere Programmentwürfe, unabhängige Typ-/Ablauf-/Antwortprüfung, heuristische Kontrolle der letzten drei Strukturen und Kontexte; maximal ein Korrekturversuch und geprüfter Ersatz.
- `adaptive-learning.js`: temporäre Befunde der letzten drei Aufgaben, gezielte Varianten innerhalb der Auswahl, Stufenempfehlungen und lokale/LLM-Kurzerklärung.
- `runtime.js`: browserseitiger Skill-Loader, adaptive begrenzte Aufgabenwahl, idempotente Abgabeauswertung und gecachte Erklärungsanfragen.
- `model-client.js`: direkte Browserverbindung zu lokalem LM Studio oder dem festen HTTPS-Anbieterendpunkt; keine App-API.
- `model-monitor.js`: dauerhaft sichtbarer Verbindungsstatus, gemeldete Eingabe-/Ausgabetokens, lokale kumulative Summen je Modell, begrenztes Anfrageprotokoll und Verbrauchsexport. Verbindungstests und verworfene Antworten zählen mit; unbekannter Verbrauch bleibt gekennzeichnet. Keine automatischen Modellaufrufe zur Statusprüfung.
- `runtime.next`: Sitzung, Kapitel, Lernziel, Schwierigkeit, Sprache, Modellkonfiguration und vorige Vorlagen-ID; liefert eine geprüfte Aufgabenansicht ohne sichtbare Lösung.
- `runtime.submit`: Aufgaben- und Abgabe-ID sowie strukturierte Antwort; liefert lokales Ergebnis und Datensatz. Werkstattabgaben speichern zusätzlich Aufgabenart, Generierungsvertragsversion, akzeptierten Programmbaum, Prüfstatus und begrenzte Ablehnungsgründe. Gleiche Abgabe-ID liefert dasselbe Ergebnis, neue ID zählt als weiteren Versuch.
- Aufgaben und Lösungen liegen im Tab-Speicher, Ergebnisse im Browser-Speicher. Kein Node-Sitzungszustand.
- Auslieferung: `release/code-verstehen.zip`, ausschließlich statische App-Dateien.

## Historische Node-Prototyp-Verträge

- Registrierter Skill: `skills/zuweisung-reihenfolge/`, Version 1.0.
- `GET /api/catalog`: Metadaten, sichtbare Erklärung und unterstützte Formen.
- `POST /api/next`: Sitzung, Schwierigkeit, Sprache, gegebenenfalls Modellkonfiguration und letzte Vorlagen-ID; Antwort enthält geprüfte Aufgabeninstanz ohne Lösung und gegebenenfalls Ersatzhinweis.
- Modellauswahl: zuerst `{"skill_id":"zuweisung-reihenfolge"}`, danach `{"template_id":"zulässige ID","parameters":{"start":3,"add":2}}`.
- `POST /api/submit`: Sitzung, Aufgaben-ID, eindeutige Abgabe-ID und typbezogene Antwort; Ergebnis und dauerhafter Browser-Datensatz werden zurückgegeben. Der Server verwendet seine gespeicherte Lösung, keine vom Client vorgegebene.
- Lösungsschlüssel: ID bei Einzelauswahl/Diagramm, ID-Menge bei Mehrfachauswahl, Bereich plus Wert bei Codeauswahl, Zuordnung bei Lücken, ID-Reihenfolge bei Sortierung.
- Unbekannte oder ungültige Auswahl erzeugt eine gekennzeichnete geprüfte Ersatzaufgabe derselben Schwierigkeit.
- Lerndaten lokal, Export/Import Version 2. Keine Speicherung von API-Keys.

Die genannten `/api/`-Routen und die serverseitige Lösungshaltung beschreiben ausschließlich die archivierte Quelle unter `archive/node-prototype/server.js`. Die aktive App verwendet keine dieser Routen. Der Lösungsschlüssel bleibt vor Abgabe in der Ansicht verborgen, ist jedoch technisch browserseitig zugänglich.

## Abnahme des ersten Ausbaus

- Statischer Betrieb ohne eigenen Node-/npm-Prozess, einschließlich eines Unterordners. Die tatsächliche WordPress-Einbettung ist noch auf dem Zielhosting zu prüfen.

- Alle sechs Formen sind innerhalb dieser Aufgabenfamilie nutzbar, verteilt auf drei Schwierigkeiten.
- Rechts berechnen und erst danach zuweisen wird durch strukturierte Interaktionen geprüft.
- Transfer unterscheidet Berechnung in einer Ausgabe von einer Neuzuweisung.
- Alle textlichen Alternativen einer Gruppe haben gleiche Wortanzahl; Diagrammalternativen sind gleich aufgebaut und zugänglich beschriftet.
- Erklärung bleibt während der Bearbeitung erreichbar und sichtbar; auf schmalen Ansichten in einem kompakten Bereich.
- Kein Lösungs- oder Ablaufergebnis vor Abgabe in der Aufgabenansicht.
- Doppelübertragungen, Wiederholungen, fehlende Auswahl und Modellfehler sind eindeutig behandelt.
- Mock-Integration prüft Skills, Kontextbegrenzung und Ersatzaufgaben. Echte Modellantworten bleiben ein anschließender Pilot.

## Entscheidungsdokumente

1. [Aufgaben und Bewertung](specs/01-aufgaben-und-bewertung.md)
2. [Interaktionsformen](specs/02-interaktionsformen-und-antwortgenerierung.md)
3. [Kuration](specs/03-kuration-und-skillformat.md)
4. [Einfacher Lernzustand](specs/04-lernzustand-und-aufgabenhorizont.md)
5. [Referenzaufgaben](specs/05-referenzaufgaben-schwierigkeit.md)
6. [Umfang und Oberfläche](specs/06-umfang-und-lernoberflaeche.md)
7. [Skill- und Aufgabenvertrag](specs/07-skill-und-aufgabenvertrag.md)
8. [Bisherige Prüfung des Node-Prototyps](specs/08-abnahme-erster-ausbau.md)
9. [WordPress-Hosting und Migration](specs/09-wordpress-hosting.md)
10. [Prüfung der statischen Fassung](specs/10-abnahme-statische-fassung.md)
11. [Ausbauplan: Aufgabenbestand Kapitel 1](specs/11-ausbau-aufgabenbestand-kapitel-1.md) – vom Nutzer freigegeben; erster Abschnitt mit neun Referenzvorlagen umgesetzt. Weitere Varianten und Themenmischung folgen später.
12. [Prüfung des Aufgabenbestands-Ausbaus](specs/12-pruefung-aufgabenausbau.md) – 19 Tests, tatsächliche Ausführung der neuen Zahlenvarianten, Browser- und Paketprüfung.
13. [Bedienkorrekturen und Modellvariation](specs/13-bedienkorrekturen-und-variation.md) – bestätigter Sofortwechsel, breiteres Layout und erweiterter Variationsvertrag.
14. [Modellstatus und Tokenverbrauch](specs/14-modellstatus-und-tokenverbrauch.md) – permanenter Status, gespeicherte Verbrauchssummen und Debugübersicht; 30 Tests und isolierte Browserprüfung.

15. [Kapitel 2: Entscheidungen](specs/15-kapitel-2-entscheidungen.md) – zwölf Referenzen, 155 Varianten, freie Kapitelwahl und Zweigabläufe; 34 Tests.
16. [Kontrollierte Aufgabengenerierung und Vielfalt](specs/16-kontrollierte-aufgabengenerierung.md) – sechs wechselnde Fragestellungen je Stufe für if/else, freiere geprüfte Modellentwürfe, begrenzte Korrektur und Tokenkontrolle; 41 Tests.
17. [Verbindlicher Typwechsel und kompakte Oberfläche](specs/17-typwechsel-und-kompakte-oberflaeche.md) – mindestens fünf Formen je Auswahl, kein gleicher Typ direkt hintereinander, einzeilige Kopfleiste und Lernübersicht links.
18. [Kapitel 3: Wiederholungen](specs/18-kapitel-3-wiederholungen.md) – vier Themen, zwölf Referenzen, 77 Zahlenkombinationen, differenzierte Schleifenabläufe und Prüfungen in beiden Sprachlaufzeiten.
19. [Kapitel 4/5 und Schleifenkontrolle](specs/19-kapitel-4-5-und-schleifenkontrolle.md) – vollständiger Grundumfang für die User-Tests, break/continue, 43 weitere Vorlagen, unabhängige Sprachprüfungen und Browserabnahme.

Die Entwurfsdokumente halten die Herleitung fest. Dieser Stand konkretisiert die Implementierungsverträge und hält den ersten Ausbau von späteren Erweiterungen getrennt.

20. [Adaptive Aufgaben und Kurzerklärung](specs/20-adaptive-aufgaben-und-kurzerklaerung.md) – Drei-Aufgaben-Gedächtnis, Variation innerhalb der Auswahl, Stufenempfehlung und kurze grüne Erklärung unter dem Code.

21. [Verständliche Ablaufangaben](specs/21-verstaendliche-ablaufangaben.md) – interne Laufzeitnamen aus Aufgabentexten entfernt, Ausführungen und Funktionsaufrufe nur bei Bedarf unterscheiden.

22. [Kompakte Modellverträge](specs/22-kompakte-modellvertraege.md) – vollständige Autorenskill-Texte lokal, kompakte englische Laufzeitanweisungen, keine unnötige Skillauswahl, verdichtete Adaptions- und Erklärungsbefunde; reproduzierbarer Volumenvergleich.
