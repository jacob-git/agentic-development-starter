# Repository Agent Instructions

This file is the canonical, SCM-neutral guidance for AI coding agents working in this repository. It defines universal behavior; technology-specific guidance lives under `docs/stacks/`.

## 1. Working agreement

Before changing code:
1. Read this file.
2. Inspect the repository structure, build manifests, lockfiles, and existing scripts/tasks before assuming a technology or command.
3. Read the relevant stack guidance under `docs/stacks/` and any repository-specific architecture/testing documentation.
4. Inspect the existing implementation before proposing a new pattern.
5. State a short implementation plan for non-trivial work.
6. Prefer the smallest change that satisfies the requirement.

Before declaring work complete:
1. Run the repository's documented verification command(s).
2. Review the final diff for accidental or unrelated changes.
3. Summarize what changed, the exact verification commands run, their results, and any remaining risk.

## 2. Detect the technology first

Do not assume this repository is Node.js because the starter contains a small Node example.

Use repository evidence to determine the relevant stack and tooling, for example:

- React + TypeScript: `package.json`, `tsconfig.json`, React dependencies, frontend build configuration.
- Spring Boot: `pom.xml`, `build.gradle`, `build.gradle.kts`, Spring Boot plugins/dependencies.
- Python: `pyproject.toml`, `requirements*.txt`, `Pipfile`, `poetry.lock`, `uv.lock`, Python package/module structure.

Then read the matching guide:

- `docs/stacks/react-typescript.md`
- `docs/stacks/spring-boot.md`
- `docs/stacks/python.md`

For a multi-stack repository, read every guide relevant to the files being changed. For an unlisted stack, follow this file plus the repository's own build, architecture, and testing conventions rather than inventing a new standard.

## 3. Architecture

Follow the architecture that already exists in the target repository. Do not impose one universal layering model on every technology.

Rules:
- Preserve established dependency direction and module boundaries.
- Keep business rules out of transport/UI/persistence code unless the repository explicitly uses a different pattern.
- Reuse existing abstractions before introducing new ones.
- Do not introduce a new dependency when the platform or an existing dependency already solves the problem adequately.
- Treat `docs/stacks/` as baseline guidance; repository-specific architecture decisions take precedence.

Read `docs/architecture.md` for the starter's example and adaptation guidance.

## 4. Testing and verification

- Every behavior change requires appropriate test coverage.
- Prefer the repository's existing test framework and test style.
- Tests must be deterministic and independent.
- Never delete, skip, or weaken a test merely to make a change pass.
- Use the repository's existing package manager, build wrapper, virtual-environment tool, and scripts/tasks.
- If a single verification target exists (for example `npm run verify`, `./mvnw verify`, or a project-specific task), prefer it.
- Otherwise run the configured checks relevant to the change: build/compile, lint/static analysis, type checking, unit/integration tests, and other established quality gates.
- Do not invent a command when the repository configuration already defines the correct one.

Read `docs/testing.md` and the relevant stack guide for details.

## 5. Security

- Never commit credentials, tokens, passwords, private keys, or production identifiers.
- Validate untrusted input at system boundaries.
- Do not log secrets or sensitive request data.
- Avoid command/shell execution from untrusted input.
- Preserve existing authentication and authorization behavior unless the task explicitly changes it.

## 6. Change discipline

Do not:
- perform unrelated refactors during a feature or bug fix;
- duplicate an existing abstraction;
- silently change public API behavior;
- bypass validation, tests, linting, type checks, or build failures to finish faster;
- replace the repository's established toolchain simply because another tool is more familiar.

If a requirement conflicts with an architectural or security rule, call out the conflict before implementing it.
