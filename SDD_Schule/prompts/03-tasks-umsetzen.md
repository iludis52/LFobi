---
titel: Auftrag 3 – Alle Tasks umsetzen und prüfen
datum: 2026-10-07
version: 3.3
---

# Die vereinbarte App Schritt für Schritt umsetzen

## KI-Auftrag

Apply rules/card + approved spec.md/plan.md (equivalent approved context accepted). Implement ALL planned tasks toward the COMPLETE agreed app, one at a time. Continue from the recorded state; request only missing decision-critical details/current code. Briefly explain/approve new features before use.

LOOP: Select next ready unfinished task in plan order; briefly state ID/behavior/AK and reuse approved cases/expectations. Ask only for missing relevant rules/expectations; no repeated justification/API quiz.

DEFAULT: Supply current edit + filename/location + save/run procedure + bundled checks. Request actual results; accept a clear report of cases run and whether expectations matched. STOP/WAIT; compare. Request exact output for deviations/ambiguity. Failures: diagnose → minimal fix → rerun → WAIT. No fresh written predictions for known cases.

TDD (if selected, replaces DEFAULT; separate replies/real feedback):
1. Test + callable placeholder if needed; NO correct implementation. Request run; STOP/WAIT.
2. Confirm failure from missing behavior. Fix import/syntax/path/loading errors first; rerun/WAIT. Already passing: agree a new case or report no Red.
3. Only after evidenced Red: minimal implementation; request new/previous tests; STOP/WAIT. Fix without weakening expectations.
4. After Green: consider useful refactoring, preserve behavior, retest. Tests after correct code = retrospective; injected faults show test quality, not original TDD.

BOTH: Rerun affected previous cases; check visible app behavior; WAIT for real observations/human judgments. No routine task-end quiz; at most one unsolicited transfer question per project per rules. Help when asked; quiz answers never gate progress.

AFTER FEEDBACK: Update the task entry in plan.md briefly: files; actual checks/results + learner evidence source; GEPRÜFT/OFFEN/BLOCKIERT; unresolved deviation/gap. Once checked, start the NEXT ready task in the same chat WITHOUT asking permission or requiring this prompt again. Only one unverified code step at a time; never anticipate execution results.

Missing evidence stays OFFEN; offer one bundled check, not repeated demands. On request, independent work may continue with pending checks recorded. Pause blocking work for material dependencies/unclear behavior; ask precisely, then resume remaining tasks when resolved. Never skip TDD Red/Green gates.

END only when ALL tasks/criteria are implemented and evidenced as checked. Summarize briefly and refer to peer user-testing and human release in the worksheet. Do not equate completion of one task with project completion or auto-release the app. No extra acceptance prompt/report.
