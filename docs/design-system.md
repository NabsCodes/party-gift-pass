# Design System

## Direction

Party Gift Pass should feel cheerful, composed, and easy to operate under event
pressure. It is not a generic SaaS dashboard and not a toy interface. The party
character comes from a warm paper base, confident color, friendly typography,
and ticket-specific details.

The current initialization card is temporary. Its floating card, radial
background, large shadow, and scattered confetti are not the product pattern.

## Anti-Pattern Guardrails

- Do not place every section inside a rounded card.
- Do not nest cards or use a dashboard grid when a list, rule, or open page
  plane communicates the hierarchy.
- Do not use gradients, glass effects, glowing shadows, oversized icon tiles,
  gradient text, or decorative badges by default.
- Do not use confetti as page furniture. Reserve a tiny celebratory mark for a
  completed ticket batch or successful redemption.
- Do not make every control pill-shaped. Pills are for short statuses only.
- Do not use shadows for static hierarchy. Reserve a subtle shadow for a modal,
  menu, or other temporary layer when separation is otherwise unclear.

## Foundations

### Color roles

- **Paper:** warm cream for public and staff page backgrounds.
- **Ink:** near-black indigo for primary text and structure.
- **Coral:** primary action and party accent; never for long text.
- **Cobalt/sky:** navigation, focus, links, and secondary illustration marks.
- **Sunshine:** small highlight only, with dark text when used as a surface.
- **Green, amber, red:** reserved for redeemed, pending/caution, and invalid or
  failed states. Always pair color with text and an icon.

Every text/background pair must meet WCAG AA contrast. State colors must not be
repurposed decoratively.

### Typography

- Use a friendly rounded display face for the product name and selected
  celebratory headings only.
- Use a highly readable rounded sans for body copy, labels, tables, numbers, and
  controls.
- Ticket numbers use tabular figures and strong hierarchy.
- Keep weights restrained. Use size, spacing, and rules before adding heavier
  weight.

### Shape and depth

- Page and section structure: square edges or no visible container.
- Inputs and buttons: approximately 8px radius.
- Necessary bounded panels: 10–12px maximum radius.
- Status pills and truly circular controls may use a full radius.
- Static screens use no box shadow. Temporary overlays may use one quiet shadow.
- Use 1px rules, background changes, and spacing for grouping.

## Core UI Patterns

### Staff header

A slim persistent header owns the product name, current area, and session
actions. It should not become a large hero.

### Ticket list

Use a quiet table on desktop and divided rows on narrow screens. Show ticket
number and child/display label first, then state and created/redeemed time.
Avoid a separate card for every ticket.

### Forms

Use visible labels, concise help only where needed, large touch targets, and
inline validation next to the affected field. Keep one primary action per form.

### Redemption decision

The ticket identity and current state dominate. The confirm action must use the
exact intent “Confirm gift collected.” Scanning or loading the page never runs
the mutation. Destructive-looking red is not appropriate for a successful
collection action; use the primary action color, then a clear green completed
state.

### Print ticket

Print surfaces are white and ink-efficient. Prioritize the QR code, short ticket
number, optional child label, event instruction, and a small party mark. Avoid
background fills behind the QR code and keep a proper quiet zone.

## Accessibility and Motion

- Design from 390px upward and keep primary touch targets at least 44px.
- Preserve visible keyboard focus and logical document order.
- Never rely on color alone for ticket status.
- Use live announcements for asynchronous final states without repeatedly
  announcing progress.
- Motion is optional, brief, and functional. Honor reduced motion and avoid
  looping decoration.
