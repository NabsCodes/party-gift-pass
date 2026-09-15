# Party Gift Pass Claude Guide

This file gives Claude-style working guidance for this repository. It
complements `AGENTS.md`; it does not replace the canonical documents in
`docs/`.

## Start Here

1. Read `AGENTS.md`.
2. Read `docs/README.md` and follow its reading order.
3. Check `docs/roadmap.md` for the current goal.
4. Read the latest entry in `docs/implementation-log.md`.
5. Inspect `git status --short` and nearby code before editing.

## Product Boundary

Party Gift Pass is a deliberately small, staff-operated system for creating,
printing, and redeeming one-time gift tickets at a children's party. A scan
must never redeem a ticket by itself. It only opens the review screen; an
authenticated staff member explicitly confirms collection.

Until the wireframe is approved, treat it as the working design input rather
than a final route specification. Create route-level specs only when a screen's
behavior and acceptance criteria are agreed.

## Working Style

- Keep the App Router server-first and add client components only for real
  browser interaction.
- Prefer a small direct implementation over a framework or abstraction added
  for hypothetical growth.
- Keep raw QR tokens out of the database, logs, errors, analytics, and docs.
- Keep the human-readable ticket number separate from the QR secret.
- Preserve unrelated work and do not commit, push, deploy, provision Neon, or
  migrate a shared database without explicit approval.
- Update the owning document and append a concise implementation-log entry
  after meaningful completed work.

## Design Direction

The existing initialization page is temporary and is not the product design
reference. Product screens should use flat page planes, clear typography, thin
rules, restrained radii, and very limited shadow. Party character should come
from color, type, ticket details, and a few graphic marks—not from nested cards,
gradient backgrounds, oversized icon tiles, or decorative confetti everywhere.
