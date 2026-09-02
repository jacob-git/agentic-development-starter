# Architecture

This starter intentionally uses a small layered architecture so an AI agent has explicit boundaries to respect.

## Dependency direction

```text
HTTP adapter
    |
    v
Application use cases
    |
    v
Domain model

Infrastructure adapters implement application-facing storage needs.
```

## Layer responsibilities

### Domain
Contains business entities and invariants. It must remain independent of transport and persistence.

### Application
Coordinates use cases and defines the capabilities it needs from external systems.

### Infrastructure
Implements storage or external integrations. The current repository uses an in-memory repository.

### HTTP
Parses requests, validates boundary-level input, invokes application services, and maps results to HTTP responses.

## Architectural decision

For this demo, avoid frameworks and external dependencies. This makes agent behavior, architecture, and verification easy to inspect.
