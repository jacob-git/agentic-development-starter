# Agentic Development Workflow

The repository is designed around a human-supervised, stack-aware workflow with task-specific Agent Skills loaded on demand.

```text
Requirement / ticket
      |
      v
Planner agent
      |
      +--> detects stack/toolchain
      +--> reads relevant stack guidance
      +--> loads relevant task skills when needed
      +--> identifies verification approach
      |
      v
Human reviews plan
      |
      v
Implementer agent
      |
      +--> implement-feature / investigate-bug / update-dependency as relevant
      +--> code changes + tests
      +--> verify-repository
      |
      v
Reviewer agent
      |
      +--> review-change
      +--> stack-specific review
      +--> verification-evidence review
      |
      v
Human accepts / revises
      |
      v
Commit + push to any SCM
```

## Roles versus skills

Custom agents define **who is doing the work**:

- Planner decides how to approach a change without editing code.
- Implementer performs the approved scoped change.
- Reviewer independently evaluates the resulting change.

Agent Skills define **how to perform repeatable procedures** and are loaded only when relevant:

- `verify-repository`
- `investigate-bug`
- `implement-feature`
- `review-change`
- `update-dependency`

This keeps agent role definitions stable while allowing reusable procedures to evolve independently.

## Suggested VS Code flow

1. Open the repository root in VS Code.
2. Confirm Copilot Chat is available and workspace customizations are trusted/enabled.
3. Select **Planner** and describe the change.
4. Planner inspects the repository to determine the affected technology/toolchain and reads the matching guide under `docs/stacks/`.
5. Copilot can load task-specific skills based on their descriptions and the request; developers normally do not need to name a skill explicitly.
6. Review the plan and proposed verification approach.
7. Use **Start Implementation** to hand the approved context to Implementer.
8. Implementer makes the scoped change, adds/updates tests, and uses repository-native quality gates; `verify-repository` provides the detailed verification procedure when relevant.
9. Use **Review Changes** to hand context to Reviewer.
10. Reviewer evaluates correctness, security, architecture, stack conventions, tests, compatibility, and verification evidence; `review-change` can provide the repeatable review procedure.
11. If needed, use **Address Findings** to return material issues to Implementer.
12. Human reviews the final result, then commits/pushes with the normal SCM workflow.

## Stack-aware behavior

The same Planner -> Implementer -> Reviewer agents and skills can operate on:

- React + TypeScript
- Spring Boot (Maven or Gradle)
- Python
- mixed/multi-stack repositories
- other stacks when repository conventions are clear

The agents must infer tools from repository evidence rather than hardcoding npm, Maven, Gradle, pytest, or any other command.

The customization layers are deliberately independent:

- `AGENTS.md` — universal engineering guidance
- `.agents/*.agent.md` — specialized roles and handoffs
- `.agents/skills/*/SKILL.md` — repeatable task procedures
- `docs/stacks/` — technology guidance
- repository docs/configuration — application-specific truth

See `docs/skills.md` for the skill catalog and design rules.
