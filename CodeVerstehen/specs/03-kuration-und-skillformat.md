# Kuration und Skillformat

Status: Spezifikationsentwurf. Der Ablauf Mensch → gemeinsame Ausarbeitung mit KI → Skill, die Trennung von Frontmatter/Description und Hauptteil sowie die Skillauswahl durch das LLM innerhalb von App-Grenzen sind vereinbart. Konkrete Metadatenfelder und Freigabeschritte sind Vorschläge.
Datum: 12. Oktober 2026

## Kurationsmodell

Ein Mensch formuliert eine didaktische Idee und arbeitet sie gemeinsam mit einem KI-System aus. Ergebnis ist ein versionierter Markdown-Skill, den das LLM in der App verwenden kann. Das Autorensystem muss nicht dasselbe Modell sein wie das Modell in der Lern-App.

Kuratiert werden Lernziele, Aufgabenfamilien, zulässige Varianten, Bewertungskriterien und Rückmeldungsregeln. Nicht jede Zahlenvariante muss einzeln verfasst werden. Die Laufzeitgenerierung bewegt sich innerhalb des ausgearbeiteten und freigegebenen Skills.

Die Verantwortung für die didaktische Freigabe liegt beim Menschen. Eine KI kann entwerfen, verdichten, Gegenbeispiele suchen und Prüfungen unterstützen. Der genaue Freigabedialog ist noch festzulegen.

## Ausarbeitung einer Idee

1. **Idee:** Welches Verständnis soll aufgebaut oder überprüft werden? Welche Voraussetzung und typische Fehlvorstellung sind relevant?
2. **Gemeinsame Ausarbeitung:** Mensch und KI legen Aufgabenfamilie, passende Interaktionsformen, richtige Zusammenhänge, plausible Fehlantworten und Hilfen fest.
3. **Referenzen:** Mindestens ein vollständiges Beispiel mit verifiziertem Ablauf, Lösungsschlüssel und erwarteter Rückmeldung sowie Beispiele für ungültige Varianten werden erstellt. Die genaue Zahl erforderlicher Referenzen bleibt offen.
4. **Skillfassung:** Die KI überführt die vereinbarten Regeln in Frontmatter und einen kompakten Hauptteil. Menschlich verständliche Begründungen und umfangreiche Referenzfälle können in begleitenden Dateien verbleiben.
5. **Prüfung:** Metadaten, Struktur und maschinell prüfbare Vorgaben werden kontrolliert. Die verdichtete Fassung wird an Referenzfällen geprüft, insbesondere auf Bedeutungsverlust.
6. **Freigabe:** Der Mensch bestätigt die didaktische Fassung. Eine neue Version wird für die App bereitgestellt. Entwürfe werden im regulären Lernbetrieb nicht geladen.

Schritte und Referenzprüfungen sind Teil der geplanten Arbeitsweise, keine bereits implementierte Funktion.

## Zweiteiliger Skill

Ein konkreter Vorschlag für Ordnerstruktur, Frontmatter, Hauptteil und den Vertrag mit der App steht in [Skill- und Aufgabenvertrag](07-skill-und-aufgabenvertrag.md). Er ergänzt die folgende allgemeine Beschreibung; die exakten Felder sind noch abzustimmen.

### Frontmatter und Description

Die Datei beginnt mit YAML-Frontmatter. Es enthält maschinenlesbare Metadaten; die `description` ist darin eine kurze Beschreibung, wann und wofür der Skill geeignet ist. Der nachfolgende Markdown-Hauptteil enthält die eigentlichen Arbeitsanweisungen.

Vorgeschlagenes Format:

```yaml
---
name: assignment-evaluation-order
description: "Prüft in Stufe 1, ob Auswertung der rechten Seite vor Neuzuweisung verstanden wird; kurze Interaktionen, kein Pflichtfreitext."
version: "0.1"
status: draft
kind: task-family
stage: 1
criteria: [K4]
interaction_types: [single-choice, multiple-choice, code-selection, gap-fill, ordering, diagram-choice]
instruction_language: de
learner_language: de
---
```

