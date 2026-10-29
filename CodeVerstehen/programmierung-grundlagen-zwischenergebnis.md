# Grundlagen der Programmierung: Begriffs- und Themenliste

**Status:** Zwischenergebnis des Brainstormings  
**Datum:** 11. Oktober 2026  
**Zielgruppe:** Einsteiger in die Programmierung, insbesondere im Rahmen einer Einführung in KI

## Ziel und Abgrenzung

Einsteiger sollen Code lesen und erklären können – und vorhersagen können, was er mit welchen Daten unter welchen Bedingungen tut. Selbst Code zu schreiben bleibt ein Mittel, um dieses Verständnis zu prüfen.

Im Mittelpunkt stehen die **Ausführung eines Programms und die Bedeutung seiner Bestandteile**. Die Betrachtung erfolgt grundsätzlich programmiersprachenübergreifend; Python und JavaScript dienen als mögliche Beispiele.

Die übergeordnete Software-Engineering-Perspektive ist ausdrücklich nicht Gegenstand dieser Liste. Themen wie Softwarearchitektur, Projektorganisation und Deployment bleiben zunächst außerhalb.

Die folgende Ordnung ist eine **begriffliche Gliederung, noch kein Unterrichtsplan**. Sie unterscheidet grundlegende Themen von möglichen Erweiterungen und kontextabhängigen Ergänzungen.

## 1. Code als ausführbare Beschreibung

- **Programm / Code:** Eine Beschreibung von Operationen, die ein ausführendes System interpretiert.
- **Programmiersprache:** Regeln, mit denen diese Beschreibung formuliert wird.
- **Syntax:** Ist der Code nach den Regeln der Sprache gültig?
- **Semantik:** Was bedeutet der Code, und was bewirkt er?
- **Ausführung / Laufzeit:** Der Unterschied zwischen dem geschriebenen Code und dem tatsächlich ablaufenden Vorgang.
- **Kommentar:** Text für Menschen, der nicht als Programmanweisung ausgeführt wird.
- **Block / Verschachtelung:** Welche Teile gehören zusammen? In Python wird dies besonders durch Einrückung sichtbar.

**Zentrale Einsicht:** Code wird nicht schon dadurch ausgeführt, dass er irgendwo steht. Das betrifft beispielsweise Funktionsdefinitionen, nicht betretene Verzweigungen und Ereignisbehandlungen.

## 2. Werte, Namen und Zustand

- **Wert / Literal:** Beispielsweise `42`, `3.5`, `True` oder `"Hallo"`.
- **Datentyp:** Welche Art von Wert liegt vor, und welche Operationen sind darauf sinnvoll?
- **Grundtypen:** Ganze Zahl (`int`), Gleitkommazahl (`float`), Wahrheitswert (`bool`) und Zeichenkette (`string`, in Python `str`). Die konkrete Typaufteilung und die Bezeichnungen unterscheiden sich zwischen Sprachen.
- **Variable / Name:** Wie lässt sich ein Wert im weiteren Programm ansprechen?
- **Zuweisung:** Einen Wert einem Namen zuordnen.
- **Lesen und Aktualisieren:** Einen vorhandenen Wert verwenden oder eine Zuordnung verändern.
- **Initialisierung:** Einen Ausgangswert festlegen.
- **Zustand:** Welche Werte beziehungsweise Zuordnungen bestehen zu einem bestimmten Zeitpunkt?
- **Fehlender Wert:** Beispielsweise `None` oder `null`; zu unterscheiden von `0`, `False` und einer leeren Zeichenkette.
- **Typumwandlung:** Zum Beispiel Text in eine Zahl umwandeln.

**Didaktische Hinweise:**

- Der Typ gehört zum Wert; wie stark auch eine Variable an einen Typ gebunden ist, hängt von der Sprache ab.
- Das „Variablenkästchen“ ist ein brauchbares Einstiegsbild, erklärt später aber gemeinsame Referenzen auf Listen oder Objekte nur unzureichend.
- Feinere Typunterscheidungen wie `uint`, `int8`, `float32` oder `char` werden für den Einstieg bewusst ausgeklammert.

