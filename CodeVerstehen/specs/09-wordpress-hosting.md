# Hosting auf einem WordPress-Webserver

Status: Vereinbarte Architektur als statische App umgesetzt. Lernkern und Auswertung laufen im Browser. WordPress-Zieleinbettung und direkte Modelltransporte sind noch auf dem vorgesehenen Hosting beziehungsweise mit echten Modellen zu prüfen.
Datum: 12. Oktober 2026

## Verbindliche Betriebsanforderung

Die App läuft auf dem vorhandenen WordPress-Webserver. Weder auf dem Hosting noch auf den Rechnern der Lernenden muss ein eigener Node-/npm-Prozess für die App gestartet werden. Kein `npm start`, kein Hintergrunddienst und kein separater App-Port sind für die Benutzung erforderlich.

Node kann für Entwicklungsprüfungen verwendet werden, ist aber keine Laufzeitvoraussetzung des auszuliefernden Produkts. LM Studio bleibt als separat vereinbarter lokaler Modellanbieter möglich; dessen Modellserver ist kein Node-App-Server.

## Architektur des Lernkerns

HTML, CSS, JavaScript, Markdown-Skills und kuratierte JSON-Vorlagen werden über den vorhandenen Webserver ausgeliefert. Die Lernlogik benötigt keine Node-API:

- Skill-Metadaten und Hauptteile laden und den erlaubten Katalog bilden.
- Vorlagen auswählen beziehungsweise erlaubte Modellauswahl prüfen.
- Aufgaben parametrisieren, Wortanzahl kontrollieren und Referenzablauf berechnen.
- Strukturierte Antworten anhand der kuratierten Lösung auswerten.
- Abgabe-ID erzeugen, genau einmal speichern und Ergebniszähler aktualisieren.
- Lerndaten lokal halten und Sitzungen exportieren/importieren.

Diese Funktionen laufen als JavaScript im Browser. Bestehende `.js`-Tools werden browserkompatibel geladen. Serverseitige Sitzungs-Maps, Node-Dateizugriffe und Routen wie `/api/next` entfallen für den Lernkern.

Der Lösungsschlüssel liegt damit technisch im Browser. Er wird vor der Abgabe nicht in der Oberfläche gezeigt, ist aber kein geheim gehaltener Prüfungsinhalt. Die App dient dem Lernen; lokale Ergebnisse bleiben keine manipulationssicheren Prüfungsnachweise. Diese Grenze entspricht dem bisherigen Verzicht auf Benotung.

## Einbettung in WordPress

Vereinbart ist eine **statische Web-App im Unterordner**, die auf einer WordPress-Seite eingebunden wird. Eine isolierte iframe-Einbettung ist der vorgeschlagene konkrete Weg, um Konflikte mit Theme-Styles zu vermeiden. Ein eigenes WordPress-Plugin, eigene PHP-Endpunkte und zusätzliche App-Backendprozesse gehören nicht zum Zielumfang.

Das Hosting muss das Hochladen und Ausliefern dieses Ordners sowie die gewählte Einbettung erlauben. Die App-Dateien werden nicht als bloße Skriptfragmente in den WordPress-Editor kopiert.

Alle Ressourcenpfade funktionieren unter einem Unterordner. Keine fest verdrahteten Pfade vom Domain-Wurzelverzeichnis zu App-Dateien. Bei Einbettung bleibt die API-/Asset-Basis explizit konfigurierbar. Die Anwendung verwendet keine ungeprüften vom Modell vorgegebenen Ressourcenpfade.

## Modellzugriff getrennt vom Lernkern

### Demo

Der vollständige Übungsablauf funktioniert ohne Modell, Node-API oder PHP-Modellproxy. Auch VS Code Live Server kann nach der Migration diese statische Fassung ausliefern. Direkter Dateiaufruf per `file://` ist wegen des Ladens von Ressourcen keine zugesicherte Betriebsart.

### Lokales LM Studio

Der Browser des Lernenden spricht dessen lokalen Modellserver direkt an. Ein entfernter WordPress-/PHP-Server darf eine Adresse wie `127.0.0.1:1234` nicht als den Rechner des Lernenden behandeln; sie würde den Hosting-Rechner adressieren.

