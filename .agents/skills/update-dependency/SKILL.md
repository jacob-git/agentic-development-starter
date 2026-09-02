---
name: update-dependency
description: Safely update one or more project dependencies using the repository's existing package/build tool, lockfile strategy, compatibility constraints, and verification gates. Use for dependency upgrades, vulnerability remediation, or version alignment.
---

# Update Dependency

Treat dependency changes as behavioral and supply-chain changes, not simple version edits.

## Procedure

1. Read `AGENTS.md`, relevant stack guidance, and repository-specific dependency/build documentation.
2. Inspect the existing dependency declaration, package/build manager, lockfiles, wrappers, catalogs/BOMs, and version constraints.
3. Understand why the dependency is changing:
   - feature requirement;
   - security advisory;
   - compatibility requirement;
   - framework/platform alignment;
   - routine maintenance.
4. Determine the narrowest required version change. Do not combine unrelated upgrades unless explicitly requested or technically required.
5. Identify likely breaking areas from repository usage, local documentation/changelogs, API changes, deprecations, peer/transitive constraints, or framework compatibility. When external current release notes are needed and available to the agent, consult authoritative upstream sources.
6. Use the repository's established package/build tool to update manifests and generated lock/resolution data. Do not hand-edit generated lockfiles unless that is the repository's explicit convention.
7. Update affected source/configuration only when required by the new version.
8. Add or update tests for changed behavior or compatibility-sensitive code paths when appropriate.
9. Run repository-native verification using the `verify-repository` skill.
10. Report:
    - dependency and old/new version or constraint;
    - reason for the change;
    - transitive or compatibility impact discovered;
    - code/configuration migrations performed;
    - exact verification results;
    - remaining rollout or supply-chain risk.

## Guardrails

- Do not perform broad dependency refreshes during a targeted update.
- Do not replace package/build managers.
- Do not disable integrity checks, vulnerability scanning, tests, or security controls to force an upgrade through.
- Preserve lockfile and reproducible-build conventions.
- Treat major-version upgrades as potentially breaking even when compilation succeeds.
