# Staff login spec

`/staff/login` accepts one shared passphrase and issues a signed, HTTP-only,
same-site 12-hour cookie. The exact configured origin is required, malformed or
oversized bodies are rejected, and a small database-backed 15-minute attempt
window limits guessing. Errors do not reveal configuration/provider detail.

An allowed `next` value is `/staff` or a correctly shaped redemption path;
everything else becomes `/staff`. Sign-out deletes the cookie. Live cookies are
secure and live mode requires HTTPS. Demo credentials exist only with the
localhost-only `PARTY_DEMO=1` mode.

Acceptance: protected routes redirect to login; correct login returns to the
safe target; wrong credentials remain denied; external redirect values fail
closed; sign-out removes access; expired/tampered cookies are rejected.
