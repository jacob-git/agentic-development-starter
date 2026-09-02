# Example Copilot Prompts

These prompts are deliberately stack-neutral. The agents should determine the technology and verification commands from the repository before acting.

## Planning

> Read AGENTS.md, detect the affected stack/toolchain from repository evidence, load the relevant stack guidance, and plan Exercise 2 from TASKS.md. Do not modify code yet. Show affected files, tests, verification commands, and risks.

## Implementation

> Implement Exercise 2 from TASKS.md following the approved plan and repository instructions. Use the repository's existing toolchain and run its documented verification command(s) before finishing. Report the exact commands and results.

## Review

> Review all uncommitted changes against AGENTS.md, the relevant stack guidance, and the repository's own architecture/testing conventions. Focus on correctness, security, stack-specific issues, architecture, tests, verification evidence, and unintended behavior. Give findings before suggestions.

## Bug investigation

> Investigate why this failing test occurs. Detect the repository stack/toolchain, reproduce the failure using the existing test setup, identify the root cause, and propose the smallest safe fix before editing code.

## Refactoring

> Find meaningful duplication in the affected area, but do not refactor yet. Explain whether removing it would improve the design enough to justify the change under the repository's existing architecture and stack conventions.

## Multi-stack change

> Plan this change across every affected stack. Identify ownership and contracts between frontend/backend or service boundaries, the tests required in each stack, and the verification commands that must pass before completion. Do not edit code yet.
