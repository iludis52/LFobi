---
titel: Vier kleine Softwareprojekte mit KI
datum: 2026-10-07
kurs: Ab Klasse 10
version: 3.3
---

# Vier Projektaufgaben zur Auswahl

## Für alle Projekte

Du entwickelst eine kleine Anwendung für andere. Die KI darf beim Klären, Planen, Programmieren und Verstehen helfen. Du entscheidest mit deinem Team, prüfst tatsächlich und erklärst ausgewählten Code. Eure ausgefüllte Projektkarte bestimmt den Pflichtumfang.

Verwendet das [Schüler-Arbeitsblatt](schuelerarbeitsblatt.md): Idee und Anforderungen klären, Spec bestätigen, kleine Tasks planen und umsetzen, nach jedem Schritt prüfen, andere ausprobieren lassen und über die Freigabe entscheiden. **Eigene Erwartungen stehen vor der Umsetzung.** TDD ist optional.

Die vier Aufgaben sind Wahlmöglichkeiten. Die Zahlensystem-App bietet den einfachsten Einstieg; die anderen benötigen zusätzliches Vorwissen oder Gerüst. Hinweise für Lehrkräfte lassen sich bei Bedarf einklappen. Für KURZ wird vorab ein passender kleinerer Auftrag vereinbart. Dieser Auftrag wird vollständig umgesetzt; die Spec verspricht keine Funktionen, die im Unterricht nur als unfertige Erweiterung zurückbleiben.

## 1. Zahlensysteme üben

### Dein Auftrag

Entwickle eine Lern-App, mit der Mitschüler die Umwandlung zwischen Binär- und Dezimalzahlen üben können. Die App soll eine Antwort prüfen und bei Fehlern so helfen, dass der Nutzer etwas versteht.

### Euer vereinbarter Funktionsumfang

- Die App stellt eine Umwandlungsaufgabe für nichtnegative ganze Zahlen.
- Der Nutzer gibt eine Antwort ein und erhält eine passende Rückmeldung.
- Bei einer falschen Antwort bietet die App eine nachvollziehbare Hilfe.
- Anschließend kann eine weitere Aufgabe bearbeitet werden.
- Eine leere oder unpassende Eingabe wird verständlich behandelt.

### Das entscheidet ihr

In welche Richtung wird zunächst umgewandelt? Welcher Zahlenbereich passt zur Zielgruppe? Welche Hilfe soll angeboten werden, und wann erscheint sie? Wann wird eine neue Aufgabe gestellt? Wie geht ihr mit führenden Nullen und Leerzeichen um?

### So könnt ihr eure Lösung prüfen

Legt eigene Beispiele mit bekannten Ergebnissen fest: eine einfache Zahl, eine Grenze eures Zahlenbereichs und eine ungültige Eingabe. Rechnet mindestens eine Umwandlung selbst nach. Lasst einen Mitschüler eine falsche Antwort eingeben und beurteilen, ob die Hilfe verständlich ist.

### Mögliche Erweiterungen

Die zweite Umwandlungsrichtung, Hexadezimalzahlen, abgestufte Hinweise oder eine einfache Übersicht über den Übungsfortschritt.

<details>
<summary>Hinweise für die Lehrkraft</summary>

**Empfohlener Einstieg.** Binäre Stellenwerte müssen bekannt sein oder kurz vorbereitet werden. Ein Bereich von 0 bis 255 und zunächst eine Richtung sind ein möglicher Zuschnitt. Zufällige Aufgaben sollten erst hinzukommen, wenn ein festes Beispiel funktioniert. Lernnutzen entsteht durch die Rückmeldung; ein bloßer Umrechner erfüllt den Auftrag nicht. Datenschutzarme Fortschrittsanzeigen können ohne Namen und Benutzerkonto auskommen.

</details>

---

## 2. IPv4-Netze verstehen

### Dein Auftrag

Entwickle eine App, die Mitschülern hilft, den Zusammenhang zwischen einer IPv4-Adresse und ihrem Netzwerk zu verstehen. Der Nutzer gibt eine Adresse und eine Präfixlänge ein, beispielsweise `192.168.10.42` und `/24`.

### Euer vereinbarter Funktionsumfang

