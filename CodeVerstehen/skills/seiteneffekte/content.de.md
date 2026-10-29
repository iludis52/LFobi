# Rückgabe und weitere Wirkung
## Eine Funktion kann mehr tun als zurückgeben
Eine Ausgabe ist ein sichtbarer Seiteneffekt. Auch das Verändern einer übergebenen Sammlung kann außerhalb des Aufrufs sichtbar bleiben.
## Python
```python
def ergaenzen(daten):
    daten.append(9)
    return len(daten)
werte = [2, 3]
print(ergaenzen(werte))
print(werte[2])
```
## JavaScript
```javascript
function ergaenzen(daten) {
    daten.push(9);
    return daten.length;
}
let werte = [2, 3];
console.log(ergaenzen(werte));
console.log(werte[2]);
```
Beide Namen sprechen während des Aufrufs dieselbe Sammlung an. Die Länge wird 3 und das angehängte Element ist beim Aufrufer als 9 sichtbar.
## Lokal neu zuweisen ist etwas anderes
daten = [8, 9] innerhalb der Funktion bindet den lokalen Parameter an eine neue Sammlung. Die ursprüngliche Sammlung des Aufrufers bleibt erhalten. Verändern eines Objekts und Neuzuweisen eines Namens sind verschiedene Vorgänge.
Dieses konkrete Beispiel führt den nötigen Unterschied ein. Umfassende Referenzmodelle, Kopien und tief verschachtelte Daten gehören zu Kapitel 6.
