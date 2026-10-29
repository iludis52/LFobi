# Skill- und Aufgabenvertrag

Aktualisierung vom 16. Oktober 2026: [Zusatz 22](22-kompakte-modellvertraege.md) trennt vollständige Autorentexte von kompakten englischen Laufzeitverträgen. Bei eindeutigem Thema wird der Skill lokal ausgewählt. Die validierten Vorlagen beziehungsweise der Programmbaum-Vertrag und die lokalen Prüfungen setzen die Grenzen durch.

Aktualisierung vom 16. Oktober 2026: [Zusatz 20](20-adaptive-aufgaben-und-kurzerklaerung.md) ergänzt eine kompakte Zusammenfassung der letzten drei Aufgabenbefunde. Bei Fehlern darf die App eine Fragestellung gezielt erneut anfordern. Die rohe frühere Antwortgeschichte wird weiterhin nicht übermittelt. Für die Kurzerklärung wird ausschließlich die aktuelle geprüfte Abgabe übertragen.
Verbindliche Ergänzung vom 14. Oktober 2026: Für die Familie Verzweigungen gilt jetzt der implementierte [Vertrag zur kontrollierten Aufgabengenerierung](16-kontrollierte-aufgabengenerierung.md). Das Frontmatter aktiviert generation_contract: branch-workshop-v1. Die App liefert dem Modell den Skill-Hauptteil, einen begrenzten Programmbaum-Vertrag, die angeforderte Fragestellung und kompakte Wiederholungsmerkmale. Lösungen entstehen unabhängig in der App. Die nachfolgenden engen Vorlagenverträge gelten weiterhin für die übrigen Familien und die historischen Referenzen.

Status: Konkreter Formatvorschlag zur Abstimmung; noch nicht implementiert. Enge Führung der Aufgaben durch vorgegebene Typen und Strukturen ist vereinbart.
Datum: 12. Oktober 2026

Aktualisiertes Hostingziel: Skills, Vorlagen und JavaScript-Tools müssen in einer statischen Web-App im Unterordner eines WordPress-Webservers verwendbar sein. Kein Node-App-Server, eigenes Plugin oder PHP-App-Endpunkt ist Laufzeitvoraussetzung. Die nachfolgenden fachlichen Verträge bleiben gültig; das Laden, die Aufgabenhaltung und die Auswertung werden browserseitig realisiert. Einbettung und direkter Modellzugriff stehen in [WordPress-Hosting](09-wordpress-hosting.md).

## Vorschlag: Ein Ordner je Aufgabenfamilie

```text
skills/
  zuweisung-reihenfolge/
    SKILL.md
    content.de.md
    templates.json
    examples.json
    tools/
      validate.js
      evaluate.js
```

`SKILL.md` beschreibt Auswahl und Arbeitsanweisungen für das LLM. `content.de.md` enthält verständliche Erklärungen für Lernende. `templates.json` enthält freigegebene Vorlagen; `examples.json` dokumentiert Referenzfälle für die Kuration. Tools sind nur erforderlich, wenn die Familie eigene Prüflogik benötigt. Gemeinsam genutzte Tools können zentral bereitgestellt werden, statt Kopien je Familie anzulegen.

Das ist ein Formatvorschlag der App, kein vorausgesetzter allgemeiner Skillstandard. Die Dateien werden in dieser Phase nicht als Implementierung erzeugt.

## Frontmatter

```yaml
---
name: zuweisung-reihenfolge
description: "Kapitel 1: bisherigen Wert lesen, rechte Seite berechnen, anschließend neu zuweisen. Erzeugt kurze Interaktionen aus freigegebenen Vorlagen."
version: "0.1"
status: draft
chapter: 1
learning_objective: assignment-order
difficulty_levels: [1, 2, 3]
interaction_types: [single-choice, multiple-choice, code-selection, gap-fill, ordering, diagram-choice]
instruction_language: de
learner_language: de
content: content.de.md
templates: templates.json
examples: examples.json
---
```

`difficulty_levels` und `interaction_types` enthalten nur tatsächlich unterstützte Stufen und Formen. Sie verpflichten eine Familie nicht, alle sechs Formen auf allen Stufen anzubieten.

Die App liest Metadaten und Description für ihren Katalog. Nach der Auswahl stellt sie den Hauptteil und die benötigten Vorlagen bereit; relative Pfade allein bewirken keinen Zugriff des LLM auf Dateien.

Die menschliche Freigabe einer Version wird durch `status: approved` angezeigt. Das Laufzeit-LLM kann Status und Version nicht verändern.

## Hauptteil

Der Hauptteil ist kompakt und enthält:

1. Lernziel und fachliche Semantik.
2. Eingaben: gewünschte Schwierigkeit, zugelassene Vorlagen und verifizierte Parametergrenzen.
3. Zulässige Auswahl und Parametrisierung.
4. Verbindliche Regeln: Kriterien, gleiche Wortanzahl, zulässige Fehlvorstellungen, keine zusätzlichen Konzepte.
5. Erwartetes Ausgabeformat und Verhalten bei fehlenden Voraussetzungen.

