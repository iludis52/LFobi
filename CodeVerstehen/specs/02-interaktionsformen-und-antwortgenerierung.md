# Interaktionsformen und Antwortgenerierung

Status: Spezifikationsentwurf. Die Anforderungen zu kurzen Interaktionen, gleicher Wortanzahl und Mehrfachauswahl sind vom Nutzer vorgegeben; weitere Ablaufdetails sind Vorschläge zur gemeinsamen Abstimmung.
Datum: 12. Oktober 2026
Grundlage: [Aufgaben und Bewertung](01-aufgaben-und-bewertung.md).

## Lernziel und Interaktionsform trennen

Verbindliche Ergänzung vom 14. Oktober 2026: Mehrere fachliche Fragestellungen müssen innerhalb derselben Kombination von Thema und Schwierigkeit verfügbar sein. Freiere Modellentwürfe benötigen eine unabhängige deterministische Prüfung von Struktur, Beobachtung, Lösung und Alternativen sowie eine heuristische Wiederholungskontrolle. Der Pilot für Verzweigungen und seine Grenzen sind in [Kontrollierte Aufgabengenerierung](16-kontrollierte-aufgabengenerierung.md) festgelegt.

Ein Lernziel beschreibt, was verstanden werden soll. Eine Interaktionsform beschreibt, wie Lernende einen konkreten Beleg dafür liefern. Die App verwendet sechs Formen; Einzelauswahl und Mehrfachauswahl gehören zur gemeinsamen Familie „Antworten auswählen“.

Freitext ist optional. Für K4 müssen Lernende durch eine gezielte Interaktion zeigen, dass der Ausdruck rechts mit dem bisherigen Wert ausgewertet wird, bevor das Ergebnis neu zugewiesen wird. Reines Erkennen einer Codestelle reicht für diese zeitliche Beziehung nicht aus.

Jede Aufgabe enthält Lernziel, Kriterien-IDs, Kontext, Arbeitsauftrag, Interaktionsform, freigegebenen Lösungsschlüssel, Kriterienzuordnung und gezielte Hinweise für typische Fehlantworten. Aufgaben- und Skill-Version sowie die tatsächlich angezeigte Variante werden mit dem Versuch festgehalten.

## Gemeinsame UI-Regeln

- Jeweils eine kurze Handlung mit eindeutigem Auftrag. Die konkrete Abfolge mehrerer Handlungen ist noch abzustimmen.
- Antworten werden zunächst ausgewählt oder zusammengestellt und erst über „Antwort prüfen“ abgegeben. Vor der Abgabe dürfen sie verändert werden.
- Keine Anzeige der Lösung durch Hervorhebung, vorausgewählte Antwort oder vorzeitige Rückmeldung.
- Nach Abgabe: verständliche Rückmeldung zur eigenen Antwort und bei Bedarf genau ein nächster Lernschritt. Hinweise beziehen sich auf die geprüfte Fehlvorstellung; sie behaupten keinen sicheren Denkfehler allein aufgrund eines Klicks.
- Die Originalantwort bleibt gespeichert. Korrekturen nach Hinweisen sind weitere Versuche und werden als unterstützt gekennzeichnet.
- Tastaturbedienung und eine Alternative zu Ziehen oder ausschließlich grafischem Anklicken gehören zu jeder Form. Feedback verwendet neben Farbe auch Text oder Symbole mit zugänglicher Beschriftung.
- „Noch unsicher“ kann als gesonderte Handlung angeboten werden; es ist keine Antwortalternative und gehört nicht zum Lösungsschlüssel.

## 1. Einzelauswahl

**Eingabe:** drei oder vier Alternativen, genau eine richtig; Auswahl über Radiobuttons.

**Bewertung:** ausgewählte stabile Antwort-ID mit dem Lösungsschlüssel vergleichen. Ohne Auswahl bleibt die Aufgabe unbeantwortet.

**Rückmeldung:** bei falscher Auswahl ein Hinweis zur zugeordneten Fehlvorstellung; anschließend gezielte Wiederholung oder andere Interaktionsform.

**Generierungsgrenzen:** eindeutig unterscheidbare Aussagen, keine Synonyme mit gleicher Bedeutung, genau eine richtige Alternative. Gleiche Wortanzahl für alle Alternativen. Die App mischt die Reihenfolge, ohne IDs und Lösungsschlüssel zu ändern.

Beispiel zu `wert = wert + 2`: „In welcher Reihenfolge geschieht die Zuweisung?“ Jede Alternative hat acht Wörter:

