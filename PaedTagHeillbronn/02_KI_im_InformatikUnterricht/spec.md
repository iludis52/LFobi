# Spec: Zahlensystem-Konverter für IT-Azubis (1. Lehrjahr)

> Maschinenlesbare Spezifikation nach Spec-Driven-Development.
> Target: KI-Coding-Agent. Jede Anforderung ist eindeutig, testbar und minimal.
> Status: **ready for implementation**

---

## 0. Metadaten

| Feld | Wert |
|---|---|
| Projektname | `numconv` |
| Typ | Monolithische, statische Web-App (Single Page) |
| Zielgruppe | Fachinformatiker-Azubis im 1. Ausbildungsjahr |
| Stack | Statisches HTML5 + Vanilla JavaScript (ES2020+) + CSS3 (kein Build, keine Abhängigkeiten, kein Framework) |
| Deployment | Beliebiger statischer Datei-Server / GitHub Pages / lokaler Doppelklick auf `index.html` |
| Browser-Support | Evergreen-Browser (Chrome, Firefox, Edge, Safari), Desktop-First |
| Sprachen (UI) | Deutsch (i18n: post-MVP) |
| Accessibility-Ziel | WCAG 2.1 Level AA (Teil des MVP) |
| Repository-Struktur | Flach: `index.html`, `styles.css`, `app.js`, optional `README.md` |

---

## 1. Produktvision & Ziel

Eine kleine, monolithische Web-Oberfläche, mit der IT-Azubis im 1. Lehrjahr **Dezimalzahlen in Hexadezimal und Binär** umrechnen können. Das Werkzeug kombiniert einen Live-Konverter mit interaktiven Bitgewichts-Spalten und einem Übungsmodus (Quiz), um aktives Lernen zu fördern. Technische Komplexität wird zugunsten didaktischer Klarheit bewusst minimiert.

**Nicht-Ziele (ausdrücklich kein Scope):**
- Oktal- oder generische Basis-n-Konvertierung
- Schritt-für-Schritt-Erklärungen / Rechenweg-Animationen
- Bitweise Operationen (AND/OR/XOR/NOT, Schieben)
- Negative Zahlen / Zweierkomplement
- Wortbreiten > 8 Bit
- Mehrseitige App oder clientseitiger Router
- Internationalisierung (post-MVP)
- Backend, Persistenz, Accounts

---

## 2. Funktionale Anforderungen

### 2.1 Konverter (Kernfunktion)

**F2.1.1** Die App zeigt drei separate, editierbare Eingabefelder nebeneinander:
- `Dezimal` (Basis 10)
- `Hexadezimal` (Basis 16)
- `Binär` (Basis 2)

**F2.1.2** Alle drei Felder sind live synchronisiert: Ändert der User ein Feld, werden die beiden anderen Felder sofort mit dem äquivalenten Wert aktualisiert (Echtzeit, ohne Submit-Button).

**F2.1.3** Gültiger Wertebereich: ganze Zahlen `0` bis einschließlich `255` (8-Bit-Fenster).

**F2.1.4** Jedes Feld akzeptiert nur die Zeichen seines Zahlensystems:
- Dezimal: `0`–`9`
- Hexadezimal: `0`–`9`, `a`–`f`, `A`–`F`
- Binär: `0`, `1`

**F2.1.5** Eingaben sind nicht case-sensitiv (Hex `aF` äquivalent zu `Af`); die kanonische Anzeige im Hex-Feld verwendet Großbuchstaben (`0`–`9A`–`F`).

**F2.1.6** Führende Nullen sind in der Eingabe erlaubt; die kanonische Anzeige entfernt sie (z. B. `007` → `7`), außer der Wert ist `0` (zeigt `0`).

**F2.1.7** Bei leerem Eingabefeld zeigen die abhängigen Felder ebenfalls einen leeren Wert.

### 2.2 Interaktive Bitgewichts-Anzeige

**F2.2.1** Unterhalb der drei Eingabefelder wird eine interaktive 8-Spalten-Bitgewichts-Reihe angezeigt, Spalten von links (MSB) nach rechts (LSB) mit den Beschriftungen `128 | 64 | 32 | 16 | 8 | 4 | 2 | 1`.

**F2.2.2** Jede der 8 Spalten zeigt ihren aktuellen Bitwert (`0` oder `1`) groß und deutlich lesbar.

