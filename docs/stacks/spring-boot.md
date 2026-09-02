# Spring Boot Guidance

Use this guide when repository evidence shows Spring Boot is part of the affected codebase.

## Detect the toolchain

Inspect before running commands:
- Maven: `pom.xml`, `.mvn/`, `mvnw`, `mvnw.cmd`
- Gradle: `build.gradle`, `build.gradle.kts`, `gradlew`, `gradlew.bat`, `settings.gradle*`
- Java version/toolchain configuration
- Spring Boot plugins/dependencies
- existing test, static-analysis, formatting, and integration-test configuration

Prefer the checked-in Maven/Gradle wrapper when available. Do not switch build systems or bypass repository-defined profiles/tasks.

## Architecture and implementation

Follow the repository's existing architecture rather than imposing a fixed package layout. Common expectations when they match the codebase:

- Controllers handle transport concerns, request validation, status codes, and DTO mapping rather than business rules.
- Application/service classes coordinate use cases and transactions.
- Repositories/persistence adapters own data access.
- Domain types should not acquire Spring or persistence concerns unless the repository intentionally follows that model.
- Reuse existing DTOs, mappers, exception handling, configuration, and client abstractions.
- Place transaction boundaries deliberately, generally around application/service operations rather than controllers.
- Avoid adding another library when Spring or an existing dependency already provides the needed capability.

## Validation and security

- Use the repository's established Bean Validation approach for boundary input.
- Preserve Spring Security authorization/authentication behavior.
- Do not weaken endpoint authorization, CORS/CSRF behavior, validation, or method security to make tests pass.
- Avoid exposing persistence entities directly from APIs unless that is an explicit existing convention.
- Treat external service/database input as untrusted where appropriate.

## Testing

Use the existing JUnit and Spring test conventions.

- Prefer plain unit tests when Spring context is unnecessary.
- Use focused slice tests such as MVC/data tests when the boundary itself is under test and the repository already uses them.
- Use full application-context/integration tests only when the behavior requires them.
- Reuse existing Testcontainers, embedded infrastructure, fixtures, and test builders rather than introducing parallel approaches.
- Test validation, error mapping, authorization, transaction behavior, and persistence boundaries when affected.

## Verification

Prefer the repository's aggregate verification task.

Typical Maven repositories may use the checked-in wrapper, for example `./mvnw verify`; typical Gradle repositories may use `./gradlew check` or another established task. These are examples, not commands to assume blindly.

Inspect the build configuration and CI/documentation first, then run the repository-defined compile/build, static-analysis, unit/integration-test, and verification tasks relevant to the change. Report the exact commands and results.
