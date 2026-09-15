# Workflow

## Before Work

1. Read `AGENTS.md`, `docs/README.md`, and the current roadmap goal.
2. Read the relevant architecture, design, layout, wireframe, or route spec.
3. Read the latest implementation-log entries.
4. Inspect `git status --short`, the current diff, and nearby code.
5. Confirm whether the task is documentation, implementation, database,
   deployment, or external-provider work.

Existing uncommitted work belongs to the current context. Preserve it unless
the user explicitly asks to replace it.

## Wireframe to Code

1. Use `wireframe.md` to agree the screen, states, and navigation.
2. Create one focused spec under `docs/routes/` for the next route or flow.
3. Record acceptance criteria, security boundaries, validation, and test cases.
4. Implement only that approved slice.
5. Verify it in proportion to risk.
6. Update the owning document, roadmap status, and implementation log.

Do not create every route spec in advance. Small, approved specs are easier to
keep accurate during a one-day build.

## Implementation Rules

- Prefer direct server functions and thin route entry points.
- Validate external input with Zod at the boundary.
- Keep database code and secrets in server-only modules.
- Do not log raw tokens, session secrets, connection strings, or personal data.
- Add abstractions only when repetition is real and ownership becomes clearer.
- Keep screen copy factual; do not invent completed actions or unavailable
  controls.

## Verification Matrix

| Change                  | Minimum verification                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| Documentation only      | Targeted Prettier check, links/path review, consistency review, `git diff --check`         |
| Visual UI               | Formatting, lint, typecheck, focused tests, desktop and 390px browser QA                   |
| Server or auth behavior | Formatting, lint, typecheck, focused success/failure tests, production build               |
| Database schema         | Typecheck, tests, migration generation and SQL review; explicit approval before applying   |
| Redemption              | Valid, invalid, already-used, unauthenticated, concurrent-request, and retry behavior      |
| Print                   | Browser print preview, real paper output, QR scan from paper, and refresh/reprint behavior |

Local checks do not prove hosting, provider configuration, printer behavior, or
event-network reliability.

## Handoff

Lead with the outcome, then name important files, checks actually run, and the
single highest-value next step. Use `handoff-template.md` when work stops before
the current acceptance gate is complete.
