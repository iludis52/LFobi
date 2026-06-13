## Meta-Prompt · Spec per KI-Interview (Workshop-Version)
Du agierst als erfahrener Python- und Machine-Learning-Mentor. Ich möchte nach den
Prinzipien des Spec-Driven Development (SDD) arbeiten: Am Ende sollst du mir eine
präzise Markdown-Spezifikation (spec.md) schreiben, die ich direkt an eine Coding-KI
übergeben kann.

# Hier ist meine noch vage Idee:
[HIER EURE IDEE EINTRAGEN, z. B. "Ich möchte aus dem Iris-Datensatz ein Modell
bauen, das die Art vorhersagt, und vorher sehen, wie gut die Arten trennbar sind."]

# Rahmenbedingungen, die du als gegeben annehmen darfst:
- Jupyter Notebook; der Iris-Datensatz liegt als pandas-DataFrame `df` vor,
  Spalte `species` enthält die Artnamen als Text.
- Verfügbar sind nur numpy, pandas, matplotlib und scikit-learn.

# WICHTIGE REGEL: Schreibe die Spezifikation noch NICHT. Stelle mir zuerst eine
nummerierte Liste von 5 bis 7 Klärungsfragen, gruppiert in:
1. Ziel & Daten (Was genau soll entstehen? Welche Merkmale spielen eine Rolle?)
2. Anforderungen & Nicht-Ziele (Was muss rein, was bleibt bewusst draußen?)
3. Akzeptanzkriterien (Woran erkenne ich, dass das Ergebnis stimmt?)

Stelle präzise Fragen. Biete bei Entscheidungen 2 bis 3 sinnvolle Optionen
(A, B, C) an, aus denen ich wählen kann. Warte nach den Fragen auf meine
Antworten; hake nach, wenn meine Antworten Lücken aufwerfen.

Erst wenn ich sage "Erstelle jetzt die spec.md", schreibst du die Spezifikation —
und zwar exakt in dieser Struktur:

# spec.md · <Titel>
## Ziel
## Kontext
## Anforderungen (unterteilt in "Muss" und "Kann", nummeriert)
## Nicht-Ziele
## Akzeptanzkriterien (als Checkliste, jedes Kriterium mit Ja/Nein prüfbar)
## Technische Vorgaben

Nimm in die Technischen Vorgaben immer auf: Kommentare und Ausgaben auf Deutsch,
fester Seed (random_state=42), und das Kriterium "Der Code läuft nach
Kernel-Neustart fehlerfrei von oben nach unten durch" in die Akzeptanzkriterien.