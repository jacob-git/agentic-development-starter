# Agentic Development Starter

A reusable, **SCM-neutral and stack-aware** starter showing how a team can use VS Code + GitHub Copilot for human-supervised agentic software development without tying repository guidance to a source-control platform or a single application technology.

## What this demonstrates

- `AGENTS.md` as the canonical repository-wide agent contract
- SCM-neutral custom agents stored in `.agents/`
- Planner -> Implementer -> Reviewer handoffs with human approval between stages
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
│   └── reviewer.agent.md
├── .vscode/
│   ├── settings.json
│   └── extensions.json
├── docs/
│   ├── architecture.md
│   ├── testing.md
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

## Agent workflow

```text
Developer request
      |
      v
Planner
  detects stack
  reads repo + stack guidance
  produces plan + verification approach
      |
      v
[ Start Implementation ]
      |
      v
Implementer
  changes code
  adds/updates tests
  runs repository-native quality gates
      |
      v
[ Review Changes ]
      |
      v
Reviewer
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
5. When implementation is complete, click **Review Changes**.
6. Review the prepared prompt and submit it to **Reviewer**.
7. If material findings exist, click **Address Findings**; otherwise perform the final human review.

See `PROMPTS.md` for more examples.

## Adopting this in a real repository

Copy/adapt the agent layer rather than copying the Node demo architecture blindly:

- `AGENTS.md`
- `.agents/`
- `.vscode/settings.json` (or equivalent user/workspace configuration)
- `docs/agentic-workflow.md`
- the relevant files under `docs/stacks/`

Then replace/extend `docs/architecture.md` and `docs/testing.md` with the real application's architecture, test strategy, constraints, and quality gates.

## Why there is no SCM-specific CI file

A vendor-specific pipeline would make the starter less portable. Your CI system should call the target repository's established verification command(s), while `AGENTS.md` and the agent workflow remain portable across SCM platforms.

## VS Code note

The workspace uses `chat.agentFilesLocations` so custom agents can live in `.agents/` instead of a vendor-named directory. `AGENTS.md` is enabled for Copilot through the workspace configuration.
