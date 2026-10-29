# Adaptive Aufgaben und kurze Rückmeldungen

Aktualisierung: [Zusatz 22](22-kompakte-modellvertraege.md) verdichtet die Modellübermittlung auf den aktuellen Übungsauftrag und einen Befund für die Kurzerklärung. Die ausführlichen Befunde und UI-Begründungen bleiben lokal.

Stand: 16. Oktober 2026. Vom Nutzer beauftragter Ausbau. Dieser Zusatz ersetzt die bisherigen Ausschlüsse aufgabenübergreifender Antwortbefunde in SPEC.md und Spezifikation 04.

## Festgelegter Rahmen

Thema, Kapitel, Sprache und Schwierigkeit bleiben manuell gewählt. Die App passt innerhalb dieser Auswahl an und empfiehlt höchstens eine höhere Stufe. Sie ändert keine Stufe automatisch. Kein Backend erforderlich.

Das Gedächtnis enthält die letzten drei verschiedenen, abgegebenen Aufgaben je Sitzung, Kapitel, Lernziel und Sprache. Eine neue Stufe verwendet nur Befunde dieser Stufe innerhalb dieses Fensters. Unbeantwortete Aufgaben und importierte oder ältere Abgaben fließen nicht ein. Das Gedächtnis liegt ausschließlich im Arbeitsspeicher; Neuladen oder „Übungsgedächtnis zurücksetzen“ leert es. Die dauerhafte Lernübersicht und deren Zähler bleiben bestehen.

Die Erstabgabe bleibt maßgeblich. Wiederholungen markieren denselben Eintrag als unterstützt und erzeugen keinen zusätzlichen Platz im Fenster. Gleiche Abgabe-IDs werden nur einmal verarbeitet. Gespeichert werden kompakte Merkmale (Stufe, Aufgabenart, Modus, Antwortform und prüfbare Teilbefunde), keine Antworttexte im Gedächtnis.

## Regeln für die nächste Aufgabe

| Beobachtung | Folgeverhalten |
| --- | --- |
| Keine Befunde oder richtige letzte Erstabgabe | Neue Zahlen und abwechslungsreiche Darstellung innerhalb der Auswahl |
| Falsche letzte Erstabgabe | Gleichen fachlichen Modus beziehungsweise dieselbe Werkstatt-Fragestellung mit veränderten Zahlen erneut prüfen |
| Identifizierbare falsche Lücken | In neuen Varianten mit denselben kuratierten Beobachtungs-IDs diese Beobachtungen gezielt auswählen |
| Zwei entsprechende falsche Erstabgaben | Wiederholten Übungsschwerpunkt sichtbar erläutern; keine Beherrschungsdiagnose |
| Drei richtige Erstabgaben ohne Wiederholung in mindestens zwei Antwortformen, Stufe < 3 | Unverbindliche Empfehlung für die nächste Stufe |

Der verbindliche Wechsel der Antwortformen und die vorhandenen Grenzen für Programmkomplexität bleiben bestehen. Zahlenwechsel verhindern direkte unveränderte Wiederholungen. Vorlagen werden bei Fehlern auf den bisherigen fachlichen Modus begrenzt, sofern verfügbar; die Verzweigungswerkstatt erhält eine verbindliche Fragestellung. Demo und geprüfter Ersatz verwenden dieselben Regeln. Wenn Teilbefunde nicht auf Beobachtungen einer neuen Variante abbildbar sind, bleibt die Anpassung auf Ebene des Aufgabenmodus. Fehlerursachen werden nicht aus beliebigen Options-IDs erraten.

Dies ist eine erste, begrenzte Adaptionsregel. Die meisten Themen besitzen pro Stufe weiterhin nur eine Programmvorlage. Zusätzliche strukturelle Fördervarianten und semantische Fehlvorstellungs-Tags benötigen spätere Kuration. Richtige Antworten in drei Aufgaben sind kein Nachweis allgemeiner Beherrschung.

## Kurzerklärung nach jeder Abgabe

Direkt nach lokaler Prüfung erscheint unterhalb des Programmquellcodes „Kurz erklärt“ in gut lesbarem dunklem Grün. Bei Fehlern beschreibt sie eine konkrete Abweichung, bei richtigen Antworten bestätigt sie den geprüften Zusammenhang. Vor Abgabe und während einer erneuten Bearbeitung bleibt sie verborgen. Richtig/falsch wird separat angezeigt.