**F2.2.3** Jede Spalte ist **klickbar**: Ein Klick toggelt das entsprechende Bit `0↔1`. Der neue Wert wird sofort berechnet und in alle drei Eingabefelder übernommen.

**F2.2.4** Die Bitgewichts-Spalten sind vollständige Tastaturerreichbar: über Tab fokussierbar, über `Enter`/`Leertaste` umschaltbar (WCAG 2.1 AA).

**F2.2.5** Die Spalten tragen ein `aria-label` im Format `Bit mit Wertigkeit 128, aktuell 0`. Zustandsänderungen werden `aria-live` an die Assistenztechnologie kommuniziert.

### 2.3 Quiz-Modus

**F2.3.1** Über der Konverter-Sektion gibt es einen umschaltbaren Modus-Tab-Bereich mit den zwei Sichten:
- `Konverter` (Standardansicht beim Laden)
- `Quiz`

**F2.3.2** Die Quiz-Sicht enthält:
- einen Schwierigkeits-Dropdown mit drei Stufen:
  - `Leicht` → Zufallswert im Bereich `0`–`15` (4 Bit)
  - `Mittel` → Zufallswert im Bereich `0`–`127` (7 Bit)
  - `Schwer` → Zufallswert im Bereich `0`–`255` (8 Bit)
- ein Aufgaben-Label im Format: `Rechne: <Quellwert> (<Quellsystem>) → <Zielsystem>`
- ein einzelnes Eingabefeld für die Antwort
- einen Button `Prüfen`
- einen Button `Nächste Aufgabe`
- einen Status-Bereich für Feedback/Ergebnis

**F2.3.3** Aufgaben werden per Zufallsgenerator zur Laufzeit erzeugt:

1. Zufälliger Wert aus dem gewählten Wertebereich.
2. Zufällige Konvertierungsrichtung aus den **sechs möglichen** Richtungen:
   - Dec→Bin, Bin→Dec
   - Dec→Hex, Hex→Dec
   - Bin→Hex, Hex→Bin
3. Quell- und Zielsystem müssen verschieden sein.

**F2.3.4** Eine Runde besteht aus **genau einer** Aufgabe.

**F2.3.5** Nach Klick auf `Prüfen`:
- Ist die Antwort korrekt: Status zeigt `Richtig!` in Grün, die korrekte Lösung wird angezeigt.
- Ist die Antwort falsch: Status zeigt `Falsch.` in Rot, zusätzlich die korrekte Lösung (`Lösung: <wert>`).
- Das Eingabefeld wird nach der Auswertung deaktiviert, bis `Nächste Aufgabe` geklickt wird.

**F2.3.6** Es gibt **keine Punkte**, keinen Score, keine Zeitmessung, keinen Highscore und keine Speicherung (kein localStorage). Jede Runde ist zustandslos.

**F2.3.7** Klick auf `Nächste Aufgabe`:
- Leert Status-, Eingabe- und Feedback-Bereich.
- Generiert eine neue zufällige Aufgabe gemäß aktuell gewählter Stufe.
- Reaktiviert das Eingabefeld und fokussiert es.

**F2.3.8** Wechsel des Schwierigkeits-Dropdown generiert sofort eine neue Aufgabe der neuen Stufe.

**F2.3.9** Die Quiz-Eingabevalidierung entspricht der Konverter-Validierung (Zeichen je Zielsystem, Groß-/Kleinschreibung nicht relevant).

### 2.4 Referenz (Cheat Sheet)

**F2.4.1** Die App enthält eine sichtbare Referenz-Sektion (unter dem Konverter / Bitgewichten, außerhalb des Tab-Bereichs, immer sichtbar):
- Eine Hex-Tabelle `0`–`F` mit jeweiliger Dezimal- und Binärdarstellung.
- Eine dezimal nach hex/binär Tabelle für die Werte `0`–`15` (kompakte Übersicht).

**F2.4.2** Die Referenz ist statisch, nicht interaktiv.

---

## 3. Nicht-funktionale Anforderungen

### 3.1 Layout & UI

**NF3.1.1** Layout ist **Single-Page**, alle Sektionen vertikal gestapelt:
1. Header mit Titel und Untertitel
2. Modus-Tab-Bereich (Konverter / Quiz)
3. Tab-Inhalt
4. Referenz-Sektion (immer sichtbar)
5. Footer mit Versions-/Quellenhinweis

