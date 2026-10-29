# Kapitel 2: Entscheidungen

Stand: 14. Oktober 2026. Vom Nutzer beauftragter nächster Inhaltsschritt: zwölf Referenzaufgaben in vier Familien, je eine Vorlage auf drei manuell wählbaren Stufen. Kapitel 1 bleibt direkt auswählbar. Die App beginnt jetzt bei Kapitel 2, Bedingungen und Grenzwerte.

Nachfolgender verbindlicher Ausbau: [Kontrollierte Aufgabengenerierung](16-kontrollierte-aufgabengenerierung.md) ersetzt den engen Laufzeitvertrag für Verzweigungen durch sechs Fragestellungen je Stufe und unabhängig geprüfte Modellentwürfe. Die zwölf hier beschriebenen Referenzen bleiben erhalten. Die folgenden Angaben zum reinen Vorlagenvertrag und zum damaligen 45-Dateien-Paket dokumentieren den vorangegangenen Ausbaustand.

## Lernziele und Referenzen

| Familie | Einfach | Mittel | Anspruchsvoll |
|---|---|---|---|
| Bedingungen und Grenzwerte | Levelziel: 5 >= 5 ist wahr, Punkte bleiben 5 | Null Grad: > 0 falsch, >= 0 wahr | 3 Punkte + 2 Bonus erreicht 5; gespeichert bleiben 3 |
| Verzweigungen | 5 Stück, Bestellung 3: Versand, Bestand 2 | -1 Grad: Heizen, danach 1 Grad | 7 Stempel: 0 Gutscheine und 9 Stempel, keine erneute Prüfung |
| Einzelne Entscheidungen und Ketten | Preis 20, zwei if: Rabatt 3, Endpreis 17 | Preis 20, Kette: Rabatt 2, Endpreis 18 | Gleicher Preis: A Rabatt 3, B Rabatt 2 |
| Kleine Codeänderungen | Genau 5 Punkte: >= erlaubt Weiter, > ergibt Warten | Bestellung gleich Bestand 4: <= ergibt Bestand 0, < lässt 4 | Gold zuerst ergibt Gold, Silber zuerst ergibt Silber |

Die zwölf unabhängigen Referenzfälle stehen in den examples.json-Dateien der vier neuen Skills. Je Familie gibt es eine Erklärung mit Voraussetzungen, neuen Sprachmitteln, Beispielen und Ablaufhinweisen. Ein neues Sprachmittel wird auf Familienebene erklärt; eine höhere Stufe kombiniert die bereits eingeführten Konzepte.

Voraussetzungen sind die Variablen, Zuweisungen, Addition und Ausgabe aus Kapitel 1. Neu sind Vergleiche mit >, >=, < und <=, Wahrheitswerte, negative Temperaturen, Subtraktion, Textausgaben, if/else und if/elif beziehungsweise else if. Programm A und B starten getrennt. Keine Schleifen, Funktionen, Arrays, freie Texteingaben oder kombinierte boolesche Operatoren in diesem Schritt.

## Laufzeit und Modellvertrag

chapter-two.js enthält einen fest definierten Programmbestand. Ein kleiner Interpreter erzeugt Zustand und Lösung ausschließlich daraus. Python- und JavaScript-Code werden aus denselben Programmbäumen dargestellt. Die Browser-App führt weder Modellcode noch den dargestellten Programmtext aus.

Parametergrenzen sind vorlagenbezogen und vollständig geprüft: insgesamt 155 Zahlenkombinationen für Kapitel 2. Zusammen mit Kapitel 1 stehen 29 Vorlagen und 1.128 Zahlenkombinationen bereit. Antwortformen sind zwei Lücken mit eigenen Wahrheits-, Text- oder Zahlenalternativen sowie vier Antwortpaare mit genau einer richtigen Alternative. Alle Alternativen einer Gruppe haben gleiche Wortanzahl. Wahrheitswerte erscheinen in den Antworten als wahr/falsch, im Code sprachüblich als True/False oder true/false.

