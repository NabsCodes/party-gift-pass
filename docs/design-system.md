# Design system

## Matchday editorial direction

The product should feel like a well-designed children’s football event, not a
generic AI dashboard and not copied club merchandise. Character comes from
confident condensed type, warm paper, red matchday energy, pitch green, large
player numbers, direct copy, and disciplined rules.

## Foundations

| Role        | Value     | Use                                              |
| ----------- | --------- | ------------------------------------------------ |
| Match red   | `#df1f26` | Primary actions, key display line, active energy |
| Pitch green | `#126044` | Remaining count and confirmed receipt            |
| Warm cream  | `#f5f0e5` | Main page plane                                  |
| Paper       | `#fffdf8` | Table/detail planes and forms                    |
| Charcoal    | `#171716` | Text, dividers, already-used state               |
| Sun yellow  | `#f4c431` | Tiny highlight or caution rule only              |

Oswald is the condensed display face; Manrope owns body, controls, labels, and
numbers requiring fast reading. Headlines may be uppercase and tight; body copy
must remain sentence case and comfortable. State is always text plus color.

## Layout and component rules

- Use open page planes, thin rules, and color blocks for hierarchy.
- Do not wrap every section in a rounded card or nest cards.
- Static content uses no shadow. The name composer may use the dark backdrop of
  a temporary modal; it still uses a square paper plane.
- Buttons use a restrained 6px radius. Full pills are status labels only.
- The guest list is a table of divided rows (Guest, Pass, Status). Pagination
  is compact icon controls, not large Previous/Next actions. Desktop uses a
  persistent detail plane and narrow screens use a full-screen detail sheet.
- Large decorative “10” numerals and simple pitch geometry are allowed. Avoid
  confetti wallpaper, gradients, glowing icons, fake 3D, and club crests/logos.
- The public pass may play one short, contained kickoff entrance above the QR.
  It never loops, never needs a tap, never crosses the QR, and is suppressed by
  the reduced-motion preference. Staff and redemption surfaces stay still.
- Share copy must say “invitation + pass”; collection copy must use the exact
  phrase **Confirm gift collected**.
- Loading uses layout-matching skeleton blocks for route and list fetches, with
  a short screen-reader caption. Use the existing Spinner for button actions;
  do not use generic full-screen overlay loaders or a browser wait cursor.

## State language

- `Not shared`: neutral stone.
- `Pass shared`: amber; bookkeeping only, never guaranteed WhatsApp delivery.
- `Ready to collect`: neutral.
- `Collection confirmed`: pitch green, with child, pass, and time.
- `Already collected`: charcoal and a hard “do not hand out another gift.”
- `Invalid`, `unavailable`, and `uncertain`: muted neutral, not celebratory red.

## Accessibility

Design and test from 390px upward. Primary touch targets are at least 44px,
focus remains visible, DOM order is logical, asynchronous results use live
regions, and reduced-motion preferences suppress transitions. QR artwork keeps
high contrast and a proper quiet zone. Never encode meaning in color alone.
