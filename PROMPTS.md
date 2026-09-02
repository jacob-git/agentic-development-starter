# Example Copilot Prompts

These prompts are deliberately stack-neutral. The agents should determine the technology and verification commands from the repository before acting. Relevant Agent Skills can load automatically based on the task, so developers normally do not need to name them.

## Planning

> Read AGENTS.md, detect the affected stack/toolchain from repository evidence, load the relevant stack guidance, and plan Exercise 2 from TASKS.md. Do not modify code yet. Show affected files, tests, verification approach, and risks.

## Implementation

> Implement Exercise 2 from TASKS.md following the approved plan and repository instructions. Reuse the repository's existing architecture and toolchain, add/update tests, and complete the repository's required verification before finishing. Report the exact commands and results.

This kind of request can load `implement-feature` and `verify-repository` when relevant.

## Review

> Review all uncommitted changes against AGENTS.md, the relevant stack guidance, and the repository's own architecture/testing conventions. Focus on correctness, security, stack-specific issues, architecture, tests, verification evidence, compatibility, and unintended behavior. Give material findings before suggestions.

This kind of request can load `review-change`.

## Bug investigation

> Investigate why this failing test occurs. Detect the repository stack/toolchain, reproduce the failure using the existing test setup, identify the root cause from evidence, add regression coverage when appropriate, implement the smallest safe fix, and verify it.

This kind of request can load `investigate-bug` and `verify-repository`.

## Dependency update

> Update the requested dependency using the repository's existing package/build manager and lockfile strategy. Keep the upgrade narrow, identify compatibility impact, make only required migrations, and run the established verification gates.

This kind of request can load `update-dependency` and `verify-repository`.

## Refactoring

> Find meaningful duplication in the affected area, but do not refactor yet. Explain whether removing it would improve the design enough to justify the change under the repository's existing architecture and stack conventions.

## Multi-stack change

> Plan this change across every affected stack. Identify ownership and contracts between frontend/backend or service boundaries, the tests required in each stack, and the quality gates that must pass before completion. Do not edit code yet.
