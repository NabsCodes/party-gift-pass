# Architecture

## Implemented boundary

Party Gift Pass is a single-package Next.js App Router application. Neon
PostgreSQL is the live database target; local demo mode uses persistent PGlite
and seeds exactly five explicitly marked sample children once.

```text
Browser UI -> authenticated route handlers -> Zod -> workflow -> Drizzle
                                                         |-> Neon (live)
                                                         `-> PGlite (demo)
```

`app/` owns pages and HTTP entry points, `components/` owns interactive views,
`lib/` owns ticket/auth/image workflows, `schemas/` owns runtime contracts, and
`db/` owns connection choice and schema.

## Routes and HTTP contract

| Route                          | Responsibility                                                                                 |
| ------------------------------ | ---------------------------------------------------------------------------------------------- |
| `/`                            | Redirect to `/staff`.                                                                          |
| `/staff/login`                 | Shared staff passphrase and safe return-to flow.                                               |
| `/staff`                       | Search guests, create name batches, share/download images, mark sent, delete eligible records. |
| `/redeem/[token]`              | Protected read-only review and final states. Loading never mutates.                            |
| `/api/session`                 | Rate-limited login and sign-out.                                                               |
| `/api/staff/tickets`           | Protected list and idempotent batch creation.                                                  |
| `/api/staff/tickets/[id]/pass` | Recreate a token only when its stored hash still matches.                                      |
| `/api/staff/tickets/[id]`      | Mark shared or delete eligible records.                                                        |
| `/api/staff/redeem`            | Atomic confirmation with retry-attempt recovery.                                               |

There is no in-app camera. Staff use the phone camera. The earlier `/print`
proposal is superseded by shareable invitation/pass PNGs and download fallback.

## Data model

`tickets` stores a random UUID, unique SHA-256 token hash, unique short ticket
number, optional display name, `unused | redeemed`, created/shared/redeemed
times, batch id/index, demo marker, and last successful redemption-attempt id.
A database check keeps status and redemption time consistent. Batch id/index is
unique so a retried create request cannot duplicate a batch.

`login_windows` supplies a deliberately small global login-attempt window.
`app_state` records whether local samples were seeded so deleting them does not
silently recreate them.

## Token and trust model

A ticket starts with a cryptographically random UUID. The URL token is a
32-byte HMAC-SHA256 value derived with `QR_SECRET`; only its SHA-256 hash is
stored. The raw token is reconstructed only for authenticated sharing and only
if a fresh derivation matches the stored hash. A stable key is therefore an
operational backup requirement; rotation requires deliberate pass reissue.

The child name and ticket number are display aids, not proof. Anyone who gets a
forwarded QR may present it first, so staff still verify the child/family at the
table. `Referrer-Policy: no-referrer`, private/no-store responses, no analytics,
and no token logging reduce URL leakage; provider access-log policy still needs
review before launch.

## Authentication and redemption

Staff sessions are signed, HTTP-only, same-site cookies lasting 12 hours. Live
mode requires HTTPS. Mutations require the exact configured origin. Invalid
return paths are collapsed to `/staff`.

1. Camera opens `/redeem/[token]`; missing sessions return through login.
2. The server hashes the token and loads the current state without mutation.
3. Staff checks the name and taps **Confirm gift collected**.
4. One update matches both token hash and `status = unused`, then sets status,
   `redeemed_at`, and a client-generated attempt id together.
5. A returned row is success. If the response was lost, retrying the same
   attempt id recovers the success receipt; a different attempt sees used.

This is the concurrency boundary: two independent confirmations cannot both
succeed. Never hand over a gift on a pending, invalid, or unavailable screen.

## External production gates

Neon provisioning and migration, hosting/environment variables, final event
URL, provider log review, real WhatsApp sharing, real-phone scan, network
rehearsal, credential distribution, final artwork/copy approval, and backups.
