# Testing and Verification Strategy

The agent workflow is technology-neutral. The target repository's existing test framework and quality gates are authoritative.

## Universal expectations

- Every behavior change should have appropriate test coverage.
- Prefer focused tests close to the changed behavior; add integration/end-to-end coverage when a boundary or critical flow is affected.
- Tests must be deterministic and independent.
- Reuse existing fixtures, factories, test utilities, and conventions.
- Never delete, skip, or weaken tests merely to make a change pass.
- Report the exact commands run and whether they passed.

## Discover verification from the repository

Before running commands, inspect the repository's build manifests, scripts/tasks, wrappers, and CI/documentation.

Use the established toolchain:
- React/TypeScript: package manager and scripts already defined in the repo.
- Spring Boot: existing Maven/Gradle wrapper and configured tasks/profiles.
- Python: existing environment/dependency tool and configured test/static-analysis commands.

Prefer a single documented aggregate verification command when one exists. Otherwise run the configured checks relevant to the change, which may include build/compile, lint/static analysis, type checking, unit/integration tests, packaging, or browser/end-to-end tests.

See `docs/stacks/` for technology-specific guidance.

## Runnable sample in this starter

The small Node.js sample uses Node's built-in `node:test` runner and defines:

```bash
npm run verify
```

That command is for the sample application. It is **not** a universal command agents should assume in adopted repositories.

Any SCM/CI platform can wrap the target repository's own verification command(s); the agent workflow itself remains SCM-neutral.
