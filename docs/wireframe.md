# Approved MVP flow and wireframe

## Scope

One event, about 200 children, one shared staff credential. Admins generate
numbered guests when names are unknown or paste names when available, send two
images through the phone share sheet, and confirm one gift at the table. No
parent account, RSVP, in-app camera, role system, analytics, offline mode, or
editable redemption history.

## 1. Staff login

```text
MATCHDAY STORY                     STAFF ENTRY
Big day. Little gifts.             Welcome to the gift club.
Happy kids.                        [ Staff passphrase            ]
                                    [ Enter the gift club       ->]
```

On phones the story panel is hidden. Staff see a centered logo, heading, and
passphrase form. Desktop keeps the red matchday story beside that same form.

Wrong credentials stay on the page with a plain error. A scanned pass preserves
its exact safe return path. Sign-out clears the cookie.

## 2. Guest workspace

```text
AADIL'S MATCHDAY / ADMIN DASHBOARD         [ + CREATE PASSES ]
EVERY GUEST. ONE GOOD SURPRISE.
----------------------------------------------------------------
  200 guests | 180 sent | 74 collected | 126 still to collect
----------------------------------------------------------------
ADMIN LIST                          PERSONAL PASS
[ Search guest or pass ]            10
Guest              Pass           Status
0  Guest 001       GP-...-001     Not shared  >
A  Adil Lawal      GP-...-010     Collected   >
Showing 1–10 of 200 · Rows 10 · Page 1 of 20   [<] [>]
                                    GUEST 001
                                    [ Share pass ]
                                    [ Copy pass link ]
                                    Preview guest pass ↗
                                    Download invitation + pass images
                                    Delete guest → confirm dialog
```

Create Passes defaults to a quantity from 1–250 and labels records Guest 001,
Guest 002, and so on. Names are optional through a second mode. Search matches
label/name or ticket number. All, Not shared, Shared, and Collected filters plus
compact table pagination (10/25/50 rows) keep the list manageable on phones
and desktop. Narrow screens hide the pass column and turn the detail pane into
a full-screen sheet.

The primary share action is the public pass link. On a phone, **Share pass**
opens the system share sheet (WhatsApp, Messages, Mail, copy). On a computer it
opens WhatsApp. Copy remains available. Invitation and QR images are optional.
Cancelling or copying does not mark shared. “Pass shared” is bookkeeping,
not delivery proof.

## 3. Public gift pass

```text
AADIL’S MATCHDAY                         GIFT PASS
A LITTLE THANK-YOU
BIG SMILES.
ONE SPECIAL GIFT.
[ one-shot kickoff line; no tap or loop ]
[ QR ]  Your gift is waiting at the gift table.
        Show this code to a staff member.
Saturday, 26 September 2026    KEEP YOUR PASS PRIVATE
```

This page never shows a child name or pass number. The saved PNG may name the
child because staff generated it; the live link must not.

## 4. Staff scan review

```text
                 [ gift icon ]
         A GIFT WITH THEIR NAME ON IT
              HERE FOR THE GOOD STUFF.

                       GUEST
                    ADIL LAWAL
                    DEMO-001
                 Ready to collect

           [ CONFIRM GIFT COLLECTED ]
```

Scanning is read-only. The button disables while pending. Staff hands over
nothing until the green receipt appears.

## 5. Final and edge states

- **Confirmed / green:** names the child, pass number, and Lagos timestamp;
  staff may hand over one gift.
- **Already collected / charcoal:** shows known collection time and explicitly
  says not to hand out another gift.
- **Invalid:** reveals no child or database detail and records nothing.
- **Unavailable:** tells staff to reconnect and hold the gift.
- **Uncertain response:** retries the same attempt id to recover the real result.
- **Expired session:** returns through login to the same pass.
- **Forwarded QR:** system cannot identify the presenter; staff verifies the
  family/child. First successful confirmation wins.
- **Two staff confirm together:** the conditional database update allows one
  success only; the other receives already collected.
- **Deleted sample:** stays deleted because demo seed completion is recorded.
- **Key changed/lost:** existing pass cannot be regenerated; deliberate reissue
  is required.

## 6. Event-day step flow

1. Organiser signs in and generates the required number of passes. Use names
   only where the final child list is known.
2. For each child, open the detail pane and tap **Share pass** (or copy the
   link). Download the images only if the family needs them. Mark sent only
   after the link is actually sent.
3. At the gift table, staff signs in once on each approved phone.
4. Camera scans the QR; staff checks name/status and confirms.
5. Give one gift only on green. Used/invalid/offline/uncertain goes to the
   organiser, with the gift held until resolved.
6. Keep `/staff` available for manual name/ticket lookup if a camera struggles.
