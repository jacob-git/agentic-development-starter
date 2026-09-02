# Agentic Development Starter

A reusable, **SCM-neutral and stack-aware** starter showing how a team can use VS Code + GitHub Copilot for human-supervised agentic software development without tying repository guidance to a source-control platform or a single application technology.

## What this demonstrates

- `AGENTS.md` as the canonical repository-wide engineering contract
- SCM-neutral custom agents stored in `.agents/`
- enforced least-privilege tool boundaries for Planner, Implementer, and Reviewer
- Planner -> Implementer -> Reviewer handoffs with human approval between stages
- Agent Skills under `.agents/skills/` for repeatable procedures loaded when relevant
- automatic stack/toolchain discovery from repository evidence
- technology-specific guidance for React + TypeScript, Spring Boot, and Python
- repository-native verification instead of hardcoded build commands
- agent security/governance guidance
- behavioral evaluation scenarios for agent configuration changes
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
│       ├── verify-repository/SKILL.md
│       ├── investigate-bug/SKILL.md
│       ├── implement-feature/SKILL.md
│       ├── review-change/SKILL.md
│       └── update-dependency/SKILL.md
├── .vscode/
│   ├── settings.json
│   └── extensions.json
├── docs/
│   ├── architecture.md
│   ├── testing.md
│   ├── skills.md
│   ├── agent-security.md
│   ├── agentic-workflow.md
│   └── stacks/
│       ├── react-typescript.md
│       ├── spring-boot.md
│       └── python.md
├── evals/
│   ├── README.md
│   ├── expected-behavior.md
│   ├── planner-scenarios.md
│   ├── implementer-scenarios.md
│   └── reviewer-scenarios.md
├── src/                  # runnable Node sample only
├── test/                 # runnable Node sample only
├── scripts/              # runnable Node sample only
└── package.json          # runnable Node sample only
```

## Customization model

Each artifact has one clear responsibility:

| Artifact | Purpose |
| --- | --- |
| `AGENTS.md` | Engineering principles, guardrails, role boundaries, and universal repository rules |
| `.agents/*.agent.md` | Who is doing the work and which tools that role is allowed to use |
| `.agents/skills/*/SKILL.md` | How to perform a repeatable task such as debugging or verification |
| `docs/stacks/*` | Technology-specific guidance for React/TypeScript, Spring Boot, Python, etc. |
| `docs/agent-security.md` | Security, approvals, MCP/external-tool, sensitive-file, and human-gate guidance |
| `evals/*` | Behavioral acceptance scenarios for the agent configuration |
| application docs/config | The actual repository's architecture, build, test, and operational contracts |

This separation keeps always-on context small while allowing Copilot to load specialized procedures only when relevant.

## Agent tool boundaries

The custom agents now have explicit least-privilege tool lists:

| Agent | Tools | Boundary |
| --- | --- | --- |
| Planner | `search`, `read` | Plans only; cannot edit or run terminal commands |
| Implementer | `search`, `read`, `edit`, `execute` | May implement and verify within normal approvals/security policy |
| Reviewer | `search`, `read`, `execute` | May inspect and verify but cannot edit; findings go back to Implementer |

The boundary is enforced in each `.agent.md` frontmatter rather than relying only on written instructions.

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

| Repository evidence | Guidance loaded | Verification behavior |
| --- | --- | --- |
| React + TypeScript, `package.json`, `tsconfig.json` | `docs/stacks/react-typescript.md` | Use the repo's actual package manager/scripts: lint, typecheck, test, build, etc. |
| Spring Boot + `pom.xml`/`build.gradle*` | `docs/stacks/spring-boot.md` | Use the existing Maven/Gradle wrapper and configured verification tasks |
| Python + `pyproject.toml`/requirements/lockfile | `docs/stacks/python.md` | Use the repo's existing environment tool and configured test/lint/type-check commands |
| Multiple stacks | all relevant guides | Verify every affected stack and their integration contract |

The agents do **not** assume `npm run verify`, Maven, Gradle, pytest, or any other command just because it is familiar.

## Agent + skill workflow

```text
Developer request
      |
      v
Planner  [search/read only]
  detects stack/toolchain
  reads repository guidance
  produces plan + verification approach
      |
      v
Human reviews plan
      |
      v
[ Start Implementation ]
      |
      v
Implementer  [search/read/edit/execute]
  uses task-relevant skills
  changes code
  adds/updates tests
  uses repository-native quality gates
      |
      v
[ Review Changes ]
      |
      v
Reviewer  [search/read/execute; no edit]
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

## Security baseline

See `docs/agent-security.md` for the complete guidance. The starter assumes a human-supervised posture:

- use normal/default approvals for day-to-day development rather than bypassing approvals by default;
- protect secrets and sensitive files;
- review terminal commands and external/MCP tool access;
- treat external content as untrusted;
- keep MCP/external tools least-privileged and do not enable them by default in this generic starter;
- review the final diff before integration;
- keep deployment/production mutation behind explicit human controls;
- treat sandboxing as an optional stronger isolation layer where supported, not a core dependency of the starter.

## Evaluate changes to the agent setup

The `evals/` directory is a lightweight acceptance suite for the agent configuration.

Use it whenever you materially change `AGENTS.md`, custom-agent instructions/tool lists, skills, stack guidance, or VS Code agent configuration.

Scenarios cover:

- React/TypeScript, Spring Boot, Python, and multi-stack toolchain detection;
- Planner read-only behavior;
- Implementer scope/test/verification discipline;
- Reviewer no-edit behavior and material-risk detection;
- authorization regressions, verification gaps, compatibility mismatches, and the valid case where no material issue exists.

Score behavior using `evals/expected-behavior.md`. Evaluate actions and decisions rather than exact wording.

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
5. Copilot can load `implement-feature` and later `verify-repository` when relevant.
6. When implementation is complete, click **Review Changes**.
7. Review the prepared prompt and submit it to **Reviewer**; `review-change` can load for the review procedure.
8. If material findings exist, click **Address Findings**; otherwise perform the final human review.

See `PROMPTS.md` for more examples.

## Adopting this in a real repository

Copy/adapt the agent layer rather than copying the Node demo architecture blindly:

- `AGENTS.md`
- `.agents/`
- `.vscode/settings.json` (or equivalent user/workspace configuration)
- `docs/agentic-workflow.md`
- `docs/agent-security.md`
- `docs/skills.md`
- relevant files under `docs/stacks/`
- `evals/` as the behavioral regression suite

Then replace/extend `docs/architecture.md` and `docs/testing.md` with the real application's architecture, test strategy, constraints, and quality gates.

## Why there is no SCM-specific CI file

A vendor-specific pipeline would make the starter less portable. Your CI system should call the target repository's established verification command(s), while `AGENTS.md`, Agent Skills, security guidance, evaluations, and the agent workflow remain portable across SCM platforms.

## VS Code note

The workspace configuration explicitly enables `AGENTS.md`, custom-agent discovery from `.agents/`, and Agent Skills discovery from `.agents/skills/` so the starter does not depend on a developer's local customization paths.
