# Architecture Guidance

This starter separates **universal agent behavior** from **repository-specific architecture**.

An AI agent must first understand the architecture that already exists in the target repository. It should not impose the sample application's structure on React, Spring Boot, Python, or another codebase.

## Universal expectations

- Preserve established dependency direction and module boundaries.
- Keep transport/UI/persistence concerns from absorbing business behavior when the repository already separates those concerns.
- Reuse existing abstractions and shared libraries before creating parallel patterns.
- Make architecture changes explicit in the plan rather than hiding them inside a feature change.
- Prefer small, reversible changes over broad redesigns.
- For multi-stack repositories, identify and preserve the contract between stacks (for example frontend/API or service/service boundaries).

Technology-specific baseline guidance is under `docs/stacks/`. Repository-specific decisions should take precedence over those baselines.

## Adopting this starter in another repository

Replace or extend this document with the target repository's real architecture, including:

- major modules/components/services
- allowed dependency direction
- public API and integration boundaries
- state/data ownership
- persistence patterns
- authentication/authorization boundaries
- important ADRs or constraints
- patterns agents should reuse or avoid

The more concrete these boundaries are, the more reliably an agent can make changes without architectural drift.

## Architecture of the runnable sample in this starter

The included Node.js example intentionally uses a small layered backend so the agent workflow can be demonstrated without external dependencies:

```text
HTTP adapter
    |
    v
Application use cases
    |
    v
Domain model

Infrastructure adapters implement application-facing storage needs.
```

For this sample only:
- `src/domain/` contains business entities/rules.
- `src/application/` coordinates use cases.
- `src/infrastructure/` implements storage/external adapters.
- `src/http/` handles HTTP boundary concerns.

Do not treat that sample layering as a universal requirement for other repositories.
