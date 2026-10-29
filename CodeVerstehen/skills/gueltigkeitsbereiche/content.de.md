# Derselbe Name kann verschiedene Werte meinen
## main und lokale Aufrufe
Ein im Hauptprogramm angelegter Name gehört hier zum globalen Bereich main. Parameter und innerhalb einer Funktion angelegte Namen sind lokal. Ein lokaler Name kann einen globalen Namen verdecken.
## Python
```python
wert = 3
def aendern(wert):
    wert = wert + 2
    return wert
print(aendern(wert))
print(wert)
```
## JavaScript
```javascript
let wert = 3;
function aendern(wert) {
    wert = wert + 2;
    return wert;
}
console.log(aendern(wert));
console.log(wert);
```
Die Ausgaben sind 5 und 3. Der Parameter wurde neu zugewiesen; der globale Name bleibt unverändert. Eine Rückgabe ist kein automatisches Zurückschreiben des Parameters.
## Jeder Aufruf beginnt neu
Lokale Variablen werden bei jedem Aufruf neu angelegt. Eine lokale Erhöhung speichert ohne ausdrücklichen gemeinsamen Zustand keinen Fortschritt für spätere Aufrufe.
Die Tabelle kennzeichnet den Bereich und die Nummer des Aufrufs. Sie zeigt innerhalb einer Funktion den sichtbaren lokalen Wert, bei Rückkehr wieder den Hauptprogrammbereich. Python global/nonlocal, Closures und weitere JavaScript-Blockregeln bleiben spätere Vertiefungen.
