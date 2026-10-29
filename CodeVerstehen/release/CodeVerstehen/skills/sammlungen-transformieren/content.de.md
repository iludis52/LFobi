# Eine Verarbeitung in Schritte zerlegen
## Filtern
Eine Bedingung wählt aus, welche Elemente in eine neue Sammlung übernommen werden. Die übrigen fehlen im Ergebnis. Filtern verändert hier die ursprüngliche Sammlung nicht.
## Transformieren
Jedes ausgewählte Element kann etwa verdoppelt werden. Das Ergebnis dieses Schritts ist Eingabe des nächsten Schritts.
## Numerisch sortieren
Python sortiert eine Zahlenliste mit werte.sort() aufsteigend. JavaScript verwendet dafür hier einen Vergleich:
```javascript
werte.sort((links, rechts) => links - rechts);
```
Die Vergleichsfunktion liefert bei kleinerem linken Wert eine negative Zahl. Sie wird vom Sortierverfahren mit Elementpaaren aufgerufen. Die Funktion ist vorgegeben; eigene Funktionen folgen in Kapitel 5.
JavaScript sort() ohne Vergleich ordnet nach Text: 10 kann dann vor 2 stehen. Beide gezeigten numerischen Sortierungen verändern die Sammlung an Ort und Stelle.
## Zusammenfassen
Eine nachfolgende Schleife kann alle Ergebnisse aufsummieren. Beispiel: Aus [4, 1, 3] werden nach Filtern > 1 und Verdoppeln [8, 6], nach Sortieren [6, 8], schließlich Summe 14.
## Vorgehen
1. Verfolge die ursprünglichen Werte.
2. Wende die Bedingung an.
3. Berechne neue Werte nur für übernommene Elemente.
4. Sortiere numerisch, wenn gefordert.
5. Unterscheide Anzahl, kleinsten Wert und Summe.
