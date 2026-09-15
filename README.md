# Party Gift Pass

Foundation for a one-time party gift ticket application. This setup includes
the application shell, typed database schema, migration tooling, tests, and
architecture documentation. Ticket generation, staff authentication,
redemption, scanning, and printing are intentionally not implemented yet.

## Requirements

- Node.js 20 or newer
- pnpm 11
- A Neon PostgreSQL connection only when applying migrations or using the database

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Add a real Neon connection string to `DATABASE_URL` in `.env.local` before
running database-connected commands. Never commit `.env.local`.

## Commands

```bash
pnpm dev            # Start the local development server
pnpm build          # Create a production build
pnpm lint           # Run ESLint
pnpm typecheck      # Run strict TypeScript checks
pnpm test           # Run Vitest once
pnpm test:watch     # Run Vitest in watch mode
pnpm format         # Format the repository
pnpm format:check   # Check formatting without changing files
pnpm db:generate    # Generate SQL migrations from db/schema.ts
pnpm db:migrate     # Apply migrations to DATABASE_URL
pnpm db:studio      # Open Drizzle Studio
```

`pnpm db:generate` does not need a live database. `pnpm db:migrate` does, and
must only be run against an explicitly approved database.

## Project Documentation

Start with [docs/README.md](./docs/README.md). It links the current roadmap,
architecture, working wireframe, design and layout rules, workflow, and
implementation history.

The current initialization page is only a setup placeholder, not the approved
product UI. Product routes remain unimplemented until the working wireframe is
reviewed and converted into focused route specs.
