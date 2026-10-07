---
titel: Testen und TDD – ein Blick in die Qualitätssicherung
datum: 2026-10-07
kurs: Optionale Vertiefung
version: 3.4
---

# Vom eigenen Prüffall zur systematischen Qualitätssicherung

## 1. Was immer gilt – und was optional ist

**Verbindlich:** Vor der Umsetzung eine begründete Erwartung festlegen. Nach jedem Task wirklich ausführen und Ergebnis vergleichen. Nach Änderungen betroffene alte Fälle erneut prüfen. Zum Abschluss andere Nutzer ausprobieren lassen.

**Optional:** automatisierte Tests selbst entwickeln, TDD durchführen oder professionelle Werkzeuge kennenlernen. Unit, Integration und E2E sollen zunächst Orientierung bieten. Das Fachgebiet reicht von Testentwurf und Automatisierung bis zu Sicherheit, Bedienbarkeit und Testmanagement.[^istqb]

> [!KONZEPT] Drei unterschiedliche Fragen
> **Was wird geprüft?** Eine Funktion, das Zusammenspiel oder ein kompletter Ablauf. **Wer führt aus?** Ein Mensch oder ein Programm. **Wann entsteht der Test?** Vor, während oder nach der Implementierung. TDD beantwortet die Frage nach dem Entwicklungsverfahren.

## 2. Unit, Integration und E2E an derselben App

Die Beispiele nutzen unseren Trainer mit der festen Aufgabe `1011`. Sie sind Denkbeispiele; es wird kein neues Framework verlangt.

| Blick auf die App | Was wird geprüft? | Beispiel |
| --- | --- | --- |
| **Unit** | Ein kleiner Teil, gezielt für sich[^unit] | `istAntwortRichtig(11)` liefert wahr; `istAntwortRichtig(12)` liefert falsch. |
| **Integration** | Schnittstellen und Zusammenarbeit[^integration] | Eingabetext `"11"` wird korrekt umgewandelt und an die Fachfunktion übergeben. |
| **E2E** | Ein vollständiger Ablauf vom Anfang bis zum Ergebnis | App öffnen, `11` eingeben, klicken und sichtbares „Richtig“ prüfen. |

Ein **Systemtest** betrachtet das gesamte System. E2E bezeichnet einen durchgehenden Ablauf und ist keine zwingende zusätzliche Stufe. Ein **Akzeptanztest** prüft Nutzerbedürfnisse und vereinbarte Kriterien. Das gegenseitige Ausprobieren im Unterricht liefert dafür einfache Anhaltspunkte.[^istqb]

```mermaid
flowchart TD
  subgraph Gesamt["E2E: Ein vollständiger Nutzungsablauf"]
    A["Aufgabe öffnen"] --> B["Antwort eingeben"]
    B --> C["Eingabe umwandeln"]
    C --> D["Fachfunktion aufrufen"]
    D --> E["Rückmeldung anzeigen"]
  end
  U["Unit: Fachfunktion gezielt prüfen"] -.-> D
  K["Integration: Datenübergabe prüfen"] -.-> C
  K -.-> D
```

**Denkfrage:** Die Unit-Tests bestehen, auf der Seite erscheint keine Rückmeldung. Was könnten sie übersehen haben? Etwa eine nicht angeschlossene Schaltfläche oder die Anzeige an der falschen Stelle. Der fachliche Kern kann richtig sein, während die Verbindung zur Oberfläche fehlerhaft bleibt.

E2E lässt sich auch automatisieren. Ein Werkzeug wie Playwright kann Seiten öffnen, Eingaben durchführen und sichtbare Ergebnisse prüfen.[^e2e] Für diese Unterrichtseinheit genügt das tatsächliche Ausprobieren durch Schüler.

## 3. Warum Testen ein ganzes Fachgebiet ist

Tests brauchen gute Erwartungen und sinnvolle Fälle. Ein bestandener Test beweist keine vollständige Fehlerfreiheit. Deshalb werden unterschiedliche Prüfungen passend zum Projekt kombiniert.[^istqb]

Weitere Fragen zeigen die fachliche Tiefe:

- **Testentwurf:** Welche Eingaben sind typisch? Welche Werte liegen an Grenzen? Welche Fälle sind gleichartig?
- **Abdeckung:** Welche Anforderungen oder Codezweige erreichen unsere Tests? Was bleibt unberührt?
- **Regression:** Funktioniert das Bisherige nach einer Änderung weiter?
- **Qualitätsmerkmale:** Ist die App verständlich, ausreichend schnell und robust?
- **Testmanagement:** Welche Risiken sind wichtig, welche Prüfungen haben Vorrang?

