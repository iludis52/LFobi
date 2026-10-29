---
name: bedingungen-grenzfaelle
description: "Vergleiche auswerten, Grenzwerte einschließen und gespeicherte Werte von berechneten Ausdrücken unterscheiden."
version: "1.3"
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

## Verständliche Ablaufangaben

Aufgabentexte verwenden nur Angaben, die zur Unterscheidung nötig sind. Bei einmalig ausgeführten Anweisungen genügt „Nach Zeile 4 hat ergebnis_a den Wert 3.“ Keine internen Bezeichnungen wie „Bereich main“, „name#1“ oder überflüssiges „Ausführung 1“. Nur bei tatsächlich mehrfach ausgeführten Zeilen wird die konkrete Ausführung genannt, zum Beispiel „Nach der 2. Ausführung von Zeile 4 …“. Ein Durchlauf der äußeren Schleife darf dabei nicht mit einer Zeilenausführung verwechselt werden. Funktionskontexte heißen „In Funktion berechne“ oder „Im Hauptprogramm“; mehrere Aufrufe derselben Funktion werden als „Beim 2. Aufruf von berechne“ unterschieden. Die App setzt diese Regel auch für erzeugte Antwortalternativen und Ereigniskarten um. Gleich lange Alternativen entstehen durch Auswahl vergleichbarer Beobachtungen, nicht durch überflüssige Fachwörter. Siehe specs/21-verstaendliche-ablaufangaben.md.
