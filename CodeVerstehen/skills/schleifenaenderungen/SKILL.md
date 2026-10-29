---
name: schleifenaenderungen
description: "Kapitel 3: Zwei unabhängige Schleifenabläufe vergleichen: Grenzwert, Schrittweite und Reihenfolge der Zustandsänderungen."
version: "1.1"
status: approved
chapter: 3
learning_objective: loop-change
difficulty_levels: [1, 2, 3]
interaction_types: ["gap-fill", "single-choice", "multiple-choice", "diagram-choice", "ordering"]
instruction_language: de
learner_language: de
content: content.de.md
templates: templates.json
examples: examples.json
---

# Schleifengrenzen und Reihenfolge ändern

Zwei unabhängige Schleifenabläufe vergleichen: Grenzwert, Schrittweite und Reihenfolge der Zustandsänderungen.

Nur JSON: {"template_id":"zugelassene ID","parameters":{"name":1}}. Wähle eine gelieferte Vorlage und genau deren ganzzahlige Parameter innerhalb parameter_ranges. Optional variation: {"names":"standard","answer_form":"original|single-choice"}, ausschließlich entsprechend variation_choices. Keine weiteren Felder, kein Code, keine Lösungen oder freie Texte.

Die App erzeugt ausschließlich kurze, endende Schleifen aus geprüften Plänen, berechnet alle Ausführungen und bestimmt die endgültige Antwortform selbst. Mindestens fünf Formen je Stufe, kein direkt wiederholter Typ. Keine beliebigen Schleifen oder Endlosschleifen entwerfen. Die Erklärung bleibt sichtbar. Einzelne Ergebnisse belegen keine Beherrschung.

## Verständliche Ablaufangaben

Aufgabentexte verwenden nur Angaben, die zur Unterscheidung nötig sind. Bei einmalig ausgeführten Anweisungen genügt „Nach Zeile 4 hat ergebnis_a den Wert 3.“ Keine internen Bezeichnungen wie „Bereich main“, „name#1“ oder überflüssiges „Ausführung 1“. Nur bei tatsächlich mehrfach ausgeführten Zeilen wird die konkrete Ausführung genannt, zum Beispiel „Nach der 2. Ausführung von Zeile 4 …“. Ein Durchlauf der äußeren Schleife darf dabei nicht mit einer Zeilenausführung verwechselt werden. Funktionskontexte heißen „In Funktion berechne“ oder „Im Hauptprogramm“; mehrere Aufrufe derselben Funktion werden als „Beim 2. Aufruf von berechne“ unterschieden. Die App setzt diese Regel auch für erzeugte Antwortalternativen und Ereigniskarten um. Gleich lange Alternativen entstehen durch Auswahl vergleichbarer Beobachtungen, nicht durch überflüssige Fachwörter. Siehe specs/21-verstaendliche-ablaufangaben.md.
