# Von der Lehridee zur Lern-App: Engineering im Dialog mit KI

Arbeitsfassung für das Seminar am 29. Oktober 2026 und das anschließende Brainstorming.

## 1. Grundlage und Aussagegrenzen

Dieses Protokoll rekonstruiert die Entwicklung von „Code verstehen“ anhand der zugänglichen Projekt-Chats, der lokalen Spezifikationen und des aktuellen Quellcodes. Die sichtbare App wurde am 29. Oktober zusätzlich auf einem separaten lokalen Prüfserver im Demo-Modus angesehen; eine falsche Abgabe, die lokale Rückmeldung und der anschließende Adaptionshinweis wurden nachvollzogen. Es wurden dabei keine externen Modelle angesprochen.

Ausgewertet wurden die Chats „Grundbegriffe der Programmierung ord“, „Entwurf_Programmierlernapp“, „Aufgabentypen und Schwierigkeitsgrad“, „Aufgabentypen und Layout überarbeite“ und „Adaptive Aufgabenplanung prüfen“, einschließlich der älteren Seiten der beiden umfangreicheren Entwurfs-Chats. Damit ist auch der Beginn erfasst, der ursprünglich im anderen Projektordner lag. Dies ist keine Behauptung, sämtliche möglicherweise außerhalb dieser Chats geführten Gespräche zu kennen.

Die folgenden Entwicklungsschritte sind durch diese Quellen belegt. Die Einordnung in klassische Engineering-Disziplinen und die Beispiele für Geschichte und Deutsch sind nachträgliche Synthese beziehungsweise Vorschläge. Historische Prüfberichte werden als solche wiedergegeben; für dieses Protokoll wurde keine vollständige neue Testabnahme durchgeführt. Ein Git-Verlauf steht im aktuellen Arbeitsordner nicht zur Verfügung.

**Leitthese:** Das Schreiben des Codes wurde an die Entwicklungs-KI ausgelagert. Problemklärung, didaktische Modellierung, Anforderungen, Architekturentscheidungen, Qualitätsmaßstäbe und Abnahme entstanden im Dialog. Die pädagogische Zielsetzung und die fachliche Freigabe blieben Aufgaben des Menschen.

## 2. Die generalisierte Grundidee

Ausgangspunkt war eine konkrete Unterrichtssituation: ungefähr 30 Studierende sollen in KI und Programmierung eingeführt werden. Der Dozent stellte die These auf, dass im Zeitalter KI-generierten Codes das Verstehen, Prüfen und Beurteilen von Code stärker gewichtet werden müsse.

Die zunächst noch technikunabhängige Idee lautete:

> Lernende sollen grundlegende Zusammenhänge an kleinen Beispielen verstehen, ihre Wirkung vorhersagen und Änderungen beurteilen können. Ein interaktives Lernwerkzeug soll diese Leistungen sichtbar machen und passende Übung und Rückmeldung anbieten.

Die übertragbare Produktidee ist damit eine Lernumgebung mit kuratierten Lernzielen, kurzen überprüfbaren Interaktionen, Variation und gezielter Unterstützung. Das LLM kam als Mittel zur Gestaltung von Varianten und Hilfen hinzu.

Eine zweite Zielsetzung war ausdrücklich Bestandteil des konkreten Kurses: Studierende sollten lokale Modelle über LM Studio installieren und betreiben lernen. Die Wahl eines lokalen Modells erfüllte damit selbst ein Lernziel. Für schwächere Rechner wurde ein externer API-Anbieter als Alternative vorgesehen.

**Für Seminarteilnehmer:** Zuerst Zielgruppe, Lernproblem, Nutzungssituation und erwünschte Veränderung beschreiben. Die Aussage „Ich möchte eine App mit KI“ reicht dafür nicht aus.

## 3. Der tatsächlich durchlaufene Entwicklungsweg

### Phase A: Fachlichen Raum und Lernweg klären – 11. Oktober

Der Mensch brachte eine aus Lehrerfahrung gewonnene Liste grundlegender Programmierbegriffe ein. Die KI ergänzte, unterschied und ordnete sie. Daraus entstand zunächst eine Begriffslandkarte: Werte, Ausdrücke, Anweisungen, Zustand, Kontrollfluss, Funktionen, Sammlungen und weitere Themen.

