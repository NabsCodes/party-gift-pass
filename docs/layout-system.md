# Layout System

## Principles

- Build mobile-first from 390px, then expand to desktop.
- Use open page planes and separators before introducing containers.
- Keep operational content near the top; party staff should not hunt for the
  primary action.
- Avoid nested sidebars, dense dashboard widgets, and horizontal scrolling.

## Shared Shell

- Mobile: compact top bar, single-column content, full-width primary action
  where appropriate.
- Desktop: slim top header across the full canvas. A small left navigation
  rail is acceptable only when staff areas grow beyond two primary
  destinations.
- Staff workspace follows Vextra’s width policy: no site-wide max-width
  container. Header, intro, list, detail, and footer share one gutter
  (`1.5rem` / `3rem` / `4rem`, matching `px-6 md:px-12 lg:px-16`). The score
  strip is full-bleed so its cells touch the page edges; first and last cell
  copy still insets to that gutter. Shared footers stack the event note above
  **Built by Vextra** so narrow screens never cram them into one clipped line.
  When passes are selected, the page gains bottom padding so the sticky bulk
  bar does not cover the footer.
- Login uses a centered 24rem form column. Redemption stays a focused
  ~38rem decision surface.

## Page Postures

### `/staff/login`

A focused passphrase form. Phones use a centered, evenly spaced staff entry
with the logo. Desktop keeps the red matchday story beside that same form.

### `/staff`

Page heading and one main action, followed by batch/ticket information in a
plain divided list or table. Summary counts may be inline text; they do not need
metric cards. On phones, keep the intro compact so the score strip and guest
list are visible without scrolling past a large hero. The intro heading and
Create action stack until extra-wide desktops so the button never overlaps the
title. The guest list is a table with compact pagination (showing range, rows
per page, first/prev/next/last). Do not use a nested infinite-scroll pane.

### `/print`

Screen controls appear in a narrow non-printing toolbar. Tickets use a regular
print grid below. Print CSS removes navigation, controls, backgrounds, and
nonessential decoration.

### `/pass/[token]`

A public, no-index QR surface that uses the shared staff chrome: Brand header
with the 10 badge (not linked into the gift desk), editorial headline, QR
beside the table instruction, event date, privacy line, and a stacked footer
with **Built by Vextra**. It never shows a child name or pass number. Invalid
tokens stay generic. `loading.tsx` keeps the same Brand header, footer, and a
QR-shaped layout skeleton; it never names the child.

### `/redeem/[token]`

A focused single-column decision surface. Before confirmation, show identity,
status, and the explicit action. After confirmation, replace the decision with
one dominant final state rather than stacking another result panel.
`loading.tsx` shows the gift-table chrome and a decision-shaped skeleton, with
no child name.

## Responsive and Print Rules

- At narrow widths, convert tables to labelled divided rows rather than
  shrinking text or forcing page-wide horizontal scroll.
- On desktop, keep the selected guest detail plane sticky while the Admin list
  scrolls. Its content may scroll independently when actions exceed the
  viewport; mobile keeps the detail plane as a full-screen sheet.
- Keep important status and ticket number visible without hover.
- Prevent QR codes and ticket instructions from splitting across printed pages.
- Use physical print dimensions and browser print preview; screen pixels alone
  are not a print acceptance test.
