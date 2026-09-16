/**
 * User-facing party wording. Routes, cookies, and env keys stay on `staff`
 * internally; guests and helpers never need that jargon.
 */
export const partyCopy = {
  /** Signed-in helpers at the party (family, friends, older siblings). */
  desk: {
    name: "Gift desk",
    table: "Gift table",
    passphraseLabel: "Gift desk passphrase",
    passphraseRequired: "Enter the gift desk passphrase.",
    accessUnavailable:
      "Gift desk access is temporarily unavailable. Please try again.",
    signInLoading: "Preparing gift desk sign-in",
    brandHome: "Aadil’s Matchday gift desk home",
    dashboardEyebrow: "Aadil’s Matchday · Gift desk",
  },
  /** Person in charge when something needs a decision (host parent, organiser). */
  host: {
    ask: "Ask the party host",
    askToResend: "Ask the party host to send the pass again.",
    askToFindGuest: "ask the party host to find the guest",
    invalidScanHelp:
      "Check the QR or ask the party host to find the guest. No collection was recorded by this request.",
    askToResolve: "Ask the party host to resolve any disagreement.",
    askToCheckQrKey: "Ask the party host to check the QR key.",
  },
  guestPass: {
    showAtTable:
      "Show this code at the gift table. One pass. One gift. All yours.",
  },
  seo: {
    deskTitle: "Gift desk",
    deskDescription:
      "Private gift desk for sharing passes and checking collection status.",
    signInTitle: "Gift desk sign-in",
    signInDescription:
      "Private sign-in for family and friends helping at the party gift desk.",
  },
} as const;