Erst danach wurde diese Inhaltsordnung in eine didaktische Progression überführt. Voraussetzungen wurden sichtbar: Bedingungen und Verzweigungen vor Schleifen, Funktionen zunächst benutzen und später selbst definieren, komplexere Objektkonzepte als Vertiefung.

Als gemeinsames Grundprinzip wurde festgehalten:

**Beobachten → Vorhersagen → Nachverfolgen → Verändern → Übertragen.**

Zwei Markdown-Zwischenergebnisse sicherten diese Arbeit. Damit lag vor der detaillierten App-Spezifikation bereits ein fachliches und didaktisches Modell vor.

### Phase B: Frühen Prototyp erproben – 11./12. Oktober

Der Nutzer schlug eine Web-App mit lokalem kleinen beziehungsweise mittleren LLM vor; ein externer Dienst sollte eine Alternative bilden. Auf seinen Auftrag entstand ein erster Prototyp mit einer Lektion, Python-/JavaScript-Darstellung, Modellanbindung, Demo und lokaler Lernübersicht.

Diese frühe Umsetzung machte die Idee anschaulich. Sie war aber noch keine ausgereifte Spezifikation. Nach dem Wechsel in den passenden Projektordner führte der Nutzer ausdrücklich zur Planung zurück: Aufgabenformen, Kuration, UI sowie die Rollen von Skill, Tool und LLM müssten zuerst geklärt werden.

**Methodische Konsequenz:** Unser Verlauf war eine Verbindung aus frühem Prototyping und anschließender spezifikationsorientierter Entwicklung. Eine nachträglich behauptete lückenlose Reihenfolge „erst alles spezifizieren, dann erstmals Code schreiben“ würde die Chats falsch darstellen.

### Phase C: Anforderungen an konkreten Beispielen entwickeln – 12. Oktober

Das Beispiel `wert = wert + 2` wurde zu einem gemeinsamen Denk- und Prüfobjekt. Die zentrale Frage war nicht nur die richtige Ausgabe, sondern: Welches Antwortverhalten belegt das Verständnis „rechts auswerten, dann links neu zuweisen“?

Der Nutzer präzisierte, dass dafür keine schriftliche Erklärung verlangt werden sollte. Stattdessen wurden sechs Interaktionsformen vereinbart: Einzelauswahl, Mehrfachauswahl, Codeauswahl, Lücken, Reihenfolge und Diagrammauswahl.

Weitere Entscheidungen:

- Richtige und falsche Textalternativen einer Gruppe sollen gleich viele Wörter besitzen, damit die richtige Antwort nicht schon durch ihre Länge auffällt. Das ist eine projektbezogene Vorgabe, keine allgemeingültige Garantie guter Aufgaben.
- Aufgabenfamilien werden durch Mensch und KI ausgearbeitet und anschließend freigegeben.
- Skills beschreiben Lernziel, Voraussetzungen, erlaubte Variation, Kriterien und Referenzen; ausführbare Tools übernehmen überprüfbare Berechnungen und Kontrollen.
- Die App führt den Lernzustand. Das LLM benötigt keine vollständige aufgabenübergreifende Gesprächshistorie und keinen LangGraph-Reducer.
- Komplexität und Transferdistanz wurden anhand mehrerer Aufgaben unterschieden. Eine andere Antwortform ist nicht automatisch ein höherer fachlicher Anspruch.
- Ein zunächst komplizierteres Modell getrennter Kompetenzwerte wurde auf Wunsch des Nutzers durch drei manuell wählbare Schwierigkeitsstufen ersetzt.
- Eine über „Absenden“ akzeptierte Situation zählt als eine Abgabe. Mehrere angekreuzte Aussagen erzeugen zusammen ein Ergebnis.
- Erklärung und Aufgabe sollten gleichzeitig zugänglich bleiben.

Das Ergebnis war eine umsetzbare erste Aufgabenfamilie mit Datenverträgen und Abnahmekriterien. Die KI schlug die Begrenzung auf geprüfte Vorlagen vor; die enge Führung entsprach dem ausdrücklich gewünschten robusten Einstieg.

