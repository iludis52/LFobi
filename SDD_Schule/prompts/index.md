---
titel: KI-Prompts – direkt verwenden
datum: 2026-10-04
version: 3.2
---

# Drei Arbeitsaufträge und gemeinsame Grundregeln

Die Lehrkraft verwendet die Projektkarte aus dem [Lehrerleitfaden](../lehrerleitfaden.md). Das Frontend kann Regeln und Karte im Hintergrund mitgeben. Andernfalls werden sie am Anfang des Chats eingefügt. Die Schüler brauchen keine eigene Anleitung zur Prompttechnik.

Die Steueranweisungen sind auf Englisch verdichtet. Die KI antwortet ausdrücklich in der Muttersprache des Schülers, standardmäßig auf Deutsch. Gemeinsame Regeln stehen einmal in Datei 01; die Phasenaufträge setzen sie voraus. Version 3.2 verwendet vorhandene Erwartungen weiter, bündelt Prüfrückmeldungen und begrenzt zusätzliche Verständnisfragen auf höchstens eine pro Projekt, sofern die Lehrkraft keine weiteren festlegt.

## Einrichten und starten

1. [Grundregeln](01-grundregeln.md) als Hintergrundinstruktion hinterlegen oder in den Chat kopieren.
2. Ausgefüllte Projektkarte mitgeben. Die drei Aufträge unten nacheinander verwenden.
3. Schüler bestätigen Spec und Plan inhaltlich; beim Umsetzen warten sie jeweils auf tatsächliche Ergebnisse.

| Auftrag | Wann verwenden? | Ergebnis |
| --- | --- | --- |
| [1. Idee und Spec](02-spezifikation.md) | Zu Beginn oder bei einer unklaren Anforderung | Kurze Vereinbarung mit Akzeptanzkriterien und eigenen Beispielen |
| [2. Plan](03-plan.md) | Nach bestätigter Spec | Aufbau, begründete Entscheidung und kleine Tasks |
| [3. Umsetzung](04-umsetzung.md) | Für jeweils einen Task | Codeänderung, tatsächliche Prüfung, knapper Stand |

Die Abschnitte „KI-Auftrag“ sind die zu übernehmenden Prompts; Dateititel und Frontmatter werden nicht benötigt. Platzhalter im Umsetzungsauftrag ausfüllen. Für KURZ und PROJEKT genügt eine `projekt.md` aus dem [Schüler-Arbeitsblatt](../schuelerarbeitsblatt.md). Bei größerem Umfang sind getrennte Spec und Plan möglich.

**Knapp einsetzen:** Grundregeln und Karte einmal im selben Chat setzen und im Kontext behalten; pro Phase nur den benötigten Auftrag hinzufügen. Nicht alle vier Prompts bei jedem Schritt neu einkopieren. Bei einem neuen Chat die notwendigen Grundlagen erneut mitgeben. Das bedeutet nicht, dass ein Systemprompt bei jeder Modellanfrage kostenlos wäre; tatsächliche Abrechnung und Kontextverwaltung hängen vom verwendeten Frontend und Anbieter ab.

**Ohne TDD:** Der mit „TDD“ beginnende Abschnitt in Auftrag 04 kann bei der Übergabe vollständig weggelassen werden. START, DEFAULT, BOTH und CLOSE bleiben erhalten. So wird die optionale Vertiefung nur mitgeschickt, wenn sie tatsächlich verwendet wird.

## Welcher Kontext gehört zur Umsetzung?

**Dateinamen sind frei; bestätigte Inhalte müssen verfügbar sein.** `01-grundregeln.md` übernimmt die Rolle einer Constitution. Auftrag 04 ist der Umsetzungs-Prompt; der konkrete Task ist der zu bearbeitende Arbeitsauftrag. Unsere Tasks stehen im Plan, eine zusätzliche `task.md` ist nicht erforderlich. Eine eigene Task-Datei darf natürlich verwendet werden.

| Inhalt | Im selben Chat | In einem neuen Umsetzungs-Chat |
| --- | --- | --- |
| Grundregeln / Constitution und Projektkarte | Einmal mitgeben und im Modellkontext behalten | Erneut mitgeben |
| Bestätigtes Verhalten / Spec | Bereits enthaltene Vereinbarung verwenden | Kurze Spec oder freigegebenen, taskrelevanten Auszug mitgeben |
| Plan und aktueller Task | Auf den bestätigten Plan verweisen | Task, Zuständigkeiten, Schnittstellen und relevante Abhängigkeiten mitgeben |
| Aktueller Code und Prüfergebnisse | Verfügbaren Stand verwenden; fehlende Dateien nachreichen | Betroffene aktuelle Dateien und relevanten Prüfstand mitgeben |

### Grundregeln einmal als Chatnachricht

