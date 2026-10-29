# Kontrollierte Aufgabengenerierung und Vielfalt

Aktualisierung vom 16. Oktober 2026: [Zusatz 20](20-adaptive-aufgaben-und-kurzerklaerung.md) ergänzt eine kompakte Zusammenfassung der letzten drei Aufgabenbefunde. Bei Fehlern darf die App eine Fragestellung gezielt erneut anfordern. Die rohe frühere Antwortgeschichte wird weiterhin nicht übermittelt. Für die Kurzerklärung wird ausschließlich die aktuelle geprüfte Abgabe übertragen.
Vom Nutzer am 14. Oktober 2026 beauftragt. Verbindliche Regel: Je freier das Modell gestaltet, desto genauer prüft die App den Entwurf unabhängig. Der erste Ausbau betrifft ausschließlich Kapitel 2, Verzweigungen mit if und else, auf allen drei Stufen.

## Fachliche Vielfalt

Pro Thema und Stufe müssen mehrere Fragestellungen vorkommen. Im ersten Ausbau: Ausgabe vorhersagen, Endzustand bestimmen, Bedingung beurteilen, ausgeführte Zeilen auswählen, eine Zahlenänderung für ein vorgegebenes Ergebnis finden und zwei Programme nach einer Vergleichsänderung vergleichen. Das bloße Austauschen von Zahlen oder die Darstellung derselben Antwort als Lücke beziehungsweise Antwortpaar zählt nicht als neue fachliche Aufgabenart.

Die App steuert den Wechsel der Fragestellungen. Das Modell gestaltet Kontext, passende Variablennamen und Kombinationen der zugelassenen Programmbausteine. Neu eingeführte Sprachmittel bleiben an die Einführung der Familie gebunden, nicht an zufällige Modellentscheidungen. Andere Themen verwenden vorerst ihren bestehenden Vertrag.

## Unabhängige, deterministische Kontrolle

Das Modell liefert ein begrenztes JSON-Objekt mit Programmbaum und strukturierter Beobachtungsfrage, keinen ausführbaren Python-/JavaScript-Text und keinen Lösungsschlüssel. Zulässig sind ganzzahlige Zuweisungen, Addition/Subtraktion, Ausgabe, Vergleiche >, >=, <, <= sowie genau eine nicht verschachtelte if/else-Entscheidung. Keine Schleifen, Funktionen, Aufrufe, Objekte, freien Codefelder oder weiteren Sprachmittel.

Alle Objektfelder, Namen, Typen, Literalwerte, Operatoren, Knotenzahlen, Ausdruckstiefen, Variablenverwendung und beide Zweige werden geprüft. Namen müssen vor Verwendung eindeutig typisiert zugewiesen sein; neue Namen werden nur vor der Entscheidung eingeführt. Grenzen für Programmlänge, Anzahl der Variablen und Rechenschritte steigen mit der manuell gewählten Stufe. Prüfung der hypothetischen anderen Zweigseite darf keine ungültigen oder bedeutungslosen Programme übersehen.

Die App rendert beide Sprachen aus dem geprüften Baum und berechnet selbst Bedingungen, Ausgaben, Zustände und erreichte Zeilen. Fragen werden aus der strukturierten Beobachtung formuliert. Antwortalternativen, Lösungen, Erläuterungen und Hinweise entstehen aus diesem Ablauf. Modellformulierungen entscheiden nicht über fachliche Richtigkeit. Code wird weder mit eval noch mit Function ausgeführt.

Änderungsaufgaben werden für jede angebotene Änderung durchgerechnet. Genau eine Änderung muss das geforderte Ergebnis erreichen; das unveränderte Programm darf dieses Ergebnis noch nicht liefern. Vergleichsaufgaben müssen einen tatsächlich beobachtbaren Unterschied zeigen. Alternativen sind eindeutig, haben gleiche Wortanzahl und verraten die Lösung nicht durch Vorauswahl.

## Heuristische Kontrolle

Zusätzlich werden Strukturmerkmale ohne Variablennamen/Zahlen mit den letzten Aufgaben verglichen. Identische Strukturen und wiederholte Kontexte werden innerhalb eines begrenzten Fensters zurückgewiesen. Die App bevorzugt wechselnde Fragestellungen und unterschiedliche Ablaufmuster. Diese nachvollziehbaren Regeln sind keine Garantie für didaktische Qualität oder die Wahrheit beliebiger Kontextbehauptungen. Freie Texte dienen nur als Rahmung; die fachliche Frage bleibt von der App formuliert.

## Begrenzte Korrektur und Ersatz

Ein ungültiger oder zu ähnlicher Entwurf erhält höchstens einen Korrekturversuch mit konkreten Prüfhinweisen. Scheitert auch dieser, liefert die App eine lokal berechnete kuratierte Ersatzaufgabe der gewählten Stufe und Fragestellung. Transportfehler lösen keinen zusätzlichen Korrekturaufruf aus. Alle Versuche zählen im bestehenden Tokenmonitor; Korrekturen werden als solche bezeichnet. Keine Übertragung von Lernendenantworten, Keys oder gesamter Sitzungshistorie. Das Modell erhält lediglich kompakte Merkmale zuletzt erzeugter Aufgaben.

