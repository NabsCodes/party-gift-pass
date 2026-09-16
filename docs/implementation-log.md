# Implementation Log

This file is an append-only record of meaningful completed work. Keep entries
short, factual, and explicit about verification.

## 2026-09-15 — Project foundation

- Changed: initialized the single-package Next.js project; added the requested
  development tooling, Neon/Drizzle foundation, one-time ticket schema, initial
  SQL migration, safe environment example, placeholder page, and architecture
  guidance.
- Verified: dependency installation, formatting, linting, strict type checking,
  Vitest, migration generation, production build, Git branch, and folder-tree
  audits were completed during foundation setup.
- Follow-up: no migration was applied and no provider or deployment was created;
  product routes and workflows remain unimplemented.

## 2026-09-15 — Documentation system and working wireframe

- Changed: established canonical roadmap, workflow, design, layout, wireframe,
  handoff, Claude, and documentation-index guidance; recorded a deliberately
  flatter visual direction and the proposed one-day MVP flow.
- Verified: repository formatting, local link/path and consistency reviews,
  `git diff --check`, ESLint, strict type checking, four Vitest tests, and a
  production build; the interactive staff, print, review, and final-state
  wireframes were inspected in the browser at the available desktop viewport.
- Follow-up: review the wireframe decisions with the user, then write and
  implement the staff-login spec as the first product slice.

## 2026-09-16 — Local guest sharing and one-time collection MVP

- Changed: implemented signed staff access, localhost-only PGlite demo mode,
  five removable sample children, pasted-name batch creation, guest search and
  status workspace, personalised invitation and QR-pass PNGs, native sharing
  with download fallback, sent bookkeeping, protected scan review, atomic
  confirmation with retry recovery, edge-state screens, security headers, and
  focused route/operator documentation.
- Database: added share/demo/batch/retry fields plus app state and login-window
  tables; generated `drizzle/0001_chief_lightspeed.sql`. No migration was
  applied to an external database.
- Verified: `pnpm install`; `pnpm format`; `pnpm format:check`; ESLint; strict
  TypeScript; 9 Vitest tests; Drizzle generation; 2 Chrome Playwright tests
  covering login, five samples, first collection, repeat-scan blocking, and a
  390px workspace; manual browser inspection of login/workspace; and a final
  successful Next.js production build. Initial checks exposed and then fixed a
  React lint issue, a Playwright browser-matrix issue, and build-time
  prerendering of configuration-dependent routes.
- External gate: Neon, live migration, hosting, final artwork/copy, real
  WhatsApp sharing, live-device QR/network rehearsal, and production secrets
  remain deliberately unperformed.

## 2026-09-16 — Social metadata and app identity

- Changed: added central `lib/seo.ts` and `lib/metadata.ts` helpers, canonical
  no-index staff metadata, Open Graph/Twitter card declarations, viewport/theme
  metadata, a matchday favicon, and generated football-party social artwork.
  The cards use 2400×1260 (OG) and 2400×1200 (Twitter) PNGs.
- Changed: removed provider-specific analytics/check behavior from the app
  shell; the remaining `.vercel` ignore entry is only a local safety ignore.
- Verified: generated assets have the expected dimensions; metadata is wired
  through `app/layout.tsx`; formatting, ESLint, strict TypeScript, and the
  production build pass. Reference inspection used only public metadata/icon
  conventions from iProduce Africa and Vextra; no secrets or project content
  were copied.
- External gate: social preview rendering and cache refresh on WhatsApp/X,
  plus final event-domain choice, remain deployment checks.

## 2026-09-16 — Numbered guests and mobile Admin scaling

- Changed: renamed the management surface to Admin in visible UI while retaining
  the stable `/staff` routes; made numbered passes the default so guest names
  are optional; added deterministic batch-scoped pass numbers, named-mode
  fallback, All/Unsent/Sent/Collected filters, visible mobile statuses, and
  progressive 40-row loading.
