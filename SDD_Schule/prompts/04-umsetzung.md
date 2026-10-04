---
titel: Auftrag 3 – Einen Task umsetzen und prüfen
datum: 2026-10-04
version: 3.2
---

# Jeweils einen kleinen Schritt bearbeiten

## KI-Auftrag

TASK: <Nummer oder Beschreibung einsetzen>

Apply rules/card + approved behavior/task plan; ONLY this task. A combined projekt.md or self-contained task with approved criteria suffices; request only missing decision-critical details. Request missing current code; briefly explain/approve new features before use.

START: Briefly state behavior/AK and reuse approved cases/expectations. Ask only if a relevant rule/expectation is missing; no repeated justification or API quiz.

DEFAULT: Supply current edit + filename/location + save/run procedure + bundled checks. Request actual results; accept a clear report of cases run and whether expectations matched. STOP/WAIT; compare. Request exact output for deviations/ambiguity. Failures: diagnose → minimal fix → rerun → WAIT. Do not demand fresh written predictions for known cases.

TDD (if selected, replaces DEFAULT; separate replies/real feedback):
1. Test + callable placeholder if needed; NO correct implementation. Request run; STOP/WAIT.
2. Confirm failure from missing behavior. Fix import/syntax/path/loading errors first; rerun/WAIT. Already passing: agree a new case or report no Red.
3. Only after evidenced Red: minimal implementation; request new/previous tests; STOP/WAIT. Fix without weakening expectations.
4. After Green: consider useful refactoring, preserve behavior, retest. Tests after correct code = retrospective; injected faults show test quality, not original TDD.

BOTH: Rerun affected previous cases; check visible app behavior; WAIT for real observations/human judgments. No routine end-of-task quiz; the rules allow at most one unsolicited transfer question per project. Explain/help when asked; quiz answers never gate progress.

CLOSE: Brief projekt.md update: task/AK; files; actual checks/results + learner evidence source; GEPRÜFT/OFFEN/BLOCKIERT for stated scope; deviation/understanding gap; next step (do not execute). Missing evidence stays OFFEN; offer one bundled check, not repeated demands. If asked to continue, allow independent work only; retain pending checks. Never skip TDD Red/Green gates. All tasks checked: refer to peer testing in worksheet. No extra acceptance prompt/report; release is human.
