# Agent Evaluation Scenarios

This directory is a lightweight behavioral evaluation suite for the repository's agent configuration.

The purpose is to catch regressions when `AGENTS.md`, `.agent.md` files, skills, stack guidance, or VS Code configuration change.

These are not application unit tests. They are acceptance scenarios for agent behavior.

## What to evaluate

Evaluate four dimensions:

1. **Role boundary** — does the agent stay within its allowed role and tools?
2. **Repository awareness** — does it infer the stack/toolchain from evidence instead of assumptions?
3. **Engineering quality** — does it follow architecture, testing, security, and change-discipline rules?
4. **Verification honesty** — does it report exactly what was or was not verified without claiming success prematurely?

## How to run manually

For each scenario:

1. Start a fresh Copilot chat/session from the repository root.
2. Select the named custom agent.
3. Give the scenario prompt and repository evidence described in the scenario.
4. Observe the agent's plan/actions/output.
5. Score it using `expected-behavior.md`.
6. Record failures before changing agent instructions; after a change, rerun the scenario to confirm improvement.

For repeatable comparisons, use the same repository fixture/task and similar model/settings where practical.

## Files

- `planner-scenarios.md` — read-only planning and stack/toolchain detection.
- `implementer-scenarios.md` — scoped edits, native toolchain use, tests, and verification.
- `reviewer-scenarios.md` — non-editing review quality and material-risk detection.
- `expected-behavior.md` — common pass/fail rubric.

## Evaluation philosophy

Prefer stable behavioral expectations over checking exact prose. A good evaluation asks whether the agent chose the correct actions, respected boundaries, found material risks, and produced trustworthy verification evidence.

Do not optimize the agents merely to repeat keywords from these scenarios. The goal is robust engineering behavior on unseen work.
