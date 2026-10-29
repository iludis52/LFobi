# Kapitel 4 und 5 sowie break/continue für die User-Tests

Stand: 15. Oktober 2026. Der Nutzer hat Kapitel 4 und 5 vollständig für erste User-Tests sowie die Ergänzung von Kapitel 3 um break und continue beauftragt. „Vollständig“ bezieht sich auf die Themen der bisher festgehaltenen Verständnisstufen 4/5, innerhalb kurzer, nachvollziehbarer Beispiele. Optionale Mengen/Tupel, Rekursion, Closures, eigene Klassen und die weiterführenden Inhalte ab Kapitel 6 gehören nicht zu diesem Grundumfang.

## Gesamtbestand

| Kapitel | Themen | Vorlagen | Zahlenkombinationen |
| --- | ---: | ---: | ---: |
| 1 · Grundlagen | 4 | 17 | 973 |
| 2 · Entscheidungen | 4 | 12 | 155 |
| 3 · Wiederholungen | 6 | 18 | 93 |
| 4 · Sammlungen | 6 | 19 | 70 |
| 5 · Funktionen | 6 | 18 | 60 |
| Gesamt | 26 | 84 | 1.351 |

Neu: 14 Aufgabenfamilien mit 43 Vorlagen und 146 Zahlenkombinationen. Jede Familie besitzt drei Schwierigkeiten, sichtbare Erklärung, Python-/JavaScript-Beispiele und eigenständig formulierte Referenzen. Jede Kapitel/Thema/Stufe/Sprache-Kombination unterstützt die bisherigen fünf gemischten Formen. Die ursprüngliche Codeauswahl bleibt in Kapitel 1 zusätzlich erhalten. Keine automatische Schwierigkeitserhöhung; Bestätigung und lokale Lernübersicht funktionieren wie bisher.

## Kapitel 3: Schleifenkontrolle

| Thema | Einfach | Mittel | Anspruchsvoll |
| --- | --- | --- | --- |
| break | while beim Grenztreffer abbrechen | Abbruch vor der Summierung | Feste for-Wiederholung vorzeitig beenden |
| continue | Einzelne Addition auslassen | for-Runde auslassen und verwendete Runden zählen | continue und break in einer endenden while-Schleife kombinieren |

Ein betretenes Rumpfstück zählt als Durchlauf, auch wenn es durch break/continue verlassen wird. break beendet die Schleife sofort; dabei wird keine abschließende falsche Bedingung erfunden. continue überspringt nur den Rest der Runde. while-Zähler werden vor continue fortgeschaltet. Die Beispiele enden und benötigen noch keine Listen aus Kapitel 4. Verschachtelte Schleifen bleiben eine spätere Vertiefung.

## Kapitel 4: Vollständiger Grundumfang

| Thema | Aufgaben und eingeführte Konzepte |
| --- | --- |
| Listen und Indizes | Element versus Position, Länge, Index ab 0, letzter gültiger Index, leere Sammlung und bewachter Zugriff |
| Listen verändern | Hinten anhängen, vorhandenes Element ersetzen, letztes Element entfernen, bestimmte Position entfernen und Verschieben der Folgeindizes |
| Elementweise durchlaufen | Werte statt Indizes, summieren, neue Sammlung durch Transformation aufbauen, bedingte Anzahl und Summe |
| Zuordnungen und Datensätze | Dictionary/Map, Schlüsselzugriff, ersetzen und ergänzen, Schlüssel zählen, über Schlüssel iterieren, feste Datensätze und Liste von Datensätzen |
| Text verarbeiten | Suchen mit Position bzw. −1, split, join, Groß-/Kleinschreibung in der Erklärung, unveränderlicher Text und Ersetzen mehrerer Vorkommen |
| Filtern, sortieren, zusammenfassen | Teilmenge auswählen, neue Werte berechnen, numerisch in-place sortieren, mehrstufige Verarbeitung und Summe |

Die Map-/Datensatzfamilie hat auf Stufe 3 zwei Referenzen, damit sowohl Datensätze als auch die Schlüsseliteration tatsächlich geübt werden. Die numerische JavaScript-Sortierung enthält die vorgegebene Vergleichsfunktion; deren Bedeutung wird erklärt. Die Definition eigener Funktionen folgt im nächsten Kapitel.

## Kapitel 5: Vollständiger Grundumfang

