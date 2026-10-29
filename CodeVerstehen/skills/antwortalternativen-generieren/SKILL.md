---
name: antwortalternativen-generieren
description: "Formuliert aus kuratierten inhaltlichen Vorlagen kurze Antwortalternativen mit gleicher Wortanzahl. Erfindet keine Lösungsschlüssel; die App prüft und gibt Varianten vor Anzeige frei."
version: "0.1"
status: draft
kind: generation
instruction_language: de
learner_language: de
---

# Antwortalternativen generieren

Status: Spezifikationsentwurf für die Lern-App; noch nicht ausführbar eingebunden.
Version: 0.1
Datum: 12. Oktober 2026

## Zweck und Grundlage

Formuliere kurze Antwortalternativen für kuratierte Aufgaben. Verbindliche Grundlage ist `../../specs/02-interaktionsformen-und-antwortgenerierung.md`. Erfinde weder Lernziel noch Lösungsschlüssel. Die App gibt Aufgabenfamilie, Interaktionsform, verifizierte Referenz, richtige Zusammenhänge und zulässige Fehlvorstellungen vor.

## Eingaben

- Aufgaben- und Kriterien-ID sowie Version.
- Sichtbarer Code, Arbeitsauftrag und verifizierter Ablauf.
- Interaktionsform und gewünschte Zahl an Alternativen.
- Inhaltliche Vorlage der richtigen Aussagen und falschen Aussagen einschließlich Fehlvorstellungs-IDs.
- Zulässige Begriffe, Voraussetzungen und gegebenenfalls Zielwortzahl.

Fehlen Referenz oder eindeutige inhaltliche Vorlage, melde den Bedarf an Kuration. Schätze die Lösung nicht selbst.

## Regeln

1. Alle Alternativen einer Gruppe haben exakt dieselbe Wortanzahl. Bei Mehrfachauswahl gilt dies auch für mehrere richtige Alternativen untereinander. Verwende die Zählkonvention aus Spezifikation 02.
2. Formuliere gleich knapp und in vergleichbarem Sprachstil. Die richtige Antwort darf nicht durch größere Präzision, zusätzliche Erläuterungen oder auffällige Fachwörter herausstechen.
3. Nutze keine bedeutungslosen Füllwörter zur Einhaltung der Wortzahl. Formuliere die gesamte Gruppe neu, wenn nötig.
4. Die Einzelauswahl hat genau eine richtige Antwort bei drei oder vier Alternativen. Die Mehrfachauswahl hat mindestens eine richtige und eine falsche Aussage; jede ist unabhängig beurteilbar.
5. Jede falsche Aussage bildet eine erlaubte konkrete Fehlvorstellung ab. Keine absurden Ablenker, Doppeldeutigkeiten, Fangfragen oder Antwortkombinationen wie „alle oben genannten“.
6. Verändere nicht die Bedeutung der vorgegebenen Aussage beim Umformulieren. Werden zwei Alternativen dadurch inhaltlich gleich oder zugleich richtig, ist die Gruppe ungültig.
7. Gib jeder Alternative eine stabile ID und verknüpfe sie mit ihrer inhaltlichen Vorlage und den Kriterien beziehungsweise Fehlvorstellungen. Markierungen der Richtigkeit gehören nur in die Prüfmetadaten, nicht in den sichtbaren Text.
8. Die App legt die Anzeigereihenfolge fest. Verwende keine positionsabhängigen Texte wie „die erste Antwort“.
9. Für Lückenkarten gelten die Regeln innerhalb einer austauschbaren Auswahlgruppe. Für Diagramme gelten gleiche Textlängen zusätzlich zu vergleichbarer Gestaltung; liefere dafür nur das vereinbarte strukturierte Darstellungsschema.
10. Die Aufgabe darf keine Konzepte voraussetzen, die außerhalb der vorgegebenen Lernstufe liegen.

## Ergebnis und Prüfung

Liefere Alternativen mit IDs, sichtbarem Text, Zuordnung zur inhaltlichen Vorlage und Prüfmetadaten. Das endgültige maschinenlesbare Schema wird später spezifiziert. Deine Wortzahlangabe und Richtigkeitsmarkierung ersetzen keine unabhängige Prüfung durch die App.

Die App prüft Wortzahlen und Struktur deterministisch. Inhaltliche Freigabe erfolgt nach dem festgelegten Kurationsverfahren. Ungeprüfte freie Umformulierungen dürfen nicht allein aufgrund dieses Skills direkt veröffentlicht werden.

## Referenz

Für `wert = wert + 2` ist „Zuerst rechts berechnen, danach das Ergebnis links zuweisen.“ eine richtige Alternative mit acht Wörtern. „Zuerst links zuweisen, danach den Ausdruck rechts berechnen.“ ist eine falsche Alternative mit acht Wörtern und vertauscht die Reihenfolge. Weitere Referenzen einschließlich Mehrfachauswahl stehen in Spezifikation 02.
