---
name: verzweigungen
description: "Genau einen Zweig ausführen, Zustandsänderungen verfolgen und übersprungene Anweisungen erkennen."
version: "1.2"
status: approved
chapter: 2
learning_objective: branch-choice
difficulty_levels: [1, 2, 3]
interaction_types: ["gap-fill", "single-choice", "multiple-choice", "diagram-choice", "ordering"]
instruction_language: de
learner_language: de
content: content.de.md
templates: templates.json
examples: examples.json
generation_contract: branch-workshop-v1
---

# Verzweigungen mit if und else

Die Familie verwendet die kontrollierte Aufgabenwerkstatt branch-workshop-v1. Entwirf ein JSON-Aufgabenobjekt mit version, title, context, program und question entsprechend dem mitgelieferten Vertrag. Die App wählt die Fragestellung und steuert ihre Abwechslung. Du darfst neue Kontexte, passende Namen und Programme aus den zugelassenen Bausteinen gestalten. Kein ausführbarer Code als Text, keine Lösung, keine Antwortalternativen oder Hinweise. Andere Sprachmittel, freie Fachfragen und zusätzliche Felder sind ausgeschlossen.

Die App prüft beide Zweige, Typen, Namen, Werte, Komplexität und Beobachtung. Sie berechnet Ablauf, Alternativen und Lösung selbst und kontrolliert die letzten drei Programmstrukturen und Kontexte. Höchstens ein Korrekturversuch, danach kuratierte Ersatzaufgabe. Die drei alten templates.json-Einträge bleiben geprüfte historische Referenzen; der aktive Übungsablauf verwendet sechs Fragestellungen auf jeder Stufe.


## Verbindlicher Formwechsel

Die App mischt Lücken, Einzelauswahl, Mehrfachauswahl, Beobachtungsdiagramme und Ereignissortierung auf jeder Stufe. Sie erzeugt die endgültige Antwortform samt Lösung aus geprüften Beobachtungen und Ablaufdaten. Zwei neue Aufgaben erhalten nie direkt denselben Typ, auch bei Auswahlwechsel oder Ersatzaufgaben. variation.interaction_form protokolliert die tatsächlich dargestellte Form; dieses Feld wird von der App gesetzt und gehört nicht zur Modellausgabe. Der Modellvertrag für Programmbäume bzw. template_id, parameters und die bisherigen variation-Felder bleibt unverändert. Siehe specs/17-typwechsel-und-kompakte-oberflaeche.md.
