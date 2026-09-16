# Guest workspace spec

`/staff` is presented as the Admin dashboard. It lists up to 5,000 records and
supports guest/pass search, status counts and filters, a guest/pass/status
table with 10/25/50-row pagination, detail selection, pass-link sharing,
optional image download, manual sent
marking, and eligible deletion.

Batch creation includes a client UUID and unique batch index for retry safety.
The default mode creates 1–250 labels such as `Guest 001` without names. The
create form uses Zod via React Hook Form; 1,000 is rejected. Admins may instead
paste one name per line; duplicate names are allowed. Every record also receives
a deterministic batch-scoped human pass number independent of the secret QR
token. Live redeemed records cannot be renamed or deleted; explicitly marked
demo records may be deleted as requested. Deleting samples does not reseed them.
Delete asks for an in-panel confirm, not a browser `confirm()`.

Create, delete, and copy outcomes appear as overlay toasts at the bottom of the
viewport so they never cover the guest-detail close control. Validation errors
stay in the form.

The primary share action sends the public `/pass/[token]` link. **Share pass**
uses the phone share sheet when available and WhatsApp on a computer; copy is
always available. Invitation and pass images are optional. `sharedAt` is
bookkeeping only; the system makes no WhatsApp delivery claim.
