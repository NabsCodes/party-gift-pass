# SEO and social metadata

Party Gift Pass is a private staff/event tool, so the root metadata is
deliberately `noindex, nofollow`. This prevents a QR route, staff workspace, or
event details from becoming a search result. It is not a substitute for access
control; routes enforce signed staff sessions separately. `/pass/[token]` is a
public QR page and still `noindex`; it must not expose a child name.

`lib/seo.ts` owns the event identity, social copy, and asset paths. `lib/metadata.ts`
owns the Next.js metadata factory and viewport. `app/layout.tsx` exports the
root metadata. Route-specific metadata can use the same helpers when public
pages are introduced.

Social assets use the conventions from the reference projects:

- `app/opengraph-image.png` — 2400×1260
- `app/twitter-image.png` — 2400×1200, `summary_large_image`
- `app/icon.svg` — primary favicon
- `app/icon.png` and `app/apple-icon.png` — 512×512 fallbacks

The cards use the generated matchday football artwork with a warm paper field,
red jersey, pitch green, and restrained geometry. They contain no copied club
crest or third-party branding. Final WhatsApp/X preview rendering and cache
refresh remain live-device/deployment checks.
