# SDD-Spezifikationspaket: Unterrichtsplanung

Spezifikationsgetriebene Unterrichtsplanung mit LLMs (Spec-Driven Design) — Informatik und fachverwandte Fächer, berufliche Schulen.

**Hier anfangen:** `meta/BETRIEBSANWEISUNG.docx` — was das ist, wie es funktioniert, wie man es benutzt.
**Anpassen und forken:** `meta/WEITERENTWICKLUNG.docx`.

Die eine Regel: Ein Ensemble-Ordner (`ensemble_…/`) wird komplett in den LLM-Kontext geladen — die S4-Datei als Systemprompt, der Rest als Anhang, dazu fallweise Lehrplan und Sachanalyse aus `je_planung/`. Der Ordner `meta/` wird **nie** geladen.

Ensembles: `ensemble_ki-integration/` (KI-Themen im Fachunterricht) · `ensemble_generisch/` (Standard-Lehrplanthemen). Prozessgrafik: `meta/prozess_flowchart.mermaid`.
