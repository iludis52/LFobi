# Zugriff über Schlüssel
## Position oder Bedeutung?
Eine Liste fragt nach der Position. Ein Dictionary bzw. eine Map fragt nach einem Schlüssel wie "punkte". Ein Schlüssel ist nicht automatisch eine fortlaufende Zahl.
## Python-Dictionary
```python
konto = {"punkte": 4, "bonus": 2}
konto["punkte"] = konto["punkte"] + 2
print(konto["punkte"])
print(len(konto))
```
## JavaScript-Map
```javascript
let konto = new Map([["punkte", 4], ["bonus", 2]]);
konto.set("punkte", konto.get("punkte") + 2);
console.log(konto.get("punkte"));
console.log(konto.size);
```
Die Ausgaben sind 6 und 2. Ein vorhandener Schlüssel wird ersetzt; ein neuer Schlüssel vergrößert die Zuordnung. Python .keys() bzw. JavaScript .keys() liefert hier die Schlüssel. Erst ein weiterer Zugriff liefert den Wert.
## Datensätze bündeln Felder
{"name": "Ada", "punkte": 4} ist in Python ein Dictionary und in JavaScript ein Objekt als Datensatz. Für diese festen Felder verwenden beide Sprachen hier ["punkte"]. Eine Liste kann mehrere solcher Datensätze enthalten; personen[1]["name"] liest den Namen des zweiten.
Ein Datensatz gehört zu einer Person, nicht zu einem einzelnen Tabellenwert. Map und JavaScript-Objekt sind verschiedene Typen: get/set gehört zur Map, der Feldzugriff hier zum Objekt.
Alle verwendeten Schlüssel existieren. Fehlende Schlüssel werden nicht sprachübergreifend gleichgesetzt.
