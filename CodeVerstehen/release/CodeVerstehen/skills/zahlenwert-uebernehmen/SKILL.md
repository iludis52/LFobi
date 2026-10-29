---
name: zahlenwert-uebernehmen
description: "Kapitel 1: zwei Variablen mit unabhängigen Zahlenwerten verfolgen. Einfach: Zahl übernehmen; Mittel: Rechenergebnis übernehmen; Anspruchsvoll: beide Namen nacheinander mit dem jeweils aktuellen Wert verwenden."
version: "1.2"
status: approved
chapter: 1
learning_objective: value-copy
difficulty_levels: [1, 2, 3]
interaction_types: ["gap-fill", "single-choice", "multiple-choice", "diagram-choice", "ordering"]
instruction_language: de
learner_language: de
content: content.de.md
templates: templates.json
examples: examples.json
---

# Zahlenwerte übernehmen

Eine Zuweisung berechnet rechts mit den dann aktuellen Werten. Die zugewiesene Zahl bleibt unabhängig von späteren Neuzuweisungen an andere Namen. Ausschließlich positive ganze Zahlen; keine Listen, Objekte, Referenzen oder allgemeine Aussage über Kopien. Zwei Variablen werden in der Lernendenerklärung eingeführt.

Die App liefert Sprache, Schwierigkeit und zugelassene Vorlagen mit parameter_ranges. Nur JSON: `{"template_id":"zugelassene ID","parameters":{"start":3,"replacement":8}}`. Verwende genau die Parameter der gewählten Vorlage innerhalb der angegebenen ganzzahligen Grenzen. Andere Vorlagen verwenden start, add und factor, etwa 3, 2 und 4. Keine weiteren Schlüssel, Texte, Code oder Lösungen. Die App erzeugt und bewertet die Aufgabe.

Kriterien: copy-value-at-assignment, copy-independent-update. Fehlantworten liefern Hinweise, keine sichere Diagnose. Keine frühere Lernendenhistorie erforderlich.

## Aufgabenvariation

Das Auswahlobjekt darf zusätzlich `variation` enthalten: `{"names":"nummer","answer_form":"single-choice"}`. Dieses Feld erweitert das vorstehende Antwortformat. Zulässige Namenprofile: standard, punkte, vorrat, nummer. Zulässige Antwortformen: original (Lücken) oder single-choice (beide Ausgaben als Antwortpaar). Verwende nur die mitgelieferten variation_choices. Die App erzeugt konsistente Namen, falsche Antwortpaare und Lösung; keine freien Texte.


## Verbindlicher Formwechsel

Die App mischt Lücken, Einzelauswahl, Mehrfachauswahl, Beobachtungsdiagramme und Ereignissortierung auf jeder Stufe. Sie erzeugt die endgültige Antwortform samt Lösung aus geprüften Beobachtungen und Ablaufdaten. Zwei neue Aufgaben erhalten nie direkt denselben Typ, auch bei Auswahlwechsel oder Ersatzaufgaben. variation.interaction_form protokolliert die tatsächlich dargestellte Form; dieses Feld wird von der App gesetzt und gehört nicht zur Modellausgabe. Der Modellvertrag für Programmbäume bzw. template_id, parameters und die bisherigen variation-Felder bleibt unverändert. Siehe specs/17-typwechsel-und-kompakte-oberflaeche.md.