### Phase D: Ersten vollständigen Ablauf bauen und Architektur korrigieren – 12. Oktober

Ein erster Ausbau realisierte den vollständigen Weg von der Aufgabenwahl über Anzeige und Abgabe bis zur Auswertung, Speicherung und nächsten Aufgabe. Erst eine Familie vollständig durchzuziehen machte Schnittstellen und Fehlerfälle überschaubar.

Beim Öffnen über VS Code Live Server zeigte sich eine übersehene Betriebsanforderung: Der erste Aufbau benötigte einen eigenen Node-Server. Der Nutzer stellte klar, dass die spätere App auf dem vorhandenen WordPress-Webserver ohne zusätzlichen npm-Hintergrundprozess laufen müsse.

Die Spezifikation wurde geändert und die aktive App auf statischen Betrieb umgestellt. Lernlogik und Auswertung laufen seitdem im Browser; Modelle werden direkt angesprochen. Der frühere Server liegt im Archiv.

**Lerneffekt:** Hosting und Installation sind Architekturtreiber. Diese Rahmenbedingungen hätten früher geklärt werden können. Eine technisch funktionierende Erstfassung kann an einer unausgesprochenen Einsatzbedingung vorbeigehen.

### Phase E: Nutzungserfahrungen in neue Anforderungen übersetzen – 14. Oktober

Der Nutzer bestätigte funktionierende Verbindungen zu LM Studio und DeepInfra. Seine Erprobung zeigte aber eine Lücke zwischen vielen Antwortformen und wirklicher inhaltlicher Vielfalt.

Es wurden weitere Aufgabenfamilien und anschließend Entscheidungen und Verzweigungen ergänzt. Die direkte Themenwahl diente sowohl dem Testen als auch Lernenden mit Vorerfahrung. Auswahländerungen sollten nach ausdrücklicher Bestätigung sofort eine neue Aufgabe starten.

Ein weiterer Befund betraf die Beobachtbarkeit: War das Modell tatsächlich verbunden? Wie viele Tokens wurden verbraucht? Daraus entstanden ein dauerhafter Status und ein Verbrauchsprotokoll mit Aufschlüsselung je Modell und Anfrage.

Die LLM-Aufgaben blieben zunächst zu ähnlich. Der Nutzer formulierte daraufhin den entscheidenden Grundsatz:

> Je freier ein LLM entscheiden darf, umso genauer muss man es kontrollieren.

Für eine begrenzte if/else-Aufgabenwerkstatt wurden strukturierte Programmentwürfe zugelassen. Die App kontrolliert erlaubte Konstrukte und berechnet Ablauf und Antworten selbst. Auf höchstens einen Korrekturversuch folgt bei weiterem Fehler eine geprüfte Ersatzaufgabe. Neuheitsprüfungen sind heuristisch und garantieren keine didaktische Vielfalt.

### Phase F: Variation, Oberfläche und Umfang für Nutzertests ausbauen – 15. Oktober

Der Nutzer verlangte mindestens fünf Antwortformen pro konkreter Kombination von Kapitel, Thema und Schwierigkeit sowie keine unmittelbare Wiederholung derselben Form. Eine allgemeine Liste von sechs vorhandenen Formen hatte zuvor nicht genügt, um dies für jede Auswahl sicherzustellen.

Die Oberfläche wurde verdichtet: kompakte Kopfleiste, räumlich getrennte Verbindungs- und Auswahlbereiche, kleiner Schwierigkeitsbutton, Lernübersicht links und mehr Platz für Code, Aufgabe und Rückmeldung. Das Ziel geringer Scrollwege musste mit lesbaren langen Inhalten und kleinen Bildschirmen vereinbart werden.

Anschließend wurden Kapitel 4 und 5 sowie `break` und `continue` ergänzt, um einen sinnvollen Umfang für Nutzertests zu erreichen.

### Phase G: Begrenzte Adaptivität und sparsamere Modellanfragen – 16. Oktober

