# Working Wireframe v1

This document records the proposed end-to-end MVP flow shown in the interactive
wireframe. It is a planning input, not proof that these routes exist.

## Recommended One-Day Boundary

- One shared staff credential and signed staff session.
- Native phone camera scans the printed QR; no in-app camera scanner.
- Ticket batches are created by authenticated staff.
- Raw QR tokens exist only in the generation response and immediate print view.
- Staff explicitly selects **Confirm gift collected** after reviewing a ticket.
- No individual accounts, roles, analytics, CSV workflow, offline mode, or
  editable redemption history.

## Screen Inventory

| Screen/state      | Purpose                                            | Primary action         |
| ----------------- | -------------------------------------------------- | ---------------------- |
| Staff login       | Start or resume an authorized staff session        | Sign in                |
| Staff tickets     | See ticket status and start a new batch            | Create tickets         |
| Create batch      | Enter quantity and optional labels                 | Generate tickets       |
| Print batch       | Print newly generated QR tickets immediately       | Print tickets          |
| Redeem review     | Verify ticket identity and current state           | Confirm gift collected |
| Redeemed          | Confirm the atomic update succeeded                | Scan next ticket       |
| Already redeemed  | Prevent a second collection and show known time    | Back to staff          |
| Invalid ticket    | Handle an unknown or malformed token safely        | Back to staff          |
| Temporary failure | Keep the ticket unconfirmed and allow a safe retry | Try again              |

## End-to-End Flow

1. Staff signs in and opens the ticket workspace.
2. Staff starts a batch, chooses a quantity, and may add child/display labels.
3. The server creates ticket numbers and strong random tokens, stores only token
   hashes, and returns raw tokens once to the creation response.
4. The print view renders QR URLs and warns that the batch must be printed now.
5. At the event, a phone's native camera opens `/redeem/[token]`.
6. If the session is absent, login preserves and resumes that exact URL.
7. The review screen resolves the token without changing ticket state.
8. Staff taps **Confirm gift collected**.
9. The server conditionally updates only a matching `unused` ticket, setting
   `status = redeemed` and `redeemed_at` in the same statement.
10. A returned row produces the success state. No returned row triggers a safe
    follow-up lookup or generic result that distinguishes already used from
    invalid only where policy allows.

## Interaction and Failure Rules

- Loading a QR URL is read-only.
- The confirmation control disables while the request is pending.
- Refreshing a success screen must not repeat the mutation automatically.
- A network or server error does not claim success; staff can retry safely.
- An already-redeemed result must never offer another confirm action.
- Invalid tokens reveal no internal ID, hash, database error, or child label.
- Browser history must not expose raw tokens through analytics or application
  logs. Hosting-access-log policy requires review before launch.

## Decisions to Approve Before Route Specs

- Shared staff passphrase versus a lightweight email-based provider.
- Session duration and sign-out behavior.
- Ticket-number format and maximum batch size.
- Whether child/display labels are entered one per ticket or left blank for
  handwriting after print.
- Whether the print view allows one same-session reprint before its in-memory
  batch is discarded.
- Whether an already-used screen may show the redemption time.
- Exact event name, short instruction, and physical ticket size.

After these decisions, create specs in this order:

1. `docs/routes/staff-login-spec.md`
2. `docs/routes/ticket-generation-spec.md`
3. `docs/routes/print-spec.md`
4. `docs/routes/redemption-spec.md`
5. `docs/routes/event-readiness-spec.md`
