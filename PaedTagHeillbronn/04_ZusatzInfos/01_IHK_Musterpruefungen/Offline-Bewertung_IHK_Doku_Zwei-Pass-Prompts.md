# Offline-Bewertung von IHK-Dokumentationen mit einem lokalen multimodalen LLM

**Zwei-Pass-Konzept gegen den „Fluency/Halo-Bias" – inkl. Bildanalyse**
*Praktischer Ablauf für LM Studio + 27B-VL-Modell, ohne Python*

---

## 1. Worum es geht (in zwei Sätzen)

Lokale LLM-Prüfer lassen sich von geschliffener Sprache *und* von optisch sauberen Abbildungen blenden: Sie fällen ein holistisches „wirkt kompetent"-Urteil und bewerten danach nur noch die Oberfläche. Die Gegenmaßnahme ist nicht „besser bitten", sondern ein **Verfahren**: Belegzwang (jede positive Aussage muss wörtlich zitiert werden), Spezifitäts-Test (austauschbare Inhalte zählen null) und eine **strikte Trennung von Wahrnehmung und Bewertung** über zwei Durchläufe.

**Grundsatz für die ganze Kette:** Die KI ist ein **Lückenfinder**, kein Ersatzprüfer. Inventarisieren, Zitieren, Konsistenz prüfen – das macht das Modell gut. Die **Gesamtnote bleibt bei der Lehrkraft**.

---

## 2. Praktischer Ablauf in LM Studio (ohne Python)

### Vorbereitung – Text und Bilder bereitstellen

**Text der Arbeit besorgen:** PDF öffnen → gesamten Text markieren (Strg+A / Cmd+A) → kopieren. IHK-Dokumentationen haben in der Regel auswählbaren Text. *Lässt sich kein Text markieren*, ist das PDF ein reiner Scan – dann ist eine zuverlässige Bewertung ohne OCR nicht möglich; das vorab klären.

**Abbildungen als Bilder besorgen** (no-code, drei Wege):
- **Screenshot je Abbildungsseite:** Windows „Ausschneiden und skizzieren" (Win+Umschalt+S) bzw. Mac (Cmd+Umschalt+4). Vorher im PDF-Reader auf ~150 % zoomen, damit kleine Werte (IPs, Ports, Konfig-Zeilen) lesbar bleiben.
- **Export aus dem PDF-Reader:** z. B. Mac-Vorschau → Seiten in der Seitenleiste markieren → Ablage → Exportieren als JPEG.
- Pro Abbildung **eine** Bilddatei, sauber benannt (Seite/Abb-Nr.).

> Es genügen die Seiten **mit** Abbildungen – nicht das ganze Dokument als Bild. Das schont das knappe Kontextfenster.

### Modell laden
Ein **vision-fähiges** 27B-Modell wählen (Variante mit Bildunterstützung, im Namen oft `-VL` o. ä.). Kontextlänge in den Einstellungen so hoch setzen, wie der Arbeitsspeicher zulässt – Bilder verbrauchen viel Kontext.

### Durchlauf 1 – Bildinventar erstellen
Neuer Chat → die Abbildungs-Bilder anhängen → **Prompt 1** (Abschnitt 3) einfügen → ausführen → die strukturierte Ausgabe **speichern** (Textdatei). Das ist dein Audit-Trail.

### Durchlauf 2 – Bewertung
Neuer Chat → **Prompt 2** (Abschnitt 4) einfügen → darunter den **kopierten Text** der Arbeit einfügen → darunter das **Bildinventar aus Durchlauf 1** einfügen → die **Abbildungs-Bilder erneut anhängen** → ausführen.

> Warum die Bilder im 2. Durchlauf *zusätzlich* zur Textbeschreibung? Die Beschreibung ist Audit-Trail und Aufmerksamkeitshilfe – aber für „ergibt diese Topologie fachlich Sinn?" schlagen die echten Pixel jeden Textproxy.

### Wenn das Kontextfenster zu klein ist
- Durchlauf 1 **abbildungsweise** durchführen (eine Abbildung pro Durchgang) und die Teil-Inventare zusammenfügen.
- Durchlauf 2: Wenn nicht alle Bilder hineinpassen, auf das **Inventar (Text)** stützen und nur die **bewertungsrelevantesten** Abbildungen anhängen.

