# Code verstehen · Statische Web-App

**Fünf Kapitel mit 26 Aufgabenfamilien und 84 kuratierten Vorlagen für die User-Tests.** Kapitel 1 übt Zuweisungen und Zustände, Kapitel 2 Entscheidungen, Kapitel 3 Wiederholungen einschließlich break und continue. Kapitel 4 behandelt Sammlungen und Textverarbeitung, Kapitel 5 Funktionen, Gültigkeitsbereiche, Seiteneffekte, Komposition und Module.

## Lokal öffnen

`index.html` mit **VS Code Live Server** öffnen. Aufgabenaufbau, Auswertung und Speicherung laufen im Browser. Kein `npm start`, kein eigener Node-Server und kein separater API-Port sind erforderlich.

Beispiel im bisherigen VS-Code-Workspace: http://127.0.0.1:5500/CodeVerstehen/index.html

Ein direkter Dateiaufruf über `file://` wird nicht unterstützt, weil Markdown und JSON per HTTP geladen werden. Für die Nutzung wird nur ein gewöhnlicher statischer Webserver benötigt.

## Auf WordPress bereitstellen

Das fertige Paket liegt unter `release/code-verstehen.zip`. Entpacke den darin enthaltenen Ordner `code-verstehen` auf den vorhandenen Webserver, beispielsweise unter `https://deine-domain.de/code-verstehen/`. Lade den vollständigen Ordner samt `skills` und JavaScript-Modulen hoch.

Auf der WordPress-Seite kann die App in einem Block „Individuelles HTML“ eingebunden werden:

```html
<iframe
  src="https://deine-domain.de/code-verstehen/"
  title="Code verstehen – Lernlabor"
  width="100%"
  height="950">
</iframe>
```

Die URL durch den tatsächlichen Uploadpfad ersetzen. Die App sollte auf derselben Origin wie die WordPress-Seite liegen. Das Hosting muss Ordnerupload, Markdown-/JSON-Dateien, JavaScript-Module und die iframe-Einbettung erlauben. Falls der Editor iframes entfernt, benötigt die Einbettung entsprechende WordPress-Berechtigungen; ein direkter Link zur App bleibt möglich.

Keine WordPress-Plugins, PHP-App-Endpunkte oder Node-Prozesse erforderlich. Die eigene Gestaltung ist im iframe vom Theme getrennt. Höhenanpassung erfolgt zunächst über das iframe-Attribut; keine automatische Höhenkommunikation implementiert.

Paket nach Änderungen neu erzeugen, optional mit PowerShell:

```powershell
.\scripts\package-static.ps1
```

Das ZIP enthält ausschließlich freigegebene App-Dateien. Keine Tests, Server, Entwicklungsdateien oder Zugangsdaten.

## Lernablauf

- Sichtbare Kurzskizze und Erklärung neben den Aufgaben.
- Drei manuell wählbare Schwierigkeiten über den Button „1/3 → 2/3 → 3/3“. Kapitel, Thema, Schwierigkeit und Sprache zunächst auswählen, dann „Auswahl bestätigen“ anklicken: Die aktuelle Aufgabe wird sofort durch eine neue ersetzt. Eine nicht abgegebene Antwort wird dabei nicht gezählt.
- 26 wählbare Themen in fünf Kapiteln mit passender Einführung und Erklärung. Bis zur Bestätigung bleiben Aufgabe und Erklärung erhalten.
- Python und JavaScript, sechs Interaktionsformen, 84 kuratierte Vorlagen. Jede Kapitel-Thema-Stufen-Kombination bietet mindestens fünf Antwortformen: Lücken, Einzel- und Mehrfachauswahl, Diagramme und Ereignisse ordnen. Bei einfachen Zuweisungen kommt Codeauswahl hinzu. Gemischte Durchläufe verhindern direkte Typwiederholungen, auch bei Auswahlwechseln und Modellfehlern. Die Schwierigkeit bleibt an den Programmablauf gebunden.
- Einzeilige Kopfleiste „Lernlabor Python/JavaScript“ mit farblich getrennten Verbindungs- und Auswahlbereichen. Bei Platzmangel scrollt nur diese Leiste horizontal. Die Lernübersicht liegt links bei den Lerninhalten. Auf großen Bildschirmen stehen Code und Antwort beziehungsweise Rückmeldung nebeneinander. Lange Erklärungen, umfangreiche Aufgaben und aufgeklappte Details bleiben innerhalb ihres Bereichs scrollbar; kleine Bildschirme verwenden weiterhin Seitenscrollen.
- Eine akzeptierte Abgabe zählt einmal als richtig oder falsch. Wiederholung zählt erneut und wird gekennzeichnet.
- Auswertung gegen kuratierte Lösung, Hinweise und Ablaufvergleich.
- Lokale Lernübersicht, Sitzungsexport und Import Version 2 mit Duplikaterkennung.

