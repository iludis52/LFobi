# Grundlagen der Programmierung: Didaktische Progression

## Didaktisches Grundprinzip

Einsteiger sollen Code **erkennen, erklären, seine Wirkung vorhersagen und die Folgen kleiner Änderungen beurteilen** können. Eigener Code und KI-generierter Code dienen dazu, dieses Verständnis aufzubauen und zu überprüfen.

Für jede Lernstufe wird derselbe Lernzyklus verwendet:

1. **Beobachten:** Ein kleines, bereits funktionierendes Programm ausführen.
2. **Vorhersagen:** Vor einer weiteren Ausführung Ergebnis oder Ablauf bestimmen.
3. **Nachverfolgen:** Die tatsächlich ausgeführten Schritte und Werte erklären.
4. **Verändern:** Eine kleine Änderung vornehmen und deren Wirkung begründen.
5. **Übertragen:** Das gleiche Prinzip in einem anderen Beispiel erkennen.

Eigene Programme oder KI-generierter Code können anschließend dazukommen. Entscheidend ist, dass Lernende ihre Erklärung **vor der Ausführung** festlegen: Ein plausibel klingender Kommentar ist noch kein Nachweis für Verständnis.

Fehlerverständnis und das Prüfen eigener Vorhersagen begleiten **alle Stufen**. Sie werden nicht erst am Ende eingeführt.

Die folgenden Stufen sind **Verständnisstufen, keine festen Unterrichtseinheiten**. Der Übergang zur nächsten Stufe richtet sich nach dem erreichten Verständnis, nicht allein nach der verstrichenen Unterrichtszeit.

## Status, Ziel und Abgrenzung

**Status:** Zweites Zwischenergebnis des Brainstormings  
**Datum:** 11. Oktober 2026  
**Zielgruppe:** Einsteiger in die Programmierung, insbesondere im Rahmen einer Einführung in KI  
**Grundlage:** [Begriffs- und Themenliste](programmierung-grundlagen-zwischenergebnis.md)

Die Begriffsordnung beschreibt, **was** verstanden werden soll. Die didaktische Ordnung berücksichtigt zusätzlich, **welches Verständnis jeweils vorausgesetzt wird**.

Im Mittelpunkt stehen die Ausführung eines Programms und die Bedeutung seiner Bestandteile. Softwarearchitektur, Projektorganisation und Deployment bleiben außerhalb des allgemeinen Anfängerkerns.

## Einordnung und Verbesserung des ersten Entwurfs

- **Bedingungen und Verzweigungen vor Schleifen:** Entscheidungen sind zunächst einfacher nachzuverfolgen als wiederholte Zustandsänderungen. Danach lassen sich bedingungsgesteuerte Schleifen erklären.
- **Funktionen früh benutzen, später selbst definieren:** `print()` oder `len()` können Anfänger verstehen und verwenden, bevor sie eigene Funktionen schreiben.
- **Typumwandlung früh einführen:** Sobald Eingaben als Text vorliegen, wird sie gebraucht. Allgemeines Parsing kommt später.
- **Dictionaries von Funktionen entkoppeln:** Sie erweitern das Verständnis von Datenstrukturen und gehören deshalb in deren Lernstufe.
- **Ereignisse einmal systematisch behandeln:** Ereignisbehandlung setzt Funktionen voraus und erhält eine eigene Stufe.
- **OOP als Erweiterung führen:** Vererbung und Beziehungen zwischen Klassen liegen überwiegend jenseits des allgemeinen Anfängerkerns.

## Stufe 1: Ein geradliniges Programm verstehen

**Leitfrage:** Was passiert Schritt für Schritt, und welche Werte entstehen dabei?

Den Anfang macht ein kleines Programm ohne Verzweigung und Wiederholung: Werte festlegen, etwas berechnen, Ergebnis ausgeben.

### Begriffe und Themen

- Programm, Code, Programmiersprache
- Syntax, Semantik, Ausführung, Laufzeit
- Kommentar
- Wert, Literal, Datentyp
- `int`, `float`, `bool`, Zeichenkette beziehungsweise `string`/`str`
- Variable, Name, Zuweisung, Initialisierung
- Werte lesen, Zuordnungen aktualisieren, Zustand
- Ausdruck, Operator, Operand
- Arithmetische Operationen, Auswertungsreihenfolge, Klammern, zusammengesetzte Ausdrücke
- Anweisung beziehungsweise Statement
- Sequenz, Abhängigkeit, Zustandsänderung
- Ausgabe und erste Verwendung eines Funktionsaufrufs
- Grundmodell Eingabe → Verarbeitung → Ausgabe

