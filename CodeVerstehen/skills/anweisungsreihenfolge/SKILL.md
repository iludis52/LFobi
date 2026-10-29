---
name: anweisungsreihenfolge
description: "Kapitel 1: Ausgaben zweier getrennt gestarteter Programme mit vertauschten Anweisungen vergleichen. Einfach: letzte Zuordnung; Mittel: Reihenfolge von Addition und Multiplikation; Anspruchsvoll: Zeitpunkt der Wertübernahme bei zwei Variablen."
version: "1.3"
status: approved
chapter: 1
learning_objective: statement-order
difficulty_levels: [1, 2, 3]
interaction_types: ["gap-fill", "single-choice", "multiple-choice", "diagram-choice", "ordering"]
instruction_language: de
learner_language: de
content: content.de.md
templates: templates.json
examples: examples.json
---

# Reihenfolge vergleichen

Programme A und B starten getrennt ohne gemeinsamen Zustand. Zuweisungen verwenden den aktuellen Wert. Reihenfolge kann das Ergebnis verändern. Stufe 3 setzt die Einführung zweier Variablen und unabhängiger Zahlenzuordnungen voraus; dies wird in der sichtbaren Erklärung eingeführt.

Die App liefert Sprache, Schwierigkeit und zugelassene Vorlagen mit parameter_ranges. Nur JSON: `{"template_id":"zugelassene ID","parameters":{"start":3,"replacement":8}}`. Verwende genau die Parameter der gewählten Vorlage innerhalb der angegebenen ganzzahligen Grenzen. Andere Vorlagen verwenden start, add und factor, etwa 3, 2 und 4. Keine weiteren Schlüssel, kein Code oder Lösungsschlüssel. Die App berechnet beide Abläufe und prüft unterschiedliche Ausgaben.

Kriterien: K1, state-current-value, order-dependent-result. Ein Vergleich belegt nicht automatisch K4. Vorlagen und Hinweise sind kuratiert.

## Aufgabenvariation

Das Auswahlobjekt darf zusätzlich `variation` enthalten: `{"names":"vorrat","answer_form":"single-choice"}`. Dieses Feld erweitert das vorstehende Antwortformat. Zulässige Namenprofile: standard, punkte, vorrat, nummer. Zulässige Antwortformen: original (Lücken) oder single-choice (Ausgaben von A und B als Antwortpaar). Verwende nur die mitgelieferten variation_choices. Namen, Aussagen und Lösung werden von der App erzeugt und geprüft; keine freien Texte.


## Verbindlicher Formwechsel

Die App mischt Lücken, Einzelauswahl, Mehrfachauswahl, Beobachtungsdiagramme und Ereignissortierung auf jeder Stufe. Sie erzeugt die endgültige Antwortform samt Lösung aus geprüften Beobachtungen und Ablaufdaten. Zwei neue Aufgaben erhalten nie direkt denselben Typ, auch bei Auswahlwechsel oder Ersatzaufgaben. variation.interaction_form protokolliert die tatsächlich dargestellte Form; dieses Feld wird von der App gesetzt und gehört nicht zur Modellausgabe. Der Modellvertrag für Programmbäume bzw. template_id, parameters und die bisherigen variation-Felder bleibt unverändert. Siehe specs/17-typwechsel-und-kompakte-oberflaeche.md.

## Verständliche Ablaufangaben

Aufgabentexte verwenden nur Angaben, die zur Unterscheidung nötig sind. Bei einmalig ausgeführten Anweisungen genügt „Nach Zeile 4 hat ergebnis_a den Wert 3.“ Keine internen Bezeichnungen wie „Bereich main“, „name#1“ oder überflüssiges „Ausführung 1“. Nur bei tatsächlich mehrfach ausgeführten Zeilen wird die konkrete Ausführung genannt, zum Beispiel „Nach der 2. Ausführung von Zeile 4 …“. Ein Durchlauf der äußeren Schleife darf dabei nicht mit einer Zeilenausführung verwechselt werden. Funktionskontexte heißen „In Funktion berechne“ oder „Im Hauptprogramm“; mehrere Aufrufe derselben Funktion werden als „Beim 2. Aufruf von berechne“ unterschieden. Die App setzt diese Regel auch für erzeugte Antwortalternativen und Ereigniskarten um. Gleich lange Alternativen entstehen durch Auswahl vergleichbarer Beobachtungen, nicht durch überflüssige Fachwörter. Siehe specs/21-verstaendliche-ablaufangaben.md.