## 3. Ausdrücke und Operationen

- **Ausdruck:** Code, dessen Auswertung einen Wert ergibt.
- **Operator und Operand:** Zum Beispiel Addition und die dabei verwendeten Werte.
- **Arithmetische Operationen:** Rechnen, einschließlich Division und Rest.
- **Vergleich:** Gleichheit, Ungleichheit, größer, kleiner.
- **Boolesche Verknüpfung:** UND, ODER, NICHT.
- **Auswertungsreihenfolge:** Vorrangregeln und Klammern.
- **Zusammengesetzte Ausdrücke:** Ergebnisse einer Operation gehen in weitere Operationen ein.
- **Kurzschlussauswertung:** Eine boolesche Verknüpfung kann das Auswerten weiterer Teile vermeiden.

**Zentrale Unterscheidungen:** Zuweisung und Gleichheitsvergleich sind verschiedene Vorgänge. Ebenso sind `3` und `"3"` unterschiedliche Werte.

## 4. Anweisungen und sequentieller Ablauf

- **Anweisung / Statement:** Ein auszuführender Programmschritt.
- **Sequenz:** Mehrere Schritte werden in einer bestimmten Reihenfolge ausgeführt.
- **Abhängigkeit:** Ein späterer Schritt benötigt ein früheres Ergebnis.
- **Zustandsänderung:** Eine Anweisung verändert den Zustand.
- **Seiteneffekt:** Beispielsweise Ausgabe, Dateizugriff oder Veränderung eines bestehenden Objekts.

**Begriffliche Einordnung:** „Statement“ ist ein Oberbegriff. Verzweigungen und Schleifen sind bestimmte Formen von Anweisungen beziehungsweise Kontrollstrukturen.

**Verständnisziel:** Den Ablauf schrittweise nachverfolgen: Was geschieht als Nächstes, und welche Werte liegen danach vor?

## 5. Kontrollfluss: Entscheidungen und Wiederholungen

- **Bedingung:** Ein Ausdruck, dessen Ergebnis darüber entscheidet, wie es weitergeht.
- **Verzweigung:** Einen von mehreren Ausführungspfaden wählen.
- **Alternative / Fallunterscheidung:** `if`, `else` und weitere Fälle.
- **Schleife:** Einen Ablauf wiederholen.
- **Iteration:** Ein einzelner Schleifendurchlauf.
- **Bedingungsgesteuerte Wiederholung:** Wiederholen, solange eine Bedingung erfüllt ist.
- **Iteration über Elemente:** Eine Sammlung elementweise durchlaufen.
- **Zähler und Akkumulator:** Durchläufe zählen oder Ergebnisse sammeln.
- **Abbruchbedingung / Terminierung:** Wann endet die Wiederholung?
- **Endlosschleife:** Absichtlich oder versehentlich unbegrenzte Wiederholung.
- **Vorzeitiger Abbruch / Überspringen:** Beispielsweise `break` und `continue`.
- **Verschachtelung:** Entscheidungen und Schleifen innerhalb anderer Strukturen.

**Zentrale Einsicht:** Eine Bedingung muss kein Vergleich sein. Sie kann auch unmittelbar ein boolescher Wert oder eine Verknüpfung mehrerer Bedingungen sein.

## 6. Funktionen: benannte, wiederverwendbare Abläufe

- **Definition und Aufruf:** Einen Ablauf beschreiben versus ihn ausführen.
- **Parameter und Argument:** Die vorgesehenen Eingaben versus die beim Aufruf übergebenen Werte.
- **Rückgabewert:** Ein Ergebnis an den aufrufenden Code zurückgeben.
- **Rückkehr:** Nach dem Aufruf geht die Ausführung an der Aufrufstelle weiter.
- **Lokaler und globaler Gültigkeitsbereich:** Wo ist ein Name verfügbar?
- **Seiteneffekte einer Funktion:** Was verändert sie zusätzlich zu ihrem Rückgabewert?
- **Komposition:** Das Ergebnis einer Funktion wird Eingabe einer anderen.

