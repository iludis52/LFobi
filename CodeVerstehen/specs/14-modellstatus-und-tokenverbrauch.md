# Permanenter Modellstatus und Tokenverbrauch

Datum: 14. Oktober 2026. Grundlage: Nutzerauftrag zur sichtbaren Verbindung und zum Tokenverbrauch für Kostenkontrolle und Debugging.

## Sichtbarer Status

In der Kopfzeile bleiben Anbieter, Modell und Verbindungsstatus sichtbar. Auf schmalen Ansichten bleibt die Kopfzeile beim Scrollen angeheftet. Der Status unterscheidet Demo ohne LLM, ungeprüfte Konfiguration, laufende Anfrage (mit Zweck), verbunden mit Zeitpunkt, zuletzt verbunden, Fehler und offline.

„Verbunden“ bedeutet eine erfolgreiche Modellantwort, keine dauerhafte Socket-Verbindung. Nach fünf Minuten ohne neue Antwort wird „Zuletzt verbunden“ angezeigt. Der lokale Timer aktualisiert lediglich die Darstellung; es gibt keine automatischen Modellanfragen zur Statusprüfung. Geänderte Anbieter, Endpunkte, Modellnamen oder Keys übernehmen nicht ungeprüft den Status anderer Zugangsdaten. Ein erfolgreich getesteter Auswahlentwurf wird beim Übernehmen als bestätigt angezeigt.

Eine erreichbare Modellverbindung kann eine fachlich ungültige Aufgabenauswahl liefern. Dann bleibt die Verbindung bestätigt, während die Aufgabenquelle ausdrücklich „Geprüfte Ersatzaufgabe“ zeigt. Verbindungs- und Aufgabenqualität bleiben unterscheidbar.

## Tokenzählung

