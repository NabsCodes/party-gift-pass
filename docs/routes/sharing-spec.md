# Invitation and pass sharing spec

The authenticated pass endpoint re-derives the URL token from the random ticket
UUID and stable server-only QR key. It returns the token only if hashing it
matches the persisted hash. A mismatch is a recovery error, never a silent QR
replacement.

Staff share a public `/pass/[token]` link. That page matches the saved gift-pass
artwork (red bar, editorial headline, QR beside the table instruction) and
reveals no child name or pass number. Invitation and gift-pass PNGs remain
optional downloads. Share text names the child in the message, not on the
public page. The browser can still create two 1000px-wide PNGs: a named
football invitation and a named gift pass with a high-contrast QR, short pass
number, privacy instruction, and sample watermark for demo records. No external
club marks are copied.

On a phone, **Share pass** opens the system share sheet so staff can pick
WhatsApp, Messages, Mail, or copy without a custom dropdown. On a computer it
opens WhatsApp. Copy stays as a separate control. Do not add SMS/email buttons
or a share menu.

Share text calls the QR private and instructs the family to show it at the gift
table. The generated image is not live status; the server review is authoritative.
Final artwork/copy and real WhatsApp behavior remain production approval gates.
