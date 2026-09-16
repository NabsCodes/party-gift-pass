# Approved MVP flow and wireframe

## Scope

One event, about 200 children, one shared staff credential. Staff paste names,
send each child two personalised images through the phone share sheet, and
confirm one gift at the table. No parent account, RSVP, in-app camera, role
system, analytics, offline mode, or editable redemption history.

## 1. Staff login

```text
MATCHDAY STORY                     STAFF ENTRY
Big day. Little gifts.             Welcome to the gift club.
Happy kids.                        [ Staff passphrase            ]
                                    [ Enter the gift club       ->]
```

Wrong credentials stay on the page with a plain error. A scanned pass preserves
its exact safe return path. Sign-out clears the cookie.

## 2. Guest workspace

```text
AADIL'S MATCHDAY / GIFT DESK                  [ + ADD GUESTS ]
EVERY NAME. ONE GOOD SURPRISE.
----------------------------------------------------------------
  200 guests | 180 sent | 74 collected | 126 still to collect
----------------------------------------------------------------
TEAM SHEET                          PERSONAL PASS
[ Search name or pass ]             10
A  Adil Lawal      Not shared  >    ADIL LAWAL
Z  Zara Bello      Pass sent   >    DEMO-002
T  Tobi Okafor     Collected   >    [ Share invitation + pass ]
                                     [ Download both images ]
                                     Open staff scan review
```

Add Guests is a simple one-child-per-line modal, maximum 250 names. Duplicate
names are permitted and must be checked before sharing. Search matches name or
ticket number. Narrow screens turn the detail pane into a full-screen sheet.

The primary share action creates two real PNG files: a personalised football
invitation and a QR gift pass. Native file sharing is used where supported;
otherwise both files download for manual WhatsApp attachment. Cancelling share
does not mark sent. “Pass sent” is manual bookkeeping, not delivery proof.

## 3. Staff scan review

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

## 4. Final and edge states

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

## 5. Event-day step flow

1. Organiser signs in, pastes the final child list, and checks duplicates.
2. For each child, open the detail pane and share both images to the correct
   parent/guardian; mark sent only after completing the share.
3. At the gift table, staff signs in once on each approved phone.
4. Camera scans the QR; staff checks name/status and confirms.
5. Give one gift only on green. Used/invalid/offline/uncertain goes to the
   organiser, with the gift held until resolved.
6. Keep `/staff` available for manual name/ticket lookup if a camera struggles.
