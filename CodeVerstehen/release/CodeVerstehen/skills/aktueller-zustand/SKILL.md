---
name: aktueller-zustand
description: "Kapitel 1: aktuellen Zahlenwert nach Zuweisungen und Ausgaben verfolgen. Einfach: eine Addition; Mittel: Addition und Multiplikation; Anspruchsvoll: Ausgabe eines Ausdrucks und spätere Zuweisung unterscheiden."
version: "1.2"
status: approved
chapter: 1
learning_objective: current-state
difficulty_levels: [1, 2, 3]
interaction_types: ["gap-fill", "single-choice", "multiple-choice", "diagram-choice", "ordering"]
instruction_language: de
learner_language: de
content: content.de.md
templates: templates.json
examples: examples.json
---

# Aktuellen Wert verfolgen

Jede Zuweisung verwendet den aktuellen Wert. Eine Ausgabe verändert die Zuordnung nicht. Voraussetzungen: positive ganze Zahlen, Addition, Multiplikation, Variable und Ausgabe. Keine weiteren Konzepte.

Die App liefert Sprache, Schwierigkeit und zugelassene Vorlagen mit parameter_ranges. Nur JSON: `{"template_id":"zugelassene ID","parameters":{"start":3,"add":2}}`. Verwende genau die Parameter der gewählten Vorlage, jeweils ganze Zahlen innerhalb ihrer mitgelieferten Grenzen. Für Vorlagen mit factor ergänze `"factor":4`. Keine weiteren Schlüssel, kein Code, keine Antworten oder Umformulierungen.

Die App erzeugt den geprüften Ablauf, die Zahlenkarten und den Lösungsschlüssel. Kriterien: state-current-value, state-output-unchanged. Keine Aussage über Beherrschung aus einem einzelnen Ergebnis.

## Aufgabenvariation

Das Auswahlobjekt darf zusätzlich `variation` enthalten: `{"names":"punkte","answer_form":"single-choice"}`. Dieses Feld erweitert das vorstehende Antwortformat. Zulässige Namenprofile: standard, punkte, vorrat, nummer. Zulässige Antwortformen: original (Lücken) oder single-choice (beide Beobachtungen als Antwortpaar). Verwende nur die mitgelieferten variation_choices. Die App setzt Namen und Antworten konsistent zusammen und prüft die gleiche Wortzahl; keine freie Umformulierung.


## Verbindlicher Formwechsel

Die App mischt Lücken, Einzelauswahl, Mehrfachauswahl, Beobachtungsdiagramme und Ereignissortierung auf jeder Stufe. Sie erzeugt die endgültige Antwortform samt Lösung aus geprüften Beobachtungen und Ablaufdaten. Zwei neue Aufgaben erhalten nie direkt denselben Typ, auch bei Auswahlwechsel oder Ersatzaufgaben. variation.interaction_form protokolliert die tatsächlich dargestellte Form; dieses Feld wird von der App gesetzt und gehört nicht zur Modellausgabe. Der Modellvertrag für Programmbäume bzw. template_id, parameters und die bisherigen variation-Felder bleibt unverändert. Siehe specs/17-typwechsel-und-kompakte-oberflaeche.md.