---

## 3. Prompt 1 — Bildbeschreibung (rein deskriptiv, urteilsfrei)

```
Du beschreibst Abbildungen aus einer Prüfungsdokumentation – NEUTRAL und
URTEILSFREI. Du bewertest NICHT. Du vergibst keine Note. Du erfindest nichts.

Dir sind eine oder mehrere Abbildungen als Bild beigefügt. Beschreibe jede
einzeln nach folgendem Schema:

- ABB-NR / Seite (aus Bildunterschrift oder Position, sofern erkennbar)
- TYP: selbst erstelltes Diagramm | Screenshot eines Tools/GUI |
  Code-/Konfig-Ausschnitt als Bild | Foto | generische/Stock-Grafik | unklar
- INHALT: Was ist dargestellt? Welche Elemente, Beschriftungen, Verbindungen,
  Beziehungen?
- ABLESBARE WERTE: konkrete Werte (IP-Adressen, Hostnamen, Ports, Parameter,
  Konfig-Zeilen) NUR wenn zweifelsfrei lesbar. Bei jeder Unsicherheit ausdrücklich
  "[unsicher]" markieren. Lieber "nicht eindeutig lesbar" schreiben als raten.
- EINORDNUNG: Trägt die Abbildung konkrete, auf DIESES Projekt bezogene Inhalte
  (echte Namen/Werte) oder nur Platzhalter und Allgemeinplätze?

Gib eine strukturierte Liste aus. Keine Wertung, keine Note, keine Empfehlung.
```

---

## 4. Prompt 2 — Bewertung (gehärtet, mit Bild-Audit)

```
Du bist ein strenger, skeptischer Prüfer im Fachbereich Systemintegration.
Deine Aufgabe ist zu prüfen, ob angekündigte Inhalte tatsächlich substanziell
geliefert werden – nicht, ob die Arbeit kompetent klingt oder gut aussieht.

DIR LIEGEN VOR:
(1) der Text der Arbeit,
(2) das Abbildungs-Inventar aus dem Beschreibungsdurchlauf,
(3) die Original-Abbildungen als Bild.

GRUNDREGEL SPRACHE: Sprachliche Politur ist KEIN Qualitätsmerkmal. Fehlerfreie,
geschliffene Sprache ist neutral. Ein eleganter Satz, der keine projektspezifische
Information trägt, zählt null.

GRUNDREGEL ABBILDUNGEN: Optische Qualität oder Professionalität einer Abbildung
ist KEIN Qualitätsmerkmal. Ein sauberes, aber generisches Diagramm zählt null.

BELEG-ZWANG: Jede positive Aussage, die du über die Arbeit triffst, MUSST du
durch ein wörtliches Zitat aus dem Text bzw. durch konkreten Bezug auf eine
Abbildung belegen. Was du nicht belegen kannst, existiert nicht und darf nicht
in die Punktzahl eingehen.

Arbeite strikt in dieser Reihenfolge:

SCHRITT 1 – Inventar Text: Liste alle Themen/Abschnitte auf, die Gliederung,
Einleitung oder Ankündigungen versprechen.

SCHRITT 2 – Substanz-Audit pro Abschnitt: Zitiere die Kernpassage(n) und ordne
jeden Abschnitt EINER Kategorie zu:
  (a) konkret, projektspezifisch und begründet
  (b) vorhanden, aber generisch/oberflächlich
  (c) nur angekündigt, nicht ausgeführt
  Spezifitäts-Test für jede als (a) eingestufte Passage: "Könnte dieser Satz
  unverändert in einer beliebigen anderen Arbeit zum selben Thema stehen?"
  Wenn ja → herabstufen auf (b).

SCHRITT 3 – Begründungs-Check: Identifiziere alle getroffenen Entscheidungen.
Prüfe je Entscheidung: Wird begründet, WARUM diese Lösung (Alternativen, Abwägung,
Konsequenzen)? Markiere unbegründete Entscheidungen.

SCHRITT 4 – Nachvollziehbarkeit: Könnte ein Fachkundiger den dokumentierten
Arbeitsprozess allein aus diesem Text rekonstruieren? Benenne konkret die Stellen,
an denen zum Verständnis nötige Details fehlen.

SCHRITT 4b – Abbildungs-Audit: Für jede Abbildung:
  (i)   Referenz-Integration: Wird sie im Text namentlich referenziert UND
        inhaltlich aufgegriffen? Zitiere die Textstelle. Keine Referenz / keine
        Diskussion → dekorativ, kein Substanzbeitrag.
  (ii)  Spezifitäts-Test: "Könnte diese Abbildung unverändert in einer beliebigen
        anderen Arbeit zum selben Thema stehen?" Wenn ja → generisch, kein
        Substanzbeitrag.
  (iii) Eigenleistung: selbst erstelltes Diagramm (zeigt Verständnis) vs.
        Screenshot vs. Fremd-/Stockmaterial. Nenne die Einordnung.
  (iv)  Mehrwert: Trägt die Abbildung Information, die der Text NICHT schon
        enthält, oder ist sie redundant?

SCHRITT 4c – Text-Bild-Konsistenz: Vergleiche, was der Text behauptet, mit dem,
was die Abbildungen zeigen. Benenne jeden Widerspruch (z. B. im Text genannte
Komponente fehlt im Netzplan; Werte weichen ab). Widersprüche sind ein starkes
Substanz- und Sorgfaltsdefizit.

SCHRITT 5 – Defizit-Liste (VOR jeder Punktvergabe): leere Phrasen, generische
Text- oder Bildpassagen, unausgeführte Ankündigungen, fehlende Belege/Beispiele,
unbegründete Entscheidungen, Inkonsistenzen, dekorative Abbildungen.

SCHRITT 6 – Bewertung: Vergib pro Kriterium Punkte mit Begründung. Jeder Punkt
oberhalb des Minimums erfordert ein wörtliches Beleg-Zitat bzw. einen konkreten
Bildbezug. Bewerte sprachliche Form UND Bildqualität (Lesbarkeit, Schärfe) jeweils
auf einer eigenen, nachrangigen Achse und lass sie NICHT in die Substanznote
einfließen.

SCHRITT 7 – Gesamtnote: ausdrücklich verankert an der Defizit-Liste aus Schritt 5,
NICHT am Gesamteindruck.

SCHRITT 8 – Selbstkritik: Lies deine eigene Bewertung erneut und korrigiere jede
Stelle, an der du flüssige Sprache oder ein hübsches Bild statt belegter Substanz
belohnt hast.
```

