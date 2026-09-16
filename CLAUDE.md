# Party Gift Pass Claude Guide

Read `AGENTS.md`, then `docs/README.md`, the current roadmap goal, the relevant
route spec, and the latest implementation-log entry. Inspect the worktree before
editing and preserve unrelated changes.

The product is a deliberately small staff tool: personalised invitation + QR
pass sharing, followed by staff review and explicit one-time gift collection.
Scanning never redeems. Keep hash-only storage, signed staff sessions, origin
checks, atomic redemption, and same-attempt retry behavior intact.

Use the flat matchday design language rather than generic SaaS cards. Do not
copy club branding. Keep docs and code aligned, and do not commit, deploy,
provision Neon, or run a live migration without explicit approval.
