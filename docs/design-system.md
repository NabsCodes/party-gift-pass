# Design system

## Block-party editorial direction

The product should feel like a well-designed children’s block party, not a
generic AI dashboard and not copied game merchandise. Character comes from
confident condensed type, birch paper, grass, dirt, stone, gold, a square
“10”, direct copy, and disciplined rules. Football is one quiet line, “Boots
optional.”

## Foundations

| Role       | Value     | Use                                            |
| ---------- | --------- | ---------------------------------------------- |
| Grass      | `#1f6b32` | Primary actions, key display line, pass banner |
| Deep green | `#0e4d32` | Remaining count and confirmed receipt          |
| Dirt       | `#8b5a2b` | Login story panel                              |
| Stone      | `#6e6e66` | Neutral status and the third pass block        |
| Birch      | `#f7f4ec` | Main page plane                                |
| Paper      | `#fffdf8` | Table/detail planes and forms                  |
| Charcoal   | `#1c1a17` | Text, dividers, already-used state             |
| Gold       | `#e3b23c` | Tiny highlight, caution rule, and pass shared  |

The primary CSS utility is still named `red`. On this branch its value is
grass, so existing actions follow the block party without a second palette.

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
- A square “10” and three plain squares (grass, dirt, stone) are allowed. Avoid
  confetti wallpaper, gradients, glowing icons, fake 3D, and game characters,
  logos, or copied block textures.
- The public pass may play one calm block drop above the QR: grass, then dirt,
  then stone, then a gentle QR and copy fade-in. It never loops, never needs a
  tap, never crosses the QR, and is suppressed by the reduced-motion preference.
  Gift desk, downloaded images, and redemption surfaces stay still.
- Share copy must say “invitation + pass”; collection copy must use the exact
  phrase **Confirm gift collected**.
- Loading uses layout-matching skeleton blocks for route and list fetches, with
  a short screen-reader caption. Use the existing Spinner for button actions;
  do not use generic full-screen overlay loaders or a browser wait cursor.

## State language

- `Not shared`: neutral stone.
- `Pass shared`: gold; bookkeeping only, never guaranteed WhatsApp delivery.
- `Ready to collect`: neutral.
- `Collection confirmed`: deep green, with child, pass, and time.
- `Already collected`: charcoal and a hard “do not hand out another gift.”
- `Invalid`, `unavailable`, and `uncertain`: muted neutral, not celebratory grass.

## Accessibility

Design and test from 390px upward. Primary touch targets are at least 44px,
focus remains visible, DOM order is logical, asynchronous results use live
regions, and reduced-motion preferences suppress transitions. QR artwork keeps
high contrast and a proper quiet zone. Never encode meaning in color alone.
