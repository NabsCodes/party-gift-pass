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
