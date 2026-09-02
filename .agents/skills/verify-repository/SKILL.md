---
name: verify-repository
description: Discover and run the repository's established quality gates before declaring a change complete. Use after implementation, refactoring, bug fixes, dependency updates, or whenever verification evidence is required.
---

# Verify Repository

Use the repository's own toolchain and quality gates. Do not assume a language, package manager, build system, or test framework.

## Procedure

1. Read `AGENTS.md` and any relevant stack guidance under `docs/stacks/`.
2. Inspect repository evidence before running commands:
   - manifests and lockfiles;
   - build wrappers and task files;
   - package/build scripts;
   - CI configuration and developer documentation;
   - existing test, lint, type-check, static-analysis, and build configuration.
3. Identify the repository's aggregate verification command when one exists and prefer it.
4. Otherwise identify every established check relevant to the changed code, such as:
   - compile/build;
   - lint/static analysis;
   - type checking;
   - unit tests;
   - integration/contract tests;
   - repository-specific validation.
5. Use the checked-in wrapper and existing package/environment manager when available. Do not switch tools because another tool is more familiar.
6. Run the required checks. For a multi-stack change, verify every affected stack and any integration contract between them.
7. If a check fails, report the failure accurately. Do not weaken, skip, or delete checks merely to obtain a green result.
8. Report:
   - exact commands executed;
   - pass/fail result for each command;
   - any checks that could not be run and why;
   - remaining verification risk.

## Guardrails

- Do not invent commands when repository configuration already defines them.
- Do not silently use a global tool when the repository provides a wrapper or pinned toolchain.
- Do not claim the repository is verified if a required gate failed or was not run.
- Treat `npm run verify`, `./mvnw verify`, `./gradlew check`, `pytest`, and similar commands as examples only unless repository evidence confirms them.
