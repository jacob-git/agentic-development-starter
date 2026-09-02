# Demo Exercises

Use these tasks to demonstrate agentic development.

## Exercise 1 — Get item by ID

Add `GET /api/items/:id`.

Acceptance criteria:
- Existing IDs return `200` with the item.
- Unknown IDs return `404` with `{ "error": "Item not found" }`.
- Add tests.
- Preserve the repository architecture.

## Exercise 2 — Category filtering

Allow `GET /api/items?category=<value>`.

Acceptance criteria:
- Filtering is case-insensitive.
- No `category` parameter preserves current behavior.
- An empty category is treated as no filter.
- Add tests at the most appropriate layer.

## Exercise 3 — Create an item

Add `POST /api/items` accepting JSON with `name` and `category`.

Acceptance criteria:
- Reject invalid JSON with `400`.
- Reject missing/blank fields with `400`.
- Generate the ID inside the application/domain flow, not the HTTP layer.
- Return `201` for a valid item.
- Add tests.

## Exercise 4 — Review-only scenario

Ask the Implementer to introduce an intentionally poor change, such as putting category filtering directly in the HTTP handler. Then ask the Reviewer to detect the architecture violation.