**Neu für „Verzweigungen mit if und else“:** Auf jeder Stufe wechseln sechs fachliche Fragestellungen: Ausgabe, Endzustand, Bedingung, ausgeführte Zeilen, passende Zahlenänderung und Programmvergleich. Das Modell darf Situationen, Namen und Programme innerhalb der eingeführten Sprachmittel entwerfen. Die App prüft beide Zweige, berechnet Antworten selbst und verwirft zu ähnliche Strukturen. Höchstens ein Korrekturversuch, danach geprüfter Ersatz. Beide Anfragen sind im Tokenprotokoll erkennbar. Nach Neuladen Kapitel 2 und dieses Thema auswählen, Auswahl bestätigen und mehrfach „Nächste Aufgabe“ nutzen.

Kapitel 2 enthält zwölf ursprüngliche Referenzaufgaben; Hinweise und Abläufe zeigen ausgeführte und übersprungene Zweige. Die aktive Verzweigungsfamilie verwendet inzwischen die Aufgabenwerkstatt. Die übrigen neuen Familien besitzen weiterhin zunächst eine Vorlage je Stufe mit Zahlen- und Antwortformvarianten. Deren fachliche Vielfalt, weitere Kapitel-1-Inhalte wie Zahl und Text sowie ein gemischter Themenmodus bleiben Ausbauarbeit.

## Skills und lokale Laufzeit

`skills/catalog.json` registriert freigegebene Familien. `runtime.js` lädt Frontmatter, Skill-Hauptteil, Erklärung und Vorlagen relativ zum Modulpfad. Alle 1.351 erlaubten Zahlenvarianten (973 / 155 / 93 / 70 / 60 in Kapitel 1–5) werden beim Laden für Python und JavaScript geprüft. Die Kapitelmodule sowie `advanced-lessons.js` und `learning-program.js` berechnen Aufgaben, Zustände und Lösungen aus kuratierten Strukturen. Die Verzweigungswerkstatt erlaubt zusätzlich geprüfte Programmbäume. Kein vom Modell gelieferter Quelltext wird ausgeführt.

Der Skill-Loader unterstützt einen begrenzten YAML-Teilumfang: einfache skalare Werte, JSON-Strings, Zahlen und JSON-kompatible Arrays. Keine YAML-Anker oder verschachtelten Frontmatter-Objekte. Entwürfe werden nicht zugelassen. Registriert sind vier Grundlagen-, vier Entscheidungs-, sechs Wiederholungs-, sechs Sammlungs- und sechs Funktionsfamilien. Die älteren generischen Skill-Entwürfe bleiben Planungsmaterial.

## Modellanbindung

Die Kopfzeile zeigt dauerhaft den Modellstatus (Demo, ungeprüft, laufende Anfrage, verbunden, zuletzt verbunden oder Fehler) sowie Anbieter und Modell. „Verbunden“ wird nur nach einer erfolgreichen Antwort angezeigt; deren Zeitpunkt bleibt sichtbar. Nach fünf Minuten ohne neue Antwort wird der Status als früher bestätigt markiert. Es gibt keine automatischen Modellaufrufe zur laufenden Statusprüfung.