Für kurze Projekte ist die Übergabe als erste Nachricht eine praktikable Unterrichtsvariante. Eine Systemnachricht kennzeichnet die Regeln getrennt vom Gespräch, ist aber keine Voraussetzung dieses Sets. Das ist eine praktische Empfehlung, keine Garantie gleicher Regelbefolgung.

Entscheidend ist, dass das Frontend die Regeln bei weiteren Anfragen tatsächlich im Modellkontext behält. Nur im sichtbaren Chat gespeichert zu sein genügt nicht. Bei der DeepSeek-Chat-Completions-API muss der Client den benötigten Gesprächsverlauf mit jeder Anfrage mitsenden.[^kontext] Bei Kürzung, Zusammenfassung oder neuem Chat die weiterhin nötigen Regeln und Entscheidungen wieder mitgeben. Die konkrete Kontextverwaltung des Schulfrontends wurde hier nicht geprüft.

### Wann darf die separate Spec-Datei entfallen?

Wenn ihre Inhalte schon im Chat, in `projekt.md` oder in einem ausreichend vollständigen Task stehen. Ein Task kann die separate Datei ersetzen, wenn er mindestens die für seine Umsetzung relevanten bestätigten Angaben enthält:

- Zweck und Funktionsumfang der Fassung;
- Verhaltensregeln und Akzeptanzkriterien einschließlich wichtiger Fehler-/Grenzfälle;
- eigene oder bestätigte Beispiele mit erwarteten Ergebnissen;
- technische Zuständigkeiten, Schnittstellen und Abhängigkeiten aus dem Plan.

„Eingabeprüfung bauen“ allein reicht nicht: Soll eine Binär- oder Dezimalantwort geprüft werden? Welche Eingaben gelten als gültig? Was passiert bei einer falschen oder leeren Antwort? Fehlen solche Entscheidungen, fragt die KI gezielt nach. Sie fordert nicht routinemäßig das gesamte Dokumentenset an und erfindet keine Regeln.

**Einfachster Standard:** Grundregeln + Projektkarte + aktuelle `projekt.md` mit Spec und Plan + betroffene Dateien; dazu Auftrag 04 mit dem ausgewählten Task. Für kleine Projekte sind drei getrennte Spec-, Plan- und Task-Dateien unnötig.

## Begleiten, ohne dauernd abzufragen

Vorhandene Erwartungen aus der vereinbarten Spec gelten weiter. Neue APIs werden kurz erklärt und am Beispiel gezeigt. Zusätzliche Verständnis-/Transferfragen: höchstens eine pro Projekt, außer die Lehrkraft legt weitere fest; keine Abfrage nach jedem Task. Die individuelle Lernkontrolle bleibt eine eigene Unterrichtsaktivität.

Prüffälle werden gebündelt ausgeführt. Eine konkrete Rückmeldung wie „Die drei genannten Fälle ausgeführt; alle Ergebnisse entsprechen den Erwartungen“ ist ein Schülernachweis. Bei Abweichungen oder unklaren Befunden konkrete Ausgabe anfordern. Das Ergebnis darf weiterhin nur für den tatsächlich geprüften Umfang als GEPRÜFT gelten.

Fehlt die Prüfung, bleibt sie OFFEN. Auf Schülerwunsch kann ein unabhängiger Schritt weitergehen, während die offene Prüfung erhalten bleibt. Relevante Abhängigkeiten und ungeklärtes Verhalten müssen zuerst geklärt werden. Bei TDD bleiben die tatsächlichen Rot-/Grün-Haltepunkte verbindlich.

## Abschluss und Änderungen

Das gegenseitige User-Testing und die Freigabe stehen im Schüler-Arbeitsblatt. Kein weiterer KI-Prompt ist erforderlich. Für einen festgestellten Codefehler kann der Umsetzungsauftrag erneut verwendet werden. Bei geändertem Verhalten erst Spec und betroffene Prüffälle vereinbaren, dann den Plan anpassen.

Bei einem neuen Chat Regeln, Projektkarte, aktuelle Vereinbarung, Plan und betroffene Dateien erneut mitgeben. Der Chat hat keinen automatischen Zugriff auf die lokale Umgebung.

## Optionales TDD

TDD nur verwenden, wenn die Projektkarte es vorsieht und eine geeignete Funktion samt Prüfverfahren bereitsteht. Es ist in beiden Zeitformaten optional. Der Umsetzungsauftrag enthält dafür einen getrennten Ablauf. Praktische Vorbereitung und Testbegriffe stehen unter [Testen und TDD](../vertiefung/testen-und-tdd.md).

[^kontext]: DeepSeek, [Multi-round Conversation](https://api-docs.deepseek.com/guides/multi_round_chat/), technische Primärquelle, geprüft am 04.10.2026. Beschreibt die zustandslose Chat-Completions-API und die clientseitige Übergabe des Verlaufs; keine Aussage über die tatsächliche Implementierung des Schulfrontends.
