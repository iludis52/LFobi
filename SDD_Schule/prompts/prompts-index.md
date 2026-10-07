---
titel: SDD-Prompts – so arbeitet ihr damit
datum: 2026-10-07
version: 3.4
---

# In drei Schritten zur fertigen App

**Idee klären → Spec erstellen → Plan erstellen → alle Tasks umsetzen und prüfen.**

Ihr steuert die Übergänge. Die KI unterstützt euch dabei, aus einer vagen Idee eine vollständige vereinbarte App zu entwickeln. SDD gibt Orientierung: Was wollen wir? Wie bauen wir es? Woran erkennen wir, dass es funktioniert?

## 1. Der Grundprozess

| Schritt | Eure Eingabe | Notwendige Dateien | Ergebnis |
| --- | --- | --- | --- |
| **1. Spec erstellen** | „Ich habe da so eine vage Idee für …“ – beschreibt eure Idee. | [00-grundregeln.md](00-grundregeln.md) und [01-spec-erstellen.md](01-spec-erstellen.md) | **spec.md**: die vereinbarte App und ihre Akzeptanzkriterien |
| **2. Plan erstellen** | „Lass uns loslegen.“ | [00-grundregeln.md](00-grundregeln.md), [02-plan-erstellen.md](02-plan-erstellen.md) und eure **spec.md** | **plan.md**: Aufbau der Lösung und alle Tasks |
| **3. Tasks umsetzen** | „Lass uns loslegen.“ | [00-grundregeln.md](00-grundregeln.md), [03-tasks-umsetzen.md](03-tasks-umsetzen.md) und eure **plan.md** | Stückweise die **fertigen App-Bestandteile**, mit tatsächlichen Prüfungen |

**So verwendet ihr die Tabelle:** Gebt bei jedem Schritt die genannten Prompt-Dateien und vorhandenen Ergebnisdateien mit. Im selben Chat müssen Inhalte, die weiterhin im Modellkontext vorhanden sind, nicht erneut angehängt werden. Die bestätigte Spec bleibt auch in Schritt 3 die Grundlage für das Verhalten der App.

> [!MERKE] Den nächsten Schritt startet ihr selbst
> Nach der Spec lest und bestätigt ihr die Vereinbarung. Dann liefert die KI die finale `spec.md` und beendet diese Phase. Anschließend startet ihr Schritt 2 mit dessen Prompt. Nach dem bestätigten Plan folgt ebenso bewusst Schritt 3.

Beim Spec-Gespräch beantwortet ihr offene Fragen, nennt ein eigenes Beispiel und entscheidet über das gewünschte Verhalten. Wenn alles Wesentliche geklärt ist, sagt ihr: **„Erstelle jetzt unsere Vereinbarung.“** Lest den Entwurf, korrigiert ihn bei Bedarf und bestätigt ihn.

Bei der Planung besprecht ihr ein bis zwei sinnvolle Entscheidungen zur Task-Aufteilung oder Reihenfolge. Lest den Plan, korrigiert ihn bei Bedarf und bestätigt ihn.

**Schritt 3 startet ihr nur einmal.** Die KI begleitet danach alle Tasks nacheinander. Ihr speichert und startet die gelieferten Bestandteile und meldet die tatsächlichen Ergebnisse zurück. Nach einem geprüften Task führt die KI ohne erneute Startfrage zum nächsten. Bei einem Fehler wird korrigiert, bei einer Blockade gezielt geklärt.

Wenn alle Tasks geprüft sind, probiert ein anderes Team die App aus. Ihr bearbeitet wichtige Befunde und entscheidet über die Freigabe. Dafür gibt es keinen weiteren KI-Prompt; die kurze Anleitung steht im [Schüler-Arbeitsblatt](../schuelerarbeitsblatt.md).

## 2. Was die vier Prompts der KI sagen

### 00-grundregeln.md – gemeinsame Leitplanken

Diese Datei gilt für das gesamte Projekt. Sie legt fest: kurze Antworten in eurer Muttersprache, standardmäßig Deutsch; verständlicher Code mit freigegebenen Sprachmitteln; keine erfundenen Entscheidungen oder Testergebnisse. Die KI nutzt bereits vereinbarte Erwartungen weiter, erklärt neue Technik und fragt euch nicht nach jedem Task ab. Tatsächliche Prüfungen und menschliche Freigaben bleiben erforderlich.

### 01-spec-erstellen.md – aus einer Idee eine klare Vereinbarung machen

Die KI klärt Nutzer und Ziel, vollständigen Funktionsumfang, Eingaben und Ergebnisse, wesentliche Regeln und wenige relevante Fehler- oder Grenzfälle. Sie hilft, daraus beobachtbare Akzeptanzkriterien mit Beispielen zu formulieren. Die `spec.md` beschreibt **was die App leisten soll**. Sie entsteht aus euren Entscheidungen; in dieser Phase wird noch nicht programmiert.

### 02-plan-erstellen.md – den Aufbau und den Arbeitsweg festlegen

