---
titel: Begriffe an einer App entdecken – Arbeitsblatt
datum: 2026-10-04
kurs: Optionale Ergebnissicherung
version: 3.0
---

# Was haben wir beim Entwickeln erlebt?

Name / Team: … · Projekt: …

Nutze zuerst deine Projekterfahrung, danach bei Bedarf das [Glossar](../glossar.md). Kurze Antworten genügen. Die Lehrkraft wählt passende Aufgaben aus.

## 1. Eine Anforderung genauer machen

„Die App soll beim Lernen helfen.“

Beschreibe eine konkrete Nutzungssituation und eine beobachtbare Rückmeldung, die deinem Nutzer helfen würde.

**Nutzer, Situation und Ziel:** …

**Gewünschtes Verhalten:** …

## 2. Kriterium und Testfall unterscheiden

Vereinbarung: „Bei einer leeren Antwort fordert die App zur Eingabe einer Dezimalzahl auf.“

Formuliere einen Testfall mit Ausgangssituation, Handlung und erwartetem Ergebnis. Warum ersetzt dieser Fall noch nicht die Prüfung aller Anforderungen?

**Mein Testfall:** …

**Noch ungeprüft:** …

## 3. Den Zusammenhang verfolgen

Wähle eine Anforderung aus deinem Projekt. Trage ein, wie sie durch die Entwicklung führt.

| Anforderung | Akzeptanzkriterium | Task / Codefunktion | Prüffall |
| --- | --- | --- | --- |
| … | … | … | … |

Welche Entscheidung hast du dabei selbst getroffen? …

## 4. Einen Befund einordnen

Ordne ein und beschreibe den nächsten Schritt:

| Beobachtung | Codefehler, unklare Anforderung oder neuer Wunsch? | Was folgt? |
| --- | --- | --- |
| `12` ergibt „Richtig“, obwohl für `1011` nur `11` vereinbart ist. | … | … |
| Niemand hat festgelegt, ob Leerzeichen vor einer Zahl erlaubt sind. | … | … |
| Ein Nutzer wünscht sich Zufallsaufgaben; vereinbart war eine feste Aufgabe. | … | … |

## 5. Optional: Welche Prüfung sieht was?

- **A:** Die Fachfunktion erhält `11` und liefert wahr.
- **B:** Eingabetext `"11"` wird umgewandelt und an die Fachfunktion übergeben.
- **C:** App öffnen, `11` eingeben, klicken und „Richtig“ auf der Seite sehen.

Ordne Unit, Integration und E2E zu. Erkläre, warum A bestehen kann, obwohl C fehlschlägt.

**Zuordnung und Erklärung:** …

## 6. Mit eigenen Worten abschließen

**SDD hilft uns, weil …**

**Eine Sache, die wir wirklich geprüft haben: …**

**Eine Sache, die wir noch nicht wissen: …**

<details>
<summary>Hinweise für die Lehrkraft – mögliche Antworten</summary>

1. Beispiel: Mitschüler übt binäre Stellenwerte; nach falscher Antwort zeigt die App die Beiträge 8, 2 und 1, ohne nur „falsch“ zu melden. Entscheidend sind Nutzerbezug und beobachtbares Verhalten.
2. App zeigt `1011`; Antwortfeld leer lassen; „Prüfen“ klicken; Eingabeaufforderung erwarten. Richtige und falsche Zahlen sowie weitere Regeln bleiben ungeprüft.
3. Prüfen, ob Kriterium, Funktion und Fall dieselbe Regel betreffen. Die Formulierungen dürfen je Projekt variieren.
4. Codefehler: Umsetzung korrigieren und erneut prüfen. Unklare Anforderung: Verhalten vereinbaren, Spec und betroffene Fälle ergänzen. Neuer Wunsch: Umfang gemeinsam prüfen, meist als spätere Fassung notieren.
5. A = Unit, B = Integration, C = E2E. C kann etwa wegen einer nicht angeschlossenen Schaltfläche oder fehlerhaften Anzeige scheitern.
6. Offene Antworten; fachlichen Zusammenhang und begründete Grenzen der Prüfung würdigen.

Die Aufgaben sind eigene Unterrichtsaufgaben zur Erprobung. Bei individueller Diagnostik erst ohne unmittelbare KI-Antwort bearbeiten lassen; im Lernbetrieb kann anschließend gezielte Hilfe folgen.

</details>