Diese Felder sind eine vorgeschlagene App-Konvention, kein vorausgesetzter allgemeiner Skillstandard. Ein `name` bleibt über Versionen stabil. `description` beschreibt die Einsatzgrenzen ausreichend konkret, damit nicht der gesamte Hauptteil zur Auswahl gelesen werden muss. `status: approved` setzt die menschliche Freigabe voraus; kein generierendes Modell darf seinen Entwurf selbst freigeben.

Tools und begleitende Referenzen können bei Bedarf als relative Pfade in Metadaten ergänzt werden. Das endgültige Schema, erlaubte Werte und Tool-Schnittstellen bleiben zu spezifizieren.

### Hauptteil

Der Hauptteil enthält mindestens:

- Ziel und vorausgesetztes Wissen.
- Erforderliche Eingaben und deren Bedeutung.
- Verbindliche Semantik und Kriterien.
- Erlaubte Variation und ausgeschlossene Inhalte.
- Regeln für richtige und falsche Alternativen einschließlich gleicher Wortanzahl.
- Bewertungs- und Rückmeldungsregeln.
- Erwartete Ergebnisse und Verhalten bei fehlenden oder widersprüchlichen Daten.

Nicht jeder Skill braucht alle Aufgabentypen. Generierungs-, Bewertungs- und Aufgabenfamilien-Skills können unterschiedliche Zuständigkeiten haben. Diese Zerlegung sowie die Frage, ob die App gemeinsame Regeln durch einen Basisskill lädt oder in einzelne Skills einarbeitet, bleiben offen.

## Verdichtung und Sprache

Der Hauptteil darf stark verdichtet und bei Bedarf auf Englisch oder Chinesisch verfasst werden. Sprache und Darstellung werden danach gewählt, ob das eingesetzte Modell die Regeln zuverlässig versteht und ob tatsächlich Kontext eingespart wird. Eine Sprache allein garantiert keine Tokenersparnis; sie muss für das konkrete Modell beziehungsweise dessen Tokenizer gemessen werden.

Verbindliche Grenzen der Verdichtung:

- Normative Regeln, Ausnahmen, Eingabebedeutung und Fehlerverhalten bleiben eindeutig.
- Kriterien-IDs, Tool-Namen und andere maschinelle Kennungen werden nicht übersetzt.
- Sprache des Skills und Sprache der Lernendenoberfläche sind getrennte Angaben. Ein englischer oder chinesischer Hauptteil darf weiterhin deutsche Aufgaben und Rückmeldungen verlangen.
- Kompakte Regeln dürfen keine stillschweigenden didaktischen Entscheidungen einführen.
- Eine lesbare deutsche Arbeitsfassung beziehungsweise Erklärung bleibt für die menschliche Prüfung erhalten; beide Fassungen gehören zur selben Version. Dies ist ein Vorschlag zur Nachvollziehbarkeit.
- Referenzprüfungen vergleichen die erwartete Wirkung vor und nach Verdichtung. Ein kleinerer Text ist nur dann brauchbar, wenn er die Kriterien weiterhin zuverlässig transportiert.

Die derzeitigen Entwürfe bleiben zunächst auf Deutsch. Eine Übersetzung ist erst sinnvoll, wenn Zielmodelle, benötigte Kontextteile und Prüffälle feststehen.

## Laden in der App

Vereinbarte Zuständigkeit: Die App legt Lernstufe, Voraussetzungen und zulässige Lernziele fest. Das LLM wählt innerhalb dieses Rahmens anhand der Descriptions einen passenden Skill für eine Aufgabe oder Hilfe. Der genaue Auswahlvertrag und das Fehlerverhalten sind nachfolgende Spezifikationsvorschläge.

