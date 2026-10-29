# Aufgaben und Bewertung: erste gemeinsame Spezifikation

Status: Diskussionsentwurf, keine freigegebene Implementierungsvorgabe.
Datum: 12. Oktober 2026

## Ziel und Grundlage

Die App unterstützt das Erkennen, Erklären, Vorhersagen und Beurteilen kleiner Codeänderungen. Grundlage sind die beiden Brainstorming-Dokumente im Projektordner. Die vorhandene App ist ein Prototyp; diese Spezifikation darf von ihr abweichen.

Ein Lernzyklus besteht aus Beobachten, Vorhersagen, Nachverfolgen, Verändern und Übertragen. Eine Lernphase ist kein Aufgabentyp. Ein Aufgabentyp beschreibt die verlangte Handlung und den damit überprüften Verständnisaspekt.

## Bereits vereinbarte Grundsätze

- Didaktische Skills werden als Markdown-Dateien abgelegt.
- Ausführbare Tools werden, sofern erforderlich, als JavaScript-Dateien in den zugehörigen Ordnern bereitgestellt.
- Bewertungskriterien für Anfängerantworten werden ausdrücklich im Skill beschrieben. Die Wahl des LLM darf keine andere Bewertungsgrundlage erzeugen.
- Verbindliche Lernregeln und maschinell prüfbare Ergebnisse werden durch die App beziehungsweise Tools kontrolliert.
- KI-Einschätzungen sind begründete, vorläufige Einschätzungen, keine Noten.
- Die App verwaltet Ergebnisse, Schwierigkeits-Scores und berechnet den Lernzustand. Das LLM arbeitet mit dem Horizont einer Aufgabe; siehe [Lernzustand und Aufgabenhorizont](04-lernzustand-und-aufgabenhorizont.md).
- Das Auswerten der rechten Seite vor der Neuzuweisung ist ein ausdrückliches Lernziel. Es wird durch kurze Interaktionen belegt; eine schriftliche Erklärung ist dafür nicht erforderlich.
- Bei textlichen Antwortalternativen haben richtige und falsche Antworten dieselbe Wortanzahl. Diese Vorgabe wird maschinell geprüft.

Die konkrete Ausgestaltung der sechs Interaktionsformen steht in [Interaktionsformen und Antwortgenerierung](02-interaktionsformen-und-antwortgenerierung.md). Sie ersetzt für den primären Lernweg die nachfolgend ursprünglich vorgesehene Freitextpflicht.

Explizite Kriterien reduzieren Unterschiede zwischen Modellen. Sie garantieren keine identische Interpretation freier Sprache. Referenzantworten und spätere Vergleichsprüfungen sind deshalb Teil der Qualitätssicherung.

## Aufgabentypen als vorläufiger Katalog

| Typ | Antwortform | Verständnisaspekt |
| --- | --- | --- |
| Bestandteile erkennen | Markierung oder Zuordnung | Begriffe im Code erkennen |
| Ausgabe vorhersagen | Ein oder mehrere Ausgabewerte | Wirkung eines Ablaufs bestimmen |
| Zustand nachverfolgen | Werte an ausgewählten Ausführungspunkten | Zwischenzustände bestimmen |
| Ausführungspfad bestimmen | Zeilenfolge oder Pfadauswahl | Kontrollfluss verfolgen |
| Erklärung geben | Freitext | Ursache und Wirkung begründen |
| Änderung beurteilen | Vorhersage und Begründung | Folgen eines Eingriffs bestimmen |
| Fehler untersuchen | Fehlerstelle und Erklärung | Abweichungen erklären |
| Beispiele vergleichen | Entscheidung und Begründung | Gleichheit oder Unterschiede des Verhaltens erkennen |

Welche Typen in welcher Stufe verwendet werden, wird separat spezifiziert. Ein Aufgabentyp kann in mehreren Lernphasen vorkommen.

## Durchgearbeitetes Beispiel: Ausgabe vorhersagen und erklären

### Lernziel

Die Lernenden verstehen, dass eine Zuweisung zuerst den Ausdruck rechts auswertet und anschließend den Namen dem Ergebnis zuordnet. Spätere Anweisungen verwenden den dann aktuellen Wert.

Voraussetzungen: ganze Zahlen, Addition, Multiplikation, Variable und Ausgabe. Nicht vorausgesetzt: Vergleiche, Verzweigungen, Schleifen, eigene Funktionen.

### Sichtbare Aufgabe

```python
wert = 3
wert = wert + 2
wert = wert * 4
print(wert)
```

