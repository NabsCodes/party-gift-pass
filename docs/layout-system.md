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
- Desktop: slim top header and a centered content column. A small left
  navigation rail is acceptable only when staff areas grow beyond two primary
  destinations.
- Default content measure: approximately 960–1120px for staff tables and
  560–680px for login, generation, and redemption decisions.
- Use consistent page gutters that begin near 20px on mobile and grow on wide
  screens.

## Page Postures

### `/staff/login`

A focused single-column form with a short explanation and no marketing hero.

### `/staff`

Page heading and one main action, followed by batch/ticket information in a
plain divided list or table. Summary counts may be inline text; they do not need
metric cards.

### `/print`

Screen controls appear in a narrow non-printing toolbar. Tickets use a regular
print grid below. Print CSS removes navigation, controls, backgrounds, and
nonessential decoration.

### `/redeem/[token]`

A focused single-column decision surface. Before confirmation, show identity,
status, and the explicit action. After confirmation, replace the decision with
one dominant final state rather than stacking another result panel.

## Responsive and Print Rules

- At narrow widths, convert tables to labelled divided rows rather than
  shrinking text or forcing page-wide horizontal scroll.
- Keep important status and ticket number visible without hover.
- Prevent QR codes and ticket instructions from splitting across printed pages.
- Use physical print dimensions and browser print preview; screen pixels alone
  are not a print acceptance test.
