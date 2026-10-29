---
name: zuweisung-reihenfolge
description: "Kapitel 1: bisherigen Wert lesen, rechts berechnen, dann neu zuweisen. Schwierigkeit 1 übt direkt, 2 verfolgt den Ablauf, 3 unterscheidet Berechnung und Neuzuweisung in Ausgaben."
version: "1.2"
status: approved
chapter: 1
learning_objective: assignment-order
difficulty_levels: [1, 2, 3]
interaction_types: ["single-choice", "multiple-choice", "code-selection", "gap-fill", "ordering", "diagram-choice"]
instruction_language: de
learner_language: de
content: content.de.md
templates: templates.json
examples: examples.json
---

# Zuweisung verstehen

## Ziel und Grenzen

Anweisung und Ausdruck unterscheiden. Bei `wert = wert + add` bisherigen Wert rechts lesen, Addition berechnen, Ergebnis anschließend zuweisen. Berechnung in einer Ausgabe verändert `wert` nicht. Nur positive ganze Zahlen, Addition, eine Variable, Zuweisung und Ausgabe; keine weiteren Konzepte. Die sichtbare Kapitelerklärung führt auch die Ausgabe eines Ausdrucks ein.

## Eingabe

Die App liefert Sprache, Schwierigkeit und zulässige Vorlagen mit IDs. Wähle eine passende Vorlage; berücksichtige nach Möglichkeit die genannte zuletzt verwendete Vorlagen-ID, um Formen abzuwechseln. Keine früheren Lernendenantworten nötig.

## Ausgabe

Nur JSON: `{"template_id":"ID aus dem zugelassenen Katalog","parameters":{"start":3,"add":2}}`.
`start` und `add`: ganze Zahlen 1 bis 9. Keine weiteren Schlüssel, Texte oder Code. Keine Lösungen erfinden. Schwierigkeit und Sprache bestimmt die App. Bei fehlender zulässiger Vorlage keine fremde ID erfinden.

## Gemeinsame Regeln

Rechte Seite wird vor Neuzuweisung ausgewertet (K4). Lesen verwendet aktuellen Wert (K2). Eine Rechnung allein ist keine Zuweisung. Richtige und falsche Textalternativen je Gruppe haben gleiche Wortzahl; Texte und Lösungsschlüssel stammen ausschließlich aus den kuratierten Vorlagen. Die App prüft und mischt Alternativen. Strukturierte Antworten wertet die App aus, nicht das Modell. Hinweise bleiben kurz, sachlich und ohne Beherrschungsurteil.

## Aufgabenvariation

Das Auswahlobjekt darf zusätzlich `variation` enthalten: `{"names":"punkte","answer_form":"original"}`. Dieses Feld erweitert das vorstehende Antwortformat. Zulässige Namenprofile: standard, punkte, vorrat, nummer. In dieser Familie bleibt answer_form ausschließlich original. Die App ersetzt Variablennamen konsistent in Code, Auftrag, Antwortdarstellung und Rückmeldung; keine freie Umformulierung und keine anderen Parameter.


## Verbindlicher Formwechsel

Die App mischt Lücken, Einzelauswahl, Mehrfachauswahl, Beobachtungsdiagramme und Ereignissortierung auf jeder Stufe. Sie erzeugt die endgültige Antwortform samt Lösung aus geprüften Beobachtungen und Ablaufdaten. Zwei neue Aufgaben erhalten nie direkt denselben Typ, auch bei Auswahlwechsel oder Ersatzaufgaben. variation.interaction_form protokolliert die tatsächlich dargestellte Form; dieses Feld wird von der App gesetzt und gehört nicht zur Modellausgabe. Der Modellvertrag für Programmbäume bzw. template_id, parameters und die bisherigen variation-Felder bleibt unverändert. Siehe specs/17-typwechsel-und-kompakte-oberflaeche.md.