### Didaktische Begrenzung

Die vier Grundtypen kennenlernen, aber noch nicht sämtliche Operationen darauf behandeln. Eingaben können zunächst vorgegebene Werte sein. Die konkrete Typaufteilung und die Bezeichnungen unterscheiden sich zwischen Sprachen; feinere Typunterscheidungen bleiben ausgeklammert.

### Verständnisnachweis

Die Lernenden können für wenige aufeinanderfolgende Anweisungen die Ausgabe und den Zustand nach jedem Schritt bestimmen. Sie unterscheiden beispielsweise `3` und `"3"`.

## Stufe 2: Eingaben prüfen und Entscheidungen verstehen

**Leitfrage:** Warum führt ein Programm unter verschiedenen Bedingungen unterschiedliche Schritte aus?

Jetzt kommen echte Benutzereingaben und einfache Entscheidungen hinzu.

### Begriffe und Themen

- Eingabe, Datenquelle, Eingabeformat
- Typumwandlung beziehungsweise Typecasting
- Vergleich: gleich, ungleich, größer, kleiner
- Unterschied zwischen Zuweisung und Gleichheitsvergleich
- Bedingung, boolescher Wert
- Boolesche Verknüpfungen: UND, ODER, NICHT
- Verzweigung, Alternative, Fallunterscheidung
- Block, Einrückung, erste Verschachtelung
- Validierung
- Fehlender Wert: `None`/`null`, unterschieden von der Zahl `0`, dem Wahrheitswert `False` und einer leeren Zeichenkette

### Spätere Vertiefung innerhalb dieser Stufe

Kurzschlussauswertung. Zunächst genügen einzelne Bedingungen; zusammengesetzte Bedingungen folgen nach sicherem Verständnis einfacher Verzweigungen.

### Verständnisnachweis

Die Lernenden können für mehrere Eingaben bestimmen, welcher Zweig ausgeführt wird, und eine Grenzbedingung wie „ab 18“ korrekt erklären.

## Stufe 3: Wiederholungen und veränderlichen Zustand verstehen

**Leitfrage:** Was wiederholt sich, was verändert sich dabei, und warum endet die Wiederholung?

Zuerst eine überschaubare, feste Anzahl von Wiederholungen; danach eine Wiederholung, deren Ende von einer Bedingung abhängt.

### Begriffe und Themen

- Kontrollfluss
- Schleife, Iteration
- Zähler, Akkumulator
- Bedingungsgesteuerte Wiederholung
- Abbruchbedingung, Terminierung
- Endlosschleife, absichtlich oder versehentlich
- Vorzeitiger Abbruch und Überspringen: `break`, `continue`
- Verschachtelte Schleifen und Verzweigungen als spätere Vertiefung
- Algorithmus als nachvollziehbare Vorgehensweise

### Didaktische Begrenzung

Verschachtelte Schleifen erst dann behandeln, wenn einzelne Schleifen sicher nachverfolgt werden können. Eine Endlosschleife zunächst als Folge einer unverändert bleibenden Bedingung verstehen.

### Verständnisnachweis

Die Lernenden können eine Tabelle der Durchläufe ausfüllen: Zustand vorher, Bedingung, ausgeführte Schritte, Zustand danach. Sie können erklären, ob und warum die Schleife endet.

## Stufe 4: Mehrere Werte gemeinsam verarbeiten

**Leitfrage:** Wie arbeitet ein Programm mit einer Sammlung statt nur mit einzelnen Werten?

Listen machen jetzt einen praktischen Unterschied: Der gleiche Ablauf kann unterschiedlich viele Daten verarbeiten.

### Begriffe und Themen

- Sammlung, Container, Datenstruktur
- Liste beziehungsweise Array
- Element, Index, Länge, Indexgrenzen
- Elemente lesen, hinzufügen, ersetzen und entfernen
- Iteration über Elemente und Datenstrukturen
- Dictionary beziehungsweise Map
- Schlüssel-Wert-Zuordnung
- Datensatz als Bündel zusammengehöriger Angaben
- Zeichenketten bearbeiten: suchen, zerlegen, zusammensetzen
- Transformation: berechnen, filtern, sortieren, zusammenfassen
- Erste Verwendung von `len()` und Methoden vorhandener Objekte

### Reihenfolge innerhalb der Stufe

1. Liste lesen und elementweise durchlaufen.
2. Liste verändern.
3. Zugriff über Position mit Zugriff über Schlüssel vergleichen.
4. Einfache Dictionaries verwenden.

Mengen und Tupel sind **optionale Ergänzungen**.

### Verständnisnachweis