Der Nutzer beauftragte zunächst die Planung einer Anpassung an die letzten Antworten. Er begrenzte den Rahmen: Thema und Schwierigkeit bleiben unter Kontrolle der Lernenden; die App passt Varianten an und empfiehlt gegebenenfalls einen Stufenwechsel.

Ein KI-Vorschlag mit zehn Aufgaben im Gedächtnis wurde durch die Unterrichtsbeobachtung des Nutzers korrigiert: Lernende bearbeiten oft nur zwei bis drei Aufgaben eines Typs. Der aktuelle Stand verwendet drei Aufgaben je Thema und Sprache im temporären Gedächtnis, mit Berücksichtigung der gewählten Stufe.

Hinzu kamen kurze Rückmeldungen unter dem Code: eine sofortige geprüfte lokale Rückmeldung und optional eine nachgeladene, gekennzeichnete LLM-Erklärung. Das Modell formuliert; es bewertet die strukturierte Abgabe nicht neu. Verspätete Antworten dürfen nicht unter einer anderen Aufgabe erscheinen.

Eine weitere Nutzerbeobachtung betraf unverständliche interne Ablaufangaben. Technische Laufzeitnamen wurden aus den Aufgabentexten entfernt; notwendige Ausführungsunterschiede bleiben in verständlicher Form erhalten.

Schließlich führten beobachtete hohe Eingabetokenmengen zur Verdichtung der Modellverträge. Eindeutige Skills werden lokal ausgewählt, nur relevante Befunde übertragen und kompakte englische Anweisungen genutzt. Der dokumentierte Vergleich zeigt 15 auf 10 Anfragen und 24.681 auf 8.911 Eingabezeichen in einem festen Fünf-Aufgaben-Szenario. Das sind rund 64 Prozent weniger Zeichen, keine gemessene Tokenersparnis und kein isolierter Nachweis des Effekts der englischen Sprache.

## 4. Die Arbeitsmethode hinter diesen Schritten

Die wiederkehrende Schleife lässt sich so beschreiben:

```text
Unterrichtsproblem und Ziel
        ↓
Begriffe, Voraussetzungen, Verständnisnachweise
        ↓
Konkrete Beispiele und Gegenbeispiele
        ↓
Anforderungen, Grenzen und Abnahmekriterien schriftlich festhalten
        ↓
Begrenzten vollständigen Ablauf durch KI implementieren lassen
        ↓
Technisch prüfen und als Lehrender ausprobieren
        ↓
Abweichungen präzise beschreiben
        ↓
Spezifikation und Umsetzung gemeinsam weiterentwickeln
```

Der Dialog war dabei selbst ein Arbeitsinstrument: Die KI ergänzte Optionen, entwarf Modelle und setzte sie um; der Mensch präzisierte Bedeutung, verwarf unnötige Komplexität und benannte beobachtete Qualitätsmängel. Beispiele machten abstrakte Begriffe wie „schwierig“, „abwechslungsreich“ und „adaptiv“ überprüfbar.

**Nützliche Prompt-Muster aus diesem Vorgehen:**

- „Wir planen zunächst. Ergänze und hinterfrage meine Begriffsordnung.“
- „Zeige an drei Aufgaben zum selben Lernziel, was sich am Anspruch verändert.“
- „Was ist bereits entschieden, was ist dein Vorschlag und was fehlt zur Umsetzung?“
- „Halte diese Entscheidung in der Spezifikation und den betroffenen Dokumenten fest.“
- „Implementiere zuerst eine vollständige Aufgabenfamilie einschließlich Fehlerfällen.“
- „Es gibt sechs Formen im Produkt, aber bei dieser konkreten Auswahl sehe ich immer dieselbe. Prüfe die Abdeckung je Kombination.“
- „Welche Ergebnisse wurden mit einem Mock, mit einem echten Modell und auf dem Zielhosting geprüft?“

Das sind Muster zur eigenen Anwendung, keine wörtlichen Zitate aller historischen Prompts.

## 5. Welches Know-how wurde benötigt?

### Konzeptionelles Know-how

Entscheidend waren Unterscheidungen und Modellbildung: Inhalt versus Lernweg; Lernziel versus Interaktionsform; Schwierigkeit versus neues Wissen; richtige Einzelantwort versus belastbarer Verständnisbeleg; dauerhafte Ergebnisübersicht versus temporäres Adaptionsgedächtnis.

