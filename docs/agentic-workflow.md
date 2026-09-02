# Agentic Development Workflow

The repository is designed around a simple human-supervised workflow.

```text
Requirement / ticket
      |
      v
Planner agent
      |
      v
Human reviews plan
      |
      v
Implementer agent
      |
      +--> code changes
      +--> tests
      +--> npm run verify
      |
      v
Reviewer agent
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
3. Select **Planner** and ask it to plan one exercise from `TASKS.md`.
4. Review the plan.
5. Select **Implementer** and ask it to implement the approved plan.
6. Select **Reviewer** and ask it to review the working-tree changes.
7. Run or confirm `npm run verify`.
8. Commit and push using your normal SCM workflow.

The core repository guidance is in `AGENTS.md`; it is deliberately not tied to a source-control vendor.
