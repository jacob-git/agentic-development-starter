---
name: review-change
description: Review proposed or uncommitted code changes for correctness, regressions, security, architecture, tests, compatibility, and maintainability. Use before human approval or when asked for a code review.
---

# Review Change

Review the actual change against the requirement and repository rules. Prioritize material risks over style preferences.

## Procedure

1. Read `AGENTS.md`, the relevant stack guidance, and repository-specific architecture/testing docs.
2. Understand the requested behavior and intended scope from the task, plan, or conversation.
3. Inspect the complete diff or changed files and enough surrounding code to understand behavior.
4. Check, in priority order:
   - functional correctness and regressions;
   - security, authorization, validation, and unsafe data handling;
   - broken public/API/data/configuration contracts;
   - architecture and dependency-boundary violations;
   - concurrency, state, error handling, and lifecycle issues where relevant;
   - missing, weak, or misleading tests;
   - build, type, lint, static-analysis, and operational concerns;
   - maintainability problems that create concrete future risk.
5. Validate claims against code or test evidence. Do not invent findings to make the review appear thorough.
6. For each material finding, provide:
   - severity or impact;
   - concrete failure mode;
   - affected file/behavior;
   - why it matters;
   - smallest reasonable remediation direction.
7. If no material findings exist, say so and identify any residual test or verification gaps.
8. Do not edit code unless explicitly asked to address findings.

## Review quality bar

- Prefer a few high-confidence findings over many speculative comments.
- Avoid style-only feedback unless it violates an explicit repository rule or materially harms maintainability.
- Distinguish confirmed defects from questions or assumptions.
- Consider multi-stack integration contracts when changes span frontend/backend or multiple services.
