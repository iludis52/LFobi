# Lernzustand und Aufgabenhorizont

Aktualisierung vom 16. Oktober 2026: [Zusatz 20](20-adaptive-aufgaben-und-kurzerklaerung.md) ersetzt die nachfolgenden bisherigen Ausschlüsse einer Adaptionslogik und früherer Antwortbefunde. Thema und Stufe bleiben manuell gewählt; ein temporäres Drei-Aufgaben-Gedächtnis steuert Varianten und Stufenempfehlungen.

Historischer Status: Spezifikationsentwurf. Drei Schwierigkeitsstufen, einfache App-Logik und direkte Einflussnahme der Lernenden sind vereinbart. Bezeichnungen, konkrete Bedienelemente und automatische Empfehlungen sind noch Vorschläge.
Datum: 12. Oktober 2026

## Vereinfachung des bisherigen Entwurfs

Für die erste Fassung werden keine getrennten Werte für Anwendungssicherheit und Transfersicherheit berechnet. Es gibt keine dynamische Berechnung individueller Transferdistanz. Komplexität und Transfer dienen der menschlichen Kuration von Aufgaben; die Laufzeit-App arbeitet mit einem einfachen Schwierigkeits-Score von 1 bis 3.

Der Score beschreibt Aufgabenschwierigkeit, nicht Beherrschung, Note oder gesammelte Belohnungspunkte. Die Schwierigkeitsstufe wird bei der Kuration festgelegt und nicht nach jeder Lernendenantwort neu berechnet.

## Drei Schwierigkeitsstufen

Vorgeschlagene Bezeichnungen und Orientierung:

| Score | Bezeichnung | Didaktische Orientierung |
| --- | --- | --- |
| 1 | Einfach | Direkte Anwendung eines geübten Musters mit überschaubaren Schritten |
| 2 | Mittel | Mehr eigenständiges Nachverfolgen, zusätzliche Abhängigkeit oder veränderte Darstellung |
| 3 | Anspruchsvoll | Bekanntes Prinzip in anderer Situation selbstständig erkennen oder mehrere bekannte Schritte verbinden |

Die Referenzen A, B und C aus Spezifikation 05 helfen bei der Kuration. Sie begründen keine universelle Zuordnung jeder Interaktionsform zu einer Stufe. Eine Auswahlaufgabe kann beispielsweise auf allen drei Stufen vorkommen.

Neue Lerninhalte werden nicht durch höheren Score ersetzt: Die App bleibt beim aktuellen Lernziel und dessen vorausgesetztem Wissen.

## Einfacher Lernzustand

Die App hält fest:

- Aktuelles Kapitel beziehungsweise Lernziel.
- Gewählte Schwierigkeit: 1, 2 oder 3.
- Anzahl richtiger und falscher Aufgaben je Schwierigkeit, im jeweiligen Lernziel.
- Die ursprünglichen Antworten und Ergebnisse für die Lernübersicht.

Keine zusätzlichen Kompetenzwerte, Gewichtungsformeln oder daraus abgeleiteten Beherrschungsurteile sind für die erste Fassung erforderlich. Richtige und falsche Ergebnisse werden nachvollziehbar angezeigt.

Vereinbarte Zähleinheit ist eine über „Absenden“ abgegebene Situation. Mehrere ausgewählte Aussagen zählen zusammen als eine Abgabe. Jede akzeptierte und geprüfte Abgabe erzeugt genau ein richtig/falsch-Ergebnis. Wiederholte Abgaben bleiben als solche nachvollziehbar; Details stehen in [Umfang, Lernoberfläche und Ergebniszählung](06-umfang-und-lernoberflaeche.md).

## Einfluss der Lernenden

Lernende können die Schwierigkeit direkt höher oder niedriger einstellen. Als UI-Vorschlag dient ein Schieberegler mit genau drei Rastpunkten und sichtbaren Bezeichnungen; drei Auswahlbuttons sind eine Alternative.

