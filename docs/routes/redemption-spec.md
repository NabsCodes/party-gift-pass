# Redemption spec

`/redeem/[token]` always requires staff authentication. Its initial load hashes
and reads the token but does not mutate. Unknown/malformed tokens show invalid
without child details. Database failure shows unavailable and tells staff to
hold the gift.

**Confirm gift collected** posts the 43-character token and a random attempt
UUID. One SQL update matches the hash only while unused, then sets redeemed,
redemption time, and attempt id together. A winner shows a green receipt. If no
row wins, matching the saved attempt id recovers that receipt; otherwise a known
ticket shows already collected. Unknown remains invalid.

The control disables while pending. The attempt id stays in session storage so
an uncertain response can be checked safely. Refresh never performs a mutation.
Two independent confirmations cannot both succeed. All result responses are
private/no-store and use no-referrer policy.