Auftrag: „Welche Ausgabe entsteht?“ Anschließend folgt eine kurze Interaktion zum Ablauf der Zuweisung, beispielsweise die Auswahl der richtigen Reihenfolge von Auswertung und Neuzuweisung.

Die Oberfläche zeigt die Ausgabeaufgabe und eine der spezifizierten Interaktionsformen. Eine freie Erklärung kann optional angeboten werden. Vor dem Absenden bleiben tatsächliche Ausgabe und Schrittanzeige verborgen. Das ist eine Lernregel, keine technische Geheimhaltung der Lösung.

### Verifizierte Referenz

| Nach Anweisung | Aktueller Wert | Ausgabe |
| --- | --- | --- |
| `wert = 3` | 3 | keine |
| `wert = wert + 2` | 5 | keine |
| `wert = wert * 4` | 20 | keine |
| `print(wert)` | 20 | 20 |

Die Ausgabeprüfung und die Einschätzung der Erklärung sind getrennte Ergebnisse. Eine korrekte Ausgabe genügt nicht als Nachweis des Lernziels.

### Kriterien der Erklärung

| ID | Kriterium | Erforderlicher Beleg |
| --- | --- | --- |
| K1 | Anweisungen werden in Reihenfolge verarbeitet | Erst Ausgangswert, dann Addition, dann Multiplikation |
| K2 | Die zweite Anweisung aktualisiert den Wert | Aus 3 wird durch Addition von 2 der Wert 5 |
| K3 | Die dritte Anweisung verwendet den aktuellen Wert | 5 wird mit 4 multipliziert; Ergebnis 20 |
| K4 | Auswertung erfolgt vor Neuzuweisung | Eine gezielte Interaktion zeigt: bisherigen Wert rechts verwenden, Ausdruck berechnen, Ergebnis anschließend links zuweisen |

Fachbegriffe sind nicht erforderlich. „Erst 3, dann 2 dazu, also 5; diese 5 mal 4 ergibt 20“ belegt K1 bis K3. K4 wird zusätzlich durch eine gezielte Interaktion überprüft. Das bloße Anklicken der rechten Seite belegt deren Erkennen, aber noch nicht die zeitliche Reihenfolge.

Das ausdrückliche Erklären, dass `print` den Wert nicht verändert, ist bei dieser Aufgabe kein Pflichtkriterium. Eine gegenteilige Behauptung ist jedoch eine relevante Fehlvorstellung.

## Interaktionsablauf und Anschlussentscheidungen

1. Die App hält die ursprüngliche Ausgabe und Interaktionsantwort sowie eine gegebenenfalls freiwillige Erklärung als ersten Versuch fest.
2. Ein Tool oder die App prüft die Ausgabe anhand der verifizierten Referenz.
3. Die App prüft strukturierte Interaktionsantworten anhand des freigegebenen Lösungsschlüssels und der zugeordneten Kriterien. Nur eine gegebenenfalls vorhandene freie Erklärung wird durch den Bewertungs-Skill interpretiert.
4. Die App zeigt Ausgabeprüfung und eine kurze Tutor-Rückmeldung getrennt an.
5. Die Lernenden können den Ablauf schrittweise beobachten und ihre Erklärung vergleichen.
6. Bei fehlendem Beleg oder einem Widerspruch folgt genau eine gezielte Rückfrage. Sie bezieht sich zunächst auf den frühesten ungeklärten Schritt.
7. Ergänzende Antworten werden als weitere Versuche mit Aufgabenbezug festgehalten. Die ursprüngliche Antwort bleibt erhalten.
8. Bei belegten Kriterien und korrekter Ausgabe folgt eine Aufgabe zur Änderung oder Übertragung. Daraus entsteht noch keine Aussage über die Beherrschung der gesamten Stufe.

Vorgeschlagene Änderung: `wert = 3` wird zu `wert = 4`. Auftrag: neue Ausgabe vorhersagen und erklären, warum sich das Ergebnis ändert. Referenzausgabe: 24. Der Bewertungs-Skill für diese Änderung ist noch zu spezifizieren.

Vorgeschlagene Übertragung: zwei Variablen, beispielsweise `a = 3; b = a + 2; a = 8; print(b)`. Erwartete Ausgabe: 5. Das prüft, ob eine frühere Berechnung von einer späteren Neuzuweisung unterschieden wird. Dafür sind eine eigene Aufgabenfamilie, Kriterien und ein vorbereitendes Beispiel erforderlich; es ist kein automatisch freigegebener nächster Schritt.

## Kuration dieser Aufgabenfamilie

