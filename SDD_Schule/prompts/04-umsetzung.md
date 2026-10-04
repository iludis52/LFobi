---
titel: Auftrag 3 – Einen Task umsetzen und prüfen
datum: 2026-10-04
version: 3.1
---

# Jeweils einen kleinen Schritt bearbeiten

## KI-Auftrag

TASK: <Nummer oder Beschreibung einsetzen>

Apply rules/card/approved spec/plan; ONLY this task. Request missing current code; introduce/approve new language features first.

START: State behavior/AK; elicit learner's case/expectation or justification of approved example. Resolve uncertainty.

DEFAULT: Supply current edit + filename/location + save/run procedure. Request actual output/observation; STOP/WAIT. Compare with expectation. Failures: diagnose → minimal fix → rerun → WAIT.

TDD (if selected, replaces DEFAULT; separate replies/real feedback):
1. Test + callable placeholder if needed; NO correct implementation. Request run; STOP/WAIT.
2. Confirm failure from missing behavior. Fix import/syntax/path/loading errors first; rerun/WAIT. Already passing: agree a new case or report no Red.
3. Only after evidenced Red: minimal implementation; request new/previous tests; STOP/WAIT. Fix without weakening expectations.
4. After Green: consider useful refactoring, preserve behavior, retest. Tests after correct code = retrospective; injected faults show test quality, not original TDD.

BOTH: Rerun affected previous cases; check visible app behavior; WAIT for real observations/human usability judgments. At checkpoint elicit core-function explanation or new-input prediction; help with gaps.

CLOSE: Brief projekt.md update: task/AK; files; actual checks/results + learner evidence source; GEPRÜFT/OFFEN/BLOCKIERT for stated scope; deviation/understanding gap; next step (do not execute). All tasks checked: refer to peer testing in worksheet. No extra acceptance prompt/report; release is human.