- Richtig: „Zuerst rechts berechnen, danach das Ergebnis links zuweisen.“
- Falsch: „Zuerst links zuweisen, danach den Ausdruck rechts berechnen.“
- Falsch: „Beide Seiten vergleichen, danach die Gleichheit direkt ausgeben.“

Dieses Beispiel prüft den zeitlichen Teil von K4. Eine zusätzliche kurze Aufgabe zum verwendeten bisherigen Wert ergänzt den Beleg.

## 2. Mehrfachauswahl: Kreuze alle richtigen Antworten an

**Eingabe:** drei oder vier unabhängig beurteilbare Aussagen mit Checkboxen. Der Auftrag lautet ausdrücklich „Kreuze alle richtigen Antworten an“. Die Zahl richtiger Antworten wird nicht angezeigt.

**Bewertung:** vollständig richtig ist genau die Menge aller richtigen Antwort-IDs, ohne zusätzliche falsche Auswahl. Zusätzlich werden fehlende richtige und ausgewählte falsche Aussagen getrennt erfasst. Keine pauschale Punktzahl in diesem Entwurf.

**Rückmeldung:** „Eine richtige Aussage fehlt“ beziehungsweise „Eine ausgewählte Aussage stimmt noch nicht“ kann zunächst einen Hinweis einleiten. Ein Detailvergleich aller Aussagen kann anschließend angeboten werden; der genaue Zeitpunkt der Lösungsanzeige bleibt offen.

**Generierungsgrenzen:** mindestens eine richtige und eine falsche Aussage. In der Aufgabenfamilie werden ein bis drei richtige Antworten bei vier Alternativen variiert, damit nicht immer dieselbe Anzahl erwartet wird. Diese Verteilung ist ein Entwurf, kein genereller Zwang für jede Lernstufe. Alle Alternativen haben dieselbe Wortanzahl. Keine Kombinationen wie „A und C“, „alle Antworten“ oder „keine Antwort“.

Beispiel zu `wert = wert + 2`: „Welche Aussagen beschreiben die Zuweisung richtig?“ Alle Aussagen haben acht Wörter:

- Richtig: „Rechts wird zuerst mit dem bisherigen Wert gerechnet.“
- Richtig: „Links wird anschließend das Ergebnis der Berechnung zugewiesen.“
- Falsch: „Links wird zuerst ein noch unbekannter Wert eingesetzt.“
- Falsch: „Beide Seiten müssen bereits vor der Ausführung übereinstimmen.“

Die beiden richtigen Aussagen belegen gemeinsam K4. Jede Aussage hat eine eigene Kriterien- und Fehlvorstellungszuordnung. Eine falsche Auswahl ist ein beobachtetes Antwortmuster, noch keine gesicherte Diagnose.

## 3. Code anklicken

**Eingabe:** einen ausdrücklich verlangten Ausdruck, Namen oder eine Anweisung im Code auswählen. Auswählbare Bereiche sind vorab festgelegt und besitzen stabile IDs.

**Bewertung:** Bereichs-ID mit erlaubten Zielbereichen vergleichen. Fachlich gleichwertige Bereiche müssen im Lösungsschlüssel berücksichtigt sein oder die Aufgabe wird enger formuliert.

**Rückmeldung:** auf die Bedeutung der gewählten Stelle eingehen. Beispiel: Bei Auswahl der linken Seite auf die Stelle hinweisen, an der das neue Ergebnis berechnet wird.

**Generierungsgrenzen:** LLM formuliert den Auftrag passend zu einem verifizierten Zielbereich; es erzeugt keine beliebigen Pixelkoordinaten. Tastaturbedienbare Auswahl ist erforderlich. Die Darstellung deutet nicht durch unterschiedliche Markierungen auf die Lösung hin.

Beispiel: „Wähle den Ausdruck, der zuerst ausgewertet wird.“ Ziel: `wert + 2`. Anschließend kann eine kurze Auswahl zum dabei eingesetzten Wert folgen. Das Anklicken allein belegt nur den Ort der Auswertung.

## 4. Lücken befüllen

**Eingabe:** Antwortkarten in Lücken einsetzen, per Ziehen oder durch Karte auswählen und Ziel anklicken. Lücken und Karten besitzen IDs. Die Aufgabe gibt an, ob Karten mehrfach verwendet werden dürfen.

**Bewertung:** jede Zuordnung anhand des freigegebenen Schlüssels prüfen. Vollständig richtig sind alle erforderlichen Zuordnungen. Zulässige gleichwertige Zuordnungen werden ausdrücklich hinterlegt.

**Rückmeldung:** zunächst die früheste fehlerhafte Zuordnung behandeln; richtige Zuordnungen bleiben erhalten, wenn dies die Lösung der übrigen Lücken nicht automatisch verrät.

