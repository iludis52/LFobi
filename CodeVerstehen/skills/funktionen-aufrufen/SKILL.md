---
name: funktionen-aufrufen
description: "Kapitel 5: Definition, Aufruf und Parameter. Drei Schwierigkeiten; 3 kuratierte Programme, fünf wechselnde Antwortformen."
version: "1.1"
status: approved
chapter: 5
learning_objective: function-call
difficulty_levels: [1, 2, 3]
interaction_types: ["gap-fill", "single-choice", "multiple-choice", "diagram-choice", "ordering"]
instruction_language: de
learner_language: de
content: content.de.md
templates: templates.json
examples: examples.json
---

# Definition, Aufruf und Parameter

Nur JSON mit template_id und parameters entsprechend der gelieferten Vorlage und parameter_ranges. Ausschließlich ganze Zahlen in den Grenzen. Optional variation mit names: standard und answer_form: original oder single-choice gemäß variation_choices. Keine weiteren Felder, kein Code, kein AST, keine Texte, keine Lösungen.

Die App erzeugt Programme, sprachgerechte Beobachtungen und Lösungen aus dem geprüften Lernprogramm. Arrays, Zuordnungen, Scopes, Funktionsaufrufe und Seiteneffekte werden deterministisch ausgewertet. Das Modell darf diesen Umfang nicht erweitern. Die App bestimmt die endgültige Antwortform: mindestens fünf je Stufe, nie derselbe Typ direkt hintereinander. Die letzte Aufgabenvariante darf zur Variation dienen, keine Lernendenantworten.

## Verständliche Ablaufangaben

Aufgabentexte verwenden nur Angaben, die zur Unterscheidung nötig sind. Bei einmalig ausgeführten Anweisungen genügt „Nach Zeile 4 hat ergebnis_a den Wert 3.“ Keine internen Bezeichnungen wie „Bereich main“, „name#1“ oder überflüssiges „Ausführung 1“. Nur bei tatsächlich mehrfach ausgeführten Zeilen wird die konkrete Ausführung genannt, zum Beispiel „Nach der 2. Ausführung von Zeile 4 …“. Ein Durchlauf der äußeren Schleife darf dabei nicht mit einer Zeilenausführung verwechselt werden. Funktionskontexte heißen „In Funktion berechne“ oder „Im Hauptprogramm“; mehrere Aufrufe derselben Funktion werden als „Beim 2. Aufruf von berechne“ unterschieden. Die App setzt diese Regel auch für erzeugte Antwortalternativen und Ereigniskarten um. Gleich lange Alternativen entstehen durch Auswahl vergleichbarer Beobachtungen, nicht durch überflüssige Fachwörter. Siehe specs/21-verstaendliche-ablaufangaben.md.