| Thema | Aufgaben und eingeführte Konzepte |
| --- | --- |
| Definition/Aufruf/Parameter | Definition führt Rumpf nicht aus; positionsgebundene Argumente, vertauschte Argumente, wiederholte Aufrufe |
| Rückgabe/Ausgabe | return als Wertlieferung, print/console.log als Ausgabe, fehlendes return und frühe Rückkehr |
| Gültigkeitsbereiche | Hauptprogramm versus lokale Variable, Parameter verdeckt globalen Namen, lokale Neuzuweisung, frische lokale Werte je Aufruf |
| Seiteneffekte | Ausgabe zusätzlich zur Rückgabe, Mutation einer übergebenen Sammlung, lokale Neuzuweisung an eine neue Sammlung |
| Komposition | Innere Rückgabe als äußeres Argument, vertauschte Reihenfolge, Aufruf je Element einer Schleife und Summe der Rückgaben |
| Module/Methoden/Schnittstellen | Python math versus eingebautes JavaScript Math, tatsächlicher eigener Modulimport, importierter Zahlenwert, Importalias, Weiterverwendung von Rückgaben und vorhandene Methoden |

Der Vertrag des eigenen Lehrmoduls ist vollständig in der Erklärung sichtbar: `mit_bonus`/`mitBonus` addiert zwei Zahlen, `verdoppeln` verdoppelt, `grundbonus` ist 2. Die Dateien `lernbausteine.py` und `lesson-tools.js` werden mitgeliefert und in den unabhängigen Sprachprüfungen tatsächlich importiert. Die Aufgaben setzen keine verborgene Bibliothekskenntnis voraus. Zugriff auf Attribute/Eigenschaften und Methoden wird über Math/math, length, append/push, split/join und die Sammlungsbeispiele eingeführt.

## Verbindliche Sprachunterschiede

- Python-Liste: `len`, `append`, `pop(0)`; JavaScript-Array: `.length`, `push`, `splice(0, 1)`. Unterschiedliche Methodenrückgaben werden erklärt und nur dort verwendet, wo die Semantik ausdrücklich geprüft ist.
- Python erlaubt negative Listenindizes, JavaScript verwendet bei `[-1]` keine rückwärts gezählte Arrayposition. Die gemeinsamen Aufgaben benutzen Länge minus 1 und gültige bzw. bewachte Zugriffe. Ungültiger Python-Index und JavaScript-`undefined` werden nicht gleichgesetzt.
- Python-Dictionary verwendet `[]` und `len`; JavaScript-Map verwendet `get`, `set`, `size`. JavaScript-Objekte als feste Datensätze werden separat erklärt.
- Numerisches JavaScript-Sortieren verwendet einen Vergleich, damit etwa 10 und 2 nicht nach Text geordnet werden.
- Python-`replace` ersetzt hier alle Vorkommen. JavaScript verwendet ausdrücklich split/join, um dieselbe Wirkung zu erreichen. Texte sind ASCII und haben in den Aufgaben kein Unicode-Indexproblem.
- Fehlende Funktionsrückgabe erscheint als `None` beziehungsweise `undefined`, nicht als 0 und nicht als die zuvor ausgegebene Zahl.
- Python-`sqrt(9)` liefert 3.0, JavaScript zeigt 3. Der gemeinsame Ganzzahlauftrag verwendet anschließend floor. Die sichtbare Aufgabe erklärt diesen Unterschied.
- Globale Zahlen werden durch lokale Parameterneuzuweisung nicht geändert. Die Mutation einer gemeinsam verwendeten Sammlung und das lokale Umbinden auf eine neue Sammlung werden getrennt behandelt.

## Laufzeit und Darstellung

`advanced-lessons.js` enthält ausschließlich kuratierte Programmdefinitionen und Parametergrenzen. `learning-program.js` rendert diese begrenzten Knoten und berechnet die Semantik ohne eval, Function oder Ausführen von Modellquelltext. Das Laufzeitmodell darf nur Skill, Vorlage und begrenzte ganze Zahlen auswählen. Es erhält keine Möglichkeit, eigene Knoten, Imports, Quellen oder Lösungen einzuschleusen.

Die geschlossene Laufzeit unterstützt die benötigten Ausdrücke, Sammlungen, Zuordnungen, kurze Schleifen, if, break/continue, Funktionen, Rückgaben und die fest freigegebenen Bibliotheksbausteine. Maximal zwölf Schleifendurchläufe, acht aktive Aufrufbereiche, 400 aufgezeichnete Schritte und 60 Quellzeilen begrenzen die Ausführung. Die kuratierten Beispiele bleiben darunter. Diese Laufzeit ist kein allgemeiner Python-/JavaScript-Interpreter und kein freier Codeeditor.

