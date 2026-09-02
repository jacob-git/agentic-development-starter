# Python Guidance

Use this guide when repository evidence shows Python is part of the affected codebase.

## Detect the toolchain

Inspect before running commands:
- `pyproject.toml`
- `requirements*.txt`
- `Pipfile` / `Pipfile.lock`
- `poetry.lock`
- `uv.lock`
- package/module layout
- existing formatter, linter, type-checker, and test configuration

Respect the repository's environment/dependency tool (for example uv, Poetry, Pipenv, pip/venv, or another established workflow). Do not replace it merely because another tool is familiar.

## Architecture and implementation

- Follow the existing package/module boundaries and framework conventions.
- Keep domain/business behavior separate from transport, persistence, CLI, or framework glue when the repository already follows that separation.
- Reuse existing dependency-injection, configuration, logging, client, repository, and error-handling patterns.
- For FastAPI, Django, Flask, or another framework, follow the patterns already present rather than introducing a parallel architecture.
- Keep functions/classes focused and avoid large opportunistic refactors during scoped work.

## Typing and data boundaries

- Preserve the repository's typing level and type-checker configuration.
- Prefer explicit, useful types for public interfaces and non-trivial data structures.
- Avoid `Any` as a shortcut when a precise type can reasonably be expressed.
- Validate untrusted external input using the repository's established framework/library; type annotations alone are not runtime validation.
- Preserve async/sync boundaries and do not introduce blocking work into async flows without deliberate handling.

## Testing

Use the repository's existing framework, commonly pytest or unittest.

- Add focused tests for changed behavior.
- Reuse existing fixtures, factories, mocks, and integration-test infrastructure.
- Avoid excessive mocking of the unit under test's own behavior.
- Add integration tests when database, HTTP, queue, filesystem, framework, or other boundary behavior is affected.
- Preserve deterministic tests and isolate global/environment state.

## Verification

Prefer an existing aggregate command from project documentation, task runners, Makefiles, tox/nox, or CI configuration.

Otherwise run the configured checks relevant to the change. Depending on repository configuration these may include Ruff/Flake8/Pylint, Black formatting checks, mypy/Pyright, pytest, packaging/build, or framework-specific checks.

If the repository uses an execution wrapper such as `uv run` or `poetry run`, use it consistently. Do not assume every Python repo has Ruff, mypy, Black, or pytest; inspect configuration first. Report the exact commands and results.
