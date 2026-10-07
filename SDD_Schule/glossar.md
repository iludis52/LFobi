---
titel: Glossar – Software entwickeln und prüfen
datum: 2026-10-07
kurs: Schüler und Lehrkräfte
version: 3.3
---

# Begriffe an unserem Projekt verstehen

**Erst erleben, dann benennen.** Dieses Glossar ist ein Nachschlagewerk. Die Kernbegriffe helfen, das eigene Vorgehen zu erklären; die Vertiefung zeigt, wie groß das Fachgebiet ist. Es muss nicht vollständig gelernt werden.

Durchgehendes Beispiel: Eine Lern-App stellt `1011` und prüft eine Dezimalantwort. `1011₂ = 8 + 2 + 1 = 11₁₀`.

## 1. Idee und Anforderungen

Die Erklärungen sind bewusst vereinfacht. Die fachliche Einordnung folgt den im [Quellenanhang](vertiefung/quellen-und-begruendung.md) genannten Grundlagen zur Anforderungsarbeit.[^anforderungen]

| Begriff | Kurz erklärt | Beispiel |
| --- | --- | --- |
| **Software-Engineering** | Software systematisch entwickeln, prüfen und weiterentwickeln. | Von der Lernidee über Regeln und Code zur geprüften App. |
| **SDLC** | Software Development Life Cycle: Tätigkeiten im Lebenszyklus einer Software, auch nach der ersten Freigabe. | Nach dem ersten Trainer kommen Korrekturen und weitere Aufgaben. |
| **SDD** | Spec-Driven Development: vereinbarte Anforderungen und Kriterien steuern die Entwicklung.[^sdd] | Wir vereinbaren die Rückmeldung, bevor die KI sie programmiert. |
| **Use Case / Anwendungsfall** | Beschreibt, wie ein Nutzer ein Ziel mit dem System erreicht. | Ein Mitschüler gibt seine Antwort ein und erhält Lernhilfe. |
| **Anforderung** | Eine benötigte Eigenschaft oder Leistung der Software. | Die App soll falsche Antworten verständlich erläutern. |
| **Anforderungsanalyse** | Wünsche prüfen, präzisieren, auf Widersprüche untersuchen und begrenzen. | Was heißt „verständlich“? Wann erscheint welcher Hinweis? |
| **Funktionale Anforderung** | Beschreibt, was die Software tun soll. | Nach „Prüfen“ erscheint eine Rückmeldung. |
| **Qualitätsanforderung** | Beschreibt, wie gut eine Eigenschaft erfüllt sein soll. | Ein Nutzer versteht den Hinweis ohne Erklärung des Entwicklerteams. |
| **Scope / Umfang** | Vereinbarter Funktionsumfang und seine Grenzen. | Trainer mit Aufgaben, Prüfung und Rückmeldung; ohne Benutzerkonten. |
| **Spec / Spezifikation** | Festgehaltene Vereinbarung über das gewünschte Verhalten. | Zweck, Eingaben, Regeln und Kriterien in unserer Projektseite. |
| **Akzeptanzkriterium / AK** | Beobachtbare Bedingung für die Erfüllung einer Anforderung. | Bei Antwort `11` zeigt die App „Richtig“. |

Eine Qualitätsanforderung braucht ebenfalls eine passende Prüfung: etwa beobachten, ob ein neuer Nutzer nach einem Hinweis selbst weiterkommt. Die Zahl der Tests allein beantwortet diese Frage nicht.

## 2. Aufbau und Entwicklung