Die Lernenden können den passenden Zugriff wählen und die Wirkung einer Verarbeitung auf eine Liste oder ein Dictionary erklären.

## Stufe 5: Eigene Funktionen und vorhandene Bausteine verstehen

**Leitfrage:** Wie lässt sich ein Ablauf benennen, mit Eingaben versehen und wiederverwenden?

Funktionsaufrufe sind bereits bekannt. Jetzt wird sichtbar, was hinter einem Aufruf steckt.

### Begriffe und Themen

- Funktion, Definition, Aufruf
- Parameter, Argument
- Rückgabewert, Rückkehr zum aufrufenden Code
- Unterschied zwischen Ausgabe und Rückgabe
- Lokaler und globaler Gültigkeitsbereich
- Seiteneffekt: Ausgabe oder Veränderung zusätzlich zum Ergebnis
- Funktionskomposition: Das Ergebnis einer Funktion wird Eingabe einer anderen
- Bibliothek, Modul, Import
- Namensraum
- Schnittstelle: erwartete Eingaben und gelieferte Ergebnisse
- Dokumentation
- Objekt, Attribut und Methode beim Benutzen vorhandener Funktionalität

### Zentrale Einsicht

Eine Funktionsdefinition führt den beschriebenen Ablauf noch nicht aus. Der Aufruf löst ihn aus.

### Verständnisnachweis

Die Lernenden können einen Aufruf verfolgen, Argumente den Parametern zuordnen und erklären, wo ein Rückgabewert weiterverwendet wird.

## Stufe 6: Realistischere Daten und Fehlerfälle verstehen

**Leitfrage:** Was wird schwieriger, wenn Daten geschachtelt, gemeinsam verwendet oder von außen eingelesen werden?

Diese Stufe führt vom elementaren Anfängerwissen zum belastbaren Lesen kleiner realer Programme.

### Begriffe und Themen

- Geschachtelte Daten, beispielsweise eine Liste von Dictionaries
- Veränderbarkeit und Unveränderbarkeit
- Referenz: Mehrere Namen sprechen dasselbe Objekt an
- Kopie
- Identität und Gleichheit
- Neuzuweisung versus Veränderung eines vorhandenen Objekts
- Veränderung von Daten durch Funktionsaufrufe
- Parsing: Eine äußere Darstellung in verwendbare Daten überführen
- Formatierung und Serialisierung
- Dateien als Datenquelle und Ausgabeziel
- Persistenz
- Ausnahmen und gezielte Fehlerbehandlung

### Didaktische Begrenzung

Referenzen an einem konkreten Beispiel erklären, in dem zwei Namen dieselbe Liste ansprechen. Tief verschachtelte Kopien oder komplizierte Objektmodelle können später folgen.

### Verständnisnachweis

Die Lernenden können ein kleines Programm erklären, das Daten einliest, prüft, verarbeitet und speichert. Sie erkennen, wann eine Änderung auch an anderer Stelle sichtbar wird.

## Stufe 7: Ereignisgesteuerte Programme verstehen

**Leitfrage:** Wann wird welcher Code ausgeführt, wenn die Ausführung durch äußere Ereignisse angestoßen wird?

Für interaktive Anwendungen ist dies ein wichtiger Anfängerbaustein. Für einen ersten Python-Kurs mit linearen Datenverarbeitungsprogrammen kann die Stufe später folgen.

### Begriffe und Themen

- Ereignis
- Ereignisbehandlung
- Registrierung einer Ereignisbehandlung
- Callback
- Klick, Tastendruck, Timer als Auslöser
- Zustand zwischen mehreren Ereignissen
- Unterschied zwischen Registrierung und tatsächlichem Aufruf

### Weiterführende Ergänzungen

- Synchron und asynchron
- Später verfügbare Ergebnisse
- Warten auf Ergebnisse
- Abhängigkeiten bei zeitlich versetzter Ausführung

Die asynchronen Ergänzungen erst behandeln, wenn einfache Ereignisbehandlung verstanden ist.

### Verständnisnachweis

Die Lernenden können erklären, was beim Start passiert, was erst beim Klick ausgeführt wird und warum ein Callback bei seiner Registrierung noch nicht ausgeführt werden soll.

## Stufe 8: Weiterführende Programmierkonzepte

**Leitfrage:** Wie werden größere Zusammenhänge modelliert, und welche Eigenschaften haben verschiedene Lösungswege?

Diese Stufe liegt **über dem allgemeinen Anfängerkern**. Sie enthält mehrere eigenständige Vertiefungsrichtungen.