**Verständnisziel:** „Ausgeben“ und „Zurückgeben“ unterscheiden können.

Funktionen gehören zum Einstieg, auch wenn Lernende zunächst nur vorhandene Funktionen benutzen.

## 7. Zusammengesetzte Daten und Datenstrukturen

- **Sammlung / Container:** Mehrere Werte zusammenfassen.
- **Liste / Array:** Geordnete Folge von Elementen.
- **Index:** Ein Element über seine Position ansprechen.
- **Länge und Indexgrenzen:** Wie viele Elemente existieren, und welche Positionen sind gültig?
- **Dictionary / Map:** Werte über Schlüssel ansprechen.
- **Datensatz / Objekt:** Zusammengehörige Eigenschaften bündeln.
- **Geschachtelte Daten:** Beispielsweise eine Liste von Datensätzen.
- **Zugriff und Veränderung:** Elemente lesen, hinzufügen, ersetzen und entfernen.
- **Iteration über Datenstrukturen:** Elemente systematisch verarbeiten.
- **Zeichenketten als bearbeitbare Textdaten:** Suchen, zerlegen und zusammensetzen.

**Mögliche Erweiterungen:** Mengen und Tupel. Für den Einstieg haben Listen und Schlüssel-Wert-Strukturen zunächst höhere Priorität.

## 8. Veränderbarkeit, Referenzen und gemeinsame Daten

- **Veränderbar / unveränderbar:** Kann ein bestehender Wert verändert werden?
- **Referenz:** Mehrere Namen können dasselbe Objekt ansprechen.
- **Kopie:** Eine eigenständige Datenstruktur erzeugen.
- **Identität und Gleichheit:** Dasselbe Objekt versus gleicher Inhalt.
- **Neuzuweisung versus Veränderung:** Einen Namen neu zuordnen oder ein vorhandenes Objekt verändern.

**Bedeutung für das Verständnis:** Diese Begriffe erklären viele ansonsten überraschende Effekte beim Umgang mit Listen, Dictionaries und Funktionsargumenten.

## 9. Eingabe, Verarbeitung und Ausgabe

- **Datenquelle:** Tastatur, Datei, Webseite, Sensor oder anderer Programmteil.
- **Eingabeformat:** In welcher Darstellung kommen Daten an?
- **Parsing:** Eine Darstellung in verwendbare Daten überführen.
- **Validierung:** Prüfen, ob Daten die erwarteten Bedingungen erfüllen.
- **Verarbeitung / Transformation:** Berechnen, filtern, sortieren und zusammenfassen.
- **Ausgabe:** Anzeigen, speichern oder weitergeben.
- **Formatierung / Serialisierung:** Ergebnisse in eine geeignete Darstellung bringen.
- **Persistenz:** Daten können einen einzelnen Programmlauf überdauern.

**Grundmodell:** Eingabe → Verarbeitung → Ausgabe.

## 10. Vorhandenen Code verwenden

- **Bibliothek / Modul:** Bereits vorhandene Funktionalität nutzen.
- **Import:** Funktionalität im eigenen Code verfügbar machen.
- **Namensraum:** Woher stammt ein Name?
- **Schnittstelle:** Welche Eingaben werden erwartet, und welche Ergebnisse werden geliefert?
- **Dokumentation:** Bedeutung, Voraussetzungen und Verwendung nachschlagen.
- **Objekt, Attribut und Methode:** Vorhandene Objekte verstehen und verwenden.

**Didaktische Einordnung:** Das Benutzen von Objekten gehört früh dazu. Das Entwerfen eigener Klassen kann später kommen.

## 11. Ereignisse, Zeit und asynchrone Abläufe