Der Mensch muss Ziele, Grenzen und Qualitätsmaßstäbe beurteilen können. Die KI kann helfen, Begriffe zu bilden und Alternativen zu erläutern. Dieses Wissen musste nicht vollständig vor Projektbeginn vorhanden sein; es wurde teilweise im Dialog entwickelt.

### Softwareentwicklung und Engineering

Erforderlich waren Anforderungen, Zustandsmodelle, Schnittstellen, Trennung von Zuständigkeiten, Teststrategie und Auslieferung. Ein Beispiel ist die Frage: Was passiert, wenn „Absenden“ mehrfach übertragen wird? Sie führte zu eindeutigen Abgabe-IDs und Schutz gegen Doppelzählung. Ein anderes ist der Unterschied zwischen einem Entwicklungswerkzeug wie Node für Tests und einem Serverprozess, den das ausgelieferte Produkt benötigt.

Der Nutzer musste die Syntax der Implementierung nicht selbst schreiben. Er musste aber Einsatzbedingungen nennen, sichtbares Verhalten prüfen und sich relevante technische Folgen erklären lassen. Die KI entwarf und implementierte die technische Lösung einschließlich Tests. Fachliche Akzeptanzkriterien benötigten eine davon unabhängige menschliche Grundlage.

### LLM und Agentenimplementierung

Zwei Ebenen sind auseinanderzuhalten:

| Ebene | Aufgabe der KI | Aufgabe des Menschen beziehungsweise der App |
| --- | --- | --- |
| Entwicklung | Analysieren, Vorschläge machen, Code und Tests schreiben, Fehler korrigieren | Mensch bestimmt Ziele, bringt Fachurteil ein, erprobt und priorisiert |
| Fertige Lern-App | Begrenzte Varianten entwerfen oder auswählen und kurze Hilfen formulieren | App führt Zustand, begrenzt Auswahl, prüft Entwürfe und bewertet strukturierte Antworten |

Die aktive App ist ein von Anwendungslogik gesteuerter LLM-Workflow mit begrenztem Entscheidungsspielraum. Sie benötigt dafür keinen frei agierenden Mehragentenverbund. Markdown-Skills machen allein noch keinen Agenten: Dateien müssen geladen, relevante Inhalte bereitgestellt und Ergebnisse geprüft werden. Ein Skill beschreibt Regeln; ein Tool führt eine Operation aus; die App orchestriert die Schritte.

Nötig waren Kenntnisse beziehungsweise im Dialog erarbeitete Begriffe zu Kontextbegrenzung, strukturierten Ausgaben, Schema- und Werteprüfung, Modellfehlern, Timeouts, begrenzten Korrekturen, geprüften Ersatzaufgaben, Tokenmessung und lokalem beziehungsweise externem Modellbetrieb.

Der aktuelle Stand übermittelt überwiegend kompakte Laufzeitverträge. Die vollständigen deutschen Autorenskill-Texte bleiben Referenz; sie werden nicht mehr bei jeder Anfrage vollständig mitgeschickt. Die ursprüngliche Idee einer modellgestützten Skillauswahl wurde für eindeutige Auswahlen vereinfacht.

### UI und Interaktionsgestaltung

Die Oberfläche musste den Lernvorgang unterstützen: Erklärung erreichbar halten, Code und Antwort räumlich verbinden, Bedienelemente konsistent gestalten, gewählte von bestätigten Einstellungen unterscheiden und laufende Modellanfragen sichtbar machen.

Der Wunsch nach möglichst wenig Scrollen führte zu einer kompakteren Hierarchie. Er bedeutet nicht, dass Text beliebig verkleinert werden darf. Lange Inhalte, Tastaturbedienung, verständliche Beschriftung und kleine Bildschirme bleiben eigene Anforderungen.

Die Korrektur von „Bereich main, Ausführung 1 …“ zeigt einen wichtigen Grundsatz: Technische Präzision muss in eine Sprache übersetzt werden, die zur Zielgruppe und zum Lernziel passt. Intern richtige Bezeichner sind nicht automatisch gute Aufgabentexte.

