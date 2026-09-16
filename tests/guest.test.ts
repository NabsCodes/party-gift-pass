import { describe, expect, it } from "vitest";

import {
  filterGuests,
  guestOverview,
  duplicateGuestNames,
  nextNumberedGuest,
  guestStatusClass,
  guestStatusLabel,
  paginateGuests,
  type Guest,
} from "@/lib/guest";

const guests: Guest[] = [
  {
    id: "1",
    name: "Adil Lawal",
    number: "GP-AAA-001",
    status: "unused",
    createdAt: "2026-09-16T00:00:00.000Z",
    redeemedAt: null,
    sharedAt: null,
    isDemo: true,
  },
  {
    id: "2",
    name: "Zara Bello",
    number: "GP-AAA-002",
    status: "unused",
    createdAt: "2026-09-16T00:00:00.000Z",
    redeemedAt: null,
    sharedAt: "2026-09-16T01:00:00.000Z",
    isDemo: true,
  },
  {
    id: "3",
    name: "Tobi Okafor",
    number: "GP-AAA-003",
    status: "redeemed",
    createdAt: "2026-09-16T00:00:00.000Z",
    redeemedAt: "2026-09-16T02:00:00.000Z",
    sharedAt: "2026-09-16T01:00:00.000Z",
    isDemo: true,
  },
];

describe("guest list helpers", () => {
  it("labels unused, shared, and collected passes", () => {
    expect(guestStatusLabel(guests[0])).toBe("Not shared");
    expect(guestStatusLabel(guests[1])).toBe("Pass shared");
    expect(guestStatusLabel(guests[2])).toBe("Collected");
    expect(guestStatusClass(guests[0])).toBe("unused");
    expect(guestStatusClass(guests[1])).toBe("shared");
    expect(guestStatusClass(guests[2])).toBe("redeemed");
  });

  it("filters by status and search text", () => {
    expect(filterGuests(guests, "", "all")).toHaveLength(3);
    expect(
      filterGuests(guests, "", "unshared").map((guest) => guest.name),
    ).toEqual(["Adil Lawal"]);
    expect(
      filterGuests(guests, "", "shared").map((guest) => guest.name),
    ).toEqual(["Zara Bello"]);
    expect(
      filterGuests(guests, "", "collected").map((guest) => guest.name),
    ).toEqual(["Tobi Okafor"]);
    expect(filterGuests(guests, "045", "all")).toEqual([]);
    expect(
      filterGuests(guests, "zara", "all").map((guest) => guest.name),
    ).toEqual(["Zara Bello"]);
    expect(
      filterGuests(guests, "GP-AAA-001", "all").map((guest) => guest.name),
    ).toEqual(["Adil Lawal"]);
  });

  it("summarises guest counts without double-counting collected passes", () => {
    expect(guestOverview(guests)).toEqual({
      total: 3,
      sent: 2,
      collected: 1,
      remaining: 2,
    });
  });

  it("pages a long filtered list without infinite scroll", () => {
    const many = Array.from({ length: 52 }, (_, index) => ({
      ...guests[0],
      id: String(index + 1),
      name: `Guest ${String(index + 1).padStart(3, "0")}`,
    }));
    const first = paginateGuests(many, 1, 25);
    expect(first).toMatchObject({
      page: 1,
      pageCount: 3,
      from: 1,
      to: 25,
      total: 52,
    });
    expect(first.items).toHaveLength(25);
    expect(paginateGuests(many, 3, 25).items).toHaveLength(2);
    expect(paginateGuests(many, 99, 25).page).toBe(3);
    const ten = paginateGuests(many, 1);
    expect(ten.pageSize).toBe(10);
    expect(ten.pageCount).toBe(6);
    expect(ten.items).toHaveLength(10);
  });

  it("finds duplicate names without treating case or spacing as different", () => {
    expect(
      duplicateGuestNames(
        ["Adil Lawal", "Zara Bello"],
        [" adil   lawal ", "Musa Bello", "MUSA BELLO"],
      ),
    ).toEqual([" adil   lawal ", "MUSA BELLO"]);
  });

  it("continues numbered guests after the highest existing label", () => {
    expect(nextNumberedGuest(["Adil Lawal", "Guest 009", "Guest 002"])).toBe(
      10,
    );
  });
});
