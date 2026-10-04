# Vorbereitete Prüfinfrastruktur.
import sys
from app import ist_zu_warm

fehler = 0

def pruefe(name, erwartet, tatsaechlich):
    global fehler
    if tatsaechlich == erwartet:
        print("BESTANDEN:", name)
    else:
        fehler = fehler + 1
        print("FEHLER:", name, "erwartet:", erwartet, "erhalten:", tatsaechlich)

pruefe("unterhalb", False, ist_zu_warm(29))
pruefe("am Grenzwert", False, ist_zu_warm(30))
pruefe("oberhalb", True, ist_zu_warm(31))

if fehler > 0:
    print("ROT:", fehler, "Pruefung(en) fehlgeschlagen")
    sys.exit(1)
print("GRUEN: Alle drei Pruefungen bestanden")
