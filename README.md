# Agentic Development Starter

A reusable, **SCM-neutral** starter repository showing how a team can use VS Code + GitHub Copilot for human-supervised agentic software development without tying repository guidance to GitHub, GitLab, Bitbucket, Azure Repos, or another source-control platform.

## What this demonstrates

- `AGENTS.md` as the canonical repository-wide agent contract
- SCM-neutral custom agents stored in `.agents/`
- VS Code workspace configuration that discovers those agents
- Explicit architecture and testing guidance
- A repeatable local quality gate: `npm run verify`
- Planning -> implementation -> review workflow
- A small working service with exercises agents can implement

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
│   └── agentic-workflow.md
├── src/
├── test/
├── scripts/
└── package.json
```

## Run it

Requirements: Node.js 20+.

```bash
npm test
npm run verify
npm start
```

Then open:

- `http://localhost:3000/health`
- `http://localhost:3000/api/items`

No package install is required because the starter uses only Node.js built-ins.

## Try the agentic workflow

Open the repository in VS Code with GitHub Copilot/Copilot Chat enabled.

1. Choose the **Planner** custom agent.
2. Prompt: `Plan Exercise 2 from TASKS.md. Do not edit code.`
3. Review the plan.
4. Choose the **Implementer** custom agent.
5. Prompt: `Implement Exercise 2 following the approved plan. Run npm run verify.`
6. Choose the **Reviewer** custom agent.
7. Prompt: `Review the uncommitted changes against AGENTS.md.`
8. Review the result yourself, then commit/push with your normal SCM workflow.

See `PROMPTS.md` for more examples.

## Why there is no SCM CI file

A vendor-specific pipeline file would make the starter less portable. Instead, every platform can call the same contract:

```bash
npm run verify
```

Add the thin CI wrapper appropriate for your organization while keeping the engineering rules and verification logic portable.

## VS Code note

The workspace uses `chat.agentFilesLocations` so custom agents can live in `.agents/` instead of a vendor-named directory. `AGENTS.md` is enabled with `chat.useAgentsMdFile`.
