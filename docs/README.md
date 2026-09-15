# Documentation Index

This folder is the lightweight source of truth for Party Gift Pass. The goal is
to let a developer or agent resume work without relying on chat history while
keeping the system small enough for a one-day MVP.

## Reading Order

1. `../AGENTS.md`
2. `roadmap.md`
3. `architecture.md`
4. `wireframe.md`
5. `design-system.md`
6. `layout-system.md`
7. `workflow.md`
8. the relevant future route spec, once one exists
9. the latest entries in `implementation-log.md`

`CLAUDE.md` is a concise compatibility entry point for Claude-style agents.
The root `README.md` owns setup and command reference.

## Documents

| Document                | Owns                                                               |
| ----------------------- | ------------------------------------------------------------------ |
| `roadmap.md`            | Current objective, sequence, gates, and deferred work              |
| `architecture.md`       | System boundaries, data model, security, and future routes         |
| `wireframe.md`          | Working screen inventory, user flow, states, and open decisions    |
| `design-system.md`      | Visual language, tokens, components, states, and accessibility     |
| `layout-system.md`      | Page shells, widths, responsive behavior, and print posture        |
| `workflow.md`           | How to inspect, specify, implement, verify, document, and hand off |
| `implementation-log.md` | Append-only history of meaningful completed work                   |
| `handoff-template.md`   | A short continuation template for unfinished work                  |

## Documentation Rules

- Keep one canonical document per concern; link instead of duplicating.
- Code is the source of truth for implemented behavior. Docs are the source of
  truth for approved intent and acceptance criteria.
- Mark exploratory wireframes and proposals clearly. Do not present them as
  implemented behavior.
- Add route specs under `docs/routes/` only after the matching flow is approved.
- Update durable decisions in their owning document, not in every document.
- Keep `implementation-log.md` chronological and append-only.
- Record only verification that was actually performed. Separate local checks
  from provider and deployed-environment proof.