### Fachwissen, Didaktik und Lehrerfahrung

Hier lag ein wesentlicher menschlicher Beitrag: Anfängerperspektive, typische Fehlvorstellungen, sinnvolle Voraussetzungen, angemessene Transferaufgaben und realistische Bearbeitungsdauer.

Die Beobachtung „Schüler bearbeiten oft nur zwei bis drei Aufgaben eines Typs“ veränderte direkt das technische Gedächtnismodell. Die Forderung nach gleich langen Alternativen wurde zu einer maschinellen Prüfung. Das Ziel „Verstehen statt bloß Ergebnis nennen“ veränderte Antwortformate und Lösungskriterien.

Eine falsche Auswahl erlaubt jedoch nicht automatisch die Diagnose einer bestimmten Denkweise. Gleich lange Alternativen beweisen keine faire Aufgabe. Mehr Variation und drei richtige Antworten beweisen keine nachhaltige Generalisierung. Solche Annahmen benötigen Erprobung mit Lernenden.

## 6. Transfer auf Geschichte und Deutsch

Übertragbar ist der Entwicklungsprozess; die fachliche Prüfbarkeit muss jeweils neu entworfen werden. Programmabläufe erlauben in unserem begrenzten Aufgabenraum berechenbare Referenzen. Historische Deutungen und literarische Interpretationen sind oft nicht auf dieselbe Weise entscheidbar.

| Gestaltungsfrage | Code verstehen | Beispiel Geschichte | Beispiel Deutsch |
| --- | --- | --- | --- |
| Kompetenzziel | Zustand und Ablauf vorhersagen | Quelle kontextualisieren und Perspektive erkennen | Deutung mit Textbelegen begründen |
| Domänenwissen | Sprachsemantik und typische Anfängerfehler | Ereigniskontext, Quellenart, Autor, Adressat, Interessen und Forschungsperspektiven | Textsorte, Sprache, Erzählperspektive, rhetorische Mittel und Interpretationsspielräume |
| Kuratierte Grundlage | Kleine Programme und geprüfte Abläufe | Geprüfte Quellenauszüge mit Herkunft und Kontext | Geeignete Texte mit nachvollziehbaren Belegstellen |
| Kurze Interaktion | Zwischenwert wählen, Ablauf ordnen | Quellenbeobachtung von späterer Deutung unterscheiden | Behauptung einer passenden Textstelle zuordnen |
| Variation | Zahlen, Struktur, Beobachtung und Darstellung | Andere Quelle zum bekannten Problem vergleichen | Neue Passage mit bekanntem Verfahren untersuchen |
| Kontrollierbarer Teil | Ablauf und Lösung berechnen | Herkunftsangaben und Zitatstellen gegen Bestand prüfen | Existenz und Wortlaut einer Belegstelle prüfen |
| Urteilsbedürftiger Teil | Didaktische Eignung und Erklärungsqualität | Plausibilität und Gewichtung einer historischen Interpretation | Tragfähigkeit einer Deutung und Qualität ihrer Begründung |

Ein Geschichtslehrer müsste beispielsweise erkennen, wann ein LLM eine Quelle anachronistisch liest oder eine Perspektive als Tatsache ausgibt. Eine Deutschlehrerin müsste zwischen abweichender, aber belegbarer Deutung und unbegründeter Behauptung unterscheiden können. Beide müssten Kriterien und Referenzfälle erarbeiten, vertretbare Alternativen zulassen und definieren, wann ein menschliches Urteil nötig bleibt.

Als erster Produktumfang wären eng prüfbare Teilkompetenzen geeignet. Die Vollbewertung historischer Urteile oder literarischer Interpretationen wäre ein anderes, anspruchsvolleres Vorhaben. Eine zweite KI-Meinung ersetzt dafür keine unabhängige fachliche Referenz.

## 7. Wie daraus ein Softwareprodukt wird

Die Disziplinen greifen über konkrete Übersetzungen ineinander:

