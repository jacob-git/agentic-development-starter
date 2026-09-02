# Planner Evaluation Scenarios

The Planner must remain read-only and produce an implementation-ready plan from repository evidence.

## Scenario P1 — React + TypeScript detection

**Repository evidence**

- `package.json` contains React and TypeScript dependencies.
- `tsconfig.json` exists.
- `pnpm-lock.yaml` exists.
- Scripts include `lint`, `typecheck`, `test`, and `build`.

**Prompt**

> Add pagination to the users table and preserve the existing URL query contract.

**Expected behavior**

- Identifies React + TypeScript and pnpm from evidence.
- Reads `docs/stacks/react-typescript.md`.
- Locates the existing table/data-fetching/query-state patterns before proposing a design.
- Includes UI behavior, URL compatibility, tests, accessibility impact, and the existing verification scripts in the plan.
- Does not edit files or run pnpm commands.

## Scenario P2 — Spring Boot wrapper selection

**Repository evidence**

- `pom.xml` and `mvnw` are present.
- No Gradle files exist.
- Existing tests use JUnit and Spring MVC test conventions.

**Prompt**

> Plan a new optional `status` filter on the orders endpoint.

**Expected behavior**

- Detects Spring Boot + Maven.
- Prefers the checked-in Maven wrapper in the verification plan.
- Identifies controller/DTO/service/repository boundaries from the actual code rather than imposing a fixed layout.
- Includes validation, backward compatibility, tests, and verification.
- Does not execute `./mvnw` or edit code.

## Scenario P3 — Python toolchain detection

**Repository evidence**

- `pyproject.toml` configures pytest, ruff, and mypy.
- `uv.lock` is present.
- No requirements.txt is used.

**Prompt**

> Plan support for a new optional timeout parameter in the external client.

**Expected behavior**

- Detects Python and the repository's uv-based workflow.
- Reads `docs/stacks/python.md`.
- Identifies input validation/default behavior, typing, client boundary, tests, and configured checks.
- Does not substitute pip/Poetry commands merely because they are familiar.

## Scenario P4 — Multi-stack contract

**Repository evidence**

- Frontend is React + TypeScript under `web/`.
- Backend is Spring Boot under `service/`.
- A REST contract is shared between them.

**Prompt**

> Plan adding `displayName` to the customer summary shown in the web application.

**Expected behavior**

- Reads both React/TypeScript and Spring Boot guidance.
- Identifies API contract ownership and compatibility concerns.
- Plans backend contract change, frontend consumption, tests on both sides, and integration/contract verification.
- Does not verify only one stack.

## Scenario P5 — Resist unrelated redesign

**Repository evidence**

- Existing code solves the request with a small extension to a current service.
- The codebase has some unrelated duplication nearby.

**Prompt**

> Plan a new validation rule for item names.

**Expected behavior**

- Produces a narrow plan for the validation rule.
- Notes unrelated duplication only if materially relevant; does not turn the task into an architecture rewrite.
- Identifies regression coverage and repository-native verification.
