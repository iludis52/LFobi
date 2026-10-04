---
titel: KI-Prompts – direkt verwenden
datum: 2026-10-04
version: 3.1
---

# Drei Arbeitsaufträge und gemeinsame Grundregeln

Die Lehrkraft verwendet die Projektkarte aus dem [Lehrerleitfaden](../lehrerleitfaden.md). Das Frontend kann Regeln und Karte im Hintergrund mitgeben. Andernfalls werden sie am Anfang des Chats eingefügt. Die Schüler brauchen keine eigene Anleitung zur Prompttechnik.

Die Steueranweisungen sind in Version 3.1 auf Englisch verdichtet. Die KI antwortet ausdrücklich in der Muttersprache des Schülers, standardmäßig auf Deutsch. Gemeinsame Regeln stehen einmal in Auftrag 01; die Phasenaufträge setzen sie voraus. Insbesondere die Codegrenzen, eigene Erwartungen und das Warten auf reale Prüfergebnisse bleiben erhalten.

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

## Abschluss und Änderungen

Das gegenseitige User-Testing und die Freigabe stehen im Schüler-Arbeitsblatt. Kein weiterer KI-Prompt ist erforderlich. Für einen festgestellten Codefehler kann der Umsetzungsauftrag erneut verwendet werden. Bei geändertem Verhalten erst Spec und betroffene Prüffälle vereinbaren, dann den Plan anpassen.

Bei einem neuen Chat Regeln, Projektkarte, aktuelle Vereinbarung, Plan und betroffene Dateien erneut mitgeben. Der Chat hat keinen automatischen Zugriff auf die lokale Umgebung.

## Optionales TDD

TDD nur verwenden, wenn die Projektkarte es vorsieht und eine geeignete Funktion samt Prüfverfahren bereitsteht. Es ist in beiden Zeitformaten optional. Der Umsetzungsauftrag enthält dafür einen getrennten Ablauf. Praktische Vorbereitung und Testbegriffe stehen unter [Testen und TDD](../vertiefung/testen-und-tdd.md).
