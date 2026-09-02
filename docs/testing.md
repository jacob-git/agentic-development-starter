# Testing Strategy

The repository uses Node's built-in `node:test` runner.

## Expectations

- New behavior must have a test that fails before the implementation and passes after it.
- Domain/application tests should not start an HTTP server.
- HTTP tests may start a server on an ephemeral port.
- Tests must not depend on execution order.

## Required quality gate

Run:

```bash
npm run verify
```

This is intentionally SCM-neutral. Any CI/CD platform can call the same command.
