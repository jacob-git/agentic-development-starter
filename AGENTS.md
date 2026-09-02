# Repository Agent Instructions

This file is the canonical, SCM-neutral guidance for AI coding agents working in this repository.

## 1. Working agreement

Before changing code:
1. Read this file and the relevant documents in `docs/`.
2. Inspect the existing implementation before proposing a new pattern.
3. State a short implementation plan for non-trivial work.
4. Prefer the smallest change that satisfies the requirement.

Before declaring work complete:
1. Run `npm run verify`.
2. Review the final diff for accidental or unrelated changes.
3. Summarize what changed, tests performed, and any remaining risk.

## 2. Architecture

The dependency direction is:

`http -> application -> domain`

Infrastructure may implement application-facing ports, but domain code must not depend on HTTP or infrastructure concerns.

Rules:
- `src/domain/` contains business concepts and rules only.
- `src/application/` coordinates use cases.
- `src/infrastructure/` contains storage and external-system implementations.
- `src/http/` translates HTTP requests/responses and must not contain business rules.
- Do not introduce a new dependency when the platform or an existing abstraction already solves the problem.

Read `docs/architecture.md` before architecture-affecting changes.

## 3. Testing

- Every behavior change requires a test.
- Prefer unit tests for domain/application behavior.
- Add integration tests where the boundary itself is important.
- Tests must be deterministic and independent.
- Never delete or weaken a test merely to make a change pass.

Read `docs/testing.md` for details.

## 4. Security

- Never commit credentials, tokens, passwords, private keys, or production identifiers.
- Validate untrusted input at the system boundary.
- Do not log secrets or sensitive request data.
- Avoid shell execution from request input.

## 5. Change discipline

Do not:
- perform unrelated refactors during a feature or bug fix;
- duplicate an existing abstraction;
- silently change public API behavior;
- bypass tests, lint, or validation to finish faster.

If a requirement conflicts with an architectural rule, call out the conflict before implementing it.
