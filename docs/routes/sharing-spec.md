# Invitation and pass sharing spec

The authenticated pass endpoint re-derives the URL token from the random ticket
UUID and stable server-only QR key. It returns the token only if hashing it
matches the persisted hash. A mismatch is a recovery error, never a silent QR
replacement.

Staff share a public `/pass/[token]` link. Admin can open **Preview guest pass**
in a new tab to inspect that exact family-facing page; the dashboard does not
embed another scannable QR. The public page reveals no child name or pass number.
It uses the same Brand header and **Built by Vextra** footer as the gift desk
so the company credit stays visible on the family-facing surface. The Brand mark
on that page is not a link into Admin.
Invitation and gift-pass PNGs remain optional downloads. Named guests print
the child’s name on the invitation and gift-pass images. Numbered `Guest NNN`
records do not: those images say the card admits one and use the pass number
as the identity. Share text follows the same rule. The public page still never
shows a child name or pass number. Both images keep the event essentials, a
large high-contrast QR on the gift pass only, a privacy instruction, and a
sample watermark for demo records. No external club marks are copied.

On a phone, **Share pass** opens the system share sheet so staff can pick
WhatsApp, Messages, Mail, or copy without a custom dropdown. On a computer it
opens WhatsApp. Copy stays as a separate control. Do not add SMS/email buttons
or a share menu.

Share text calls the QR private and instructs the family to show it at the gift
table. The generated image is not live status; the server review is authoritative.
Final artwork/copy and real WhatsApp behavior remain production approval gates.

Bulk sharing is a guided queue, not automated WhatsApp delivery. It prepares the
private pass only for the family currently on screen, then opens one native share
sheet or one prefilled WhatsApp message at a time. Staff must explicitly record
a pass as shared after sending. A closing or cancelled share sheet is not
delivery proof.
