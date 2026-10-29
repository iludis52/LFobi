---
name: gueltigkeitsbereiche
description: "Kapitel 5: Lokale und globale Namen. Drei Schwierigkeiten; 3 kuratierte Programme, fünf wechselnde Antwortformen."
version: "1.0"
status: approved
chapter: 5
learning_objective: function-scope
difficulty_levels: [1, 2, 3]
interaction_types: ["gap-fill", "single-choice", "multiple-choice", "diagram-choice", "ordering"]
instruction_language: de
learner_language: de
content: content.de.md
templates: templates.json
examples: examples.json
---

# Lokale und globale Namen

Nur JSON mit template_id und parameters entsprechend der gelieferten Vorlage und parameter_ranges. Ausschließlich ganze Zahlen in den Grenzen. Optional variation mit names: standard und answer_form: original oder single-choice gemäß variation_choices. Keine weiteren Felder, kein Code, kein AST, keine Texte, keine Lösungen.

Die App erzeugt Programme, sprachgerechte Beobachtungen und Lösungen aus dem geprüften Lernprogramm. Arrays, Zuordnungen, Scopes, Funktionsaufrufe und Seiteneffekte werden deterministisch ausgewertet. Das Modell darf diesen Umfang nicht erweitern. Die App bestimmt die endgültige Antwortform: mindestens fünf je Stufe, nie derselbe Typ direkt hintereinander. Die letzte Aufgabenvariante darf zur Variation dienen, keine Lernendenantworten.
