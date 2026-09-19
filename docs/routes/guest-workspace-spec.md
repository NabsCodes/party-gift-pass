# Guest workspace spec

`/staff` is presented as the Admin dashboard. It lists up to 5,000 records and
supports guest/pass search, status counts and filters, a guest/pass/status
table with 10/25/50-row pagination, detail selection, pass-link sharing,
optional image download, manual sent
marking, and eligible deletion. On narrow screens the status filter chips
scroll horizontally inside the list chrome so they never widen the page;
**Select page** stays pinned beside them.

Batch creation includes a client UUID and unique batch index for retry safety.
The default mode creates 1–250 labels such as `Guest 001` without names. The
Admin list shows those as **Pass 001** with a numeric mark, while named
classmates keep their real name. Search still matches the stored `Guest NNN`
label and pass number. The create form uses Zod via React Hook Form; 1,000 is
rejected. Admins may instead paste one name per line; duplicate names are
allowed. Every record also receives a deterministic batch-scoped human pass
number independent of the secret QR token. Shared and redeemed records are retained so a sent QR never turns into a dead
link. Only unshared, unused passes may be removed; explicitly marked demo
records may also be removed. Deleting samples does not reseed them. Removal asks
for a confirm dialog with the guest and ticket number, not a browser `confirm()`
or an in-panel swap.

Create, delete, and copy outcomes appear as overlay toasts at the bottom of the
viewport so they never cover the guest-detail close control. Validation errors
stay in the form.

The primary share action sends the public `/pass/[token]` link. **Share pass**
uses the phone share sheet when available and WhatsApp on a computer; copy is
always available. Invitation and pass images are optional. `sharedAt` is
bookkeeping only; the system makes no WhatsApp delivery claim.

## Bulk pass handling

Staff can select individual rows, a visible page, or every current search/filter
result up to 200 passes. Selection persists across pagination. The sticky bulk
bar keeps **Share selected** as its primary action; ZIP export and confirmed
shared-status updates live under **More actions**. Collected passes are excluded
from all bulk work.

The share queue prepares one private link at a time, shows the exact message
with a wrapping private URL, and never changes `sharedAt` when a share sheet
closes. Staff uses **Mark shared & next** only after sending. The queue is
browser-local and intentionally does not create a database status.

Bulk image export creates one store-only ZIP containing invitation and pass PNGs.
Exports above 50 require a laptop warning. Individual failures do not cancel the
archive; `EXPORT-ISSUES.txt` lists only the affected ticket numbers.