Die Einstellung gilt ab der nächsten Aufgabe. Die aktuelle Aufgabe und bisherige Ergebnisse bleiben erhalten. Höhere Schwierigkeit bedeutet anspruchsvollere Aufgaben zum aktuellen Lernziel, nicht automatisch ein höheres Kapitel.

Die App respektiert die manuelle Auswahl und ändert sie nicht stillschweigend zurück. Eine natürliche Eingabe wie „Gib mir ab jetzt schwierigere Aufgaben“ kann später dieselbe App-Einstellung verändern; dieser Eingabekanal ist noch nicht als Pflichtfunktion spezifiziert.

Vorgeschlagen ist ein Start auf Stufe 1. Automatische Empfehlungen für eine andere Stufe können später anhand einer einfachen, sichtbaren Regel ergänzt werden. Für die erste Fassung wird daraus keine automatische Umstellung oder komplexe Adaptionslogik abgeleitet.

Wenn keine Aufgabe der gewählten Schwierigkeit verfügbar ist, zeigt die App dies an und bietet eine andere Stufe an. Sie darf eine leichtere Aufgabe nicht als gewählte höhere Schwierigkeit ausgeben.

## Skillauswahl und LLM

Die App bestimmt den zulässigen Skill-Katalog aus aktuellem Kapitel, Lernziel, Voraussetzungen und gewählter Schwierigkeit. Das LLM wählt anhand der Descriptions innerhalb dieses Katalogs. Der Skill beschreibt, welche Varianten auf der gewünschten Stufe zulässig sind. Die genaue Ablage der Schwierigkeitsmetadaten bleibt offen.

Das LLM erhält beispielsweise: „Lernziel Zuweisung; Schwierigkeit 2“, den zulässigen Katalog und anschließend den gewählten Skill. Es muss keine frühere Lernendenhistorie lesen oder selbst einen Lernzustand berechnen.

Sein Horizont beträgt eine Aufgabe. Rückfragen und Hinweise innerhalb dieser Aufgabe sind möglich. Beim Wechsel zur nächsten Aufgabe wird keine frühere Dialoghistorie übernommen. Die App stellt alle aktuell benötigten Daten bereit. Ein LangGraph-Reducer ist nicht vorgesehen.

## Speicherung und Prüfung

Jede Aufgabe wird mit ID, Skill-Version, Lernziel, Schwierigkeit, angezeigter Variante und freigegebenem Lösungsschlüssel gespeichert. Jeder Versuch besitzt Aufgabenbezug, Antwort und Prüfergebnis. Hinweise und Wiederholungen können zur Nachvollziehbarkeit festgehalten werden, ohne zusätzliche Kompetenz-Scores zu erzeugen.

Die App prüft strukturierte Antworten deterministisch gegen den Lösungsschlüssel. Optionale freie Antworten können vom LLM kommentiert werden; sie verändern die deterministischen Zähler nicht allein aufgrund eines Modellurteils.

## Vorgesehene Abnahme

- Es gibt genau drei auswählbare Schwierigkeitsstufen.
- Manuelle Änderungen wirken ab der nächsten Aufgabe und werden respektiert.
- Schwierigkeit und Kapitel bleiben getrennte Einstellungen.
- Die App zählt Ergebnisse nach einer eindeutigen Regel; ein Modellwechsel verändert diese Regel nicht.
- Keine getrennten Anwendungs- und Transfersicherheitswerte in der ersten Fassung.
- Das LLM wählt nur aus dem von der App zugelassenen Rahmen und erhält keine aufgabenübergreifende Dialoghistorie.
- Fehlende Aufgaben einer Stufe werden sichtbar behandelt.

## Noch zu entscheiden

- Bezeichnungen und Bedienelement: Schieberegler oder drei Buttons.
- Detaildarstellung von Wiederholungen und Aufgabenergebnissen.
- Ob zunächst ausschließlich manuell gewählt wird oder zusätzlich einfache Empfehlungen erscheinen.