- Changed: allowed non-demo production configuration on loopback HTTP for local
  Neon testing while keeping deployed live mode HTTPS-only. Browser tests now
  use an isolated Next.js output directory so they do not interrupt an active
  local server.
- Verified: formatting, ESLint, strict TypeScript, 11 Vitest tests, and 3 Chrome
  Playwright tests covering atomic redemption, 390px mobile use, and creation
  and search of unnamed numbered passes.
- External gate: real Neon migration, production hosting, actual WhatsApp share,
  and event-phone/network rehearsal remain required.

## 2026-09-16 — Presentation split after Vextra ownership

- Changed: aligned the staff UI with Vextra’s shallow ownership model. Pages
  stay Server Component entry points. Presentation moved into `components/`
  route areas (`staff/`, `redeem/`, `login/`, `layout/`). Client lifecycles
  moved into `hooks/`. Guest DTO, status, and filter helpers moved into
  client-safe `lib/guest.ts` so `lib/tickets.ts` remains server-only.
- Changed: no empty placeholder folders were added. The tree had no `.gitkeep`
  files to remove.
- Verified: `pnpm format`; `pnpm format:check`; ESLint; strict TypeScript;
  14 Vitest tests including guest filter/status helpers; 3 Chrome Playwright
  tests for login, atomic collection, 390px list/detail, and numbered create;
  browser inspection of login, workspace, composer, guest detail, and
  read-only scan review; and a successful production build.
- External gate: Neon, live hosting, WhatsApp sharing, and event-phone
  rehearsal remain unperformed.

## 2026-09-16 — Compact mobile admin intro

- Changed: reduced the `/staff` intro and score-strip height below 800px so
  phones show the counts and guest list without scrolling past a large hero.
  Desktop intro sizing is unchanged.
- Verified: CSS media queries at 390px and 544px; intro height dropped from
  about 274px to 170–190px; browser check showed the Create passes control,
  score widgets, and guest rows together in the first phone viewport.

## 2026-09-16 — Shared staff page measure

- Changed: introduced `--page-max` (70rem) and `--gutter` so the staff header,
  intro, list, detail, and footer share one horizontal measure. The score
  strip stays end-to-end on that column, with first/last cell copy inset to
  the same gutter.
- Verified: browser inspection at 390px and desktop; header, intro, list, and
  widget copy left edges aligned; score widgets still span the column.

## 2026-09-16 — Full-bleed staff canvas

- Changed: removed the 70rem staff `max-width`. The workspace now uses the
  full canvas with Vextra’s gutter steps (`1.5rem` / `3rem` / `4rem`). The
  score strip is full-bleed so widgets touch the page edges; header/list copy
  still shares that gutter.

## 2026-09-16 — Mobile login hides the story panel

- Changed: below 800px `/staff/login` hides the red matchday copy and shows
  the logo plus passphrase form first. Desktop still uses the split story and
  staff-entry layout.

## 2026-09-16 — Tailwind UI primitives and overlay toasts

- Changed: staff/login/redeem screens now use Tailwind utilities. `globals.css`
  keeps tokens plus `font-display` and `px-gutter`. Added matchday Button,
  Input, Label, Textarea, and Sonner primitives. Login is a centered 24rem
  form; phones hide the red story panel. The full-width notice banner is
  gone so create/delete messages no longer cover the guest-detail close
  control. Zod stays at HTTP edges; React Hook Form was not added.
- Verified: format, format-check, lint, typecheck, 14 unit tests, 3 Playwright
  flows (login, atomic collect, 390px list/detail, numbered create toast),
  production build, and browser QA of centered login plus overlay toast.

## 2026-09-16 — Paginated list, pass links, and form validation

- Changed: guest list is 25-row pagination instead of “show more”. Create
  batches stay capped at 250 and reject 1,000 in Zod. Sharing is WhatsApp or
  copy of `/pass/[token]`; that page shows a QR and no child name. Images are
  optional. Login and create forms use React Hook Form + Zod (`noValidate`).
  Toasts sit bottom-center without a floating close control. The admin hero no
  longer overlaps Create passes. Delete confirms in the detail pane.
