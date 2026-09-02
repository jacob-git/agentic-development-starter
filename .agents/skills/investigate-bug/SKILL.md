---
name: investigate-bug
description: Reproduce, isolate, and fix defects using evidence rather than speculative edits. Use for failing tests, regressions, production-like errors, unexpected behavior, or requests to diagnose a bug.
---

# Investigate Bug

Diagnose before editing. Prefer a small, evidence-backed fix over trial-and-error changes.

## Procedure

1. Read `AGENTS.md`, relevant stack guidance, and any repository-specific troubleshooting or architecture docs.
2. Restate the observed behavior and the expected behavior from the available evidence.
3. Reproduce the issue when feasible using the repository's existing tests, commands, fixtures, or a minimal deterministic reproduction.
4. Trace the behavior through the affected boundary and identify the smallest failing component or contract.
5. Gather evidence from code paths, test output, logs, configuration, recent changes, or data assumptions. Do not guess a root cause when evidence is missing.
6. Identify the root cause and explain why it produces the observed symptom.
7. Before or with the fix, add a regression test that demonstrates the defect when practical.
8. Implement the smallest safe correction that preserves unrelated behavior and existing architecture.
9. Run the repository's relevant verification using the `verify-repository` skill.
10. Report:
    - reproduction and root cause;
    - files changed;
    - regression coverage;
    - verification evidence;
    - remaining uncertainty or follow-up risk.

## If the bug cannot be reproduced

- State what was attempted and what evidence is missing.
- Inspect likely boundaries and propose the next highest-value diagnostic step.
- Do not make speculative production code changes solely to see whether they help.

## Guardrails

- Do not disable or weaken a failing test unless the requirement itself proves the test is wrong.
- Do not broaden a bug fix into an unrelated refactor.
- Do not suppress exceptions, logs, validation, or security checks simply to remove the symptom.
- Preserve backward compatibility unless the task explicitly changes the contract.