Bei aktivem Modell wird pro neuer Abgabe höchstens ein zusätzlicher Aufruf mit Zweck `answer-explanation` und maximal 220 Ausgabetokens ausgeführt. Er erhält nur die aktuelle Aufgabe, die überprüften Teilbefunde mit Antwort und Referenz sowie die kuratierte Erklärung. Keine ältere Antwortgeschichte, kein Modellurteil über die Bewertung. Die Aufgabengenerierung erhält dagegen nur die kompakte aktuelle Adaptionszusammenfassung ohne ursprüngliche Antworttexte.

Die Modellantwort besteht aus JSON mit ausschließlich `explanation`: höchstens zwei Sätze, 55 Wörter und 600 Zeichen, keine Zeilenumbrüche oder HTML. Sie wird als Text gerendert und als „KI-Kurzerklärung“ gekennzeichnet. Diese Formatprüfung garantiert keine fachliche Fehlerfreiheit des Modells; die geprüfte ausführliche Erklärung und Lösung bleiben separat zugänglich.

Die deterministische Kurzrückmeldung ist sofort sichtbar und bleibt bei Demo, Netzwerkfehler oder ungültiger Modellantwort erhalten. Während des Modellaufrufs bleiben Navigation und Wiederholung möglich. Eine verspätete Antwort ersetzt niemals die Rückmeldung einer anderen Aufgabe oder Abgabe. Doppelte Anfragen derselben Abgabe verwenden dieselbe laufende beziehungsweise abgeschlossene Anfrage. Keine automatischen Korrekturaufrufe. Tokens werden im bestehenden Protokoll gezählt. Kurzerklärungen werden nicht dauerhaft gespeichert oder exportiert.

## Umsetzung und Abnahme

- `adaptive-learning.js`: begrenztes Gedächtnis, Regeln, Teilbefunde und lokale/LLM-Kurzerklärung.
- `runtime.js`: Beobachtung nach idempotenter Auswertung, Auswahlrahmen und gecachte Erklärung je Abgabe.
- `branch-workshop.js` und `interaction-forms.js`: gezielte Fragestellung beziehungsweise kuratierte Beobachtungen bei weiter wechselnden Formen.
- `app.js`, `index.html`, `styles.css`: grüne Rückmeldung, asynchrones Nachladen, Adaptionshinweis und Rücksetzen.
- `model-monitor.js`: eigener Anfragezweck. Paketliste enthält das neue Laufzeitmodul.

Prüfung: drei Einträge, Erstversuche/Wiederholungen/Duplikate, getrennte Themen und Sprachen, Stufenfilter, Rücksetzen/Neustart, gezielte Aufgaben bei Demo und Modellfehler, Modellkontext ohne Rohhistorie, Teilbefunde aller sechs Formen, Formatfehler und ausfallendes Modell, parallele Erklärungsanfragen, verspätete Antworten sowie Desktop- und Mobilansicht.


## Prüfung am 16. Oktober 2026

62 automatisierte Tests erfolgreich. Der zusätzliche adaptive Durchlauf prüft alle 26 Themen auf drei Stufen in beiden Sprachen mit jeweils sieben aufeinanderfolgenden Aufgaben (1.092 Aufgaben und Abgaben). Die bestehenden Semantik- und Modellvertragstests bleiben erfolgreich.

`node tests/preview-adaptive.mjs`: erfolgreich mit lokalem Modell-Mock; sofortige geprüfte Erklärung, Navigation während laufender Erklärung, Schutz gegen verspätete Antworten, nachgeladene KI-Erklärung, Tokenprotokoll, Rücksetzen und Neuladen. Darstellung bei 1280 × 720 und 390 × 844 visuell kontrolliert; Screenshots unter `assets/adaptive-1280.png` und `assets/adaptive-390.png`.

`node tests/preview-compact.mjs`: erfolgreich; vier Fenstergrößen, zehn Abgaben und alle Themen/Stufen der Kapitel 1–3 in fünf Formen ohne Überlauf des Aufgabencontainers auf 1280 × 720. Auf großen Bildschirmen scrollen Code und Antwortbereich unabhängig.

Echte Modellerklärungen mit LM Studio/DeepInfra und deren fachliche Qualität sind noch im Nutzerpilot zu prüfen. Die Modellprüfungen verwenden Mocks und verursachen keine externen Modellkosten.
