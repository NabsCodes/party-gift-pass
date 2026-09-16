<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Party Gift Pass Working Guide

## Start here

1. Read `docs/README.md`, `docs/roadmap.md`, and the relevant route spec.
2. Read the latest `docs/implementation-log.md` entry.
3. Inspect `git status --short` and nearby code before editing.

## Architecture

- Keep this a shallow single-package App Router repository with no `src/` and
  no `features/`.
- Server Components are the default; client components are interactive leaves.
- `app/` owns pages and HTTP boundaries; `components/` is organized by route
  area (`staff/`, `redeem/`, `login/`) plus `layout/` and `ui/`; `hooks/` owns
  reusable client lifecycles; `db/` owns Drizzle; `schemas/` owns Zod; `lib/`
  owns workflows and shared helpers. Do not add empty placeholder folders.
- Style with Tailwind utilities on components. `app/globals.css` owns design
  tokens only. Reuse `components/ui` primitives (button, input, table,
  pagination, toast) before adding new CSS classes.
- Staff forms use React Hook Form with Zod resolvers. Keep Zod at every HTTP
  edge. Do not rely on native browser `required`/`min`/`max` checks.
- Paginate the in-memory guest list as a table with compact icon pager and
  10/25/50 rows. Disabled pager controls use `not-allowed`, not a wait cursor.
  Do not add React Query, TanStack Table, or infinite scroll at this scale.
  Cap a create batch at 250.
- Share the public pass link first (phone share sheet, WhatsApp on desktop, or
  copy). Invitation/pass images are optional. `/pass/[token]` matches the gift-
  pass artwork, shows the QR only, and never a child name.
- Use `.tsx` only for modules that render JSX. Keep guest helpers, ticket
  workflows, and form state in `.ts` files.
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
without explicit authorization. After meaningful work run `pnpm format`, then
format-check, lint, typecheck, unit tests, the relevant browser tests, and a
production build.
