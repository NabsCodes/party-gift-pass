# Operator runbook

## Before production

1. Provision one approved Neon database and apply the checked-in migrations.
2. Configure the exact HTTPS `APP_URL`, a strong staff passphrase, and two
   different stable 32+ character secrets for sessions and QR derivation.
3. Back up `QR_SECRET` in the approved secret manager. A changed key prevents
   existing pass images from being regenerated.
4. Confirm hosting logs, analytics, and error reporting do not retain raw QR
   paths. Do not add client analytics to redemption URLs.
5. Replace/approve the event copy, date, venue, dress code, and artwork.
6. Rehearse share, scan, confirm, repeat scan, invalid QR, logged-out scan, and
   weak-network behavior on the actual event phones.

## Preparing guests

1. Sign in at `/staff/login`.
2. Choose **Create passes**. Enter the required quantity for numbered guests, or
   switch to **Use names** and paste one child per line.
3. For numbered passes, use the displayed guest/pass number when sending and
   resolving questions. For named passes, check duplicate/similar names.
4. Open a child, choose **Share pass** or **Copy pass link**, and send that
   URL. On a phone, Share pass opens the system share sheet; on a computer it
   opens WhatsApp. Download the invitation and pass images only if needed.
5. A copied or cancelled share is not marked sent. Use **Mark as sent** only
   after the family actually received the link.

## Gift table

1. Sign approved staff phones in before guests arrive.
2. Open the phone camera and scan the child's gift pass.
3. Check the displayed name with the child/guardian.
4. Tap **Confirm gift collected** once.
5. Hand over one gift only after the green confirmation receipt.
6. Reopen the camera for the next child. `/staff` provides manual lookup by name
   or pass number if the camera cannot scan.

## Incident rules

- **Already collected:** do not issue another gift; ask the organiser.
- **Invalid:** hold the gift and locate the child in the staff list.
- **Unavailable/offline:** hold the gift until status can be checked.
- **Confirmation reply lost:** use **Check again**; it retries the same attempt
  and recovers the real outcome.
- **Wrong name / forwarded image:** do not confirm until organiser verification.
- **Session expired:** sign in; the scanned pass resumes automatically.
- **Phone lost:** sign out if accessible, change the staff passphrase in hosting,
  and restart approved staff sessions. Existing signed cookies remain a residual
  risk until their 12-hour expiry unless the session secret is deliberately
  rotated, which signs out everyone.
- **QR secret changed:** stop sharing regenerated passes and restore the backed-up
  key or deliberately reissue affected tickets.

## After the event

Export/retain data only under an agreed policy. Do not delete redeemed live
records casually. Remove local sample children through their detail actions;
they do not automatically reseed.