**NF3.1.2** Desktop-First-Layout. Auf schmalen Viewports (≤ 768px) dürfen Eingabefelder und Bit-Spalten umbrechen; Lesbarkeit bleibt gewährleistet (Responsive „best effort", nicht proaktiv optimiert).

**NF3.1.3** Die drei Konverter-Eingabefelder werden nebeneinander (mindestens Desktop) in einer Zeile angeordnet.

**NF3.1.4** Bitgewichts-Spalten verwenden feste, gleichbreite Boxen mit klarem Kontrast zwischen Bitwert `0` und `1` (Farbe oder Helligkeit) und erhalten ein sichtbares Fokus-Indikator.

### 3.2 Eingabevalidierung & Fehlerverhalten

**NF3.2.1** Bei Eingabe eines unerlaubten Zeichens: Das Zeichen wird **nicht** in das Feld übernommen; das Feld zeigt gleichzeitig einen roten Rand und einen Hilfetext unter dem Feld (z. B. `Nur Ziffern 0–9 erlaubt.`).

**NF3.2.2** Bei Eingabe eines gültigen Wertes, der den Wertebereich `0–255` überschreitet (nur relevant, wenn Feldwert numerisch > 255 ergibt): Das Feld zeigt einen roten Rand und den Hilfetext `Wert muss zwischen 0 und 255 liegen.`; die abhängigen Felder werden **nicht** aktualisiert.

**NF3.2.3** Bei gültiger Eingabe werden roter Rand und Hilfetext entfernt.

**NF3.2.4** Validierung erfolgt während der Eingabe (Live), nicht erst bei Submit/Blur.

### 3.3 Performance

**NF3.3.1** App lädt ohne externe Netzwerk-Requests (alle Assets lokal, keine CDN-Abhängigkeiten, keine Web Fonts von Dritten).

**NF3.3.2** Interaktionslatenz (Tastatureingabe bis Feld-Sync) < 50 ms auf Standard-Hardware.

**NF3.3.2** Initialer DOM-Content-Loaded < 200 ms lokal.

### 3.4 Accessibility (WCAG 2.1 AA, Teil des MVP)

**NF3.4.1** Alle interaktiven Steuerelemente sind per Tastatur erreichbar und bedienbar (Tab/Shift+Tab, Enter/Space).

**NF3.4.2** Sichtbarer Fokus-Indikator für alle fokussierbaren Elemente.

**NF3.4.3** Eingabefelder tragen `<label>`-Beziehungen (entweder via `<label for>` oder ARIA).

**NF3.4.4** Farbcodierungen sind nicht alleiniger Informationsträger: `Richtig`/`Falsch` im Quiz-Feedback haben Textkennzeichnung.

**NF3.4.5** Kontrast Text/Hintergrund ≥ 4.5:1 für normalen Text, ≥ 3:1 für großen Text.

**NF3.4.6** Sinnvolle semantische Struktur (`<header>`, `<main>`, `<section>`, `<nav>` etc.).

### 3.5 Code-Qualität

**NF3.5.1** JavaScript in `strict mode`, modular gekapselt (IIFE oder Modul-Pattern, keine globalen Variablen, außer App-Container).

**NF3.5.2** Klare Trennung: Konvertierungslogik von DOM/I/O getrennt (damit später Unit-Tests ergänzbar bleiben).

**NF3.5.3** Kein `eval`, kein `innerHTML` für User-Eingaben (XSS-sicher).

**NF3.5.4** Keine Build-Schritte, keine `package.json`, keine Node-Abhängigkeit zum Ausführen.

---

## 4. Akzeptanzkriterien

Jede Anforderung gilt als erfüllt, wenn das zugehörige Akzeptanzkriterium bei manueller Prüfung bestanden ist.

### Konverter

| ID | Akzeptanzkriterium |
|---|---|
| AC2.1.1 | Drei separate, beschriftete Felder `Dezimal`, `Hexadezimal`, `Binär` sind sichtbar und editierbar. |
| AC2.1.2 | Eintrag `200` in Dezimal → Hex zeigt `C8`, Binär zeigt `11001000` synchron und ohne Submit. |
| AC2.1.3 | Eintrag `FF` in Hex → Dezimal zeigt `255`, Binär zeigt `11111111`. |
| AC2.1.4 | Eintrag `10101010` in Binär → Dezimal zeigt `170`, Hex zeigt `AA`. |
| AC2.1.5 | Eingabe `af` in Hex zeigt danach `AF` im Feld (Großschreibung, case-insensitiv). |
| AC2.1.6 | Eingabe `007` in Dezimal zeigt danach `7` (führende Nullen entfernt). |
| AC2.1.7 | Leere Eingabe in einem Feld → die zwei anderen Felder sind ebenfalls leer. |
| AC2.1.8 | Eingabe über `255` hinaus (z. B. `999` in Dezimal) → roter Rand, Hilfetext, abhängige Felder unverändert. |

### Bitgewichte

| ID | Akzeptanzkriterium |
|---|---|
| AC2.2.1 | 8 gleichbreite Spalten mit Beschriftungen `128, 64, 32, 16, 8, 4, 2, 1` sichtbar. |
| AC2.2.2 | Bei Dezimalwert `5` zeigen Spalten `0 0 0 0 0 1 0 1`. |
| AC2.2.3 | Klick auf Spalte `128` (wenn Bit `0`) → alle Felder aktualisieren auf Wert `128` (Dec), `80` (Hex), `10000000` (Binär). |
| AC2.2.4 | Erneuter Klick auf `128` → Wert wieder `0`. |
| AC2.2.5 | Spalte mit Tab fokussierbar; Space/Enter toggelt das Bit. |
| AC2.2.6 | Fokus ist sichtbar (Fokus-Indikator). |

### Quiz

| ID | Akzeptanzkriterium |
|---|---|
| AC2.3.1 | Schalter `Konverter`/`Quiz` vorhanden; Standard ist `Konverter`. |
| AC2.3.2 | Quiz-Sicht zeigt Dropdown `Leicht/Mittel/Schwer`, Aufgaben-Label, Eingabefeld, Buttons `Prüfen` und `Nächste Aufgabe`. |
| AC2.3.3 | Aufgaben-Label im Format `Rechne: <wert> (<quellsystem>) → <zielsystem>`. |
| AC2.3.4 | Bei Stufe `Leicht` ist der Quellwert immer ≤ 15 (manuell 10 Runden geprüft). |
| AC2.3.5 | Bei Stufe `Schwer` ist der Quellwert im Bereich 0–255. |
| AC2.3.6 | Richtige Antwort → Feedback `Richtig!` in Grün, Lösung angezeigt, Eingabefeld deaktiviert. |
| AC2.3.7 | Falsche Antwort → Feedback `Falsch.` in Rot, Lösung angezeigt (Format `Lösung: <wert>`). |
| AC2.3.8 | `Nächste Aufgabe` → neue Aufgabe, Feld reaktiviert und fokussiert. |
| AC2.3.9 | Wechsel des Schwierigkeits-Dropdowns → sofort neue Aufgabe der neuen Stufe. |
| AC2.3.10 | Keine Punkteanzeige, kein Score, kein Fortschritts-Speichern sichtbar (auch localStorage leer, DevTools-Inspektion). |
| AC2.3.11 | Alle sechs Konvertierungsrichtungen kommen in einer Stichprobe von 30 Runden vor. |

### Referenz

| ID | Akzeptanzkriterium |
|---|---|
| AC2.4.1 | Hex-Tabelle `0`–`F` mit Dezimal- und Binärspalte sichtbar. |
| AC2.4.2 | In der Tabelle entspricht Hex `A` → Dezimal `10` → Binär `1010`. |

### Eingabevalidierung & Fehlerverhalten

| ID | Akzeptanzkriterium |
|---|---|
| AC3.2.1 | Eingabe `g` im Dezimal-Feld → Zeichen wird verworfen, roter Rand + Hilfetext `Nur Ziffern 0–9 erlaubt.`. |
| AC3.2.2 | Eingabe `2` im Binär-Feld → Zeichen wird verworfen, roter Rand + Hilfetext `Nur Ziffern 0 und 1 erlaubt.`. |
| AC3.2.3 | Eingabe `g` im Hex-Feld → Zeichen wird akzeptiert (Hex erlaubt `g` nicht, d. h. Verwerfung + `Nur 0–9 und A–F erlaubt.`). |
| AC3.2.4 | Bei gültiger Eingabe verschwinden roter Rand und Hilfetext wieder. |

### Layout & Accessibility

| ID | Akzeptanzkriterium |
|---|---|
| AC3.1.1 | Alle Sektionen in der definierten Reihenfolge sichtbar (Header/Modus/Inhalt/Referenz/Footer). |
| AC3.1.2 | Bei Viewport ≤ 768px bleibt die App lesbar; Felder/Bits dürfen umbrechen. |
| AC3.4.1 | Tab-Reihenfolge ist logisch (Konverter → Bits → Referenz bzw. Quiz-Elemente). |
| AC3.4.2 | Fokus-Indikator an jedem fokussierbaren Element sichtbar. |
| AC3.4.3 | Jedes Eingabefeld hat ein programmatisch verknüpftes Label. |
| AC3.4.4 | Quiz-Feedback hat neben Farbe auch Text (`Richtig!` / `Falsch.`). |
| AC3.4.5 | Color-Contrast-Check (Browser-Inspector oder manuelle Stichprobe): Text ≥ 4.5:1. |

### Performance & Code

| ID | Akzeptanzkriterium |
|---|---|
| AC3.5.1 | App öffnet sich per Doppelklick auf `index.html` offline (kein Server erforderlich). |
| AC3.5.2 | Browser-Netzwerk-Panel zeigt 0 externe Requests beim Laden. |

---

## 5. Definition of Done (pro Anforderung)

Eine Anforderung gilt als **done**, wenn:
- Die Implementierung in `index.html` / `styles.css` / `app.js` vorhanden ist,
- das zugehörige Akzeptanzkriterium bei manueller Prüfung bestanden ist,
- die Barrierefreiheits-Anforderungen (NF3.4.x) für das betroffene Element erfüllt sind,
- keine `console.*`-Fehler im Browser beim Laden und bei der Bedienung auftreten,
- die App ohne Build-Schritt per Doppelklick auf `index.html` lauffähig ist.

---

## 6. Aufgaben-Pakete (Empfehlung für den Agenten)

Vorschlag einer Implementierungsreihenfolge; kann vom Agenten angepasst werden.

1. **Paket 1 – Gerüst**: `index.html` mit allen statischen Sektionen, `styles.css` mit Basis-Layout, leere `app.js`.
2. **Paket 2 – Konvertierungslogik**: Pure Funktionen `decToHex`, `decToBin`, `hexToDec`, `binToDec` (kein DOM-Zugriff), in eigenem Modul/Scope.
3. **Paket 3 – Live-Sync**: Event-Listener auf alle drei Felder, Validierung, Fehlerdarstellung.
4. **Paket 4 – Bitgewichte**: 8 Spalten rendern, Klick-Handler, Toggle-Logik, Tastatur-A11y.
5. **Paket 5 – Quiz**: Zufallsgenerator, Stufen, Richtungen, Feedback, Nächste-Aufgabe-Logik.
6. **Paket 6 – Referenz-Tabellen**: statische HTML-Tabelle(n), ggf. aus JS gerendert.
7. **Paket 7 – Accessibility & Polish**: ARIA-Labels, Fokus-Indikator, Kontrast-Prüfung, Tastatur-Test.

---

## 7. Annahmen (vom Spec-Autor gesetzt)

| # | Annahme | Begründung |
|---|---|---|
| A1 | Drei Quiz-Schwierigkeitsstufen (Leicht/Mittel/Schwer) per Wertebereich 0–15 / 0–127 / 0–255 | Löst Konflikt zwischen „nur eine Stufe" und „mehrere Stufen": pädagogisch sinnvolle Abstufung innerhalb des 8-Bit-Fensters. |
| A2 | Alle sechs Konvertierungsrichtungen im Quiz gemischt | Maximale Abdeckung bei geringer Komplexität. |
| A3 | `Nächste Aufgabe`-Button lädt nächste Aufgabe | Zustandslose Runden, Multiple-Choice vermeiden, aktivierende Wiederholung. |
| A4 | Großschreibung als kanonische Hex-Darstellung | Konvention in IT-Lehrbüchern. |
| A5 | Keine Persistenz, kein localStorage | Gemäß Nutzerentscheid; Versionskomplexität minimal. |

---

## 8. Offene / post-MVP-Punkte

- i18n (de/en)
- Oktal & Basis-n
- Schritt-für-Schritt-Erklärmodus für Konvertierungen
- Bitweise Operationen
- Negative Zahlen / Zweierkomplement
- Automatisierte Unit-/E2E-Tests
- Mobile-First-Optimierung

---

**Ende der Spezifikation.**