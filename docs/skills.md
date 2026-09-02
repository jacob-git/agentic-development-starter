# Agent Skills

Agent Skills are task-specific procedures that Copilot can load on demand when the current request matches a skill's description.

They complement the rest of the repository customization model:

| Artifact | Responsibility |
| --- | --- |
| `AGENTS.md` | Universal engineering rules and guardrails |
| `.agents/*.agent.md` | Specialized roles and handoff workflow |
| `.agents/skills/*/SKILL.md` | Repeatable task procedures loaded when relevant |
| `docs/stacks/*` | Technology-specific engineering guidance |
| repository docs/config | Application-specific architecture, testing, and tooling |

## Included skills

### `verify-repository`
Discover and run the repository's established compile/build, lint/static-analysis, type-check, test, and other quality gates. It intentionally does not assume npm, Maven, Gradle, pytest, or another command.

### `investigate-bug`
Reproduce a defect, isolate the failure, establish an evidence-backed root cause, add regression coverage, implement the smallest safe fix, and verify it.

### `implement-feature`
Implement a scoped behavior change using the repository's existing architecture, patterns, tests, contracts, and toolchain.

### `review-change`
Review actual changes for correctness, regressions, security, architecture, compatibility, test quality, and maintainability while avoiding low-value style-only comments.

### `update-dependency`
Perform narrow dependency upgrades using the existing package/build manager, lockfile strategy, compatibility constraints, and verification gates.

## Loading behavior

Skills live under `.agents/skills/<skill-name>/SKILL.md`. The `name` in each file's YAML frontmatter must match its parent directory name.

VS Code/Copilot selects relevant skills based primarily on their descriptions and the current request. Developers normally should not have to mention a skill explicitly.

Examples:

- `Why is this test failing?` can load `investigate-bug`.
- `Add pagination to this endpoint.` can load `implement-feature`.
- `Make sure this change is ready to merge.` can load `review-change` and/or `verify-repository`.
- `Upgrade Spring Boot to the approved version.` can load `update-dependency` and `verify-repository`.

Skills can also be invoked or inspected through VS Code's skill/customization UI when a developer wants explicit control.

## Design rules for adding skills

Add a skill when a procedure is:

- repeated across many repositories or tasks;
- specific enough to have a useful step-by-step method;
- independent of one application's business logic;
- better loaded on demand than permanently placed in `AGENTS.md`.

Do not create a skill for every coding convention. Stable engineering standards belong in `AGENTS.md` or stack/repository documentation.

Keep the skill catalog small enough that every skill has a clear, non-overlapping purpose.
