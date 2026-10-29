# Prüfung des ersten Aufgabenbestands-Ausbaus

Datum: 14. Oktober 2026.
Umfang: Der vom Nutzer freigegebene erste Abschnitt aus [Ausbauplan 11](11-ausbau-aufgabenbestand-kapitel-1.md): drei zusätzliche Familien und neun Referenzvorlagen. Insgesamt vier Familien und 17 Vorlagen.

## Automatisierte Prüfung

`npm test`: 19 Tests bestanden. Die bisherigen Aufgaben und Modellverträge bleiben geprüft. Zusätzlich:

- Neun feste Referenzen: Zustände, Ausgaben, Lösung und Zahlenkarten stimmen mit den freigegebenen Beispielen überein.
- Alle 325 erlaubten Parameterkombinationen der neuen Vorlagen sind geprüft. Python- und JavaScript-Darstellungen liefern dieselben Referenzabläufe und Lösungen.
- Der erzeugte JavaScript-Code wird im Test unabhängig ausgeführt; jeder Zwischenzustand und jede Ausgabe wird mit der Aufgabenreferenz verglichen. Die beiden Vergleichsprogramme werden getrennt ausgeführt.
- In einer zusätzlichen Entwicklungsprüfung wurden sämtliche 325 Python-Varianten tatsächlich ausgeführt; auch hier stimmen alle Zwischenzustände und Ausgaben mit den Referenzen überein. Python ist dafür ein Entwicklungswerkzeug, keine App-Voraussetzung.
- Parametergrenzen, zusätzliche und fehlende Parameter, unvollständige Antworten, eindeutige Zahlenkarten und tatsächlich falsche Auswahlwerte sind geprüft.
- Richtige Antworten werden erkannt. Bei falschen Lücken wird der Hinweis für den frühesten fehlerhaften Beobachtungspunkt verwendet. Lösung, Ablauf und interne Hinweise fehlen in der Ansicht vor Abgabe.
- Alle neuen Lernziele und Stufen funktionieren in Demo und mit Modell-Mocks. Unzulässige Auswahl erzeugt einen Ersatz desselben Lernziels und derselben Schwierigkeit.
- Die vorherige Vorlage wird bei vorhandenen Alternativen für Demo und Modell ausgeschlossen. Die Demo durchläuft weiterhin alle passenden Vorlagen, statt nur zwischen den ersten beiden zu wechseln.
- Abgaben bleiben idempotent und mit Lernziel, Skill und Vorlage identifizierbar. Eine unvollständige Abgabe zählt nicht als erster Versuch.

## Im Browser geprüft

Quellfassung unter `http://127.0.0.1:5500/CodeVerstehen/index.html` und Auslieferungsfassung unter `http://127.0.0.1:5500/CodeVerstehen/dist/code-verstehen/index.html`:

- Alle vier Themen stehen zur Auswahl. Themenwechsel lässt die aktuelle Aufgabe und ihre Erklärung erhalten; die nächste Aufgabe verwendet das neue Thema samt Erklärung.
- Eine unvollständige Lückenabgabe erzeugt kein Ergebnis. Eine Fehlantwort erzeugt einen gezielten Hinweis; die erneute richtige Abgabe zählt separat und bleibt als Wiederholung mit Hinweis erkennbar.
- Anspruchsvolle Aufgaben zu zwei Variablen funktionieren in JavaScript. Die Rückmeldung zeigt separate Spalten für a und b; noch nicht zugewiesene Namen sind mit einem Strich dargestellt.
- Programmvergleiche funktionieren mit getrennten Abläufen und einer zugeordneten Tabelle für Programm A und B. Die Ausgabe jedes Programms wird einzeln geprüft.
- Die Lernübersicht gruppiert Ergebnisse nach Lernziel und Schwierigkeit. Bereits vorhandene Abgaben des bisherigen Bestands bleiben sichtbar.
- In einer angeforderten Testansicht von 390 × 844 Pixeln bleibt die Erklärung angeheftet und scrollbar. Die anspruchsvolle Zustandsaufgabe lässt sich vollständig beantworten; die Seite läuft horizontal nicht über.
- Die breite Ansicht mit 1280 × 900 Pixeln zeigt Themenwahl, Erklärung und Aufgabenbereich in der vorgesehenen Anordnung.
- Die neuen Skill-Dateien werden auch im verschachtelten Auslieferungspfad geladen. Keine Warnungen oder Fehler in den erfassten Browserlogs der Paketprüfung.

Die [gespeicherte Vorschau](../ausbau-vorschau.jpg) zeigt die neue Familie „Zahlenwerte übernehmen“ auf Stufe 2.

## Paketprüfung

`release/code-verstehen.zip` wurde neu erzeugt. Es enthält 26 ausdrücklich freigegebene Dateien. Jede ZIP-Datei stimmt byteweise mit der aktuellen Quelle überein. Der Bestand enthält das neue Modul `chapter-one.js` und jeweils vier Dateien für die drei neuen Familien. Tests, historische Server und Entwicklungsdateien sind nicht enthalten.

## Noch offen

- Der Nutzer hat LM Studio und DeepInfra mit dem bisherigen Prototyp erfolgreich geprüft. Der erweiterte Katalog wurde hier mit Modell-Mocks geprüft; seine Auswahl und Parametrisierung müssen erneut mit den tatsächlich verwendeten Modellen erprobt werden.
- WordPress-Zielhosting und iframe-Einbettung bleiben separat zu prüfen.
- Ein Lernpilot muss die didaktischen Einstufungen und Rückmeldungen bestätigen. Technisch richtige Lösungen belegen noch keine Unterrichtswirksamkeit.
- Pro neuer Familie und Schwierigkeit ist zunächst eine Vorlage verfügbar. Weitere fachliche Varianten, andere passende Interaktionsformen und ein gemischter Themenmodus sind spätere Schritte gemäß Ausbauplan.