Der Hauptteil darf verdichtet oder in einer anderen Sprache verfasst sein. Die deutsche Lernendenerklärung bleibt davon unabhängig. Die normative Bedeutung muss mit den Referenzfällen übereinstimmen.

## Enge Laufzeitgenerierung

Für die erste Fassung wird vorgeschlagen, dass das LLM nur eine freigegebene Vorlage auswählt und deren erlaubte Parameter setzt. Die Vorlage enthält Programmstruktur, Auftrag, Aussagevarianten, Lösungsschlüssel beziehungsweise dessen Berechnungsregel und Hinweise. Unterschiedliche Aufgaben entstehen durch mehrere kuratierte Vorlagen, erlaubte Werte und gemischte Antwortreihenfolgen.

Der Antwortvertrag des LLM kann deshalb klein bleiben:

```json
{
  "template_id": "assignment-order-single-v1",
  "parameters": {
    "start": 4,
    "add": 3
  }
}
```

Die Schwierigkeit ist bereits durch App-Auswahl und Vorlagenmetadaten festgelegt. Die App akzeptiert nur Vorlagen aus dem erlaubten Rahmen und Parameter innerhalb ihrer Grenzen. Sie setzt Text und Code zusammen, berechnet den Ablauf und übernimmt beziehungsweise berechnet den freigegebenen Lösungsschlüssel.

Der dargestellte JSON-Vertrag ist ein Vorschlag, keine bereits freigegebene finale Schnittstelle. Sprachwahl, nötige Variantenparameter und unterschiedliche Vorlagentypen müssen im Schema ergänzt werden.

Freies Umformulieren richtiger und falscher Aussagen durch das Laufzeit-LLM ist in diesem ersten Formatvorschlag nicht vorgesehen. Dieser Vorschlag begrenzt den bisherigen Wunsch nach möglicher On-the-fly-Formulierung zugunsten einfacher fachlicher Prüfung. Falls freie Textgenerierung gewünscht bleibt, ist hierfür ein zusätzlicher Prüfvertrag erforderlich. Die Entscheidung darüber ist offen.

## Interner Aufgabenvertrag der App

Die App erzeugt aus der geprüften Vorlage eine konkrete Aufgabeninstanz mit:

- ID, Skill-ID, Skill-Version und Vorlagen-ID.
- Kapitel, Lernziel, Schwierigkeit und Sprache.
- Arbeitsauftrag, Code und einer der sechs Interaktionsformen.
- Stabile IDs der Auswahlmöglichkeiten, Bereiche, Karten beziehungsweise Diagramme.
- Freigegebener Lösung und Kriterienzuordnung.
- Gezielten Hinweisen und Erklärung für den Vergleich nach der Abgabe.

Der Inhalt je Interaktionsform wird über getrennte Schemas festgelegt:

| Form | Aufgabeninhalt | Lösung |
| --- | --- | --- |
| Einzelauswahl | Drei oder vier Optionen mit IDs | Genau eine richtige ID |
| Mehrfachauswahl | Drei oder vier Aussagen mit IDs | Menge der richtigen IDs |
| Codeauswahl | Code und auswählbare Bereiche mit IDs | Erlaubte Bereichs-ID beziehungsweise IDs |
| Lücken | Lücken, Karten und Wiederverwendungsregel | Zulässige Zuordnungen |
| Reihenfolge | Schritte mit IDs | Zulässige Reihenfolge beziehungsweise Reihenfolgen |
| Diagrammauswahl | Diagramme aus begrenztem Darstellungsschema | Richtige Diagramm-ID |

Jede Instanz verlangt eine Abgabe. Verschiedene Aufgaben müssen nicht denselben universellen Antwortkörper verwenden; sie teilen nur Grundmetadaten und die Ergebniszählung.

## Tools und Fehlerverhalten

Vorgeschlagene Tool-Verantwortung:

- `validate`: Vorlagenzugehörigkeit, Parametergrenzen, IDs, Struktur, Wortanzahl und Lösungskonsistenz prüfen.
- `evaluate`: Abgabe mit dem freigegebenen Lösungsschlüssel vergleichen und genau ein richtig/falsch-Ergebnis mit gezielter Detailinformation liefern.

Diese Tools werden von der App aufgerufen. Native Tool-Aufrufe des LLM sind für diesen Ablauf nicht erforderlich. Ein LLM kann optional eine Hilfe zur aktuellen Aufgabe formulieren; das geprüfte Ergebnis bleibt unverändert.

Bei ungültiger Modellantwort wird keine ungeprüfte Aufgabe angezeigt. Vorgeschlagener einfacher Ersatz: Die App wählt eine freigegebene Vorlage derselben Schwierigkeit und setzt gültige Parameter. Fehlt ein passender Ersatz, erklärt sie die fehlende Verfügbarkeit und bietet eine andere Stufe an. Eine nicht erreichbare Modellverbindung wird sichtbar angezeigt; ein Ersatz wird nicht als frisch generierter Modellinhalt bezeichnet.

## Noch abzustimmen

- Zustimmung zur begrenzten Parametrisierung statt freier Formulierung von Alternativen im ersten Ausbau.
- Verbindliche Metadatenfelder und endgültige Schemas je Form.
- Umfang des ersten kuratierten Aufgabenbestands in Kapitel 1.
