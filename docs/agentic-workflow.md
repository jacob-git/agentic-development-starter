# Agentic Development Workflow

The repository is designed around a human-supervised, stack-aware workflow.

```text
Requirement / ticket
      |
      v
Planner agent
      |
      +--> detects stack/toolchain
      +--> reads relevant stack guidance
      +--> identifies verification commands
      |
      v
Human reviews plan
      |
      v
Implementer agent
      |
      +--> code changes
      +--> tests
      +--> repository-native verification
      |
      v
Reviewer agent
      |
      +--> stack-specific review
      +--> verification review
      |
      v
Human accepts / revises
      |
      v
Commit + push to any SCM
```

## Suggested VS Code flow

1. Open the repository in VS Code.
2. Confirm Copilot Chat is available.
3. Select **Planner** and describe the change.
4. Planner inspects the repository to determine the affected technology/toolchain and reads the matching guide under `docs/stacks/`.
5. Review the plan and the proposed verification commands.
6. Use **Start Implementation** to hand the approved context to Implementer.
7. Implementer makes the scoped change, adds/updates tests, and runs the repository's established verification command(s).
8. Use **Review Changes** to hand context to Reviewer.
9. Reviewer checks correctness, security, architecture, stack conventions, tests, and verification evidence.
10. If needed, use **Address Findings** to return material issues to Implementer.
11. Human reviews the final result, then commits/pushes with the normal SCM workflow.

## Stack-aware behavior

The same Planner -> Implementer -> Reviewer agents can operate on:

- React + TypeScript
- Spring Boot (Maven or Gradle)
- Python
- mixed/multi-stack repositories
- other stacks when repository conventions are clear

The agents must infer tools from repository evidence rather than hardcoding npm, Maven, Gradle, pytest, or any other command.

The core repository guidance is in `AGENTS.md`; technology-specific baselines are in `docs/stacks/`; both are deliberately independent of a source-control vendor.
