<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes. Read the relevant guide in
`node_modules/next/dist/docs/` before changing Next.js behavior.

<!-- END:nextjs-agent-rules -->

# Party Gift Pass Working Guide

## Start here

1. Read `docs/README.md`, `docs/roadmap.md`, and the relevant route spec.
2. Read the latest `docs/implementation-log.md` entry.
3. Inspect `git status --short` and nearby code before editing.

## Architecture

- Keep this a shallow single-package App Router repository with no `src/`.
- Server Components are the default; client components are interactive leaves.
- `app/` owns pages and HTTP boundaries; `components/` owns presentation;
  `db/` owns Drizzle; `schemas/` owns Zod; `lib/` owns workflows/utilities.
- Business rules belong outside route JSX and are validated at every HTTP edge.
- `PARTY_DEMO=1` is localhost-only PGlite. It must never seed a live database.

## Non-negotiable ticket rules

- A scan is read-only. Only **Confirm gift collected** may redeem a ticket.
- Redemption is one conditional update from `unused` to `redeemed`, setting
  `redeemed_at` in the same statement. Keep retry-attempt recovery intact.
- QR tokens are HMAC-derived from random UUIDs; persist only SHA-256 hashes.
  Never log tokens, hashes, database URLs, secrets, or provider errors.
- Ticket numbers and child names are labels, not authentication factors.
- Unauthenticated QR visits reveal no child details.
- Redeemed live records are retained. Only explicitly marked demo records may
  be deleted after redemption.

## Design and documentation

Use the matchday editorial system in `docs/design-system.md`: warm paper, red,
pitch green, charcoal, bold sports type, thin rules, almost no shadow, and no
generic nested-card dashboard. Keep touch targets usable from 390px upward.

Update the canonical owning document and append factual verification to the
implementation log after meaningful work. Never rewrite old log entries.

Do not commit, push, deploy, provision providers, or migrate a shared database
without explicit authorization. Before handoff run format, format-check, lint,
typecheck, unit tests, the relevant browser tests, and a production build.
