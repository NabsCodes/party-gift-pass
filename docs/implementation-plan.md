# Approved MVP implementation plan

The user's September 15 instruction opens implementation of the guest/share and
staff-scan wireframes. This plan supersedes the immediate-print-only proposal.

## Product contract

One event, roughly 200 children. Staff paste names, preview a personalised
football invitation and QR gift pass, download or share images, and manually
mark a pass as shared. Staff scan with the native phone camera, review the name,
confirm, and hand out one gift only after a successful server response.

The celebrant is Mohammed Aadil; Adil Lawal is a sample invited guest. The design
uses red, warm white, pitch green and charcoal, strong sports typography, a
quiet guest list, and generous spacing. It does not copy club logos.

## Ordered implementation

1. Database, secure token derivation, local demo and exactly five removable
   sample children. Demo data never silently appears in Neon.
2. Signed 12-hour staff sessions, explicit sign-out, origin checks, login
   throttling, protected reads and mutations, safe return-to routing.
3. Name batches, idempotent creation, guest search/status filters, per-guest
   editing/deletion, explicit shared marker, and bulk sample cleanup.
4. Re-creatable invitation/pass PNG downloads, real QR codes, native file
   sharing with download fallback, and printable passes.
5. Read-only review, atomic confirmation, same-attempt retry recovery,
   already-used/invalid/unavailable/session-expired handling and staff search.
6. Focused database/security tests, browser workflow/mobile checks, full build,
   documentation reconciliation, and a concise operator runbook.

## Security and recovery decisions

- Derive a 32-byte token using HMAC-SHA256 over a random ticket UUID with a
  separate server-only QR key. Persist only the SHA-256 token hash. This is an
  intentional change from unrecoverable random tokens to permit later sharing.
- QR key loss breaks regeneration; key rotation needs deliberate ticket
  reissue. Keep the key stable and backed up through provider secret management.
- Redemption requires a staff session and one conditional SQL update. Store a
  random confirmation-attempt ID so a lost response can be retried without
  producing a second redemption or a misleading failure.
- The same attempt can recover its receipt. A different attempt sees already
  collected. A success receipt is not a reusable authorisation on a guest phone.
- No public guest directory. Unauthenticated QR visits reveal no child details.
- “Shared” is staff-entered bookkeeping, never a WhatsApp delivery claim.
- Duplicate names are flagged for review but permitted; names are not identity
  proof. A forwarded QR can be used first by another person; staff verify the
  child/family at the table.
- Delete confirmation names its target. Redeemed records are retained, except
  explicitly marked demo records which can be removed as requested.

## External gates

Neon provisioning, live migration, hosting, final invitation artwork, real
WhatsApp/device testing, and event-network rehearsal require the user's external
environment. Local implementation and verification proceed independently.
