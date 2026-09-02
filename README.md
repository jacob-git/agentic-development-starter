# Agentic Development Starter

A reusable, **SCM-neutral** starter repository showing how a team can use VS Code + GitHub Copilot for human-supervised agentic software development without tying repository guidance to GitHub, GitLab, Bitbucket, Azure Repos, or another source-control platform.

## What this demonstrates

- `AGENTS.md` as the canonical repository-wide agent contract
- SCM-neutral custom agents stored in `.agents/`
- VS Code workspace configuration that discovers those agents
- Guided **Planner -> Implementer -> Reviewer** handoffs
- Human approval before each handoff is submitted
- Explicit architecture and testing guidance
- A repeatable local quality gate: `npm run verify`
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

## Try the guided agentic workflow

Open the repository root in VS Code with GitHub Copilot/Copilot Chat enabled.

1. Choose the **Planner** custom agent.
2. Prompt: `Plan Exercise 2 from TASKS.md. Do not edit code.`
3. Review the proposed plan.
4. Select **Start Implementation**. VS Code switches to the **Implementer** with the approved-plan context and a pre-filled implementation prompt.
5. Review the implementation and `npm run verify` results.
6. Select **Review Changes**. VS Code switches to the **Reviewer** with the conversation context and a pre-filled review prompt.
7. Review the findings yourself.
8. If material findings exist, select **Address Findings** to return to the **Implementer** for a focused remediation pass.
9. When the review is clean, commit/push through your normal SCM workflow.

The handoffs use `send: false`. Selecting a handoff prepares the next agent and prompt, but the developer remains in control of submitting the next step.

See `PROMPTS.md` for additional examples.

## Why there is no SCM CI file

A vendor-specific pipeline file would make the starter less portable. Instead, every platform can call the same contract:

```bash
npm run verify
```

Add the thin CI wrapper appropriate for your organization while keeping the engineering rules and verification logic portable.

## VS Code note

The workspace uses `chat.agentFilesLocations` so custom agents can live in `.agents/` instead of a vendor-named directory. `AGENTS.md` is enabled with `chat.useAgentsMdFile`.

VS Code custom-agent handoffs preserve the conversation context while transitioning to the target agent. In this starter they are deliberately human-gated rather than automatically submitted.
