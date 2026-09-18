import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  file: vi.fn(),
  generateAsync: vi.fn(async () => new Blob(["zip"])),
  makePassArt: vi.fn(),
}));

vi.mock("jszip", () => ({
  default: class {
    file = mocks.file;
    generateAsync = mocks.generateAsync;
  },
}));
vi.mock("@/lib/pass-art", () => ({ makePassArt: mocks.makePassArt }));

import { createBulkPassZip } from "@/lib/bulk-export";

const pass = {
  guest: {
    id: "00000000-0000-4000-8000-000000000001",
    name: "Guest 001",
    number: "GP-001",
    status: "unused" as const,
    createdAt: "2026-09-17T00:00:00.000Z",
    redeemedAt: null,
    sharedAt: null,
    isDemo: true,
  },
  token: "a".repeat(43),
  url: "https://example.com/redeem/token",
  passUrl: "https://example.com/pass/token",
};

describe("bulk pass export", () => {
  it("keeps successful artwork and records failed pass numbers", async () => {
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
    mocks.file.mockReset();
    mocks.generateAsync.mockReset().mockResolvedValue(new Blob(["zip"]));
    mocks.makePassArt
      .mockReset()
      .mockResolvedValueOnce({
        invitation: { name: "GP-001-invitation.png" },
        pass: { name: "GP-001-gift-pass.png" },
      })
      .mockRejectedValueOnce(new Error("Canvas unavailable"));

    const progress: number[] = [];
    const result = await createBulkPassZip(
      [
        pass,
        {
          ...pass,
          guest: {
            ...pass.guest,
            id: "00000000-0000-4000-8000-000000000002",
            number: "GP-002",
          },
        },
      ],
      (complete) => progress.push(complete),
    );

    expect(progress).toEqual([1, 2]);
    expect(mocks.file).toHaveBeenCalledWith(
      "GP-001-invitation.png",
      expect.anything(),
    );
    expect(mocks.file).toHaveBeenCalledWith(
      "GP-001-gift-pass.png",
      expect.anything(),
    );
    expect(mocks.file).toHaveBeenCalledWith(
      "EXPORT-ISSUES.txt",
      expect.stringContaining("GP-002"),
    );
    expect(result.issues).toEqual(["GP-002"]);
  });
});
