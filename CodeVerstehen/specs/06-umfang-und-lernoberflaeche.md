# Umfang, Lernoberfläche und Ergebniszählung

Status: Umfang Kapitel 1, dauerhaft sichtbare Kurzskizze und Erklärung, Aufgabenbereich rechts daneben sowie Absenden als Zähleinheit sind vereinbart. Detailverhalten und Darstellung sind Vorschläge.
Datum: 12. Oktober 2026

Hostinganforderung: Betrieb auf dem vorhandenen WordPress-Webserver ohne separaten Node-/npm-Prozess. Oberfläche und Lernlogik sind browserseitig lauffähig auszulegen; siehe [WordPress-Hosting](09-wordpress-hosting.md).

## Umfang der ersten Version

Die erste Version behandelt ausschließlich Kapitel 1: geradlinige Programme, Werte, Ausdrücke, Anweisungen, Variablen, Zuweisungen und Zustand. Der bisherige Prototyp ist ein Ausgangspunkt; weitere Kapitel werden nicht implementiert.

Die sechs vereinbarten Interaktionsformen und drei Schwierigkeiten werden für geeignete Aufgabenfamilien dieses Kapitels verwendet. Nicht jede Aufgabenfamilie benötigt jede Form oder jede Schwierigkeit. Welche Inhalte der umfassenden Stufe 1 im ersten Aufgabenbestand vertreten sind, wird bei dessen Kuration festgelegt und vor Implementierung aufgelistet.

## Dauerhaft sichtbare Lernbegleitung

Links befindet sich ein kompakter Bereich mit:

- Einer Kurzskizze: Was wird in diesem Kapitel gelernt?
- Einer verständlichen Erklärung des Lerninhalts, einschließlich passender Beispiele.

Beides bleibt während der Bearbeitung sichtbar. Rechts daneben befindet sich der Aufgabenbereich mit Arbeitsauftrag, aktuellem Code beziehungsweise Diagramm, Antwortinteraktion, Absenden und anschließender Rückmeldung.

Die sichtbare Erklärung ist beabsichtigte Lernunterstützung. Aufgaben werden nicht als Prüfung ohne Hilfsmittel dargestellt. Die Erklärung darf das Prinzip erläutern, zeigt aber nicht automatisch die konkrete Lösung der aktuellen Variante.

Die Erklärung muss für Lernende verständlich sein; sie wird deshalb getrennt vom verdichteten LLM-Hauptteil eines Skills gepflegt. Ihre genaue Ablage und Zuordnung zu Kapitel beziehungsweise Aufgabenfamilie sind im Formatentwurf vorgeschlagen.

Vorgeschlagene UI-Ergänzungen:

- Schwierigkeit mit drei Stufen direkt sichtbar und einstellbar.
- Bei genügend Breite zwei Spalten und bei längerem Inhalt unabhängig scrollbare Bereiche.
- Auf schmalen Ansichten kompakter sichtbarer Erklärungsbereich und Aufgaben darunter. Die konkrete responsive Gestaltung ist noch zu prüfen; die Erklärung verschwindet nicht hinter einem ausschließlich optionalen Dialog.
- Rückmeldung und Schaltfläche für die nächste Aufgabe im Aufgabenbereich.

## Zähleinheit: Absenden

Eine Aufgabe im Sinne der Ergebniszählung ist eine bearbeitete Situation, deren Antwort über „Absenden“ abgegeben wird. Zwei oder drei angekreuzte Aussagen innerhalb einer Mehrfachauswahl zählen zusammen als eine Abgabe, nicht als mehrere Aufgaben.

Für jede akzeptierte Abgabe wird genau ein Ergebnis festgehalten: richtig oder falsch. Bei Mehrfachauswahl ist die gesamte Abgabe richtig, wenn genau alle richtigen Alternativen gewählt und keine falschen gewählt wurden. Detailinformationen können gezielte Rückmeldungen unterstützen, erzeugen aber keine zusätzlichen Ergebniszähler.

Ein nicht ausgefülltes Pflichtfeld oder eine Abgabe, die technisch nicht angenommen beziehungsweise geprüft werden kann, erzeugt kein falsches Ergebnis. Mehrfaches versehentliches Klicken erzeugt nicht mehrere Ergebnisse derselben Abgabe.

Falls eine erneute Bearbeitung angeboten wird, ist das erneute Absenden eine weitere Abgabe. Der Bezug zur ursprünglichen Aufgabe und erhaltene Hinweise bleiben gespeichert. Eine Anzeige „Abgaben“ ist deshalb eindeutiger als „unterschiedliche Aufgaben“.

Vorherige Annahmen, wonach ausschließlich der Erstversuch den Zähler verändert, sind damit ersetzt. Die App benötigt keine Gewichtungsformel für Hinweise oder Wiederholungen.

## Enge Aufgabenführung

Aufgabentypen, erlaubte Programmstrukturen, Kriterien und Antwortformate sind vorgegeben. Das LLM wählt und parametrisiert freigegebene Vorlagen. Es erfindet keine neuen Interaktionsformen, beliebigen Programme oder freien Lösungsschlüssel.

Die Regeln zur gleichen Wortanzahl bleiben verbindlich. Gegen grobe Fehler werden feste Struktur, fachlich kuratierte Aussagen und deterministische Prüfung kombiniert. Ein eng geführtes LLM allein ersetzt diese Prüfung nicht.

## Vorgesehene Abnahme

- Die erste Version bietet ausschließlich Aufgaben aus Kapitel 1.
- Kurzskizze und Erklärung bleiben während der Aufgabenbearbeitung sichtbar.
- Der Aufgabenbereich enthält eine eindeutig beschriftete Schaltfläche „Absenden“.
- Eine Mehrfachauswahl erzeugt je akzeptierter Abgabe genau ein Ergebnis.
- Wiederholte Abgaben bleiben nachvollziehbar, ohne zusätzliche Kompetenzwerte zu berechnen.
- Doppelabgaben derselben Übermittlung werden verhindert beziehungsweise erkannt.
- Aufgabenergebnisse stammen aus dem freigegebenen Lösungsschlüssel.
