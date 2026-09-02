# Agentic Development Starter

A reusable, **SCM-neutral and stack-aware** starter showing how a team can use VS Code + GitHub Copilot for human-supervised agentic software development without tying repository guidance to a source-control platform or a single application technology.

## What this demonstrates

- `AGENTS.md` as the canonical repository-wide engineering contract
- SCM-neutral custom agents stored in `.agents/`
- Planner -> Implementer -> Reviewer handoffs with human approval between stages
- Agent Skills under `.agents/skills/` for repeatable procedures loaded when relevant
- automatic stack/toolchain discovery from repository evidence
- technology-specific guidance for React + TypeScript, Spring Boot, and Python
- repository-native verification instead of hardcoded build commands
- architecture, testing, security, and change-discipline guardrails
- a small runnable Node.js service used only as the demo application

## Repository layout

```text
.
├── AGENTS.md
├── TASKS.md
├── PROMPTS.md
├── .agents/
│   ├── planner.agent.md
│   ├── implementer.agent.md
│   ├── reviewer.agent.md
│   └── skills/
│       ├── verify-repository/
│       │   └── SKILL.md
│       ├── investigate-bug/
│       │   └── SKILL.md
│       ├── implement-feature/
│       │   └── SKILL.md
│       ├── review-change/
│       │   └── SKILL.md
│       └── update-dependency/
│           └── SKILL.md
├── .vscode/
│   ├── settings.json
│   └── extensions.json
├── docs/
│   ├── architecture.md
│   ├── testing.md
│   ├── skills.md
│   ├── agentic-workflow.md
│   └── stacks/
│       ├── react-typescript.md
│       ├── spring-boot.md
│       └── python.md
├── src/                  # runnable Node sample only
├── test/                 # runnable Node sample only
├── scripts/              # runnable Node sample only
└── package.json          # runnable Node sample only
```

## Customization model

Each artifact has one clear responsibility:

| Artifact | Purpose |
| --- | --- |
| `AGENTS.md` | Engineering principles, guardrails, and universal repository rules |
| `.agents/*.agent.md` | Who is doing the work: Planner, Implementer, Reviewer |
| `.agents/skills/*/SKILL.md` | How to perform a repeatable task such as debugging or verification |
| `docs/stacks/*` | Technology-specific guidance for React/TypeScript, Spring Boot, Python, etc. |
| application docs/config | The actual repository's architecture, build, test, and operational contracts |

This separation keeps always-on context small while allowing Copilot to load specialized procedures only when relevant.

## Included skills

| Skill | When it helps |
| --- | --- |
| `verify-repository` | After code changes or whenever completion requires quality-gate evidence |
| `investigate-bug` | Failing tests, regressions, unexpected behavior, root-cause investigation |
| `implement-feature` | Adding or changing scoped application behavior |
| `review-change` | Reviewing changes before human approval/merge |
| `update-dependency` | Targeted dependency upgrades or vulnerability remediation |

Copilot can select skills from their descriptions based on the current request; developers usually do not need to mention a skill by name. See `docs/skills.md` for details.

## How Copilot should behave

Before planning or editing, the agents inspect repository evidence such as manifests, lockfiles, build wrappers, scripts, and project structure.

Examples:

| Repository evidence | Guidance loaded | Verification behavior |
| --- | --- | --- |
| React + TypeScript, `package.json`, `tsconfig.json` | `docs/stacks/react-typescript.md` | Use the repo's actual package manager/scripts: lint, typecheck, test, build, etc. |
| Spring Boot + `pom.xml`/`build.gradle*` | `docs/stacks/spring-boot.md` | Use the existing Maven/Gradle wrapper and configured verification tasks. |
| Python + `pyproject.toml`/requirements/lockfile | `docs/stacks/python.md` | Use the repo's existing environment tool and configured test/lint/type-check commands. |
| Multiple stacks | all relevant guides | Verify every affected stack and their integration contract. |

The agents do **not** assume `npm run verify`, Maven, Gradle, pytest, or any other command just because it is familiar.

## Agent + skill workflow

```text
Developer request
      |
      v
Planner
  detects stack/toolchain
  reads repository guidance
  may use task-relevant skills
  produces plan + verification approach
      |
      v
[ Start Implementation ]
      |
      v
Implementer
  uses implement-feature / investigate-bug / update-dependency when relevant
  changes code
  adds/updates tests
  uses verify-repository for repository-native quality gates
      |
      v
[ Review Changes ]
      |
      v
Reviewer
  uses review-change when relevant
  correctness + security
  architecture + stack conventions
  tests + verification evidence
      |
      +---- material findings? ----+
      |                            |
     no                           yes
      |                            |
      v                            v
Human approval             [ Address Findings ]
                                   |
                                   +--> Implementer
```

Handoffs use `send: false`, so a developer can inspect the prepared next-step prompt before submitting it.

## Try the runnable sample

The included sample application uses Node.js 20+ and only built-in modules so the agent workflow is easy to inspect.

```bash
npm test
npm run verify
npm start
```

Then open:

- `http://localhost:3000/health`
- `http://localhost:3000/api/items`

`npm run verify` is the quality gate for **this sample only**, not a universal agent requirement.

## Try the handoff flow

Open the repository root in VS Code with GitHub Copilot/Copilot Chat enabled.

1. Choose **Planner**.
2. Ask: `Plan Exercise 2 from TASKS.md. Do not edit code.`
3. Review the plan and click **Start Implementation**.
4. Review the prepared prompt and submit it to **Implementer**.
5. Copilot can load `implement-feature` and later `verify-repository` when they are relevant.
6. When implementation is complete, click **Review Changes**.
7. Review the prepared prompt and submit it to **Reviewer**; `review-change` can load for the review procedure.
8. If material findings exist, click **Address Findings**; otherwise perform the final human review.

You can inspect/manage skills in VS Code through the Chat customization/skills UI (including `/skills` in supported versions).

See `PROMPTS.md` for more examples.

## Adopting this in a real repository

Copy/adapt the agent layer rather than copying the Node demo architecture blindly:

- `AGENTS.md`
- `.agents/`
- `.vscode/settings.json` (or equivalent user/workspace configuration)
- `docs/agentic-workflow.md`
- `docs/skills.md`
- the relevant files under `docs/stacks/`

Then replace/extend `docs/architecture.md` and `docs/testing.md` with the real application's architecture, test strategy, constraints, and quality gates.

## Why there is no SCM-specific CI file

A vendor-specific pipeline would make the starter less portable. Your CI system should call the target repository's established verification command(s), while `AGENTS.md`, Agent Skills, and the agent workflow remain portable across SCM platforms.

## VS Code note

The workspace configuration explicitly enables `AGENTS.md`, custom-agent discovery from `.agents/`, and Agent Skills discovery from `.agents/skills/` so the starter does not depend on a developer's local customization paths.
