# Prüfung des ersten Ausbaus

Datum: 12. Oktober 2026.

Diese Prüfung betrifft den bisherigen Node-Prototyp. Die später vereinbarte WordPress-Kompatibilität ohne eigenen Node-/npm-Prozess ist damit nicht abgenommen und benötigt die Migration und neuen Prüfungen aus Spezifikation 09.
Umfang: Kapitel 1, Aufgabenfamilie Ausdrucksauswertung und Neuzuweisung. Weitere Themen von Kapitel 1 sind noch nicht umgesetzt.

## Automatisiert geprüft

`npm test`: 11 Tests bestanden.

- Referenzabläufe für Zuweisung und Ausdrucksausgabe.
- 648 erlaubte Zahlenvarianten der acht Vorlagen, einschließlich gleicher Wortanzahl und Lösungskonsistenz.
- Alle sechs Auswertungsformen, ungültige Antworten und Mehrfachauswahl mit fehlenden beziehungsweise falschen Aussagen.
- Freigegebener Skill mit getrenntem Frontmatter und Hauptteil.
- API-Sitzungsgrenzen und idempotente Übertragung einer Abgabe; erneute Bearbeitung als weiterer Versuch.
- Lokaler Modell-Mock: Description-Auswahl, anschließend Skill-Hauptteil, keine frühere Lernendenhistorie, Zurückweisung unzulässiger Skill- und Vorlagenauswahl, geprüfter Ersatz.
- Begrenzte Anbieteradressen und Abweisung fremder Origins.

## Im Browser geprüft

- Einzelauswahl: falsche Antwort, Hinweis, erneute richtige Abgabe; zwei getrennte Ergebnisse.
- Mehrfachauswahl: zwei passende Aussagen ergeben eine richtige Abgabe.
- Codeauswahl: rechte Seite und bisheriger Wert auswählen.
- Lücken: bisheriger Wert, Rechenergebnis und neuer Wert, einschließlich mehrfach verwendeter Zahl.
- Reihenfolge: Schritte per Pfeilschaltflächen verschieben und absenden.
- Diagramm: passende Reihenfolge auswählen.
- Schwierigkeit ändern: aktuelle Aufgabe bleibt erhalten, nächste Aufgabe verwendet die neue Stufe.
- JavaScript-Transfer: Rechnung in einer Ausgabe verändert den Variablenwert nicht.
- Lernübersicht, gespeicherte Wiederholungen und Erhalt des alten Browser-Speichers.
- Export einer Testsitzung, erneuter Import: null zusätzliche Abgaben durch Duplikaterkennung.
- Kleine Ansicht mit 390 × 844 Pixeln: Erklärungsbereich bleibt beim Scrollen angeheftet und intern scrollbar; keine ausschließlich grafische Antwortbedienung erforderlich.
- Nicht erreichbarer lokaler Modellserver: sichtbarer Hinweis und geprüfte Ersatzaufgabe.

## Grenzen und nächster Pilot

- Keine echte LM-Studio- oder DeepInfra-Modellantwort getestet. Der Modellvertrag funktioniert gegen den lokalen Mock; Zuverlässigkeit, Geschwindigkeit und unterschiedliche Modelle bleiben praktisch zu prüfen.
- Der erste Skill ist explizit registriert. Automatische Erkennung weiterer Skillordner folgt erst beim Ausbau des Bestands.
- Keine Benutzerkonten, zentrale Datenbank oder Benotung. Lokale Exportdaten sind veränderbar und keine Prüfungsnachweise.
- Aufgabenbestand und Erklärungen benötigen einen didaktischen Unterrichtspilot. Die technische Prüfung beweist keine Lernwirksamkeit.

Die Vorschau liegt unter `../prototyp-vorschau.png`. Startanleitung und technische Verträge stehen in `../README.md` und `../SPEC.md`.
