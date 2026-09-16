# Invitation and pass sharing spec

The authenticated pass endpoint re-derives the URL token from the random ticket
UUID and stable server-only QR key. It returns the token only if hashing it
matches the persisted hash. A mismatch is a recovery error, never a silent QR
replacement.

The browser creates two 1000px-wide PNGs: a named football invitation and a
named gift pass with a high-contrast QR, short pass number, privacy instruction,
and sample watermark for demo records. No external club marks are copied.

Share text calls the QR private and instructs the family to bring it to the gift
table. The generated image is not live status; the server review is authoritative.
Final artwork/copy and real WhatsApp behavior remain production approval gates.
