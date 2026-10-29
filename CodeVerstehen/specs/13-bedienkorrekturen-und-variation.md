# Bedienkorrekturen und Modellvariation

Datum: 14. Oktober 2026. Grundlage: Nutzerauftrag zur Bestätigung einer sofortigen neuen Aufgabe, prominenterer Lernansicht und stärkeren Einbindung der Modelle. Diese Bedienregeln ersetzen die älteren Regeln zum Wirksamwerden von Auswahländerungen in den Planungsdokumenten 04, 06 und 11.

## Bestätigter Sofortwechsel

Thema, Schwierigkeit und Sprache werden zunächst als Auswahlentwurf geändert. Erst „Auswahl bestätigen“ erzeugt sofort eine neue Aufgabe, unabhängig davon, ob die vorherige Aufgabe bearbeitet oder abgegeben wurde. Eine ungeprüfte Antwort der vorherigen Aufgabe wird verworfen und nicht gezählt. Der Regler allein verändert weder die Aufgabe noch die Erklärung.

„Nächste Aufgabe“ verwendet die bestätigten Einstellungen. Solange ein anderer Auswahlentwurf vorliegt, ist diese Schaltfläche deaktiviert; bestätigen oder Zurückstellen der Auswahl löst diesen Zustand. Während einer Aufgabenanforderung sind Auswahl und weitere Anforderung gesperrt. Scheitert die Erzeugung vollständig, bleiben alte Aufgabe und bestätigte Einstellungen erhalten.

## Layout

Die App nutzt die verfügbare Seitenbreite mit ungefähr 43 Prozent Lernbereich und 57 Prozent Aufgabenbereich. Ab 1000 Pixel Breite wird die verfügbare Fensterhöhe berücksichtigt. Steuerelemente und die nächste Aufgabe bleiben außerhalb der bei Bedarf scrollbaren Bereiche sichtbar. Code und Antwort beziehungsweise Rückmeldung stehen bei ausreichender Breite nebeneinander.

Nach einer Abgabe ersetzt die Rückmeldung die Antwortfelder. Die abgegebene Antwort und die vollständige Tabelle samt Lösung bleiben aufklappbar. „Noch einmal versuchen“ stellt die Antwortfelder mit dem vorherigen Entwurf wieder her. Diese Darstellung ändert die Ergebniszählung nicht.

Ziel ist wenig Scrollen bei lesbarer Schrift. Lange Erklärungen, Diagramme oder aufgeklappte Details können innerhalb ihres Bereichs weiterhin Scrollen benötigen. Auf schmalen oder sehr niedrigen Bildschirmen bleibt normales Seitenscrollen möglich; Inhalte werden nicht abgeschnitten.

## Modellvariation

LM Studio und DeepInfra nutzen weiterhin den direkten Browserzugriff. Zusätzlich zu Vorlage und Parametern können Modelle ein optionales Feld liefern:

```json
{
  "template_id": "copy-calculated-v1",
  "parameters": { "start": 3, "add": 2, "factor": 4 },
  "variation": { "names": "vorrat", "answer_form": "single-choice" }
}
```

Erlaubte Namenprofile: standard (wert beziehungsweise a/b), punkte (punkte/bonus), vorrat (vorrat/reserve), nummer (nummer/kopie). Die App ersetzt Namen konsistent in Code, Arbeitsauftrag, Antwortoptionen, Hinweisen und Zustandstabellen.

`original` erhält die ursprüngliche Antwortform. Für die drei neuen Familien kann `single-choice` die beiden Lücken durch vier numerische Antwortpaare ersetzen. Genau eines ist richtig, die anderen verändern den ersten, den zweiten oder beide Werte. Alle Optionen werden auf gleiche Wortzahl und eindeutige Texte geprüft und anschließend gemischt. Für die ursprüngliche Zuweisungsfamilie ist ausschließlich `original` freigegeben.

Ohne Modellvariation wählt die App eine passende geprüfte Variation, auch im Demo- und Ersatzbetrieb. Alte gültige Modellantworten bleiben damit verwendbar. Ein Modell kann keine neuen Namen, Antwortformen, Programme, freien Aussagen oder Lösungsschlüssel einschleusen. Die Skill-Versionen sind für diesen Vertrag auf 1.1 erhöht.

Für Abwechslung darf das Modell die vorherige Aufgabenvariante (Vorlagen-ID, Parameter, Variation) sehen. Frühere Antworten, Ergebnisse und Dialoghistorie werden nicht übermittelt. Wiederholt es dieselben Zahlen derselben Vorlage direkt, ändert die App einen Parameter innerhalb des freigegebenen Bereichs. Abgaben speichern die tatsächlich verwendete Variation.

## Prüfung

- 23 automatisierte Tests: bisheriger Bestand, neue Referenzen und 325 Zahlenvarianten, alle 325 neuen Antwortpaarvarianten, ausführbarer Code mit allen vier Namenprofilen, ungültige Variationen, Speicherung und Modellkontextgrenzen.
- Im Browser: Regler ohne Aufgabenwechsel; Bestätigung vor Abgabe mit sofortiger neuer Stufe und unverändertem Abgabenzähler; Thema und Sprache als bestätigte Auswahl.
- Breite Testansichten 1440 × 900 und 1366 × 768: Lernbereich deutlich breiter, Code und Antwort nebeneinander. Eine geprüfte Zustandsaufgabe samt kompakter Rückmeldung benötigte in der Laptopansicht weder Seiten- noch Aufgabenbereichsscrollen.
- Schmale Testansicht 390 × 844: Bestätigung funktioniert, kein horizontales Überlaufen. Fehlantwort und Wiederholung stellen die Eingabefelder korrekt wieder her.
- Modellvariation mit Mocks geprüft. Für einen aktuellen Live-Test war kein LM-Studio-Server unter der bisherigen lokalen Adresse erreichbar. Ein erneuter Pilot mit den verwendeten echten Modellen bleibt erforderlich.

Das statische Paket enthält nun 27 freigegebene Dateien einschließlich `task-variation.js`. Zielhosting und Unterrichtswirksamkeit bleiben separate Prüfungen.

Die [Vorschau](../bedienung-vorschau.jpg) zeigt die kompakte Antwortpaar-Auswahl in der Laptopansicht. Dort befinden sich Bestätigung, Code, Antwortauswahl, Absenden und nächste Aufgabe gleichzeitig im Sichtfeld.
