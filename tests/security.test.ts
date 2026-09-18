import { describe, expect, it } from "vitest";

import {
  equalSecret,
  hashToken,
  safeReturnPath,
  signSession,
  ticketToken,
  validSession,
} from "@/lib/security";
import { createBatchSchema, ticketIdsSchema } from "@/schemas/tickets";

describe("ticket secrets", () => {
  it("derives stable URL-safe tokens without exposing the ticket id", () => {
    const id = "00000000-0000-4000-8000-000000000001";
    const token = ticketToken(id, "a-key-that-is-long-enough-for-this-test");

    expect(token).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(token).not.toContain(id);
    expect(ticketToken(id, "a-key-that-is-long-enough-for-this-test")).toBe(
      token,
    );
    expect(hashToken(token)).toMatch(/^[a-f0-9]{64}$/);
  });

  it("compares staff secrets without returning partial matches", () => {
    expect(equalSecret("correct horse", "correct horse")).toBe(true);
    expect(equalSecret("correct horse", "correct house")).toBe(false);
  });
});

describe("staff sessions", () => {
  const key = "a-session-secret-long-enough-for-unit-tests";
  const now = Date.UTC(2026, 8, 16, 10);

  it("accepts a signed session only inside its lifetime", () => {
    const session = signSession(key, now);
    expect(validSession(session, key, now + 1)).toBe(true);
    expect(validSession(session, key, now + 12 * 60 * 60 * 1000 + 1)).toBe(
      false,
    );
    expect(validSession(`${session}x`, key, now + 1)).toBe(false);
  });

  it("allows only known internal return paths", () => {
    expect(safeReturnPath("/staff")).toBe("/staff");
    expect(safeReturnPath("/print")).toBe("/staff");
    expect(safeReturnPath("//example.com")).toBe("/staff");
    expect(safeReturnPath("https://example.com")).toBe("/staff");
  });
});

describe("guest input", () => {
  describe("bulk ticket input", () => {
    it("accepts up to 200 unique ticket ids", () => {
      const ids = Array.from(
        { length: 200 },
        (_, index) =>
          `00000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
      );
      expect(ticketIdsSchema.parse(ids)).toHaveLength(200);
      expect(() => ticketIdsSchema.parse([...ids, ids[0]])).toThrow();
      expect(() =>
        ticketIdsSchema.parse([...ids, "00000000-0000-4000-8000-000000000201"]),
      ).toThrow();
    });
  });

  it("allows duplicate display names but rejects an oversized batch", () => {
    const input = {
      batchId: "8c64ecca-b350-4c49-9515-7d3ffbbef1dd",
      names: ["Adil Lawal", "Adil Lawal"],
    };
    expect(createBatchSchema.parse(input).names).toHaveLength(2);
    expect(() =>
      createBatchSchema.parse({ ...input, names: Array(251).fill("Guest") }),
    ).toThrow();
  });

  it("rejects a numbered batch over the 250-pass cap", () => {
    expect(() =>
      createBatchSchema.parse({
        batchId: "8c64ecca-b350-4c49-9515-7d3ffbbef1dd",
        quantity: 1000,
      }),
    ).toThrow();
  });

  it("rejects ambiguous or empty batch creation", () => {
    const batchId = "8c64ecca-b350-4c49-9515-7d3ffbbef1dd";
    expect(() => createBatchSchema.parse({ batchId })).toThrow();
    expect(() =>
      createBatchSchema.parse({ batchId, quantity: 2, names: ["Adil"] }),
    ).toThrow();
  });
});
