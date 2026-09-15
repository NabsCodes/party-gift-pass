<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Party Gift Pass Working Guide

## Current Boundary

This repository currently contains setup and architecture only. Do not add
authentication, ticket generation, scanning, printing, redemption handlers, or
deployment configuration unless a task explicitly opens that phase.

## Ownership

- `app/` owns App Router pages, layouts, and future route handlers.
- `components/` owns composed presentation; `components/ui/` owns stable primitives.
- `db/` owns the Neon/Drizzle client and PostgreSQL schema.
- `schemas/` owns Zod runtime contracts; `lib/` owns server workflows and utilities.
- `tests/` owns focused contract tests; `docs/` owns architectural decisions.
- Keep the repository single-package, shallow, and free of a `src/` directory.

Pages and layouts are Server Components by default. Add client boundaries only
to interactive leaves that genuinely need browser state or effects.

## Ticket Security

- Generate future QR secrets from at least 32 cryptographically random bytes.
- Persist only the SHA-256 token hash. Never log or store the raw QR token.
- Human-readable ticket numbers are labels, never redemption secrets.
- Redemption requires an authenticated staff session and one conditional,
  atomic update from `unused` to `redeemed` with `redeemed_at` set together.
- Never expose database IDs, hashes, connection strings, or provider errors.

## Working Rules

- Preserve unrelated work and inspect the current diff before editing.
- Keep documentation aligned with architectural or security decisions.
- Do not commit, push, deploy, provision providers, or migrate a database
  without explicit authorization.
- Before handoff, run `pnpm format`, `pnpm format:check`, `pnpm lint`,
  `pnpm typecheck`, `pnpm test`, and `pnpm build`.
