# Documentation index

This folder is the source of truth for Party Gift Pass. It is deliberately
small enough to resume without chat history.

## Reading order

1. `../AGENTS.md`
2. `roadmap.md`
3. `architecture.md`
4. `wireframe.md`
5. the relevant file in `routes/`
6. `operator-runbook.md`
7. latest `implementation-log.md` entry

## Ownership

| Document                 | Owns                                               |
| ------------------------ | -------------------------------------------------- |
| `implementation-plan.md` | Approved MVP decisions and security rationale      |
| `architecture.md`        | Implemented system, data, trust boundaries, routes |
| `wireframe.md`           | End-to-end UI/logic flow and edge states           |
| `design-system.md`       | Matchday visual language and accessibility         |
| `layout-system.md`       | Responsive shell and layout details                |
| `routes/*.md`            | Per-route behavior and acceptance criteria         |
| `operator-runbook.md`    | Setup, rehearsal, event-day use, incidents         |
| `seo.md`                 | Private indexing policy, metadata, social assets   |
| `roadmap.md`             | Completed work, current gates, later scope         |
| `workflow.md`            | How to change and verify this repository           |
| `implementation-log.md`  | Append-only factual history                        |
| `handoff-template.md`    | Concise unfinished-work handoff                    |

Code is the source of truth for implemented behavior. Docs own approved intent
and acceptance criteria. Update one canonical document per concern, link rather
than duplicate, and record only validation actually performed. Provider/live
claims require current provider evidence, not a passing local build.