Das Modell wählt weiterhin in zwei Schritten: zugelassener Skill des gewählten Kapitels/Lernziels/Schwierigkeitsgrads, anschließend Vorlage, Zahlen und erlaubte Antwortform. In Kapitel 2 bleiben Kontextnamen fest; das einzige Namenprofil ist standard. Keine frei erfundenen Geschichten oder Lösungsschlüssel. Ungültige Auswahl führt zu einer sichtbar gekennzeichneten geprüften Ersatzaufgabe innerhalb derselben Auswahl. Modellstatus und Tokenzähler erfassen beide Anfragen wie bisher.

## Bedienung und Feedback

Kapitel und Thema sind frei auswählbar, ohne vorgeschaltete Pflichtlektionen. Änderungen an Kapitel, Thema, Schwierigkeit oder Sprache ersetzen die aktuelle Aufgabe erst mit „Auswahl bestätigen“, dann sofort. Eine verworfene ungeprüfte Aufgabe zählt nicht als Abgabe. Erklärung und Kapitelanzeige gehören bis zur Bestätigung zur aktuellen Aufgabe.

Nach Abgabe zeigen Markierungen im Code ausgeführte und übersprungene Zeilen. Die aufklappbare Ablaufansicht enthält Bedingungsergebnisse, Zustände und Ausgaben. Nicht erreichte Prüfungen erhalten keinen erfundenen Wahrheitswert. Kommentare und abschließende JavaScript-Klammern sind Strukturzeilen. Auf einer kombinierten Zeile „} else if …“ bezieht sich die Ablaufmarkierung auf die Prüfung, nicht auf die schließende Klammer.

Die Übersicht und Sitzungsdateien enthalten das Kapitel. Frühere Exporte im Format Version 2 ohne Kapitel bleiben lesbar. Mehrzeilige Vergleichsprogramme werden vollständig gespeichert; erlaubte Codelänge wurde auf 60 Zeilen erhöht. Kurze Aufgaben passen bei 1.366 × 768 Pixeln mit ihren Antworten in die Ansicht. Lange Erklärungen, Programmvergleiche und ausgeklappte Abläufe können innerhalb ihrer Bereiche Scrollen benötigen; auf kleinen Bildschirmen ist Seiten-Scrollen vorgesehen.

## Prüfung

- npm test: 34 Tests erfolgreich. Kapitel 1, Modelltransport und Tokenüberwachung weiterhin geprüft.
- Zwölf kuratierte Referenzen stimmen in beiden Sprachen mit Lösung, Ausgaben und Endzuständen überein.
- Alle 155 generierten JavaScript-Programme unabhängig in Node ausgeführt: Ausgaben, Endzustände, besuchte/übersprungene Zeilen und tatsächliche Bedingungen stimmen mit den Abläufen überein.
- Alle 155 Python-Programme tatsächlich mit Python ausgeführt: Ausgaben und Endzustände stimmen. Wiederholbar mit node scripts/check-chapter-two-python.mjs; benötigt nur für die Entwicklung Python.
- Alle Antwortpaarvarianten in beiden Sprachen geprüft; falsche Alternativen erhalten passende Hinweise.
- Modelltests prüfen alle vier Lernziele auf drei Stufen, Kataloggrenzen, kapitelübergreifend ungültige Auswahl, Ersatzaufgaben und idempotente Abgaben.
- Browserprüfung auf isolierter lokaler Origin mit simuliertem Modell: Bestätigung, Kapitelwechsel, Python/JavaScript, Lücken/Antwortpaare, falscher und korrigierter Versuch, übersprungene Zeilen, Lernübersicht, permanenter Verbindungsstatus und Tokenzuwachs.

Zusätzlich geprüft: 375 Pixel breite Mobilansicht ohne horizontalen Seitenüberlauf, erhaltene Abgaben nach Neuladen und das Paket im Unterordner. Alle 45 ZIP-Einträge stimmen per SHA-256 mit Quelle und dist überein.

Browsernachweis (Demo; Tokenwerte aus isolierten Testanfragen): [Kapitel 2](assets/kapitel-2-browser.jpg).

Die simulierten Modellaufrufe ersetzen keinen erneuten Pilot mit dem tatsächlich gewählten LM-Studio-/DeepInfra-Modell. Das statische Paket wird wie bisher erzeugt; es enthält 45 freigegebene Dateien ohne Testserver, Node-Abhängigkeiten oder Zugangsdaten.

Als nächster inhaltlicher Schritt bieten sich nach der praktischen Erprobung Schleifen an. Diese Erweiterung ist noch nicht umgesetzt.