> **Optional, sehr wirksam:** Vor „Arbeite strikt in dieser Reihenfolge" einen Block
> `# KALIBRIERUNGSBEISPIEL` einfügen – eine selbst bewertete Arbeit samt eigener
> Begründung („klingt gut, ist aber oberflächlich, und zwar weil …"). Das ist der
> stärkste Einzel-Kalibrierungsschritt: Es bringt dem Modell die eigene
> Diskriminierung bei, statt es bei abstrakten Vorgaben zu belassen.

---

## 5. Grenzen – ehrlich und prüfungsfest

- **Note bleibt beim Prüfer.** Den Prompt nicht so lange drehen, bis die KI die eigene Note exakt trifft – das wäre Overfitting auf einen Einzelfall. Ziel ist ein zuverlässiger Lückenfinder, kein Ersatzprüfer.
- **Wert-Ablesung ist die schwächste Stelle.** IPs, Subnetzmasken, Ports, Konfig-Zeilen liest ein 27B-VL-Modell unzuverlässig. Keine Note auf eine Ablesung stützen, die nicht am Original verifiziert wurde – dafür das `[unsicher]`-Flag aus Durchlauf 1.
- **Kein KI-Erkennungs-Anspruch.** Geschliffene Sprache ist kein Beweis für KI-Einsatz. Der Prompt prüft bewusst nicht „wurde KI benutzt", sondern Substanz und Nachvollziehbarkeit des *eigenen* Arbeitsprozesses mit Zitatbeleg. Damit wird irrelevant, ob beim Formulieren KI half – entscheidend ist die projektspezifische Substanz, die nur liefern kann, wer die Arbeit selbst gemacht hat. Diese Linie ist vor dem Prüfungsausschuss sauber verteidigbar.
