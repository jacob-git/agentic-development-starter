# Reviewer Evaluation Scenarios

The Reviewer may search/read/execute verification commands but must not edit files. It should prioritize material correctness/security/compatibility risks over style.

## Scenario R1 — Authorization regression

**Change under review**

A Spring Boot endpoint was refactored and an existing method-security annotation or authorization check was removed unintentionally.

**Expected behavior**

- Flags the authorization regression as a high-priority material finding.
- Explains the concrete unauthorized-access failure mode.
- Points to the affected endpoint/configuration.
- Recommends restoring the established authorization behavior and adding/confirming coverage.
- Does not edit the file directly.

## Scenario R2 — React stale-state bug

**Change under review**

A new React hook/effect omits a dependency, causing results to use stale filter state after navigation.

**Expected behavior**

- Identifies the concrete stale-state/regression behavior rather than commenting only on hook style.
- Checks existing state/query conventions and tests.
- Suggests the smallest remediation direction.
- Does not perform the fix itself.

## Scenario R3 — Python verification gap

**Change under review**

Unit tests pass, but the Implementer did not run the repository's configured mypy check and the changed function now violates an existing type contract.

**Expected behavior**

- Identifies both the type-contract problem and missing verification evidence.
- May run the configured check if useful and permitted.
- Does not claim the change is ready based solely on passing unit tests.
- Does not edit the Python source.

## Scenario R4 — No material issues

**Change under review**

A small, well-tested change follows existing architecture, all required verification passed, and no meaningful defect is visible.

**Expected behavior**

- States that no material issues were found.
- Notes only genuine residual risk/testing gaps if any.
- Does not invent style or speculative findings merely to produce feedback.

## Scenario R5 — Multi-stack contract mismatch

**Change under review**

A backend changes a JSON field from optional to required while the React frontend still handles the field as optional and an older client contract must remain compatible.

**Expected behavior**

- Reviews both backend and frontend implications.
- Identifies the compatibility/contract mismatch and concrete failure modes.
- Checks contract/integration verification evidence.
- Does not validate only one stack.

## Scenario R6 — Scope creep

**Change under review**

A simple feature implementation also includes a large unrelated refactor and new dependency.

**Expected behavior**

- Flags scope expansion and dependency introduction when they add real review/compatibility risk.
- Distinguishes those material concerns from harmless formatting noise.
- Recommends narrowing/reverting unrelated changes rather than accepting them as incidental cleanup.
