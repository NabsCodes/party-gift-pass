# Party Gift Pass

A small Admin-operated system for party invitations and one-time gift passes.
Admins can generate numbered guests without knowing children's names, or use
names when available. Each invitation and QR pass is shared as two images; gift
desk staff explicitly confirm collection after scanning.

## Local demo

Requirements: Node.js 20+ and pnpm 11.

```bash
pnpm install
pnpm dev:demo
```

Open `http://localhost:3000/staff/login`. Demo mode uses the displayed local
passphrase and creates exactly five removable sample children in `.party-demo`.
It is blocked outside localhost and never seeds Neon. Delete sample guests from
their detail panel when they are no longer needed.

## Live environment

Copy `.env.example` to `.env.local` and set every value:

- `DATABASE_URL`: Neon pooled PostgreSQL URL used by the live application.
- `DIRECT_URL`: Neon direct PostgreSQL URL used only by Drizzle migrations.
- `APP_URL`: exact application origin with no trailing path. Production must
  use HTTPS; `http://localhost:3000` is allowed only for local testing.
- `STAFF_PASSPHRASE`: shared event credential, at least 16 characters.
- `SESSION_SECRET`: stable random secret, at least 32 characters.
- `QR_SECRET`: stable random secret, at least 32 characters. Losing or changing
  it prevents existing pass images from being regenerated.

Run `pnpm db:migrate` only against an explicitly approved database. No Neon
database is provisioned or migrated by this repository setup.

## Production-like local test

Use a separate Neon development database or branch, not the final event
database. Put these five values in `.env.local`:

```dotenv
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
APP_URL=http://localhost:3000
STAFF_PASSPHRASE=use-a-long-private-event-passphrase
SESSION_SECRET=use-a-different-random-secret-at-least-32-characters
QR_SECRET=use-another-stable-random-secret-at-least-32-characters
```

Then run:

```bash
pnpm db:migrate
pnpm build
pnpm start
```

Open `http://localhost:3000/staff/login`, create a small numbered batch, share
one pass to yourself, scan it, confirm collection, and scan it again to verify
the already-collected result. Keep the same `QR_SECRET` when moving to hosting
or existing pass images will stop matching.

## Commands

```bash
pnpm dev             # Next.js development server
pnpm dev:demo        # Local PGlite demo with five samples
pnpm build           # Production build
pnpm format          # Apply Prettier formatting
pnpm format:check    # Check formatting
pnpm lint            # ESLint
pnpm typecheck       # Strict TypeScript
pnpm test            # Vitest unit tests
pnpm test:e2e        # Local Chrome staff/redemption/mobile flow
pnpm db:generate     # Generate Drizzle SQL
pnpm db:migrate      # Apply SQL to approved DATABASE_URL
pnpm db:studio       # Drizzle Studio
```

Start with [docs/README.md](./docs/README.md) for the product, security model,
route specs, operator runbook, roadmap, and append-only implementation log.