Daneben stehen die gemeldeten Tokens insgesamt und getrennt nach Eingabe/Ausgabe. Ein Klick öffnet die Aufschlüsselung nach Modell und Anfrage, einschließlich Laufzeit, Verbindungstests, Fehlern und JSON-Export. Die Summe bleibt lokal über Neuladen erhalten und zählt mehrere Tabs desselben Origins zusammen. Fehlen Anbieterwerte, erscheinen „unbekannt“ oder `+ ?`; das ist kein kostenloser Modellaufruf. Cache- und Reasoning-Tokens werden nicht doppelt gezählt. Frühere Anfragen vor Einführung des Zählers sind nicht enthalten. Verbrauchsprotokolle enthalten keine Prompts, Antworttexte oder Keys. Details stehen in [Spezifikation 14](specs/14-modellstatus-und-tokenverbrauch.md).

**Demo:** vollständiger Lernablauf ohne Modell. Die App wählt abwechselnd geprüfte Vorlagen.

**LM Studio:** Der Browser spricht `http://127.0.0.1:1234/v1` auf dem Rechner des Lernenden direkt an. Genaue Modell-ID eintragen, „Enable CORS“ in LM Studio aktivieren und Verbindung testen. Der Browser kann nach Erlaubnis für lokale Dienste fragen. HTTPS-Hosting und iframe müssen im vorgesehenen Browser praktisch geprüft werden; CORS und Berechtigungsfehler werden verständlich angezeigt. LM Studio selbst bleibt Kursgrundlage.

**DeepInfra:** Direkter HTTPS-Aufruf an den festen Anbieterendpunkt mit persönlichem API-Key. Der Key bleibt nur im Tab-Speicher und wird im Authorization-Header übertragen. Keine zentralen Kurs-Keys im ausgelieferten JavaScript. Die voreingestellte Modell-ID stammt aus dem Prototyp und kann geändert werden. Tatsächliche CORS-Unterstützung und Modellverfügbarkeit sind im Pilot zu prüfen; die App setzt sie nicht voraus.

Für Verzweigungen wird direkt ein strukturierter Aufgabenentwurf angefragt, bei höchstens 1.800 Ausgabetokens und einem zusätzlichen Korrekturversuch. Struktur, Typen, eingeführte Konstrukte, Beobachtung und Lösung werden unabhängig geprüft; freier Quelltext ist ausgeschlossen. Das Modell erhält Merkmale zuletzt erzeugter Aufgaben und eine kompakte Zusammenfassung geprüfter Antwortbefunde für die adaptive Variation; keine rohen früheren Antworten. Für alle übrigen Themen gilt weiterhin: Bei genau einem zulässigen Skill wählt die App diesen lokal; das Modell wählt und parametrisiert eine freigegebene Vorlage über einen kompakten englischen Laufzeitvertrag. Nur bei mehreren zulässigen Skills wird deren Auswahl angefragt. In Kapitel 2 wählt es Zahlen und Antwortformen bei festen Kontextnamen. In Kapitel 1 kann es zusätzlich Variablennamenprofile (standard, punkte, vorrat, nummer) und für die neuen Familien Lücken oder Antwortpaare wählen. Die App liefert Parametergrenzen und erlaubte Variationen; `task-variation.js` setzt sie konsistent um und prüft die Wortzahl. Demo und geprüfter Ersatz nutzen denselben Variationsrahmen. Die letzte Vorlage wird ausgeschlossen, wenn innerhalb der Familie und Stufe Alternativen verfügbar sind. Unveränderte direkte Zahlenwiederholungen derselben Vorlage werden verhindert. Die vorherige Aufgabenvariante und der aus den letzten drei Aufgaben abgeleitete Übungsauftrag werden übermittelt; die einzelnen früheren Befunde und Antworttexte bleiben lokal. Keine freie Erzeugung von Code, Lösungen oder Antwortformulierungen. Bei fehlender Verbindung oder ungültiger Auswahl folgt sichtbar eine geprüfte Ersatzaufgabe desselben Lernziels und derselben Schwierigkeit; kein automatischer Wechsel des Anbieters.

