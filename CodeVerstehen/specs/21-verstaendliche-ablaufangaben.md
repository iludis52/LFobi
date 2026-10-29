# Verständliche Ablaufangaben in Aufgaben

Stand: 16. Oktober 2026. Korrektur nach Nutzerrückmeldung zu „Bereich main, Ausführung 1 von Zeile 4“ bei einer einfachen Dictionary-Aufgabe.

Die didaktische Regel steht im Abschnitt „Verständliche Ablaufangaben“ aller 26 registrierten Aufgaben-Skills; deren Versionsnummern wurden erhöht. Die App setzt sie im gemeinsamen Generator `interaction-forms.js` um, weil die Auswahlmodelle keine Antworttexte verfassen.

- Einmalig ausgeführte Zeile: „Nach Zeile 4 hat ergebnis_a den Wert 3.“
- Tatsächlich mehrfach ausgeführte Zeile: „Nach der 2. Ausführung von Zeile 4 hat summe den Wert 5.“ Die Nummer bezeichnet eine Zeilenausführung, nicht pauschal einen Schleifendurchlauf.
- Funktionskontext, wenn Funktionen aufgerufen werden: „Im Hauptprogramm: …“ beziehungsweise „In Funktion berechne: …“.
- Mehrere Aufrufe derselben Funktion: „Beim 2. Aufruf von berechne: …“. Die Nummer zählt die Aufrufe dieser Funktion; die interne globale Aufruf-ID wird nicht angezeigt.
- Interne Namen wie `main` und `berechne#4` erscheinen nicht in erzeugten Antwortalternativen oder Ereigniskarten. Eine erste Ausführung wird nur dann nummeriert, wenn die Zeile tatsächlich mehrmals ausgeführt wird.

Für die Mehrfachauswahl werden Beobachtungen mit gleicher Wortanzahl zusammen ausgewählt. Es werden keine zusätzlichen Fachbegriffe eingefügt, um die Wortanzahl auszugleichen. Lösung und Ablaufauswertung bleiben unverändert.

Abnahme: explizite Textreferenzen für lineare Programme, Schleifen, Hauptprogramm, einzelne und mehrfache Funktionsaufrufe. Die bestehenden Prüfungen aller Vorlagen, Parameter, Sprachen und Antwortformen kontrollieren weiterhin eindeutige Antworten, identische Wortanzahl und korrekte Bewertung. Browserprüfung mit dem Thema „Map / Datensatz“ und Python/JavaScript; Screenshot unter `assets/verstaendliche-aufgabentexte.png`.
