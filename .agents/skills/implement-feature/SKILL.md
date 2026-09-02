---
name: implement-feature
description: Implement a scoped feature using the repository's existing architecture, conventions, tests, and toolchain. Use when adding or changing user-visible or system behavior after requirements are understood.
---

# Implement Feature

Build the smallest complete change that satisfies the requirement and fits the existing repository.

## Procedure

1. Read `AGENTS.md`, relevant stack guidance, and repository-specific architecture/testing docs.
2. Confirm the requirement, acceptance criteria, affected users/systems, and compatibility expectations from the available context.
3. Inspect manifests, project structure, and existing implementations of similar behavior before choosing a design.
4. Identify affected boundaries, modules, APIs, data contracts, state, configuration, and tests.
5. If an approved plan exists, use it as the scope. If no plan exists and the change is non-trivial, produce a concise plan before editing.
6. Reuse established patterns, components, services, DTOs/types, utilities, and abstractions.
7. Implement the smallest coherent vertical slice. Avoid unrelated cleanup or framework/toolchain changes.
8. Add or update tests at the most appropriate level for the changed behavior.
9. Update documentation/configuration only when the feature changes an operational or developer-facing contract.
10. Run repository-native verification using the `verify-repository` skill.
11. Report:
    - behavior implemented;
    - files and important contracts changed;
    - tests added/updated;
    - exact verification results;
    - compatibility or rollout considerations;
    - remaining risk.

## Guardrails

- Do not invent a new architectural pattern when an established one already fits.
- Do not silently change public APIs, persistence formats, configuration contracts, or authorization behavior.
- Do not add dependencies without demonstrating that the platform and existing dependencies are insufficient.
- For multi-stack features, verify both sides of the contract rather than validating only one application.