Die App verwaltet einen einfachen Lernzustand mit Aufgabenergebnissen und einer von drei gewählten Schwierigkeitsstufen. Lernende können die Schwierigkeit direkt verändern. Das LLM arbeitet mit dem Horizont einer Aufgabe und führt keine dauerhafte Historie fort. Für die Auswahl genügt eine kompakte, von der App bereitgestellte Zustandszusammenfassung. Siehe [Lernzustand und Aufgabenhorizont](04-lernzustand-und-aufgabenhorizont.md).

1. Die App liest Frontmatter der verfügbaren freigegebenen Skills und erstellt daraus einen Katalog.
2. Lernstufe, Voraussetzungen, Zielkriterium und Interaktionsform begrenzen die zulässigen Skills. Diese Grenzen prüft die App.
3. Das LLM erhält nur den zulässigen Katalog mit Skill-Kennungen und Descriptions sowie eine kompakte App-Zusammenfassung des aktuellen Lernzustands. Es benötigt keine Historie vergangener Aufgaben. Es wählt daraus einen passenden Skill für eine Aufgabe oder Hilfe. Die App kontrolliert, dass die gewählte Kennung im aktuellen Katalog liegt; das LLM kann die Lernstufe oder zulässigen Lernziele nicht eigenständig erweitern.
4. Erst für den ausgewählten Skill wird der Hauptteil in den Modellkontext geladen. Notwendige gemeinsame Regeln, Referenzen und Toolbeschreibungen werden zusätzlich gezielt bereitgestellt.
5. Die App prüft generierte Ergebnisse und wertet strukturierte Antworten gegen freigegebene Lösungsschlüssel aus.

Ein relativer Verweis in einem Markdown-Skill lädt keine Datei automatisch. Falls der Hauptteil auf eine Referenz angewiesen ist, muss die App sie bereitstellen. Falls kein Tool benötigt wird, ist kein Toolverzeichnis erforderlich.

Für eine Auswahl werden Skill-Kennung, Version und eine kurze Begründung im Bezug auf Lernziel beziehungsweise Unterstützungsbedarf vorgesehen. Bei ungültiger Auswahl lädt die App keinen Hauptteil außerhalb des zulässigen Katalogs. Ein leerer Katalog wird als fehlendes passendes Lernangebot behandelt. Begrenzte Wiederholung und eine kuratierte Ersatzwahl bei Modellfehlern sind noch festzulegen.

## Verhältnis zur Laufzeitgenerierung

Die menschliche Kuration definiert den Spielraum. Das LLM formuliert innerhalb dieses Spielraums konkrete Varianten. Freigabe eines Skills ist keine automatische Freigabe beliebiger von ihm erzeugter Texte.

Bei frei formulierten Antwortalternativen bleibt zu klären, wie deren Bedeutung vor Anzeige verlässlich geprüft wird. Wortzahl, IDs und Antwortanzahl sind deterministisch prüfbar; eindeutige Richtigkeit freier Sprache ist dadurch nicht gesichert. Bis ein ausreichender Prüfweg spezifiziert ist, dienen kuratierte Formulierungen mit verifizierten Parametern als Ausgangspunkt.

## Vorgesehene Abnahme

- Die App erkennt die YAML-Frontmatter und kann Description getrennt vom Hauptteil lesen.
- Entwürfe und nicht freigegebene Versionen werden im regulären Lernbetrieb ausgeschlossen.
- Die Auswahl anhand des Katalogs verlangt nicht das Laden aller Hauptteile.
- Das LLM wählt ausschließlich aus dem von der App zugelassenen Katalog. Unbekannte oder außerhalb des aktuellen Rahmens liegende Kennungen werden zurückgewiesen.
- Die ausgewählte Version und benötigte Referenzen sind für jeden Versuch nachvollziehbar.
- Sprachwechsel und Verdichtung erhalten die erwarteten Bewertungen der Referenzfälle.
- Lernendentexte bleiben in der vorgesehenen Oberflächensprache.
- Ein fehlender Pflichtbestandteil führt zu einem erkennbaren Fehler oder einer geprüften Ersatzaufgabe.
