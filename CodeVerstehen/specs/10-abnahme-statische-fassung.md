# Prüfung der statischen Fassung

Datum: 12. Oktober 2026.
Umfang: Kapitel 1, erste Aufgabenfamilie, ohne Node-/PHP-App-Backend.

## Automatisierte Prüfung

14 Tests bestanden, ohne lokale API-Testserver. Geprüft sind Referenzsemantik, alle 648 Zahlenvarianten, gleiche Wortanzahl, alle sechs Antwortformen, freigegebene Skills und relative Katalogpfade. Die Browser-Laufzeit prüft außerdem idempotente Abgabe-IDs, Wiederholungen, isolierte Aufgabenansichten und Schwierigkeit beziehungsweise Lernzielgrenzen.

Der Modellvertrag ist gegen Mocks geprüft: zuerst Description-Auswahl, danach Skill-Hauptteil, keine frühere Lernendenhistorie. Direkter Modelltransport verwendet CORS, einen festen externen Endpunkt beziehungsweise lokale Loopback-Adresse und persönliche Keys nur im Authorization-Header. Unzulässige Auswahl, Transportfehler und ungültige Antworten führen zu geprüften Ersatzaufgaben.

## Browserprüfung

- Statische Quellfassung unter `http://127.0.0.1:5500/CodeVerstehen/index.html` geladen.
- Fehlantwort und erneute richtige Antwort lokal ausgewertet und separat gezählt.
- Manuelle Schwierigkeit 3 verwendet; Transfer-Mehrfachauswahl richtig bewertet.
- Lernübersicht und Sitzungsexport geprüft.
- Export aus dem bisherigen Prototypformat Version 2 importiert; eine zusätzliche Abgabe erscheint in der Übersicht.
- Auslieferungsordner unter verschachteltem Pfad `.../dist/code-verstehen/index.html` geladen, einschließlich Skill-Dateien und Vorlagen.
- Nicht erreichbare direkte LM-Studio-Adresse zeigt verständlichen Hinweis; eine lokale Ersatzaufgabe bleibt verfügbar.

## Paketprüfung

`release/code-verstehen.zip` enthält 13 explizit freigegebene Dateien mit relativen Pfaden unter `code-verstehen/`. Keine Node-Serverdatei, PHP-Datei, Tests oder Zugangsdaten im Paket. Die aktive App enthält keine `/api/`-Aufrufe oder Node-Imports. Der frühere Server ist außerhalb des Pakets archiviert.

## Noch nicht abgenommen

- Das tatsächliche WordPress-Hosting, iframe-Einbettung und dessen Datei-/CSP-Regeln wurden mangels Zielzugang nicht geprüft.
- Echte LM-Studio- und DeepInfra-Verbindungen aus dem Ziel-HTTPS-Kontext bleiben im Pilot zu prüfen. CORS und lokale Browserberechtigungen sind notwendige Kompatibilitätsbedingungen, nicht durch Mocks bewiesen.
- Unterrichtswirksamkeit und weitere Aufgabenfamilien bleiben außerhalb dieser technischen Abnahme.