Die KI schlägt einen verständlichen Aufbau vor und beteiligt euch an ein bis zwei echten Planentscheidungen. Die `plan.md` trennt **Aufbau der Lösung** – Dateien, Zuständigkeiten und Datenfluss – von **Tasks** – kleinen Arbeitspaketen mit Ergebnis, Abhängigkeiten und Prüfung. Zusammen decken die Tasks die vollständige vereinbarte App ab. In dieser Phase wird noch nicht umgesetzt.

### 03-tasks-umsetzen.md – alle Arbeitspakete begleiten

Die KI setzt jeweils einen kleinen Schritt um, nennt Datei und Startverfahren und wartet auf eure tatsächliche Rückmeldung. Sie hilft bei Abweichungen, hält den Prüfstand im Plan fest und führt zum nächsten Task. Der Auftrag umfasst **alle Tasks**, nicht nur den ersten. Ein fehlendes Prüfergebnis bleibt offen; ein erfolgreicher Task bedeutet noch nicht, dass die ganze App fertig ist.

## 3. Warum die Prompts so kompakt aussehen

Die vier Dateien enthalten verdichtete englische Steueranweisungen. Begriffe wie `LOOP`, `WAIT` oder `END` ordnen den Arbeitsablauf. Ähnlich einer Programmanweisung beschreiben die Prompts, was die KI tun soll, wann sie auf euch warten muss und wann eine Phase endet. Eure Gespräche und Ergebnisdokumente bleiben in eurer Sprache.

Der knappe Text vermeidet Wiederholungen und spart Eingabetext beziehungsweise Tokens. Prompts steuern das Modell, sind aber kein deterministisch ausgeführtes Programm. Deshalb lest ihr die Ergebnisse und führt Prüfungen selbst aus. Diese Seite erklärt die Regeln auf Deutsch; ihr müsst die englischen Prompttexte nicht auswendig lernen.

> [!HINWEIS] Feature-Freeze
> Die vier SDD-Prompts sind auf dem erprobten Stand 3.3 eingefroren. In Paket 3.4 bleiben sie unverändert. Diese Anleitung und die übrigen Materialien erläutern ihre Verwendung.

## 4. Kurze praktische Hinweise

- **Projektkarte:** Die Lehrkraft gibt Auftrag, Umgebung, erlaubte Sprachmittel und Start-/Prüfverfahren vor. Diese Angaben gelten in allen drei Schritten.
- **Dateien erklären:** Mit `spec.md` zeigt ihr, was vereinbart wurde; mit `plan.md`, wie Aufbau und Arbeit organisiert sind. Die Anwendung zeigt die Umsetzung. Eine eigene `task.md` ist nicht nötig.
- **Ergebnisse melden:** Prüffälle gesammelt ausführen und kurz berichten, welche Fälle geprüft wurden und ob sie passen. Bei Abweichungen Eingabe, Erwartung und tatsächliche Ausgabe mitgeben.
- **Lokale Dateien:** Die KI sieht euren aktuellen Code und Bildschirm nicht automatisch. Bei Änderungen fehlende Dateien mitgeben; nach Übertragung speichern und neu starten.
- **Grundregeln:** Sie können vom Frontend im Hintergrund oder einmal am Chatanfang mitgegeben werden. Entscheidend ist, dass sie im Modellkontext erhalten bleiben.

<details>
<summary>Wenn ihr einen neuen Chat beginnt</summary>

Gebt Grundregeln, Projektkarte und den aktuellen Phasenprompt erneut mit. Für die Planung braucht ihr die bestätigte `spec.md`; für die Umsetzung zusätzlich die `plan.md` mit Task-/Prüfstand und betroffene aktuelle Dateien. Die KI darf aus einem Plan ohne ausreichende Verhaltensregeln keine fehlenden Anforderungen erfinden.

Bei der DeepSeek-Chat-Completions-API muss das Frontend den benötigten Verlauf mit jeder Anfrage mitsenden.[^kontext] Nur im sichtbaren Chat gespeichert zu sein genügt nicht. Die konkrete Kontextverwaltung des Schulfrontends wurde hier nicht geprüft.

</details>

<details>
<summary>Wenn die Lehrkraft TDD auswählt</summary>

Der Umsetzungs-Prompt enthält den optionalen TDD-Ablauf: Test zuerst, tatsächliches Rot, Umsetzung, tatsächliches Grün und bei Bedarf Strukturverbesserung. Ohne TDD kann der TDD-Abschnitt bei der Übergabe entfallen; die übrigen Abschnitte bleiben erhalten. Erwartungen vor der Umsetzung und wirkliche Prüfungen gelten immer. Begriffe und Ablauf erläutert [Testen und TDD](../vertiefung/testen-und-tdd.md).

</details>

[^kontext]: DeepSeek, [Multi-round Conversation](https://api-docs.deepseek.com/guides/multi_round_chat/), technische Primärquelle, geprüft am 04.10.2026. Beschreibt die zustandslose Chat-Completions-API; keine Aussage über die Implementierung des Schulfrontends.