**Generierungsgrenzen:** keine grammatischen Hinweise auf die Lösung; gleiches sprachliches Format innerhalb austauschbarer Karten. Richtige und falsche Karten derselben Auswahlgruppe haben dieselbe Wortanzahl. Reine Zahlen beziehungsweise Codewerte gelten jeweils als ein Element.

Beispiel, bisheriger Wert 3: „Rechts wird __ + 2 berechnet. Das Ergebnis ist __. Erst danach wird __ neu zugewiesen.“ Kartenwerte: 3, 5 und weitere plausible Zahlen. Mehrfachnutzung der 5 wird explizit erlaubt. Die exakte Kartenauswahl ist vor Freigabe zu kuratieren.

## 5. Schritte ordnen

**Eingabe:** drei oder vier Schritte in Ausführungsreihenfolge bringen, per Ziehen oder über Verschiebeschaltflächen.

**Bewertung:** Reihenfolge der IDs mit der verifizierten Reihenfolge vergleichen. Sind mehrere Reihenfolgen fachlich möglich, müssen alle erlaubt sein; bevorzugt werden für den Einstieg Aufgaben mit genau einer sinnvollen Reihenfolge.

**Rückmeldung:** die erste verletzte Abhängigkeit benennen, beispielsweise „Welcher Wert wird für die Berechnung benötigt?“

**Generierungsgrenzen:** Karten benennen echte Teilschritte. Die anfängliche Reihenfolge wird durch die App gemischt. Diese Form enthält keine richtigen und falschen Antwortalternativen; gleiche Wortanzahl wird daher nicht verlangt. Die Karten bleiben ähnlich knapp.

Beispiel: „Bisherigen Wert lesen“ → „Addition berechnen“ → „Ergebnis neu zuweisen“. Diese Reihenfolge belegt den Ablauf von K4.

## 6. Diagramm auswählen

**Eingabe:** ein korrektes Diagramm unter drei oder vier Varianten auswählen. Jedes hat eine zugängliche Textbeschreibung, die denselben Inhalt vermittelt.

**Bewertung:** Diagramm-ID mit dem Lösungsschlüssel vergleichen. Für Mehrfachauswahl von Diagrammen gelten zusätzlich die Regeln aus Form 2.

**Rückmeldung:** auf die abweichende Beziehung oder Reihenfolge eingehen, nicht nur „Diagramm falsch“ anzeigen.

**Generierungsgrenzen:** Diagramme werden aus einem begrenzten, strukturierten Darstellungsschema aufgebaut. Das LLM liefert keine frei gezeichneten Bilder. Alle Alternativen verwenden dieselbe visuelle Gestaltung, vergleichbare Komplexität und gleiche Beschriftungsstruktur. Sichtbare Texte und alternative Textbeschreibungen haben jeweils dieselbe Wortanzahl pro Diagrammalternative. Textbeschreibungen dürfen die Richtigkeit nicht verraten.

Beispiel: bisheriger Wert → Ausdruck rechts → Ergebnis → neue Zuordnung. Falsche Varianten vertauschen eine Abhängigkeit und bilden eine kuratierte Fehlvorstellung ab.

## Verbindliche Wortzahlregel

Für jede Gruppe austauschbarer textlicher Alternativen gilt: Alle richtigen und falschen Alternativen haben exakt dieselbe Wortanzahl. Bei mehreren richtigen Antworten haben auch diese untereinander dieselbe Wortanzahl. Auffüllen mit unnatürlichen oder sachlich überflüssigen Wörtern ist unzulässig; dann wird die ganze Gruppe umformuliert.

Vorgeschlagene maschinelle Zählkonvention: Formatierungsmarkierungen entfernen, äußere Leerzeichen entfernen, an einem oder mehreren Leerraumzeichen teilen und nur Teile zählen, die mindestens einen Buchstaben oder eine Ziffer enthalten. Satzzeichen allein zählen nicht. Ein durch Bindestrich verbundenes Wort zählt als ein Wort. Code wird nicht künstlich anders eingerückt oder mit Leerzeichen verändert, um die Zählung zu bestehen. Diese Konvention zählt sichtbare Einheiten, keine LLM-Tokens.

Gleiche Wortzahl ist notwendig, aber verhindert nicht alle Lösungshinweise. Zusätzlich müssen Detailgrad, Sprachstil, Fachwortgebrauch, Satzbau und visuelle Hervorhebung vergleichbar sein. Negationen dürfen fachlich nötig sein, aber kein wiederkehrendes Merkmal ausschließlich falscher Antworten werden.

## Kuration und Generierungsablauf

