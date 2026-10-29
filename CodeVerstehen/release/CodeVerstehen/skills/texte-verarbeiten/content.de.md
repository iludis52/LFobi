# Text als verarbeitbare Daten
## Zerlegen, verbinden, suchen
split zerlegt Text anhand eines Trennzeichens in eine Liste bzw. ein Array. join verbindet Teile mit einem gewählten Trennzeichen. Die ursprünglichen Texte werden dabei nicht verändert.
## Python
```python
teile = "rot|blau".split("|")
text = "-".join(teile).upper()
print(text)
print(text.find("BLAU"))
```
## JavaScript
```javascript
let teile = "rot|blau".split("|");
let text = teile.join("-").toUpperCase();
console.log(text);
console.log(text.indexOf("BLAU"));
```
Die Ergebnisse sind ROT-BLAU und 4. Suchpositionen beginnen bei 0. Ein nicht gefundener Text liefert bei find/indexOf −1. upper/lower bzw. toUpperCase/toLowerCase erzeugen neue Texte.
## Ersetzen und Sprachunterschiede
Python text.replace("rot", "blau") ersetzt alle Vorkommen. JavaScripts replace mit einem Textargument ersetzt nur das erste. Unsere JavaScript-Aufgaben verwenden deshalb split("rot").join("blau"), damit beide rot-Vorkommen ersetzt werden.
Die Beispiele verwenden einfache ASCII-Texte. Unicode-Indizes, reguläre Ausdrücke und das unterschiedliche Verhalten von split bei leerem Trenner gehören nicht zum gemeinsamen Vertrag.