- Die App unterstützt Präfixlängen von `/24` bis `/30`.
- Sie zeigt die zugehörige Netzmaske, Netzwerkadresse und Broadcastadresse.
- Sie zeigt die erste und letzte rechnerisch nutzbare Hostadresse sowie deren Anzahl.
- Sie gibt eine kurze Erklärung zum Ergebnis.
- Ungültige Eingaben und nicht unterstützte Präfixlängen erhalten eine verständliche Rückmeldung.

Die Anzahl beschreibt die rechnerische Kapazität im vereinbarten Netzmodell. Sie sagt nicht, welche Adressen in einem realen Netzwerk noch frei sind. Die App verbindet sich nicht mit einem Netzwerk.

### Das entscheidet ihr

Wie werden Adresse und Präfix eingegeben? Wie macht ihr Netz- und Hostanteil verständlich? Welche Erklärung hilft beim Nachvollziehen? Wie behandelt ihr eine Eingabe, die selbst die Netzwerk- oder Broadcastadresse bezeichnet?

### So könnt ihr eure Lösung prüfen

Rechnet ein Beispiel selbst nach. Prüft ein `/24`- und ein `/30`-Netz, eine ungültige Adresse und eine nicht unterstützte Präfixlänge. Für `192.168.10.42/24` lautet ein Referenzfall: Netzwerk `192.168.10.0`, Broadcast `192.168.10.255`, Hostbereich `.1` bis `.254`, 254 rechnerisch nutzbare Hostadressen. Erklärt, warum dieses Beispiel noch keinen vollständigen Test der App darstellt.

### Mögliche Erweiterungen

Eingabe einer Netzmaske statt der Präfixlänge, weitere Präfixlängen oder eine Binärdarstellung der Aufteilung. Sonderfälle werden erst nach gesonderter fachlicher Klärung ergänzt.

<details>
<summary>Hinweise für die Lehrkraft</summary>

**Weiterführende Aufgabe mit zusätzlichem Fachwissen.** IPv4-Aufbau und Netz-/Hostanteil müssen bekannt sein oder vorbereitet werden. Der Bereich `/24` bis `/30` hält die Rechnungen überschaubar. Für dieses vereinfachte Modell gilt die Hostanzahl `2^(32 − Präfixlänge) − 2`; tatsächliche Vergabemöglichkeiten und Adressreservierungen werden damit nicht vollständig beschrieben. `/31` und `/32` werden als außerhalb des Umfangs gekennzeichnet, nicht als grundsätzlich ungültig. RFC 3021[^ipv4] beschreibt die Nutzung beider Adressen eines `/31`-Netzes auf Punkt-zu-Punkt-Verbindungen. Die Beschränkung verhindert eine falsche Verallgemeinerung der Minus-zwei-Regel.

</details>

---

## 3. Bubble Sort sichtbar machen

### Dein Auftrag

Entwickle eine Anwendung, die Mitschülern zeigt, wie Bubble Sort eine kurze Zahlenliste aufsteigend sortiert. Die Nutzer sollen einzelne Vergleiche und Vertauschungen verfolgen können.

### Euer vereinbarter Funktionsumfang

- Eine kurze Liste ganzer Zahlen wird angezeigt; eine vorbereitete Liste genügt.
- Eine Schaltfläche führt jeweils den nächsten Vergleichsschritt aus.
- Die verglichenen Nachbarn sind erkennbar; eine nötige Vertauschung wird sichtbar.
- Die App zeigt, wann das Sortieren beendet ist.
- Ein Neustart stellt die Ausgangsliste wieder her.

### Das entscheidet ihr

Welche Information muss während eines Schritts sichtbar sein? Wie zeigt ihr einen Vergleich ohne Vertauschung? Welche Länge ist übersichtlich? Welche Variante von Bubble Sort verwendet ihr, und woran erkennt sie das Ende?

### So könnt ihr eure Lösung prüfen

Verfolgt die ersten Schritte einer Liste von Hand. Prüft eine bereits sortierte Liste, eine umgekehrt sortierte Liste und eine Liste mit gleichen Werten. Kontrolliert, dass am Ende dieselben Werte in derselben Anzahl vorhanden sind und kein größerer Wert vor einem kleineren steht. Die angezeigten Schritte müssen zum tatsächlich ausgeführten Verfahren passen.

### Mögliche Erweiterungen