Der menschliche Autor entwickelt die Idee gemeinsam mit einem KI-System zu einem Skill mit YAML-Frontmatter, Description und verdichtetem Hauptteil. Der genaue Ablauf und das vorgeschlagene Dateiformat stehen in [Kuration und Skillformat](03-kuration-und-skillformat.md). Die folgenden Schritte beschreiben die Laufzeitnutzung dieses kuratierten Skills.

1. Die App wählt eine kuratierte Aufgabenfamilie, Lernziel, Kriterium und Interaktionsform.
2. Verifizierter Ablauf und inhaltlicher Lösungsschlüssel stehen vor der Formulierung von Alternativen fest.
3. Ein Markdown-Skill beschreibt zulässige Formulierungen, Fehlvorstellungen, Wortzahl und Antwortstruktur. Das LLM formuliert innerhalb dieser Grenzen.
4. Vorgesehene JavaScript-Prüfungen kontrollieren IDs, Anzahl, Duplikate, Wortzahl, Anzahl korrekter Alternativen sowie strukturelle Lösung und Kriterienzuordnung.
5. Eine inhaltliche Prüfung muss außerdem ausschließen, dass als falsch markierte Aussagen tatsächlich richtig oder mehrdeutig sind. Der vom generierenden Modell gelieferte Richtigkeitsmarker ist kein Beweis. Freie sprachliche Varianten benötigen einen festgelegten Freigabeweg; bis dahin werden nur kuratierte Formulierungen mit verifizierten Parametern verwendet.
6. Erst nach bestandenen Prüfungen mischt die App die Alternativen und zeigt die Aufgabe. Bei Fehlern folgt eine begrenzte Neuerzeugung oder geprüfte Ersatzaufgabe. Die maximale Versuchszahl ist noch festzulegen.
7. Lernendenantworten werden durch die App anhand des freigegebenen Lösungsschlüssels ausgewertet. Das LLM kann Hinweise formulieren; es kann den Schlüssel nicht nachträglich ändern.

Es werden in dieser Phase keine ausführbaren Tools implementiert. Der Entwurf des Generierungs-Skills liegt in `../skills/antwortalternativen-generieren/SKILL.md`.

## Zuordnung zu Stufe 1

| Verständnisziel | Geeignete Formen | Grenze des Belegs |
| --- | --- | --- |
| Ausdruck und Zuweisung erkennen | Code anklicken, Einzelauswahl | Erkennen allein belegt keinen Ablauf |
| Rechte Seite vor Neuzuweisung auswerten (K4) | Schritte ordnen, Mehrfachauswahl, Diagramm; Kombination aus Codeauswahl und Wertauswahl | Ein einzelner Treffer ist noch kein stabiler Beherrschungsnachweis |
| Aktuellen Wert verwenden (K2, K3) | Lücken, Einzelauswahl, Mehrfachauswahl | Rechnen und Verständnis der Zuweisung getrennt betrachten |
| Wirkung der Anweisungsreihenfolge (K1) | Schritte ordnen, Diagramm, Auswahl | Aufgaben müssen unterschiedliche Reihenfolgen tatsächlich unterscheiden |
| Zahl und Text unterscheiden | Auswahl, Lücken, Code anklicken | Eigene Aufgabenfamilie mit Sprachsemantik erforderlich |
| Wirkung einer kleinen Änderung | Auswahl, Lücken, Diagramm | Eigene Kriterien für Ursache und Wirkung erforderlich |

## Vorgesehene Abnahmekriterien

- Textalternativen mit abweichender Wortanzahl werden nicht angezeigt.
- Einzelauswahl hat genau eine richtige Alternative; Mehrfachauswahl wird nur bei exakter Mengenübereinstimmung als vollständig richtig eingeordnet.
- Mischen der Anzeige verändert weder Richtigkeit noch Kriterienzuordnung.
- Keine Pflicht zum Schreiben einer Erklärung für K4.
- Jede Interaktionsform ist ohne Ziehen und per Tastatur bedienbar.
- Korrekte Auswahl und Schlussfolgerung über längerfristiges Verständnis bleiben getrennt.
- Nicht freigegebene Sprachvarianten und mehrdeutige Lösungsschlüssel werden nicht angezeigt.
- Gespeicherte Versuche bleiben auch nach Umformulierung oder Neuerzeugung nachvollziehbar.

## Offene Entscheidungen

- Wie viele kurze Interaktionen gehören zu einem Lernzyklus?
- Wann werden Musterlösung und detaillierter Vergleich freigegeben?
- Welche Formulierungen dürfen unmittelbar generiert werden, und wie wird ihre Bedeutung zuverlässig geprüft?
- Welche Wiederholungs- und Transferbelege erlauben den Übergang zur nächsten Verständnisstufe?