Der Transport liest die Anbieterwerte `usage.prompt_tokens`, `usage.completion_tokens` und `usage.total_tokens`. Dieses Format ist in einem [LM-Studio-Beispiel](https://lmstudio.ai/docs/developer/openai-compat/tools) und in der [DeepInfra-API-Dokumentation](https://deepinfra.com/meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo/api?example=openai-http) belegt.

Erfasst werden Eingabe, Ausgabe, Gesamtsumme und Anfragezahl. Fehlt nur die Gesamtsumme, ist die Summe der gemeldeten Eingabe und Ausgabe deren exakter Gesamtwert. Optional gemeldete Cache- und Reasoning-Tokens werden als Teilmengen angezeigt und nicht erneut addiert. Negative, nicht ganzzahlige, unvollständige oder widersprüchliche Verbrauchswerte werden nicht als verlässliche Tokenzahlen übernommen.

Gezählt werden alle tatsächlich begonnenen Modellanfragen der App: Verbindungstests, Skill-Auswahl und Aufgabenvariation. Die Antwort muss keine gültige Aufgabe ergeben, damit ihr Verbrauch zählt. Verbrauchsdaten werden vor Text- und Aufgabenvalidierung erfasst. Eine wegen ungültiger Konfiguration gar nicht gesendete Anfrage erhöht den Anfragezähler nicht.

Fehlen Verbrauchswerte, bleibt die Anfrage offen beziehungsweise unbekannt. Die Kopfzeile zeigt bei teilweise bekannten Summen `+ ?`; fehlen sämtliche Werte, zeigt sie „unbekannt“. Eine abgebrochene Anfrage kann beim Anbieter dennoch Tokens verbraucht haben. Dafür wird weder kostenloser Verbrauch angenommen noch eine Schätzung als gemessener Wert ausgegeben.

## Speicherung und Debugging

`model-monitor.js` sammelt die Daten je Anbieter und angefragtem Modell. Pro Tab-Sitzung wird ein eigener Speicherbereich unter `code-verstehen-model-usage-v1:<Sitzungs-ID>` verwendet. Verschiedene Tabs schreiben dadurch nicht über dieselbe Summe. Die Anzeige summiert die gespeicherten Bereiche desselben Browser-Origins und ergänzt den aktuellen Tab genau einmal.

Gesamtsummen bleiben bei Neuladen erhalten. Der neue Tab beginnt eine neue Sitzung mit eigenem Zähler bei null. Die Modellkonfiguration und Keys bleiben wie bisher nur im Arbeitsspeicher; nach Neuladen wird deshalb keine alte Verbindung ungeprüft als aktiv dargestellt.

Ein Klick auf die Tokenanzeige öffnet die aktuelle Tab-Summe und gespeicherte Gesamtsumme, die Aufschlüsselung je Anbieter und Modell sowie die letzten Anfragen mit Zweck, Zeitpunkt, Dauer, Ergebnis und Tokenzahlen beziehungsweise unbekanntem Verbrauch. Die Verbrauchsdaten können als JSON exportiert werden.

Es werden höchstens 50 detaillierte Anfrageeinträge pro Tab gespeichert und die letzten 100 über alle gespeicherten Tabs angezeigt. Die kumulativen Summen werden dadurch nicht gekürzt. Prompts, Modellantworttexte und API-Keys werden weder im Verbrauchsprotokoll noch in dessen Export gespeichert. Nicht verfügbare Speicherung und unlesbare Verbrauchseinträge werden kenntlich gemacht.

Die Zählung beginnt mit diesem Ausbau. Frühere Modellaufrufe ohne aufgezeichnete Verbrauchsdaten werden nicht rekonstruiert. Erfasst wird diese App in diesem Browser, nicht der gesamte Anbieteraccount; unterschiedliche Browser und Origins haben getrennte lokale Summen. Es wird kein Geldbetrag aus pauschalen Modellpreisen errechnet.

## Prüfung

30 automatisierte Tests bestanden, darunter sieben neue Prüfungen für Verbrauchsnormalisierung, Transportereignisse, Statuswechsel und Veralterung, fehlende Daten, Verbindungstests, ungültige Antworten, mehrere Tabs, Erhalt bei Neuladen und Speicherausfälle. Vorhandene Aufgaben und Modellverträge bleiben geprüft.

Browserprüfung mit isoliertem lokalem Testserver auf eigener Origin, ohne echte Modellkosten oder Einfluss auf den bisherigen Verbrauchsspeicher:

- Status ungeprüft → Anfrage läuft → verbunden mit Zeitpunkt.
- Zwei Modellaufrufe: 100 + 500 Eingabetokens, 20 + 50 Ausgabetokens, insgesamt 670.
- Zusätzlicher Verbindungstest mit 12 Eingabe- und einem Ausgabetoken: insgesamt 683; drei Anfragen.
- Fehlende usage-Werte erhöhen den offenen Anteil statt die bekannte Summe.
- HTTP-Fehler erzeugt sichtbaren Fehlerstatus und geprüfte Ersatzaufgabe.
- Nach Neuladen bleibt die Gesamtsumme erhalten; der neue Tab-Zähler startet bei null.
- In 1366 × 768 und 390 × 844 Pixeln sichtbar; beim mobilen Scrollen bleiben Status und Tokenanzeige am oberen Rand. Kein horizontales Überlaufen beobachtet.

Die [Statusvorschau](../modellstatus-vorschau.jpg) und [Verbrauchsvorschau](../tokenverbrauch-vorschau.jpg) zeigen ausschließlich simulierte Testwerte. Die technischen Prüfungen ersetzen keinen erneuten Pilot mit den tatsächlich verwendeten Modellen.

Das statische Paket enthält 28 freigegebene Dateien einschließlich `model-monitor.js`. Der Testserver wird nicht ausgeliefert. Weitere Lektionen mit mehr Anwendungskontext sind der anschließende Ausbau; dieser Schritt verändert den Aufgabenbestand nicht.
