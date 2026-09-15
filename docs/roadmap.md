# Roadmap

Status key: **Complete**, **Current**, **Next**, **Later**, **External gate**.

## Goal 0 — Foundation

**Complete**

- Single-package Next.js App Router project with TypeScript, Tailwind, pnpm,
  ESLint, Prettier, Vitest, Drizzle, Neon, Zod, QRCode, and Lucide.
- Ticket schema and generated initial migration.
- Hash-only QR security and atomic-redemption architecture documented.

## Goal 1 — Product Map and Visual Direction

**Current**

- Establish the lightweight documentation and handoff system.
- Review the full staff and redemption journey as a working wireframe.
- Agree the deliberately flat, operational design direction.
- Resolve the open MVP decisions in `wireframe.md`.

Completion gate: the screen inventory, happy path, failure states, and visual
direction are approved well enough to write one implementation spec at a time.

## Goal 2 — Staff Access

**Next**

- Write the `/staff/login` route spec and session contract.
- Implement the smallest approved authenticated staff boundary.
- Preserve the intended redeem URL through login.

Completion gate: unauthenticated staff routes are protected; successful login
returns staff to the intended screen; failure and sign-out behavior are tested.

## Goal 3 — Ticket Creation and Immediate Print

**Planned**

- Specify the ticket-number and batch-creation rules.
- Generate strong raw tokens, persist only their hashes, and retain raw tokens
  only for the immediate response.
- Render an ink-efficient printable ticket batch with QR codes.

Completion gate: an authenticated staff member can generate and print a batch,
and a refresh cannot reconstruct raw QR tokens from stored data.

## Goal 4 — Review and Atomic Redemption

**Planned**

- Implement `/redeem/[token]` review with authenticated staff confirmation.
- Redeem using one conditional database update.
- Handle success, already redeemed, invalid token, and temporary failure states.

Completion gate: scanning alone does not redeem; two concurrent confirmations
cannot both succeed; the UI makes the final state unmistakable.

## Goal 5 — Event Readiness

**Planned**

- Run focused unit and integration tests plus desktop and 390px browser QA.
- Test a printed QR with the real phones and printer intended for the event.
- Prepare a short operator checklist and fallback procedure.

Completion gate: the complete event flow is rehearsed with realistic tickets
and devices, with no unresolved critical issue.

## External Gates

**External gate**

- Neon project and approved production `DATABASE_URL`.
- Hosting project, environment configuration, and deployment.
- Final event URL, staff credential delivery, phones, network, and printer.

## Later, Not One-Day MVP

**Later**

- Individual staff accounts, roles, password recovery, and an admin console.
- In-app camera scanner, offline redemption, analytics, guest messaging, CSV
  import/export, editable ticket history, and advanced audit reporting.
- General-purpose design system, component catalogue, or monorepo tooling.