| Begriff | Kurz erklärt | Beispiel |
| --- | --- | --- |
| **Architektur** | Grundlegender Aufbau mit Zuständigkeiten und Beziehungen zwischen Teilen. | Eingabe, Fachlogik und Anzeige sind getrennt. |
| **Architekturentscheidung** | Begründete Wahl über diesen Aufbau. | Fachlogik ohne Browserzugriff, damit sie separat prüfbar bleibt. |
| **Schnittstelle** | Vereinbarter Weg, über den Teile Daten oder Aufträge austauschen. | Die Prüffunktion erhält eine Zahl und liefert wahr/falsch zurück. |
| **Datenmodell** | Festlegung, welche Daten welche Bedeutung und Darstellung haben. | Antwort als ganze Zahl; eine leere Eingabe wird gesondert erkannt. |
| **Plan** | Ordnet Aufbau und Reihenfolge der Arbeit. | Zuerst prüfen, dann Hinweise und Fehlerbehandlung ergänzen. |
| **Task / Arbeitspaket** | Kleiner Auftrag mit überprüfbarem Ergebnis. | „Leere Eingabe erkennen und passende Aufforderung zeigen.“ |
| **Implementierung** | Gewünschtes Verhalten in ausführbaren Code umsetzen. | Eine Bedingung vergleicht die Antwort mit `11`. |
| **Iteration** | Erneuter Entwicklungsdurchlauf mit neuen Erkenntnissen. | Nach dem Ausprobieren klären wir den Umgang mit Leerzeichen. |
| **Bug / Fehler im Programm** | Eine fehlerhafte Umsetzung. | Antwort `12` wird fälschlich als richtig angezeigt. |
| **Freigabe** | Menschliche Entscheidung, eine vereinbarte Fassung bereitzustellen. | Geprüfte Fassung zeigen; offene Einschränkungen benennen. |

## 3. Prüfen und verstehen

| Begriff | Kurz erklärt | Beispiel |
| --- | --- | --- |
| **Test / Prüfung** | Erwartetes und tatsächliches Verhalten systematisch vergleichen. | Antwort eingeben und die Rückmeldung prüfen. |
| **Testfall / Prüffall** | Konkrete Voraussetzungen, Handlung/Eingabe und erwartetes Ergebnis. | Feste Aufgabe `1011`; `11` eingeben; „Richtig“ erwarten. |
| **Normalfall** | Typische gültige Nutzung. | Eine zulässige Antwort eingeben. |
| **Fehlerfall** | Unerwünschte Situation, auf die die App sinnvoll reagieren soll. | Leere Eingabe; Aufforderung statt Absturz. |
| **Grenzfall** | Fall an einer festgelegten Grenze. | Bei einem Zahlenbereich 0–255 die Werte 0 und 255 prüfen. |
| **User-Testing** | Nutzer probieren die Anwendung aus; wir beobachten und sammeln Befunde. | Ein anderes Team nutzt den Trainer ohne Vorführung. |

> [!MERKE] Kriterium und Testfall unterscheiden
> Ein Akzeptanzkriterium beschreibt das verlangte Verhalten. Ein Testfall legt konkret fest, wie wir es prüfen. Ein einzelner Testfall deckt nicht automatisch alle Situationen des Kriteriums ab.

## 4. Vertiefung: die Welt des Testens

Diese Begriffe sind Orientierung, kein zusätzlicher Pflichtstoff. Ausführlicher: [Testen und TDD](vertiefung/testen-und-tdd.md).[^testbegriffe]

| Begriff | Kurz erklärt | Beispiel |
| --- | --- | --- |
| **Unit-/Komponententest** | Prüft einen kleinen Teil gezielt. | Nur die Antwort-Prüffunktion aufrufen. |
| **Integrationstest** | Prüft das Zusammenspiel von Teilen. | Eingabeumwandlung und Prüffunktion arbeiten richtig zusammen. |
| **Systemtest** | Prüft das Verhalten des gesamten Systems. | App mit Oberfläche und allen vereinbarten Funktionen testen. |
| **E2E-Test** | Prüft einen vollständigen Ablauf durch die beteiligten Teile. | App öffnen, Antwort eingeben, „Prüfen“ klicken, Rückmeldung sehen. |
| **Akzeptanztest / Abnahmetest** | Prüft die Eignung für die vereinbarten Nutzerbedürfnisse. | Der Trainer erfüllt die mit Nutzern vereinbarten Kriterien. |
| **Regressionstest** | Prüft, ob nach Änderungen bisheriges Verhalten erhalten bleibt. | Nach neuem Hinweis funktioniert die richtige Antwort weiterhin. |
| **Testautomatisierung** | Ein Programm führt Prüfungen aus und vergleicht Ergebnisse. | Prüfskript meldet bestandene und fehlgeschlagene Fälle. |
| **TDD** | Test-Driven Development: Entwicklung in Test-zuerst-Zyklen.[^tdd] | Test schreiben, Rot beobachten, umsetzen, Grün beobachten. |
| **Refactoring** | Struktur verbessern, vereinbartes Verhalten erhalten.[^tdd] | Einen unklaren Funktionsnamen verständlicher machen. |
| **Testabdeckung / Coverage** | Zeigt, welche definierten Elemente Tests erreichen. | Wurden beide Zweige einer Bedingung ausgeführt? |
| **Testpyramide** | Modell zur Mischung unterschiedlich großer automatisierter Tests. | Viele kleine Prüfungen, wenige umfassende Abläufe. |