Für den direkten Browserzugriff sind LM-Studio-CORS, Browserregeln für Zugriffe auf lokale Dienste sowie die Einbettung und HTTPS-Origin zu berücksichtigen. Eine WordPress-HTTPS-Seite mit lokalem HTTP-Modellserver benötigt einen expliziten Kompatibilitätstest in den vorgesehenen Browsern. Bei nicht erlaubtem Zugriff bleibt die Demo nutzbar; die App erklärt den fehlenden Modellzugriff.

Die App setzt keine öffentlichen Portfreigaben am Rechner des Lernenden voraus und schaltet nicht automatisch auf einen externen kostenpflichtigen Anbieter um. Eine gegebenenfalls erforderliche Browserberechtigung wird bewusst beim Verbindungstest angefordert.

### DeepInfra

Vorgesehen ist ein direkter Browseraufruf an den festen HTTPS-Anbieterendpunkt mit persönlichem Key im Tab-Speicher. Das setzt tatsächliche CORS-Unterstützung des Anbieters voraus; sie ist noch zu prüfen und wird nicht einfach angenommen.

Ein PHP- oder Node-Proxy ist nicht Teil der gewählten Architektur. Falls der Anbieter direkten Browserzugriff nicht ermöglicht, wird dieser Modellweg zunächst nicht freigegeben; ein zusätzlicher Proxy wäre eine gesondert zu besprechende Änderung. Keys werden nicht im ausgelieferten JavaScript oder in öffentlichen Dateien abgelegt. Die bisherige persönliche Key-Eingabe bleibt Ausgangspunkt; ein gemeinsamer Kurs-Key mit Kostenübernahme ist nicht vereinbart.

Die Modellaufrufe bleiben auf Skill-Auswahl und eine Aufgabenvariante begrenzt. Keine Übertragung der Lernendenhistorie und keine Änderung der deterministischen Auswertung durch Modellurteile.

## Migration des bestehenden Prototyps

1. Browserkompatiblen Skill-Loader und lokalen Aufgabencontroller bereitstellen.
2. `/api/catalog`, `/api/next` und `/api/submit` im Frontend durch diese lokalen Funktionen ersetzen.
3. Modelltransport als eigenes Modul führen: direkter lokaler Zugriff, geprüfter externer Transport und Demo.
4. Abgaben im Browser mit eindeutigen IDs speichern; Doppelzählung auch bei wiederholtem UI-Ereignis verhindern. Keine flüchtige Node-Sitzung erforderlich.
5. Statischen Asset-Ordner erstellen und auf HTTP/HTTPS unter einem Unterordner sowie in der WordPress-Einbettung testen.

Die Migration ist umgesetzt: `runtime.js` lädt Skills und verarbeitet Aufgaben lokal, `model-client.js` führt direkte Modellanfragen aus. Der bisherige Node-Server bleibt als historische Quelle unter `archive/node-prototype/server.js` erhalten und wird nicht ausgeliefert. Die früheren Abnahmeberichte gelten nur für ihren damaligen Stand; die statische Fassung wird separat geprüft.

## Abnahmekriterien

- Das ausgelieferte Produkt startet auf dem vorhandenen WordPress-Webserver ohne `npm start` und ohne eigenen Hintergrundprozess.
- Demo, sechs Interaktionsformen, drei Schwierigkeiten, Abgabezählung und Export/Import funktionieren ohne Node-API.
- Unterordnerpfade und Einbettung führen nicht zu fehlenden Assets.
- Kein Modellzugriff ist Voraussetzung für den Lernkern.
- Für freigegebene Modellwege sind tatsächliche Browser-/Hostingtests dokumentiert; ein fehlgeschlagener Verbindungstest verhindert keine Demo-Aufgaben.
- Die Auswertung und IDs bleiben über Neuladen und Einbettung nachvollziehbar; keine doppelte Zählung einer Abgabe.
- Für die vereinbarte Auslieferung werden weder eigenes WordPress-Plugin noch PHP-/Node-App-Endpunkte benötigt.

## Technische Quellen

- [LM Studio: Server Settings](https://lmstudio.ai/docs/developer/core/server/settings) beschreibt die CORS-Einstellung für andere Origins.
- [Chrome: Local Network Access](https://developer.chrome.com/blog/local-network-access) beschreibt lokale Browserzugriffe und Berechtigungen aus Webanwendungen. Die tatsächliche Zielbrowser-Kompatibilität wird im Pilot geprüft.
