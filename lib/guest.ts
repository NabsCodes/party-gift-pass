export type Guest = {
  id: string;
  name: string;
  number: string;
  status: "unused" | "redeemed";
  createdAt: string;
  redeemedAt: string | null;
  sharedAt: string | null;
  isDemo: boolean;
};

export type PassPayload = {
  guest: Guest;
  token: string;
  url: string;
  passUrl: string;
};

export type ListFilter = "all" | "unshared" | "shared" | "collected";

export const LIST_FILTERS = [
  ["all", "All"],
  ["unshared", "Not shared"],
  ["shared", "Shared"],
  ["collected", "Collected"],
] as const satisfies ReadonlyArray<readonly [ListFilter, string]>;

export const GUEST_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;
export const MAX_BATCH_SIZE = 250;

export function normalizeGuestName(name: string) {
  return name.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-NG");
}

export function duplicateGuestNames(
  existingNames: string[],
  incomingNames: string[],
) {
  const existing = new Set(existingNames.map(normalizeGuestName));
  const seen = new Set<string>();
  return incomingNames.filter((name) => {
    const normalized = normalizeGuestName(name);
    if (existing.has(normalized) || seen.has(normalized)) return true;
    seen.add(normalized);
    return false;
  });
}

export function nextNumberedGuest(existingNames: string[]) {
  return (
    existingNames.reduce((highest, name) => {
      const match = /^Guest (\d+)$/.exec(name.trim());
      return match ? Math.max(highest, Number(match[1])) : highest;
    }, 0) + 1
  );
}

export function guestStatusLabel(guest: Guest) {
  if (guest.status === "redeemed") return "Collected";
  return guest.sharedAt ? "Pass shared" : "Not shared";
}

export function guestStatusClass(guest: Guest) {
  if (guest.status === "redeemed") return "redeemed";
  return guest.sharedAt ? "shared" : "unused";
}

export function filterGuests(
  guests: Guest[],
  query: string,
  filter: ListFilter,
) {
  const needle = query.trim().toLowerCase();
  return guests.filter((guest) => {
    const text = (guest.name + " " + guest.number).toLowerCase();
    if (needle && !text.includes(needle)) return false;
    if (filter === "unshared")
      return guest.status === "unused" && !guest.sharedAt;
    if (filter === "shared")
      return guest.status === "unused" && Boolean(guest.sharedAt);
    if (filter === "collected") return guest.status === "redeemed";
    return true;
  });
}

export function paginateGuests<T>(
  items: T[],
  page: number,
  pageSize = GUEST_PAGE_SIZE,
) {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(1, page), pageCount);
  const start = (current - 1) * pageSize;
  return {
    page: current,
    pageCount,
    pageSize,
    total,
    from: total === 0 ? 0 : start + 1,
    to: Math.min(start + pageSize, total),
    items: items.slice(start, start + pageSize),
  };
}

export function guestOverview(guests: Guest[]) {
  const collected = guests.filter(
    (guest) => guest.status === "redeemed",
  ).length;
  const sent = guests.filter((guest) => guest.sharedAt).length;
  return {
    total: guests.length,
    sent,
    collected,
    remaining: guests.length - collected,
  };
}

export function formatLagosTime(value: string | null | undefined) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Lagos",
  }).format(new Date(value));
}