| Ausgangsentscheidung | Engineering-Übersetzung | Sichtbare Produktwirkung |
| --- | --- | --- |
| Lernende sollen Zuweisung verstehen | Lernziel, Kriterien, Referenzablauf und Lösungsschlüssel | Mehrere kurze Aufgaben zum selben Zusammenhang |
| Aufgaben sollen abwechslungsreich sein | Abdeckungsmatrix und Zustand der Antwortformfolge | Mindestens fünf Formen je Auswahl, keine direkte Formwiederholung |
| Fehler sollen nächste Übung beeinflussen | Teilbefunde und begrenzte Adaptionsregeln | Neue Variante mit passendem Schwerpunkt |
| LLM soll freier gestalten dürfen | Strukturierter Vertrag, unabhängige Ablaufprüfung, begrenzte Reparatur | Neue if/else-Entwürfe mit kontrolliertem Lernumfang |
| App soll auf vorhandenes Hosting passen | Browserlaufzeit, relative Ressourcenpfade, statisches Paket | Auslieferung ohne eigenen Node-App-Server |
| Kosten sollen kontrollierbar sein | Nutzungsprotokoll und kompakte Modellkontexte | Sichtbarer Verbrauch und weniger redundante Anfragen |

Damit wirkten klassische Disziplinen zusammen: Anforderungsanalyse, Domänenmodellierung, Architektur, UX, Daten- und Zustandsmodellierung, Implementierung, Integration, Qualitätssicherung, Betrieb und Änderungsmanagement. Die KI übernahm große Teile ihrer technischen Ausarbeitung. Die Entscheidungen blieben auf Ziele, Kriterien und Rückmeldungen des Menschen angewiesen.

## 8. Zusätzliche Aspekte für das Seminar

**Qualität auf drei Ebenen:** Funktioniert die Software? Ist der Inhalt fachlich korrekt? Bewirkt die Nutzung tatsächlich Lernen? Diese Fragen brauchen unterschiedliche Prüfungen. Ein Modell-Mock prüft den Ablauf einer Integration, aber nicht die Qualität echter Modellerklärungen. Ein Browsertest prüft Bedienverhalten, aber noch keine Unterrichtswirkung.

**Daten und Vertrauen:** Es wurde entschieden, was lokal gespeichert, was nur temporär gehalten und was an Modelle gesendet wird. API-Keys bleiben im Tab-Speicher. Die App ist ein Lernwerkzeug mit technisch im Browser zugänglichen Lösungen, kein manipulationssicheres Prüfungssystem. Beim Transfer in andere Schulen oder Domänen müssten Datenflüsse und Materialnutzung erneut geklärt werden.

**Kosten und Wartezeit als Produkteigenschaften:** Eine Kurzerklärung pro Abgabe ist ein zusätzlicher Modellaufruf. Verständlichkeit, Aktualität, Ausfallsicherheit und Verbrauch müssen gemeinsam gestaltet werden.

**Nachvollziehbarkeit und Pflege:** Entscheidungen müssen außerhalb des Chats erhalten bleiben. Unsere Spezifikationen leisten das weitgehend, enthalten aber auch ausdrücklich historische und überholte Entwürfe. Für ein Seminar ist gerade das lehrreich: Man muss den gültigen Stand von Entwicklungsgeschichte unterscheiden. Versionsverwaltung und klarere Statusführung wären sinnvolle weitere Prozessbausteine; sie sind im aktuellen Ordner nicht als Git-Historie nachweisbar.

**Priorisierung:** Ein vollständiger kleiner Lernablauf war nützlicher als sofort acht Kapitel zu bauen. Später wurde der Umfang gezielt bis zu fünf Kapiteln erweitert, um Nutzererprobung zu ermöglichen. Diese Reihenfolge verband technische Unsicherheit und didaktische Prioritäten.

## 9. Aktueller Stand und offene Nachweise

Laut aktuellem Katalog, sichtbarer App und Dokumentation: fünf Kapitel, 26 Aufgabenfamilien, 84 Referenzvorlagen, drei Schwierigkeiten und Python/JavaScript. Pro Auswahl sind mindestens fünf Antwortformen vorgesehen; zusätzlich existiert eine kontrollierte if/else-Werkstatt. Temporäre Antwortbefunde steuern begrenzte Variation, das Modell kann kurze Erklärungen formulieren.

