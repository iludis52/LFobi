# spec.md · Iris-Klassifikation mit Trennbarkeits-Visualisierung

> **Hinweis für den Workshop:** Das hier ist eine fertig ausgefüllte Spec als Zielbild.
> Eure eigene darf kürzer sein — entscheidend ist, dass jedes Akzeptanzkriterium
> mit Ja/Nein prüfbar ist.

## Ziel

Ein Notebook-Abschnitt, der die drei Iris-Arten aus den vier Blütenmerkmalen klassifiziert und vorab visuell zeigt, wie gut die Arten überhaupt trennbar sind.

## Kontext

- Der Iris-Datensatz liegt als pandas-DataFrame `df` vor.
- Die Spalte `art` enthält die Artnamen als Text (setosa, versicolor, virginica); die Spalte `target` die numerische Codierung.
- Verfügbare Bibliotheken: numpy, pandas, matplotlib, scikit-learn.

## Anforderungen

### Muss

1. Ein Streudiagramm der Merkmale `petal length (cm)` gegen `petal width (cm)`, farblich nach Art getrennt, mit Achsenbeschriftung, Titel und Legende.
2. Aufteilung der Daten in 80 % Training und 20 % Test, stratifiziert nach Art.
3. Training eines k-Nearest-Neighbors-Klassifikators (k=5) auf den Trainingsdaten.
4. Ausgabe der Accuracy auf den Testdaten als Satz, z. B. „Genauigkeit auf Testdaten: 96,7 %".
5. Ausgabe einer Konfusionsmatrix mit den Artnamen als Beschriftung.

### Kann

1. Kurzer Markdown-Kommentar (2–3 Sätze), der die Konfusionsmatrix interpretiert.

## Nicht-Ziele

1. Keine zusätzlichen Bibliotheken installieren oder importieren (kein seaborn, kein plotly).
2. Keine Hyperparameter-Optimierung, kein Vergleich mehrerer Modelle.
3. Keine eigenen Funktionen oder Klassen — flacher Skript-Stil, damit der Code Zelle für Zelle lesbar bleibt.

## Akzeptanzkriterien

- [ ] Das Streudiagramm zeigt drei unterscheidbare Farben mit Legende; Achsen und Titel sind beschriftet.
- [ ] Im Code existiert ein `train_test_split` mit `test_size=0.2` und `stratify`-Parameter; das Modell wird ausschließlich auf den Trainingsdaten trainiert.
- [ ] Die Accuracy auf den Testdaten wird ausgegeben und liegt über 90 %.
- [ ] Die Konfusionsmatrix ist mit den Artnamen (nicht 0/1/2) beschriftet.
- [ ] Der Code läuft nach Kernel-Neustart fehlerfrei von oben nach unten durch.

## Technische Vorgaben

- Zielumgebung: Jupyter Notebook (Kaggle / Anaconda)
- Kommentare und Ausgaben auf Deutsch
- Zufallsoperationen mit festem Seed (`random_state=42`)
- Maximal zwei Code-Zellen: eine für Visualisierung, eine für Modell und Auswertung
