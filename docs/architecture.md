# Architecture

## Current State

Party Gift Pass is a single-package Next.js App Router application. This first
phase provides only the UI shell, ticket table, database connection boundary,
migration tooling, and tests. There are no public product workflows yet.

The application stays server-first and intentionally shallow:

- `app/` owns routes and HTTP entry points.
- `components/` owns presentation.
- `db/` owns the Drizzle client and PostgreSQL schema.
- `schemas/` owns runtime validation.
- `lib/` owns future server workflows and infrastructure helpers.

## Planned Routes

| Route             | Future responsibility                                                                                           |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| `/staff/login`    | Authenticate authorized party staff.                                                                            |
| `/staff`          | Staff ticket management and redemption workspace.                                                               |
| `/redeem/[token]` | Receive the raw QR token, require staff authentication, and present the redemption decision.                    |
| `/print`          | Generate and print a newly created ticket batch while its raw tokens remain available in that creation session. |

Ticket generation and redemption may use route handlers under `app/api/` or
server actions. The transport will be chosen with the authentication design;
database and validation logic must remain outside route components.

## Ticket Security Model

The QR URL must contain a cryptographically random token generated from at
least 32 random bytes and encoded safely for a URL. The database stores only
its SHA-256 hash. The internal UUID and short ticket number are never secrets
and must not be substituted into QR URLs.

Because raw tokens are not recoverable, the future generation flow must create
the ticket records and return the raw tokens only to the authenticated creation
session for immediate printing or secure export. A later session cannot rebuild
those QR codes from the database.

## Planned Redemption Flow

1. A QR scan opens `/redeem/[token]`.
2. The application requires an authenticated, authorized staff session and
   preserves the intended redemption destination through login.
3. The server validates the token, hashes it with SHA-256, and never logs the raw value.
4. One database statement updates the matching row only where `status = 'unused'`,
   setting `status = 'redeemed'` and `redeemed_at` together, then returns the row.
5. A returned row means redemption succeeded. No returned row means the token
   is invalid or already redeemed; the public response must not reveal private data.

The conditional update is the concurrency boundary: two simultaneous requests
cannot both redeem the same ticket successfully.

## Deferred Decisions

- Authentication provider, session storage, staff roles, and authorization policy
- Ticket-number format and batch-generation workflow
- Route handlers versus server actions
- Printing, export, reprint policy, and camera scanning
- Complete staff and redemption interfaces
- Audit/event history and retention policy
- Neon provisioning, deployment, monitoring, and production operations