## Daten und Grenzen

- Abgaben liegen unter `code-verstehen-v2` im localStorage der App-Origin. Der alte Speicher `code-verstehen-v1` wird nicht verändert.
- Neuladen beginnt eine neue Sitzung; frühere Abgaben bleiben in der Übersicht sichtbar. Export umfasst die aktuelle Sitzung, Import erwartet Version 2.
- Modellkonfiguration und Keys bleiben nur im Speicher des Tabs.
- Die aktuelle Aufgabeninstanz liegt im Tab-Speicher. Neuladen benötigt eine neue Aufgabe; gespeicherte Abgaben bleiben erhalten.
- Gleichbleibende Abgabe-IDs werden nur einmal ausgewertet und gespeichert. Bewusste Wiederholung verwendet eine neue ID.
- Lösungen sind technisch im Browser zugänglich, werden aber erst nach Abgabe in der Ansicht gezeigt. Die App ist ein Lernwerkzeug, kein manipulationssicheres Prüfungssystem.
- Browser können Speicherung in eingebetteten Ansichten einschränken. Dann bleibt Export möglich; Einbettung möglichst auf derselben Origin verwenden.

## Entwicklungsprüfung

Optional mit Node.js 22 oder neuer:

```powershell
npm test
```

Node ist ausschließlich ein Werkzeug für Entwicklungsprüfungen, keine Produktvoraussetzung. 66 Tests decken Referenzsemantik, Varianten, Wortzahl, Antwortformen, browserseitige Abgaben, Duplikate, Modellstatus, Tokenzählung und den Modellvertrag mit Mocks ab. Die zusätzlichen 43 Referenzen und alle 146 neuen Zahlenkombinationen werden für beide Sprachen und fünf Formen geprüft. `node scripts/check-advanced-programs.mjs` führt sämtliche neuen Programme unabhängig als echte JavaScript-ES-Module und Python-Programme aus, einschließlich der mitgelieferten Imports. Für die ursprünglichen 77 Schleifenvarianten wird weiterhin jeder einzelne Zeilenbesuch kontrolliert. Echte Modellverbindungen des erweiterten Bestands und das Ziel-WordPress-Hosting bleiben praktisch zu prüfen.

Der bisherige Node-Server ist als historische Quelle unter `archive/node-prototype/server.js` erhalten und wird weder gestartet noch ausgeliefert.

Die konsolidierte Spezifikation steht in `SPEC.md`.

Kapitel-2-Verträge, Referenzen und Prüfung: [Entscheidungen](specs/15-kapitel-2-entscheidungen.md). Ergänzende tatsächliche Python-Prüfung: `node scripts/check-chapter-two-python.mjs`.

Der implementierte Pilot und seine Kontrollgrenzen: [Kontrollierte Aufgabengenerierung](specs/16-kontrollierte-aufgabengenerierung.md). 432 Werkstattvarianten werden unabhängig in beiden Sprachen ausgeführt; einschließlich bisheriger Kapitel-2-Referenzen umfasst die Python-Prüfung 587 Fälle. Das statische ZIP enthält ausschließlich freigegebene App-Dateien.

Kapitel 3: [Wiederholungen](specs/18-kapitel-3-wiederholungen.md). Ergänzende Python-Ausführung aller 77 Varianten mit zeilenweiser Ablaufprüfung: `node scripts/check-chapter-three-python.mjs`. Browserprüfung mit 120 Abgaben, Ablaufansicht, Export/Import und Mobilansicht: `node tests/preview-chapter-three.mjs`.

