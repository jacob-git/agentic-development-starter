# React + TypeScript Guidance

Use this guide when repository evidence shows React and TypeScript are part of the affected codebase.

## Detect the toolchain

Inspect before running commands:
- `package.json` scripts and dependencies
- `tsconfig*.json`
- lockfile: `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, or `bun.lock*`
- build configuration such as Vite, Next.js, webpack, or another framework
- existing lint, test, and browser-test configuration

Use the package manager indicated by the repository. Do not replace pnpm/yarn/bun with npm merely for convenience.

## Architecture and implementation

- Follow the existing component, feature, routing, state-management, data-fetching, and styling conventions.
- Keep presentational components focused on rendering and interaction; place reusable domain/application behavior in the repository's established hooks/services/state layer.
- Reuse shared components and design-system primitives before creating near-duplicates.
- Keep API access behind the repository's existing client/service abstraction when one exists.
- Preserve accessibility: semantic HTML, keyboard behavior, labels, focus handling, and existing ARIA conventions.
- Follow the Rules of Hooks and avoid unnecessary effects; derive values during render when possible.
- Do not add memoization (`useMemo`, `useCallback`, `memo`) without a concrete reason or existing convention.

## TypeScript

- Preserve the repository's strictness settings.
- Prefer precise types over `any`; use `unknown` plus narrowing for untrusted/external data.
- Reuse existing domain/API types when appropriate.
- Validate data at runtime when it crosses an untrusted boundary; TypeScript types alone are not runtime validation.
- Avoid broad type assertions that merely silence compiler errors.

## Testing

Use the frameworks already configured, such as Vitest/Jest, React Testing Library, Playwright, Cypress, or framework-specific tooling.

- Test behavior visible to users or consumers rather than implementation details.
- Add component/unit tests for changed logic.
- Add integration or browser tests when routing, network boundaries, or critical user flows are affected.
- Avoid snapshots as the only evidence for important behavior unless the repository intentionally uses that pattern.

## Verification

Prefer an existing aggregate script such as `verify`, `check`, or the repository's documented CI command.

Otherwise inspect `package.json` and run the relevant existing scripts, commonly:
- lint
- typecheck
- test
- build
- targeted browser/integration tests when the change requires them

Do not invent script names that are not present. Report the exact package-manager commands used and their results.
