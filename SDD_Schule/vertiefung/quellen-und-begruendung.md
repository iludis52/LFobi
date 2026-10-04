---
titel: Quellen und didaktische Begründung
datum: 2026-10-04
kurs: Optionaler Hintergrund für Lehrkräfte
version: 3.0
---

# Was fachlich verankert ist – und was wir erproben

## 1. Zweck dieser Quellenprüfung

Das Set verbindet etablierte Tätigkeiten der Softwareentwicklung mit einer vereinfachten KI-gestützten Arbeitsweise. **SDD ist das Unterrichtsvehikel; der Zusammenhang von Anforderungen, Aufbau, Umsetzung und Prüfung ist der Lerngegenstand.**

Die Recherche vom 04.10.2026 prüft gezielt einschlägige Primärquellen und ergänzt die bisherigen Studien um einen Beitrag von 2025. Sie ist keine systematische Literaturübersicht. Technische Dokumentation begründet Methoden und Begriffe; Studien liefern Hinweise für die Gestaltung. Keine der hier ausgewerteten Studien validiert dieses vollständige Unterrichtsset.

## 2. Fachliche Grundlagen und ihre Verwendung

| Quelle | Fachlicher Bezug | Umsetzung im Set |
| --- | --- | --- |
| [IEEE Computer Society: SWEBOK V4, Themenübersicht](https://www.computer.org/education/bodies-of-knowledge/software-engineering/topics) | Anforderungserhebung, Analyse, Spezifikation, Validierung, Änderungsmanagement und iterative Anforderungsarbeit | Anforderungen werden geklärt und festgehalten; Befunde können zu einer begründeten Änderung führen. |
| [GitHub: Spec Kit](https://github.github.com/spec-kit/) | Aktueller technischer Workflow Specify → Plan → Tasks → Implement → Converge | Vereinfacht zu Spec, Plan und kleinen Tasks; Schüler prüfen und geben die Fassung frei. Keine Installation erforderlich. |
| [Alistair Mavin: EARS](https://alistairmavin.com/ears/) | Satzmuster ordnen Bedingungen, Auslöser und Systemreaktionen. | Die KI stellt konkrete Rückfragen in Alltagssprache. Eine vollständige formale EARS-Anwendung wird nicht behauptet. |
| [ISTQB: CTFL Syllabus v4.0.1](https://istqb.org/?download_id=3345&sdm_process_download=1) | Testgrundsätze, Teststufen, Testentwurf und Testpyramide | Optionaler Ausblick und fachliche Begriffsklärung; keine Zertifizierungsvorbereitung. |
| [Martin Fowler: Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html) | Test-zuerst-Entwicklung mit Rot, Grün und Refactoring | Ein bewusster Zyklus ist optional; echte lokale Ausführung und Rückmeldung bleiben erforderlich. |

Die SWEBOK-Themenübersicht wurde über den indexierten Inhalt der offiziellen Seite geprüft; der direkte Abruf war gesperrt. Es wird daraus keine vollständige Prüfung des SWEBOK-Buchs oder einer Norm abgeleitet. Spec Kit ist eine veränderliche technische Quelle. Seine Dokumentation liefert keinen Beleg für Unterrichtswirkung.

Weitere technische Primärquellen, geprüft am 04.10.2026:

- Martin Fowler: [Unit Test](https://martinfowler.com/bliki/UnitTest.html) und [Integration Test](https://martinfowler.com/bliki/IntegrationTest.html), zur Einordnung der Begriffe und ihrer unterschiedlichen Verwendung in der Praxis.
- Microsoft: [Playwright – Writing tests](https://playwright.dev/docs/writing-tests), als Beispiel automatisierter Browserhandlungen und Ergebnisprüfungen. Das Werkzeug wird hier nur als Ausblick genannt.
- Python: [unittest](https://docs.python.org/3/library/unittest.html), als späterer Übergang zu einem Testframework; das beiliegende Beispiel verwendet ein einfaches Prüfskript.
- MDN: [JavaScript-Funktionsdeklaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function), technischer Bezug für benannte Funktionen.
- RFC Editor: [RFC 4632](https://www.rfc-editor.org/rfc/rfc4632), CIDR, und [RFC 3021](https://www.rfc-editor.org/rfc/rfc3021), insbesondere Abschnitt 2.1. Die IPv4-Aufgabe begrenzt die Minus-zwei-Regel ausdrücklich auf /24 bis /30; /31 und /32 sind außerhalb des Auftrags.

## 3. Forschungsbefunde und didaktische Folgerungen

### KI kann die Bearbeitung erleichtern; Lernen muss gesondert betrachtet werden

Kazemitabaar et al. (CHI 2023) untersuchten 69 Anfänger im Alter von 10 bis 17 Jahren bei kurzen Python-Aufgaben. KI-Zugang verbesserte die Codeerstellung; die untersuchten manuellen Änderungen wurden nicht schlechter. Der Unterschied im späteren Gesamt-Nachtest war nicht statistisch signifikant.[^chi]

**Unsere Gestaltungsentscheidung:** KI-Unterstützung ausdrücklich erlauben, eigenes Verständnis aber an Vorhersagen und kleinen Änderungen zeigen lassen. Die Studie untersucht keinen schulischen SDD-Projektzyklus.

### Ein fertiges Produkt kann Verständnislücken verdecken

Prather et al. (ICER 2024) beobachteten 21 Programmieranfänger qualitativ. Einige steuerten und beurteilten KI-Vorschläge gezielt; andere hatten trotz fertiger Lösung Schwierigkeiten und überschätzten ihr Können.[^gap]

**Unsere Gestaltungsentscheidung:** eigene Fälle und begründete Entscheidungen an wenigen wichtigen Stellen einfordern; Produktqualität und individuelle Leistung getrennt betrachten. Die Untersuchung weist keine kausale Lernwirkung unserer Hilfen nach.

### Aktive Auseinandersetzung benötigt passende Dosierung

Kazemitabaar et al. (Autorenversion 2024, IUI 2025) untersuchten unterschiedliche Verfahren zur Auseinandersetzung mit KI-Code in Studien mit 82 und 42 Teilnehmenden. Der schrittweise Dialog „Lead-and-Reveal“ regt eigene Beiträge vor der Codeanzeige an. Im zweiten Versuch unterschieden sich die nachfolgenden manuellen Programmierleistungen nicht statistisch signifikant; der Dialog brauchte mehr Zeit als die unmittelbare Codeanzeige. Die Autoren berichten Hinweise auf eine passendere Selbsteinschätzung.[^engagement]

**Unsere Gestaltungsentscheidung:** wenige sinnvolle Haltepunkte, gezielte Hilfe und eigene Übertragung auf eine neue Eingabe. Das Verfahren wird im Set vereinfacht und nicht als nachgewiesen überlegen dargestellt.

### Ein neuerer Befund bestätigt die getrennte Betrachtung

Andleeb, Kantorski und Carver (SIGCITE 2025) berichten aus einer gegenbalancierten, quasi-experimentellen CS1-Untersuchung mit C-Aufgaben: Mit ChatGPT waren Codequalität und Bearbeitungszeit günstiger; konzeptuelle Ergebnisse fielen je Thema unterschiedlich aus.[^cs1]

**Unsere Gestaltungsentscheidung:** eine schnelle, gut aussehende Lösung nicht als automatischen Kompetenzzuwachs werten. Kleine Stichprobe, selbstgewählte Gruppen und kurze Erhebung begrenzen die Aussagekraft. Zielgruppe, Sprache und Aufgaben unterscheiden sich von unserer Schulreihe.

## 4. Welche Aussagen das Set bewusst nicht macht

Das Set verspricht keine nachgewiesene Überlegenheit von SDD, keine allgemeine Verbesserung der Sprachfähigkeit und keinen gesicherten langfristigen Lernerfolg durch KI. Die genaue Projektform, Zeitstaffelung, Rücknahme der Hilfen, Teamorganisation und Bewertung sind eigene Unterrichtsentscheidungen zur Erprobung.

Die Anforderungskette, Architekturbeispiele, Aufgaben und Glossarerklärungen sind didaktische Vereinfachungen. Die drei grundlegenden Schülerfragen dienen der Orientierung. Fachbegriffe werden an Erfahrungen angeschlossen, nicht als vollständiger Katalog vorab verlangt.

## 5. Eine schlanke Erprobung

Für den ersten Durchlauf kann die Lehrkraft eine kleine Eingangs- und Abschlussaufgabe einsetzen: eine vage Anforderung präzisieren, einen erwarteten Wert begründen oder eine neue Eingabe durch eine Funktion verfolgen. Dazu wenige Notizen über Zeit, Hilfebedarf und häufige Verständnisprobleme.

Diese Beobachtungen zeigen Durchführbarkeit und lokale Lernentwicklung. Ohne geeigneten Vergleich erlauben sie keinen kausalen Nachweis der Wirksamkeit. Die Kriterien für individuelle Leistungen werden vorab angekündigt; ein umfangreiches Codeinterview ist nur eine mögliche Form.

## 6. Umfang der tatsächlichen Prüfung

Bei den Forschungsquellen [1] wurde der Abstract geprüft; bei [2], [3] und [4] zusätzlich einschlägiger Volltext. Für [3] sind insbesondere Abschnitte 6.3–6.7 und 7.1 wichtig. Stichproben und Aufgaben lassen sich nicht pauschal auf jede Klasse übertragen.

Die 13 Markdown-Dateien wurden auf relative Dateilinks, Frontmatter, Überschriftenhierarchie, geschlossene Codeblöcke und aufklappbare Bereiche, Fußnoten und veraltete Verweise geprüft. Die vier Diagrammquellen verwenden einfache Mermaid-Flussdiagramme gemäß der Viewer-Referenz; eine Ausführung im konkreten Viewer fand nicht statt.

Python: Platzhalter mit erwartetem Fehlschlag bei 31 und Status 1; Lehrkraftlösung mit drei bestandenen Fällen und Status 0; fehlerhafte Grenzbehandlung `>=` mit erkanntem Fehler bei 30. JavaScript: dieselben Zustände unter Node mit einer minimalen DOM-Attrappe geprüft; die Skriptreihenfolge in der Testseite wurde kontrolliert. Die Startdateien bleiben absichtlich Platzhalter. Ein echter Browser-/Live-Server-Durchlauf war hier nicht verfügbar. Schulgeräte, Frontend, Modellverhalten und Unterrichtszeit bleiben vor Ort zu prüfen.

[^chi]: [1] Kazemitabaar et al. (2023): *Studying the effect of AI Code Generators on Supporting Novice Learners in Introductory Programming*. [Autorenversion](https://arxiv.org/abs/2302.07427); [CHI-Veröffentlichung](https://doi.org/10.1145/3544548.3580919).
[^gap]: [2] Prather et al. (2024): *The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers*. [Autorenversion](https://arxiv.org/abs/2405.17739); [Volltext](https://arxiv.org/html/2405.17739v1).
[^engagement]: [3] Kazemitabaar et al.: *Exploring the Design Space of Cognitive Engagement Techniques with AI-Generated Code for Enhanced Learning*. [Autorenversion 2024](https://arxiv.org/abs/2410.08922); [Volltext](https://arxiv.org/html/2410.08922v1); [IUI 2025](https://doi.org/10.1145/3708359.3712104).
[^cs1]: [4] Andleeb, Kantorski und Carver (2025): *ChatGPT in Introductory Programming: Counterbalanced Evaluation of Code Quality, Conceptual Learning, and Student Perceptions*. Laut Autorenversion für SIGCITE’25 angenommen. [Autorenversion](https://arxiv.org/abs/2510.00946); [Volltext](https://arxiv.org/html/2510.00946v1).
