# Guest workspace spec

`/staff` lists up to 5,000 records and supports name/pass search, status counts,
one-child-per-line creation (1–250), detail selection, image share/download,
manual sent marking, scan-review opening, and eligible deletion.

Batch creation includes a client UUID and unique batch index for retry safety.
Duplicate names are allowed. Ticket numbers are random display labels. Live
redeemed records cannot be renamed or deleted; explicitly marked demo records
may be deleted as requested. Deleting samples does not reseed them.

Native share sends two PNG files where supported. Cancellation records nothing.
Fallback downloads both files and asks staff to attach them manually. `sharedAt`
is bookkeeping only; the system makes no WhatsApp delivery claim.