- Verified: `pnpm format`, format-check, lint, typecheck, 15 unit tests, 3
  Playwright flows (public QR page has no child name, 25-row pagination, Zod
  create form), production build, and browser QA of share actions, composer
  cap, and in-form name errors.

## 2026-09-16 — Compact table pagination

- Changed: disabled buttons use `not-allowed`; wait cursor only when
  `aria-busy`. The guest list is a Guest/Pass/Status table with compact first/
  prev/next/last controls, a 10/25/50 row select, and “Showing X–Y of Z”.
  Default page size is 10. Phones keep name + number stacked and hide the Pass
  column instead of scrolling sideways.
- Verified: `pnpm format`, format-check, lint, typecheck, 15 unit tests, 3
  Playwright flows (row selection, 390px list/detail, 10-row default so 45
  extra passes show page 1 of 5), production build, and browser QA of compact
  first/prev/next/last controls, 10/25/50 rows, and `not-allowed` on disabled
  pager buttons (wait cursor only when a control is `aria-busy`).

## 2026-09-16 — Pass page matches artwork; native share

- Changed: `/pass/[token]` now follows the saved gift-pass layout (red bar,
  “Big smiles / one special gift”, QR beside the table instruction, date and
  privacy line) and still never shows a child name or pass number. Staff
  **Share pass** uses the phone share sheet when available and WhatsApp on a
  computer; copy stays separate. No share dropdown or SMS/email grid.
- Verified: `pnpm format`, format-check, lint, typecheck, 15 unit tests, 3
  Playwright flows (public pass has no child name, **Share pass** on the
  detail pane), production build, and browser QA of the red gift-pass header
  plus Share pass / Copy pass link.

## 2026-09-16 — Matchday spinner instead of the browser loader

- Changed: added a shadcn Spinner. Busy buttons show that spinner and keep
  `not-allowed` when disabled; the wait cursor is gone. `/pass`, `/redeem`, and
  `/staff` use `loading.tsx` so navigation streams a branded fallback instead of
  a blank tab. The guest list shows the same spinner until the first fetch
  returns, so “No passes yet” no longer flashes.
- Verified: `pnpm format`, format-check, lint, typecheck, 15 unit tests, 3
  Playwright flows, production build, and browser QA of the branded spinner on
  route loading and busy actions.

## 2026-09-16 — Per-action spinner and delete dialog

- Changed: Share, copy, download, delete, and create each own their busy
  state, so copying a link no longer spins Share pass. Delete uses a confirm
  dialog (Keep guest / Delete guest), not an in-panel swap or `window.confirm`.
- Verified: `pnpm format`, format-check, lint, typecheck, unit tests,
  Playwright (copy-only spinner and delete confirm dialog), production build,
  and browser QA of isolated copy busy state plus Keep/Delete guest overlay.

## 2026-09-16 — Layout-matching loading skeletons

- Changed: added a shared `Skeleton` primitive with reduced-motion-safe pulse;
  route-specific loading surfaces now preserve the Admin, login, public pass,
  and redemption layouts while data streams in. The Admin list uses a table-
  shaped skeleton instead of a centered spinner; button actions keep the
  existing per-action Spinner and `aria-busy` states.
- Verified: format, format-check, lint, typecheck, 15 unit tests, 3 Playwright
  flows, and an isolated production build. The browser flow still passes the
  staff login, atomic collection, mobile Admin list, and numbered batch cases.

## 2026-09-16 — Safer batch creation and honest share status

- Changed: numbered batches now start at 10 and require a second confirmation
  at 100 or more. A completed native phone share records the pass as shared;
  copied links and desktop WhatsApp remain manual because delivery is unknown.
- Changed: staff-facing labels now say shared instead of sent, and the pass
  detail explains that possession of the private link is the guest credential.
- Verified: format and format-check, ESLint, strict TypeScript, 15 unit tests,
  4 Playwright flows including large-batch confirmation and completed native
  share bookkeeping, and a successful production build.