Eigene Zahlen eingeben, Vergleiche zählen oder einen automatischen Ablauf mit Pause anbieten. Quicksort oder Baumtraversierung sind eigenständige Folgeprojekte.

<details>
<summary>Hinweise für die Lehrkraft</summary>

**Ergänzende Wahlaufgabe.** Bubble Sort wird fachlich vorbereitet oder gemeinsam an einer kleinen Liste erschlossen. Zunächst manuelle Schritte verwenden; die Darstellung braucht keine Animation. Die Trennung zwischen aktuellem Algorithmuszustand und seiner Anzeige ist eine geeignete Lerngelegenheit. Erweiterungen dürfen die Kernaufgabe nicht verdrängen.

</details>

---

## 4. Ein kleines Pong-Spiel entwickeln

### Dein Auftrag

Entwickle eine kleine lokale Browserfassung von Pong für zwei Personen. Zwei Schläger bewegen sich auf gegenüberliegenden Seiten; ein Ball wird zurückgespielt. Euer Spiel soll einfache, verständliche Regeln haben.

### Euer vereinbarter Funktionsumfang

- Zwei Personen bewegen ihre Schläger mit festgelegten Tasten nach oben und unten.
- Der Ball bewegt sich und prallt an den oberen und unteren Spielfeldrändern ab.
- Ein Treffer am Schläger verändert seine Bewegungsrichtung.
- Wenn der Ball eine linke oder rechte Spielfeldgrenze passiert, erhält die Gegenseite einen Punkt.
- Das Spiel zeigt den Punktestand und bietet einen Neustart.

### Das entscheidet ihr

Wie schnell bewegen sich Ball und Schläger? Wie startet die erste Runde und die nächste nach einem Punkt? Wo endet der Bewegungsbereich der Schläger? Wann gilt ein Ball als verfehlt? Wann endet das Spiel, oder läuft es bis zum Neustart?

### So könnt ihr eure Lösung prüfen

Legt prüfbare Situationen fest: ein Treffer, ein verfehlter Ball, ein Abprallen am Rand und ein Neustart. Kontrolliert, dass ein verfehlter Ball nur einmal gezählt wird. Für schwer reproduzierbare Situationen könnt ihr einen vorbereiteten Ballzustand einsetzen. Lasst zwei Mitschüler prüfen, ob Steuerung und Regeln verständlich sind.

### Mögliche Erweiterungen

Pause, einstellbare Geschwindigkeit oder unterschiedliche Schwierigkeitsstufen. Eine Computergegner-Steuerung ist eine spätere Erweiterung.

<details>
<summary>Hinweise für die Lehrkraft</summary>

**Ergänzende Wahlaufgabe mit höherem technischem Aufwand.** Spielfeld, Tastatureingabe und Zeitsteuerung können als verständliches Gerüst bereitgestellt werden. Die Schüler verantworten dann klar bezeichnete Regeln und Änderungen und erklären die Schnittstellen zum Gerüst. Einfache konstante Geschwindigkeiten reichen zunächst. Kollisions- und Punktregeln lassen sich an festen Zuständen prüfen; Bediengefühl und Spielbarkeit zusätzlich am laufenden Spiel. Der Lernumfang des Gerüsts wird vorher abgegrenzt, damit keine unrealistische Erwartung entsteht, sämtliche Browsertechnik selbst erklären zu müssen.

</details>

---

## Umfang passend wählen

Die Lehrkraft legt Zeit, Technik, erlaubte Sprachmittel und individuellen Nachweis fest. Erweiterungen bleiben optional. Bei einem neuen Wunsch zunächst dessen Anforderungen klären, dann Spec und betroffene Prüffälle anpassen. Die Aufgaben sind Unterrichtsentwürfe zur Erprobung.

Weitere Fachquellen und Aussagegrenzen: [Quellen und Begründung](vertiefung/quellen-und-begruendung.md).

[^ipv4]: [RFC 4632](https://www.rfc-editor.org/rfc/rfc4632), CIDR; [RFC 3021](https://www.rfc-editor.org/rfc/rfc3021), Abschnitt 2.1, Sonderfall /31 auf Punkt-zu-Punkt-Verbindungen. Geprüft am 04.10.2026. Die Minus-zwei-Regel gilt hier nur für das ausdrücklich begrenzte /24–/30-Modell.