Das vereinbarte Autorenmodell und die Trennung von Frontmatter, Description und Hauptteil sind in [Kuration und Skillformat](03-kuration-und-skillformat.md) ausgearbeitet. Mensch und KI entwickeln gemeinsam einen Skill; dieser begrenzt die späteren Varianten in der App.

Eine kuratierte Aufgabenfamilie enthält Lernziel, Voraussetzungen, erlaubte Konzepte, Programmstruktur, Kriterien, Referenzantworten und bekannte Fehlvorstellungen.

Für diese erste Familie dürfen generierte Varianten die drei positiven Ganzzahlen, einen kurzen Titel beziehungsweise Kontext sowie Antwortalternativen innerhalb der Regeln aus Spezifikation 02 verändern. Wertebereiche und didaktische Auswahlregeln müssen vor einer Implementierung festgelegt werden. Der Kontext darf keine Lösung verraten und muss zum Programm passen. Freie Erzeugung beliebiger Programme ist damit nicht freigegeben.

Vor Anzeige müssen Struktur und Referenzablauf geprüft werden. Titel und Kontext benötigen zusätzlich eine Prüfung auf fachliche Passung und vorweggenommene Lösungen; die Zuständigkeit ist noch offen. Bei fehlgeschlagener Prüfung wird die Variante nicht gezeigt. Eine geprüfte Ersatzaufgabe kann angeboten werden und wird als solche gekennzeichnet.

Sitzungsvarianten werden nicht automatisch in den dauerhaft kuratierten Aufgabenbestand aufgenommen. Die Aufnahme setzt redaktionelle Prüfung voraus; wer sie durchführt und wie sie dokumentiert wird, bleibt zu entscheiden.

## Skill, Tools und Zuständigkeiten

Der erste Bewertungsentwurf liegt unter `../skills/antworten-verstehen/SKILL.md`. Er ist ein didaktischer Skill der Lern-App, kein bereits installierter Codex-Skill.

Vorgeschlagene spätere Struktur:

```text
skills/
  antworten-verstehen/
    SKILL.md
    tools/                 # nur falls dieser Skill eigene ausführbare Tools benötigt
```

Gemeinsam genutzte Ausführung, Aufgabenvalidierung und Speicherung können zentral liegen. Die endgültige Verzeichnisstruktur sowie die Frage, ob das LLM Tools selbst aufruft oder die App sie orchestriert, sind offen. Es werden für diese Planung keine JavaScript-Tools erstellt.

Das LLM erhält nur die für die Einschätzung erforderlichen Aufgaben-, Referenz- und Antwortdaten sowie den passenden Skill. Es muss Kriterien einzeln anwenden, Belege nennen, unklare Aussagen offenlassen und Grenzen der Lernstufe respektieren. Die endgültige Antwortstruktur, Kontextlänge, Wartezeiten und Modellwahl werden später spezifiziert.

## Beispiele für spätere Abnahmeprüfungen

- Korrekte Ausgabe mit leerer oder nichtssagender Erklärung darf nicht als vollständiger Verständnisbeleg gelten.
- Umgangssprache mit vollständiger, korrekter Begründung wird anerkannt.
- Eine falsche Ausgabe darf nicht durch eine positive KI-Einschätzung überschrieben werden.
- Mehrdeutigkeit führt zu einer Rückfrage und wird nicht als sicherer Fehler ausgelegt.
- Eine falsche Aussage wird auch dann berücksichtigt, wenn andere Aussagen richtig sind.
- Anweisungen innerhalb einer Lernendenantwort verändern die Bewertungskriterien nicht.
- Fehlende oder ungültige Modellantworten führen zu „Einschätzung nicht verfügbar“, ohne erfundene Beurteilung.
- Ergänzende Antworten überschreiben den ursprünglichen Versuch nicht.

## Nächste gemeinsame Entscheidungen

1. Wie verteilen wir K1 bis K4 auf kurze Interaktionen, ohne den Lernzyklus unnötig zu verlängern?
2. Wann darf die Ausführung sichtbar werden: direkt nach Abgabe oder erst nach einer Rückfrage?
3. Wie frei darf die Reihenfolge des Lernzyklus sein, insbesondere im freien Übungsmodus?
4. Welchen Grad von Generierung wollen wir über Zahlenvarianten hinaus zulassen?
5. Wie werden Aufgabenkuration und Lernübersicht für Lehrende organisiert?

Aus diesen Entscheidungen folgen weitere Spezifikationen für UI, Kuration und Modellintegration. Erst anschließend werden Implementierungsaufgaben abgeleitet.