## Abnahme

Implementierter Stand: branch-workshop.js ergänzt sechs Fragestellungen je Stufe. Grenzen: maximal 12/14/18 Anweisungen und 3/4/5 Variablen auf Stufe 1/2/3; Ausdruckstiefe 2/3/3, mindestens 0/1/3 Additionen oder Subtraktionen im gesamten Programmbaum. Genau eine nicht verschachtelte Entscheidung. Zahlenliterale -10 bis 30, alle berechneten Werte -20 bis 100. Ein Modellobjekt darf höchstens 12.000 Zeichen umfassen. Freie Fachfragen werden vollständig durch strukturierte Beobachtungen ersetzt.

Ausgabe- und Endzustandsfragen müssen tatsächlich vom Zweig abhängen; beide hypothetischen Zweige werden dafür unabhängig berechnet. Ein if ohne beobachtbaren Unterschied wird verworfen. Die Kontrollgrenzen gelten ebenfalls für alle angebotenen Änderungen und beide Vergleichsprogramme.

Im Pilot ist das Thema vom Nutzer bereits eindeutig ausgewählt. Deshalb wird direkt ein Aufgabenentwurf angefragt, ohne vorgeschaltete Skill-Auswahl. Je Anfrage sind höchstens 1.800 Ausgabetokens vorgesehen, höchstens zwei Anfragen je Aufgabe. Bisherige Familien bleiben bei ihrer bisherigen Grenze von 400 Tokens und ihrem Auswahlvertrag. Gemeldeter tatsächlicher Verbrauch wird gezählt; die Grenze ist keine Verbrauchsschätzung. Erfolgreiche Korrekturen zeigen keine irreführende Ersatzwarnung. Prüfstatus und begrenzte Ablehnungsgründe werden beim Versuch gespeichert, verworfene Rohtexte nicht dauerhaft protokolliert.

Die letzten drei Strukturen und Kontexte werden innerhalb derselben Sitzung und Schwierigkeitsstufe berücksichtigt, auch über einen Sprachwechsel hinweg. Namen und Zahlen zählen bei der Strukturprüfung nicht als Änderung. Fragestellungen wechseln in einer festen Sechserfolge. Eine neue Sitzung startet eine neue Folge; zwischen Tabs wird die Folge nicht synchronisiert. Die lokale Ersatzfolge besitzt sechs verschiedene Grundprogramme je Stufe und zusätzliche geprüfte Abschlussdarstellungen für den seltenen Fall einer Strukturkollision mit einem vorherigen Modellentwurf. Diese Abschlussvarianten sind keine zusätzlichen Lernziele.

Alle sechs Fragestellungen funktionieren in Python und JavaScript auf drei Stufen. Kuratierte Ersatzprogramme werden unabhängig in JavaScript und Python ausgeführt. Ungültige Felder, unbekannte Konstrukte, undefinierte Namen, falsche Typen, zu hohe Komplexität, ungültige Beobachtungen und mehrdeutige Änderungen werden verworfen. Tests prüfen Wiederholungsfenster, Kostenbegrenzung, Korrektur, Ersatz, Speicherung und fehlende Lösungshinweise vor Abgabe. Browserprüfung umfasst neue Antwortformen und weiter sichtbaren Modellstatus/Tokenverbrauch.

Prüfung: 41 erfolgreiche Tests. 432 Werkstattvarianten (6 Fragestellungen × 3 Stufen × 3 Zahlenfälle × 8 Ersatzdarstellungen) tatsächlich in JavaScript ausgeführt, mit besuchten Zeilen, Bedingungsergebnissen, Ausgaben, Endzuständen und Lösungen verglichen. Dieselben 432 Varianten zusätzlich tatsächlich in Python ausgeführt; zusammen mit den 155 bisherigen Kapitel-2-Varianten sind dies 587 Python-Prüffälle. Keine zusätzlichen Laufzeitvoraussetzungen für die statische App.

Browserprüfung auf isolierter lokaler Origin mit simuliertem Modell: alle sechs Fragestellungen nacheinander bei unverändertem Thema und Stufe; alle sechs Antworten akzeptiert. Ein absichtlich unvollständiger Entwurf wurde jeweils einmal korrigiert; Aufgabenentwurf und Entwurfskorrektur erscheinen getrennt im Tokenprotokoll. Kein echter kostenpflichtiger Modellaufruf für diese Prüfung. Ein erneuter Pilot mit dem gewählten echten Modell bleibt sinnvoll, insbesondere für die Annahmequote freier Entwürfe.

Zusätzlich im Browser geprüft: anspruchsvolle JavaScript-Aufgabe mit Zustandsänderungen vor der Prüfung, korrekte Markierung übersprungener Zeilen und erhaltene Themen-/Sprachbestätigung. Kein Browserfehler im geprüften Ablauf. [Browsernachweis mit simuliertem Modell](assets/aufgabenwerkstatt-browser.jpg).

Das aktualisierte statische Paket enthält 46 freigegebene Dateien. Neue Werkstatt und bestehende Referenzen funktionieren im Paket-Unterordner; keine Testserver, Entwicklungsprogramme oder Zugangsdaten werden ausgeliefert.
