// Vorbereitete Prüfinfrastruktur.
let fehler = 0;
let ausgabe = "";

function pruefe(name, erwartet, tatsaechlich) {
    if (tatsaechlich === erwartet) {
        ausgabe = ausgabe + "BESTANDEN: " + name + "\n";
    } else {
        fehler = fehler + 1;
        ausgabe = ausgabe + "FEHLER: " + name + "; erwartet: " + erwartet + "; erhalten: " + tatsaechlich + "\n";
    }
}

pruefe("unterhalb", false, istZuWarm(29));
pruefe("am Grenzwert", false, istZuWarm(30));
pruefe("oberhalb", true, istZuWarm(31));

if (fehler > 0) {
    ausgabe = ausgabe + "ROT: " + fehler + " Pruefung(en) fehlgeschlagen";
} else {
    ausgabe = ausgabe + "GRUEN: Alle drei Pruefungen bestanden";
}
document.getElementById("ergebnis").textContent = ausgabe;