Snapshots werden tief kopiert: Eine spätere Listenänderung überschreibt frühere Tabellenwerte nicht. Während eines Aufrufs zeigen sie die dort sichtbaren Werte; bei verdeckten Namen hat der lokale Name Vorrang. Der Bereich `main` oder etwa `aendern#1` und die Quellzeilen-Ausführung identifizieren die Beobachtung eindeutig. Mehrfachauswahlen verwenden diese Angaben. Objekte/Arrays werden in der Tabelle lesbar serialisiert statt als `[object Object]` ausgegeben.

Aufrufköpfe werden als Ereignis „Aufruf“ mit gebundenen Parametern aufgeführt. Das ist eine didaktische Aufrufdarstellung, kein behauptetes Ausführen des Funktionsrumpfs bei seiner Definition. Explizite return-Zeilen haben ein Rückgabeereignis und einen eigenen Rückgabewert in der Tabelle. Es gibt keine erfundenen ausgeführten Zeilen nach break, continue oder return. Struktur-/Definitionszeilen werden nicht als Lernendenaktionen gewertet.

Die generischen Sortierkarten prüfen die Reihenfolge unterschiedlicher Ereignisse nach ihrem ersten Auftreten. Bei mehreren Aufrufen bleiben Bereich und Karten-ID unterscheidbar. Mehrfachauswahlen verwenden skalare, eindeutige Zustandsbeobachtungen; komplexe Werte bleiben in den Lerninhalten und im Ablauf sichtbar. Diese Darstellungsformen sind Lernnachweise für Teilaspekte, kein automatischer Nachweis vollständiger Beherrschung.

## Prüfung und Auslieferung

- `npm test`: 56 Tests. Zusätzlich zu den bisherigen Kapiteln werden alle 43 neuen unabhängigen Referenzen, alle neuen Varianten in beiden Sprachen, fünf Formen und drei Mischzustände geprüft. Dazu richtige/falsche Abgaben, eindeutige IDs/Texte, gleiche Wortzahl, Scopes, Rückgaben, Snapshot-Stabilität, Parametergrenzen, Modellfehler und idempotente Abgaben.
- `node scripts/check-advanced-programs.mjs`: alle 146 neuen Zahlenkombinationen laufen unabhängig als echte JavaScript-ES-Module sowie als Python-Programme. Sämtliche Ausgaben und Endzustände stimmen mit dem Lernkern überein; die Lehrmodule werden tatsächlich importiert. Die ursprünglichen Schleifenprüfungen bleiben separat erhalten.
- `node tests/preview-advanced.mjs`: 420 Browserabgaben, also alle 14 neuen Themen über drei Stufen, beide Sprachen und fünf Formen. Prüft Darstellung, Feedback, keine direkte Typwiederholung, lesbare Sammlungen, neue Bereichs-/Rückgabespalten, Abgabezählung, Export/Import ohne Duplikate, erhaltene Daten nach Neuladen und mobile Seitenbreite.
- Desktop-Ziel für diese Abnahme: 1280×720, Aufgabe und Weiter-Schaltfläche ohne vertikalen Aufgabenüberlauf. Lange Lerntexte und aufgeklappte Abläufe bleiben intern scrollbar, Mobilansichten vertikal scrollbar.
- Das aktualisierte statische Paket enthält den Lernkern, alle registrierten Skillressourcen und die beiden Lehrmodule. Die Positivliste erlaubt nur feste Ressourcennamen unter validierten registrierten Skillordnern. Entwicklungsskripte, Testserver und Zugangsdaten werden nicht ausgeliefert.

Echte Modellaufrufe des erweiterten Bestands und die Einbettung auf dem Zielhosting sind weiterhin praktisch zu prüfen. Die Browserabnahme verwendet Demo bzw. kontrollierte Modellantworten und verursacht keine externen Modellkosten.

## Nach den User-Tests

Noch nicht implementierte Hauptstufen sind Kapitel 6 (realistischere Daten und Fehlerfälle), 7 (Ereignisse) und 8 (Vertiefungen). Frühere Stufen können nach den Beobachtungen aus den User-Tests weiter ausgebaut werden. Als optionale Vertiefungen bleiben unter anderem verschachtelte Schleifen, Mengen/Tupel, Rekursion und Closures offen; sie verhindern den vereinbarten Grundumfang der Kapitel 4/5 nicht.