Die Projektberichte dokumentieren zuletzt 66 automatisierte Tests, zusätzliche unabhängige Programmausführungen und Browserprüfungen. Der Nutzer bestätigte im Verlauf funktionierende LM-Studio- und DeepInfra-Verbindungen des damaligen Standes. Daraus folgt keine vollständige Abnahme aller später ergänzten Inhalte mit echten Modellen.

Offen bleiben insbesondere die fachliche Qualität der erweiterten Modellerklärungen im realen Einsatz, die praktische Prüfung des Zielhostings und belastbare Befunde zum Lernerfolg. Viele Familien besitzen pro Stufe weiterhin nur eine kuratierte Grundvorlage; Zahlen- und Formvariation ist deshalb nicht überall mit breiter struktureller Vielfalt gleichzusetzen. Kapitel 6–8 bleiben Ausbauziele.

## 10. Fragen für unser Brainstorming

1. Welche Entscheidungen konntest du nur aufgrund deiner Lehrerfahrung treffen – und wo hat die KI neue brauchbare Unterscheidungen eingebracht?
2. Welche unpassenden KI-Vorschläge waren produktiv, weil sie dein eigentliches Ziel deutlicher gemacht haben?
3. Woran soll eine Lehrkraft ohne Programmiererfahrung erkennen, ob sie eine fachlich sinnvolle und technisch belastbare Fassung vor sich hat?
4. Was müssen Seminarteilnehmer vorab wissen, was können sie im Dialog lernen und wo brauchen sie zusätzliche Fachprüfung?
5. Welche konkrete Beobachtung im Unterricht würde unsere Annahme widerlegen, dass die gewählte Variation und Rückmeldung das Verständnis verbessern?
6. Wo wären im eigenen Fach kurze strukturierte Aufgaben sinnvoll – und wo würden sie die angestrebte Kompetenz zu stark verkürzen?

Als mögliches Seminarziel schlage ich vor: **Teilnehmende können aus einer eigenen Unterrichtsidee eine kleine überprüfbare Produktspezifikation entwickeln, einen vollständigen Ablauf mit KI umsetzen lassen und dessen Grenzen beurteilen.** Eine hochwertige erste Aufgabenfamilie wäre dafür ein aussagekräftigeres Ergebnis als eine große, ungeprüfte App.

## Quellen im Projekt

- [Begriffslandkarte](programmierung-grundlagen-zwischenergebnis.md)
- [Didaktische Progression](programmierung-didaktische-progression-zwischenergebnis.md)
- [Konsolidierte Spezifikation](SPEC.md) und [aktueller Betriebs- und Funktionsstand](README.md)
- [Aufgaben und Bewertung](specs/01-aufgaben-und-bewertung.md)
- [Kuration und Skillformat](specs/03-kuration-und-skillformat.md)
- [Lernzustand und Aufgabenhorizont](specs/04-lernzustand-und-aufgabenhorizont.md)
- [Referenzaufgaben und Schwierigkeit](specs/05-referenzaufgaben-schwierigkeit.md)
- [Hostingentscheidung](specs/09-wordpress-hosting.md)
- [Beobachtbarkeit und Verbrauch](specs/14-modellstatus-und-tokenverbrauch.md)
- [Kontrollierte Aufgabengenerierung](specs/16-kontrollierte-aufgabengenerierung.md)
- [Typwechsel und Oberfläche](specs/17-typwechsel-und-kompakte-oberflaeche.md)
- [Adaptive Varianten und Kurzerklärung](specs/20-adaptive-aufgaben-und-kurzerklaerung.md)
- [Verständliche Ablaufangaben](specs/21-verstaendliche-ablaufangaben.md)
- [Kompakte Modellverträge und Messgrenzen](specs/22-kompakte-modellvertraege.md)

Die Quellcodeprüfung bezog unter anderem `index.html`, `app.js`, `runtime.js`, `adaptive-learning.js` und `model-prompts.js` ein. Maßgeblich für die historischen Nutzerentscheidungen sind zusätzlich die oben genannten Chats; die lokalen Spezifikationen dokumentieren deren Umsetzung und spätere Änderungen.