Die **Testpyramide** ist ein Modell für die Verteilung automatisierter Prüfungen: häufig viele kleine, schnelle Tests und weniger umfassende Abläufe. Sie ist keine feste Zahlenvorgabe. Menschliches Ausprobieren ergänzt automatisierte Prüfungen.[^istqb]

## 4. Optional: TDD praktisch erleben

Test-Driven Development entwickelt Verhalten in kleinen Zyklen: **Test zuerst → Rot → Grün → Refactoring prüfen**.[^tdd] Der Test stellt eine bereits begründete fachliche Erwartung auf die Probe. Im Chat-Frontend führen Schüler selbst aus; die KI wartet jeweils auf das Ergebnis.

```mermaid
flowchart TD
  E["Erwartung begründen"] --> T["Test und aufrufbares Gerüst erstellen"]
  T --> R{"Fachlich Rot beobachtet?"}
  R -- "Umgebungsfehler" --> T
  R -- "Ja" --> I["Minimal umsetzen"]
  I --> G{"Tests tatsächlich Grün?"}
  G -- "Nein" --> I
  G -- "Ja" --> F["Struktur prüfen und bei Bedarf verbessern"]
  F --> P["Erneut prüfen; App-Verhalten ergänzen"]
  P --> N["Nächsten Fall wählen"]
  N --> E
```

Rot bedeutet: Der Test ist lauffähig, scheitert aber am noch fehlenden Verhalten. Syntax- oder Ladefehler werden vorher behoben. Grün bedeutet: die tatsächlich ausgeführten Fälle bestehen. Refactoring verbessert bei Bedarf die Struktur, ohne das Verhalten zu ändern. Ein Test nach bereits fertigem Code ist nachträgliches Testen; ein absichtlich eingebauter Fehler demonstriert Testqualität.

### Am eigenen Projekt ausprobieren

Wählt eine kleine Fachfunktion und einen vereinbarten Prüffall aus eurer Spec. Die Projektkarte legt fest, wie ihr Tests ausführt; zusätzliche Demodateien braucht ihr nicht.

1. Eingabe und erwartetes Ergebnis unabhängig vom Code begründen.
2. Test und aufrufbares Gerüst erstellen; ausführen und fachliches Rot tatsächlich beobachten.
3. Verhalten implementieren; erneut ausführen und Grün tatsächlich beobachten.
4. Struktur bei Bedarf verbessern und erneut prüfen; anschließend die Verbindung zur App ausprobieren.

Der Umsetzungs-Prompt unterstützt diesen Ablauf, wenn die Lehrkraft TDD gewählt hat. Meldet der KI jeweils **Datei und Startverfahren, Eingabe, Erwartung und tatsächliche Ausgabe**. Bei Lade- oder Syntaxfehlern zunächst die Ausführung klären. Fachliche Erwartungen nicht abschwächen, damit ein fehlerhaftes Programm besteht.

## 5. Ein kurzer Transfer reicht

Für die Erprobung wählt die Lehrkraft eine Frage:

- Welche Prüfung untersucht nur die Fachfunktion, welche auch die Oberfläche?
- Warum reicht Grün im Prüfskript für die ganze App noch nicht?
- Was unterscheidet „Erwartung vor Umsetzung“ von einem tatsächlich durchgeführten TDD-Zyklus?

Ziel dieses Ausblicks ist, den Nutzen unterschiedlicher Prüfungen zu erkennen. Eine vollständige professionelle Teststrategie ist kein Unterrichtsauftrag.

[^istqb]: ISTQB, [CTFL Syllabus v4.0.1](https://istqb.org/?download_id=3345&sdm_process_download=1), Abschnitte 1.3, 2.2, 4 und 5.1.6. Begriffliche Orientierung; Schulbeispiele und Unterrichtsablauf sind eigene Vereinfachungen.
[^unit]: Martin Fowler, [Unit Test](https://martinfowler.com/bliki/UnitTest.html). Der Begriff wird in der Praxis unterschiedlich abgegrenzt; hier dient eine kleine Fachfunktion als Einheit.
[^integration]: Martin Fowler, [Integration Test](https://martinfowler.com/bliki/IntegrationTest.html).
[^e2e]: Microsoft, [Playwright: Writing tests](https://playwright.dev/docs/writing-tests), aktuelle technische Primärquelle, geprüft am 04.10.2026.
[^tdd]: Martin Fowler, [Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html), aktualisiert 2023; fachlicher Bezug für den Zyklus, kein Nachweis schulischer Lernwirkung.
