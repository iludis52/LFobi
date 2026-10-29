# Kompakte Modellverträge

Stand: 16. Oktober 2026. Beauftragte Optimierung des Eingabevolumens bei unverändertem Lernumfang.

## Autorentexte und Laufzeit

Die vollständigen deutschen Aufgaben-Skills bleiben die didaktische Referenz. Sie werden weiterhin geladen und validiert, jedoch nicht mehr vollständig in jede Modellanfrage kopiert. `model-prompts.js` enthält die kurzen englischen Laufzeitverträge für Vorlagenauswahl, optionale Skillauswahl, Verzweigungswerkstatt und Kurzerklärung. Die fachlichen Beschränkungen werden durch die validierten Vorlagen beziehungsweise den geschlossenen Programmbaum-Vertrag und die unabhängigen lokalen Prüfungen durchgesetzt. Änderungen an diesen Verträgen müssen zusammen mit Skill-Freigaben und Tests erfolgen; freie neue Konzepte lassen sich nicht allein durch längere Skill-Prosa freigeben.

Alle sichtbaren Aufgaben und Rückmeldungen bleiben deutsch. Die Verzweigungswerkstatt muss ausdrücklich deutsche Titel und Kontexte liefern; Kurzerklärungen bleiben auf zwei Sätze und 55 Wörter begrenzt. Interne Anweisungen sind englisch; fachliche Referenzen, Code, Antworttexte und konkrete Prüfdiagnosen werden nicht verlustbehaftet übersetzt.

## Einsparungen

- Bei genau einem zulässigen Skill wird dieser lokal gewählt. Nur mehrere zulässige Skills lösen eine Modell-Skillauswahl aus; Katalogprüfung bleibt erhalten. Aktuell sind alle Themen eindeutig zugeordnet.
- Vorlagenauswahl erhält Lernziel, Schwierigkeit, Sprache, Vorlagen-IDs, Parametergrenzen und erlaubte Varianten sowie gegebenenfalls die vorherige Variante. Redundante Kapitelnummer, Vorlagentitel und native Antwortform entfallen. Die App bestimmt die endgültige Antwortform.
- Die Adaptionsübermittlung enthält nur `strategy` und gegebenenfalls `focus`. Modus und Fragestellung werden bereits lokal in die zulässigen Vorlagen beziehungsweise `required_question` umgesetzt. Drei-Aufgaben-Gedächtnis, Befunde, UI-Begründung und Stufenempfehlung bleiben lokal.
- Kurzerklärungen erhalten Code, richtig/falsch, die geprüfte Erklärung und genau einen Befund: den ersten Fehler oder bei richtiger Abgabe eine passende richtige Beobachtung. Ein Befund enthält Label, tatsächliche Antwort und Referenz. Andere Teilprüfungen und ihre teils langen Antworttexte werden nicht mehrfach übertragen.
- Verzweigungsentwürfe verwenden den englischen Vertrag und behalten Schema, Beispiel, Zahlen-/Komplexitätsgrenzen, beide Zweigprüfungen, Neuheitskontrolle sowie höchstens einen Korrekturversuch. Keine vollständige Wiederholung des Skill-Hauptteils.
- Ausgabelimits: 220 Tokens für Vorlagenauswahl und Erklärung, 96 für die seltene Skillauswahl; Werkstatt weiterhin 1.800. Ein kleineres Limit garantiert keinen proportional geringeren Verbrauch und darf gültige Antworten nicht abschneiden.

## Reproduzierbarer Volumenvergleich

`node scripts/audit-model-prompts.mjs` simuliert fünf Aufgaben „Map / Datensatz“, Stufe 1, Python, mit festen Zufallszahlen (Seed 42), richtigen Erstabgaben und Modell-Mocks. Keine externen Modellanfragen und keine Zugangsdaten. Gespeichert werden ausschließlich aggregierte Textlängen und Anfragezahlen.

| Messung | Vorher | Nachher |
| --- | ---: | ---: |
| Modellanfragen | 15 | 10 |
| Zeichen der Nachrichteninhalte | 24.681 | 8.911 |
| UTF-8-Bytes der Nachrichteninhalte | 25.157 | 8.941 |

Das entspricht 63,9 % weniger Zeichen und 64,5 % weniger UTF-8-Bytes in diesem Szenario. Berichte: `prompt-volume-before.json` und `prompt-volume-after.json`. Die Messung umfasst nicht die HTTP-Hülle oder anbieterinterne Chatformatierung. Es sind keine Tokenmessungen und keine isolierte Messung des Sprachwechsels. Die tatsächliche Tokenersparnis muss am verwendeten Modell mit dessen Nutzungswerten im Pilot verglichen werden; eine pauschale Einsparung von 25 % durch Englisch ist nicht vorausgesetzt. Für die Verzweigungswerkstatt gilt ein anderer, weiterhin umfangreicherer Vertrag.

## Abnahme

66 automatisierte Tests prüfen weiterhin alle Aufgabenfamilien und Antwortformen. Neue Regressionen prüfen den kompakten Adaptionsauftrag, exakte Fehlerbefunde, den richtigen Beobachtungsbeleg, das Weglassen der Autorentexte und der Rohhistorie sowie genau eine Vorlagenauswahl und eine Erklärung je neuer abgegebener Aufgabe. Die Tokenmonitor-Tests berücksichtigen den entfallenen Skillauswahl-Aufruf. Ungültige Vorlagen, Parameter und Skill-Auswahlen führen weiterhin zum geprüften Ersatz.

Browserprüfung mit lokalen Modell-Mocks: `node tests/preview-adaptive.mjs`. Echte Modelle und ihre fachliche Erklärungsqualität bleiben im Nutzerpilot zu prüfen. Das bestehende Tokenprotokoll zählt tatsächliche Anbieterwerte, einschließlich fehlgeschlagener und verworfener Antworten.