- **Ereignis:** Beispielsweise Klick, Tastendruck oder Ablauf eines Timers.
- **Ereignisbehandlung:** Code wird als Reaktion auf ein Ereignis ausgeführt.
- **Callback:** Eine Funktion wird übergeben, damit sie später aufgerufen werden kann.
- **Registrierung:** Festlegen, welcher Code auf welches Ereignis reagiert.
- **Synchron / asynchron:** Ein Ergebnis steht unmittelbar oder erst später zur Verfügung.
- **Warten auf Ergebnisse:** Abhängige Schritte benötigen ein noch ausstehendes Ergebnis.

**Zentrale Einsicht:** Die Reihenfolge im Quelltext erklärt nicht immer die zeitliche Reihenfolge der Ausführung.

**Einordnung:** Dieser Bereich ist besonders für JavaScript und interaktive Anwendungen wichtig. Seine Vertiefung hängt vom Anwendungskontext ab.

## 12. Fehler finden und Verständnis überprüfen

- **Syntaxfehler:** Code ist sprachlich ungültig.
- **Laufzeitfehler / Ausnahme:** Eine Operation scheitert während der Ausführung.
- **Logischer Fehler:** Code läuft, liefert aber das falsche Ergebnis.
- **Fehlermeldung und Aufrufkette:** Wo ist was gescheitert?
- **Fehlerbehandlung:** Wie reagiert das Programm auf erwartbare Probleme?
- **Tracing / Debugging:** Ablauf und Werte schrittweise beobachten.
- **Testfall:** Eingabe und erwartetes Verhalten gegenüberstellen.
- **Randfall:** Leere Eingabe, Null, erstes oder letztes Element, ungültiger Wert.
- **Terminierung und Aufwand:** Endet der Ablauf, und wie wächst seine Arbeit mit der Datenmenge?
- **Algorithmus:** Eine nachvollziehbare Vorgehensweise zur Lösung einer Aufgabe, zunächst ohne formale Komplexitätstheorie.

**Didaktische Einordnung:** Fehlerverständnis und die Überprüfung eigener Vorhersagen gehören zum Kern des Lernziels „Code verstehen“.

## Ergänzung: HTML und Dokumentstruktur

Für den Einstieg über HTML und JavaScript kommen folgende Begriffe hinzu:

- **Element:** Ein Bestandteil eines HTML-Dokuments.
- **Attribut:** Eine zusätzliche Angabe zu einem Element.
- **Verschachtelung:** Elemente können andere Elemente enthalten.
- **Dokumentstruktur:** Der hierarchische Aufbau eines Dokuments.
- **DOM (Document Object Model):** Die als Objekte zugängliche Darstellung des Dokuments, die durch JavaScript gelesen und verändert werden kann.

**Abgrenzung:** HTML beschreibt Struktur und Inhalt. JavaScript bringt die ausführbaren Abläufe hinzu. Diese Unterscheidung hilft, unterschiedliche Arten von Code zu verstehen.

## Vorläufiger gemeinsamer Kern

Die zentralen Themen lassen sich als folgende begriffliche Folge zusammenfassen:

**Werte → Ausdrücke → Anweisungen → Zustand → Kontrollfluss → Funktionen → Datenstrukturen → Ein-/Ausgabe → vorhandene Funktionalität → Fehlerverständnis**

Ereignisse und asynchrone Abläufe ergänzen diesen Kern abhängig vom Anwendungskontext. Die Folge ist keine verbindliche Unterrichtsreihenfolge.

## Zweite Achse: Tiefe des Verständnisses

Zu jedem Begriff beziehungsweise Themenbereich lässt sich prüfen, ob Lernende ihn:

1. **Erkennen:** Den betreffenden Bestandteil im Code identifizieren können.
2. **Erklären:** Seine Bedeutung und Aufgabe beschreiben können.
3. **Vorhersagen:** Seine Wirkung auf Ablauf, Daten und Ergebnis bestimmen können.
4. **Änderungen beurteilen:** Die Folgen einer kleinen Änderung nachvollziehen können.

Diese zweite Achse macht aus der Begriffsliste ein mögliches Verständnisprofil. Die konkrete Ausgestaltung eines Kurses oder einer Lern-App bleibt der weiteren Diskussion vorbehalten.