| Bereich | Begriffe und Themen | Voraussetzung |
| --- | --- | --- |
| Eigene Objektmodelle | OOP, Klasse, Instanz, eigene Attribute und Methoden, Konstruktor, Kapselung | Funktionen, Zustand, vorhandene Objekte |
| Beziehungen zwischen Objekten | Assoziation, Aggregation, Objektkomposition | Eigene Objektmodelle |
| Erweiterung von Objektmodellen | Vererbung, Überschreiben, Polymorphie | Klassen und Methoden |
| Algorithmische Vertiefung | Aufwand in Abhängigkeit von der Datenmenge, Zeit- und Speicherbedarf, formale Komplexität | Schleifen, Datenstrukturen, Algorithmen |
| Asynchrone Vertiefung | Mehrere ausstehende Vorgänge, Fehler und Zustandsänderungen bei asynchronen Abläufen | Ereignisse und einfache asynchrone Abläufe |

**Begriffliche Klarstellung:** Funktionskomposition aus Stufe 5 und Objektkomposition aus der OOP sind unterschiedliche Verwendungen des Wortes „Komposition“.

Assoziation, Aggregation und Komposition werden nur vertieft, wenn das Modellieren eigener Objekte tatsächlich Lernziel wird. Als vollständiges Begriffspaket sind sie für den Einstieg nicht erforderlich.

## Durchgehender Lernstrang: Fehler verstehen und Aussagen überprüfen

Diese Themen bekommen keinen einzelnen Einführungstermin, sondern wachsen mit:

| Ab Stufe | Begleitende Themen |
| --- | --- |
| 1 | Syntaxfehler, einfache logische Fehler, Ausgaben vorhersagen, Ablauf und Werte nachverfolgen |
| 2 | Laufzeitfehler, ungültige Eingaben, Testfälle und Grenzwerte |
| 3 | Schleifenfehler, Terminierung, Zählfehler |
| 4 | Leere Sammlungen, ungültige Indizes, weitere Randfälle |
| 5 | Fehlermeldungen und Aufrufketten über mehrere Funktionen verfolgen |
| 6 | Ausnahmen gezielt behandeln und unterschiedliche Fehlerursachen unterscheiden |

**Tracing und Debugging** beginnen schon in Stufe 1. Werkzeuge können später dazukommen; zunächst reichen das gedankliche Ausführen und eine Zustandstabelle.

Dabei werden Syntaxfehler, Laufzeitfehler und logische Fehler zunehmend bewusst voneinander unterschieden. Testfälle und Randfälle dienen dazu, eigene Erklärungen und Erwartungen zu überprüfen.

## Ergänzender Lernstrang für HTML und JavaScript

HTML wird parallel als eigene Art von Code eingeführt:

- **Früh:** Element, Attribut, Verschachtelung und Dokumentstruktur.
- **Nach Datenstrukturen und dem Benutzen von Objekten:** DOM als zugängliche Darstellung des Dokuments; Elemente lesen und verändern.
- **Bei Ereignissen:** Benutzeraktionen mit Änderungen am Dokument verbinden.

Dokumentbeschreibung und ausführbarer Programmablauf bleiben begrifflich klar und werden praktisch miteinander verbunden.

## Übersicht der Lernprogression

| Stufe | Schwerpunkt | Einordnung |
| --- | --- | --- |
| 1 | Geradlinige Abläufe, Werte, Ausdrücke, Anweisungen und Zustand | Elementarer Anfängerkern |
| 2 | Eingaben, Bedingungen und Entscheidungen | Elementarer Anfängerkern |
| 3 | Wiederholungen und Zustandsveränderungen | Elementarer Anfängerkern |
| 4 | Sammlungen und Verarbeitung mehrerer Werte | Anfängerkern |
| 5 | Eigene Funktionen und vorhandene Bausteine | Anfängerkern |
| 6 | Realistischere Daten, Referenzen und Fehlerbehandlung | Aufbauendes Anfängerwissen |
| 7 | Ereignisgesteuerte Programme | Kontextabhängiges Anfängerwissen; asynchrone Abläufe als Erweiterung |
| 8 | Eigene Objektmodelle und weitere Vertiefungen | Über dem allgemeinen Anfängerniveau |

**Progression:** Geradlinige Abläufe → Entscheidungen → Wiederholungen → Sammlungen → eigene Funktionen → realistischere Daten → Ereignisse.

OOP und weitere Vertiefungen folgen auf einem bereits aufgebauten Verständnis. Ein Anfänger muss nicht jeden Begriff gleich tief beherrschen; jede Stufe sollte aber an einer konkreten Fähigkeit erkennbar sein.

Die konkrete Ausgestaltung eines Kurses oder einer Lern-App bleibt der weiteren Diskussion vorbehalten.