Ein E2E-Test kann zugleich Akzeptanzkriterien prüfen. Regression beschreibt den Zweck einer erneuten Prüfung, keine weitere feste Größenstufe. TDD beschreibt ein Entwicklungsverfahren. Diese Begriffe bilden daher keine einzige Reihe austauschbarer Testarten.

<details>
<summary>Weitere Fachbegriffe, wenn sie im Projekt auftauchen</summary>

- **EARS:** Easy Approach to Requirements Syntax; Satzmuster für Anforderungen. Unsere KI-Fragen greifen Auslöser, Bedingungen und Reaktionen auf; formale EARS-Muster sind optional.[^ears]
- **Definition of Done:** gemeinsame Fertigregel für Arbeitspakete. Hier etwa: vereinbartes Verhalten tatsächlich geprüft und wesentliche Abweichungen geklärt. Akzeptanzkriterien gelten dagegen für konkrete Anforderungen.
- **Prototyp:** vorläufige Lösung, um eine konkrete Unsicherheit zu klären; Erkenntniszweck und Grenzen werden benannt.
- **MVP:** Minimum Viable Product; kleinste Fassung, die eine Nutzenannahme bei Nutzern prüfen kann. Professioneller Ausblick; unser Unterrichtsauftrag ist eine vollständige vereinbarte App.
- **Verifikation:** prüfen, ob die Lösung vereinbarte Vorgaben erfüllt.
- **Validierung:** prüfen, ob die Lösung zum tatsächlichen Bedarf passt.
- **Continuous Integration / CI:** Änderungen regelmäßig zusammenführen und automatisierte Prüfungen ausführen; professioneller Ausblick, hier keine Einrichtungspflicht.

</details>

## 5. Begriffe selbst verwenden

Wähle drei Begriffe, die in deinem Projekt tatsächlich vorkamen. Erkläre jeweils: **Was bedeutet der Begriff? Wo haben wir das erlebt? Welche Entscheidung oder Prüfung wurde dadurch klarer?**

[^anforderungen]: IEEE Computer Society, [SWEBOK V4: Themenübersicht](https://www.computer.org/education/bodies-of-knowledge/software-engineering/topics). Fachliche Orientierung; kurze Definitionen und Schulbeispiele sind eigene Vereinfachungen.
[^sdd]: GitHub, [Spec Kit](https://github.github.com/spec-kit/). SDD wird hier als Unterrichtsarbeitsweise definiert, ohne Bindung an das Werkzeug.
[^testbegriffe]: ISTQB, [CTFL v4.0.1](https://istqb.org/?download_id=3345&sdm_process_download=1), Abschnitte 2.2, 4.3 und 5.1.6; Martin Fowler, [Unit Test](https://martinfowler.com/bliki/UnitTest.html) und [Integration Test](https://martinfowler.com/bliki/IntegrationTest.html). Beispiele sind eigene Unterrichtsbeispiele.
[^tdd]: Martin Fowler, [Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html).
[^ears]: Alistair Mavin, [EARS – offizielle Darstellung](https://alistairmavin.com/ears/).