Kapitel 4/5 und break/continue: [Umfang und Abnahme](specs/19-kapitel-4-5-und-schleifenkontrolle.md). `node tests/preview-advanced.mjs` prüft 420 Browserabgaben, alle neuen Themen/Stufen/Formen, Funktionsbereiche, lesbare Sammlungswerte, Export/Import, Speicherung und Mobilansicht. Die kleinen Lehrmodule `lesson-tools.js` und `lernbausteine.py` liegen dem statischen Paket bei; deren vollständiger Inhalt wird in der Lektion erklärt.

## Adaptive Varianten und Kurz erklärt

Die letzten drei abgegebenen Aufgaben je Thema und Sprache bleiben im Tab-Gedächtnis. Fehler führen zu einer neuen Variante desselben fachlichen Zusammenhangs auf der manuell gewählten Stufe. Passende kuratierte Beobachtungen werden gezielt geübt; Antwortformen wechseln weiterhin. Drei richtige Erstaufgaben in unterschiedlichen Antwortformen können eine höhere Stufe empfehlen. Wiederholungen nach Lösung zählen nicht als eigenständige Erfolgsnachweise. Neuladen oder „Übungsgedächtnis zurücksetzen“ leert das Gedächtnis. Importierte Abgaben fließen nicht ein.

Unter dem Programm erscheint nach jeder Abgabe sofort eine kurze geprüfte Rückmeldung in Grün. Bei aktivem Modell lädt eine als KI gekennzeichnete Erklärung nach (höchstens zwei Sätze/55 Wörter, zusätzlicher Aufruf und Tokenverbrauch je Abgabe). Das Modell erhält dafür aktuelle Antwortbefunde und die geprüfte Referenz; es bewertet nicht. Bei Fehler oder im Demo-Modus bleibt die lokale Rückmeldung sichtbar. Details und Grenzen: [Zusatz 20](specs/20-adaptive-aufgaben-und-kurzerklaerung.md).

Entwicklungsprüfung der Adaptivität: `node tests/preview-adaptive.mjs` prüft die sofortige lokale Erklärung, verspätete Modellantworten, Tokenprotokoll, Rücksetzen sowie Desktop und Mobilansicht mit einem Modell-Mock. `node tests/preview-compact.mjs` prüft zusätzlich die kompakte Oberfläche und den Aufgabenwechsel.

Aufgabentexte verwenden einfache Zeilenbezüge. Ausführungsnummern und Funktionskontexte erscheinen nur bei Bedarf; interne Namen wie `main` oder `name#1` entfallen. Die Regel steht in allen registrierten Aufgaben-Skills und wird zentral von der App umgesetzt. Siehe [Verständliche Ablaufangaben](specs/21-verstaendliche-ablaufangaben.md). Browserprüfung: `node tests/preview-task-wording.mjs`.


## Sparsame Modellanfragen

Die vollständigen deutschen Skills bleiben als didaktische Referenz erhalten. Übertragen werden kompakte englische Verträge aus `model-prompts.js`; sichtbare Aufgaben und Erklärungen bleiben deutsch. Eindeutige Skills werden lokal gewählt. Zur Kurzerklärung gehen nur ein konkreter Fehler beziehungsweise ein richtiger Beobachtungsbeleg, Code und die geprüfte Erklärung an das Modell.

Im reproduzierbaren Offline-Vergleich mit fünf Aufgaben sinkt die Anfragezahl von 15 auf 10 und der Eingabetext von 24.681 auf 8.911 Zeichen (63,9 % weniger). Das ist keine Tokenmessung; tatsächliche Tokens sind mit den Anbieterwerten im Modellprotokoll zu vergleichen. Details: [Kompakte Modellverträge](specs/22-kompakte-modellvertraege.md). Messskript: `node scripts/audit-model-prompts.mjs`.
