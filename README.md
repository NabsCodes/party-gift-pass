# Party Gift Pass

A small staff-operated system for personalised party invitations and one-time
gift passes. Staff add children, share an invitation and QR pass as two images,
then scan the QR and explicitly confirm collection at the gift table.

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

- `DATABASE_URL`: Neon PostgreSQL URL.
- `APP_URL`: exact HTTPS origin, with no trailing path.
- `STAFF_PASSPHRASE`: shared event credential, at least 16 characters.
- `SESSION_SECRET`: stable random secret, at least 32 characters.
- `QR_SECRET`: stable random secret, at least 32 characters. Losing or changing
  it prevents existing pass images from being regenerated.

Run `pnpm db:migrate` only against an explicitly approved database. No Neon
database is provisioned or migrated by this repository setup.

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
