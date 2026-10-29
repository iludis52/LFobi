---
name: bedingungen-grenzfaelle
description: "Vergleiche auswerten, Grenzwerte einschließen und gespeicherte Werte von berechneten Ausdrücken unterscheiden."
version: "1.2"
status: approved
chapter: 2
learning_objective: condition-check
difficulty_levels: [1, 2, 3]
interaction_types: ["gap-fill", "single-choice", "multiple-choice", "diagram-choice", "ordering"]
instruction_language: de
learner_language: de
content: content.de.md
templates: templates.json
examples: examples.json
---

# Bedingungen und Grenzwerte

Wähle nur eine der mitgelieferten Vorlagen. Nur JSON mit template_id und parameters. Verwende genau die Parameter der gewählten Vorlage und ganze Zahlen innerhalb ihrer parameter_ranges. Kein Code, keine Lösung, keine freien Texte.

Optional variation: {"names":"standard","answer_form":"original"} oder {"names":"standard","answer_form":"single-choice"}. Nur variation_choices der Vorlage sind zulässig. Kontextnamen bleiben erhalten. Die App berechnet Ablauf, Antworten und Hinweise aus freigegebenen Programmen.


## Verbindlicher Formwechsel

Die App mischt Lücken, Einzelauswahl, Mehrfachauswahl, Beobachtungsdiagramme und Ereignissortierung auf jeder Stufe. Sie erzeugt die endgültige Antwortform samt Lösung aus geprüften Beobachtungen und Ablaufdaten. Zwei neue Aufgaben erhalten nie direkt denselben Typ, auch bei Auswahlwechsel oder Ersatzaufgaben. variation.interaction_form protokolliert die tatsächlich dargestellte Form; dieses Feld wird von der App gesetzt und gehört nicht zur Modellausgabe. Der Modellvertrag für Programmbäume bzw. template_id, parameters und die bisherigen variation-Felder bleibt unverändert. Siehe specs/17-typwechsel-und-kompakte-oberflaeche.md.
