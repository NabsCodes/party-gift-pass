import { getTableConfig } from "drizzle-orm/pg-core";
import { describe, expect, it } from "vitest";

import { tickets, ticketStatus } from "@/db/schema";
import { parseServerEnv } from "@/lib/env";

describe("ticket database foundation", () => {
  it("defines the two supported redemption states", () => {
    expect(ticketStatus.enumValues).toEqual(["unused", "redeemed"]);
  });

  it("defines the required columns and redemption invariant", () => {
    const config = getTableConfig(tickets);

    expect(config.columns.map((column) => column.name)).toEqual([
      "id",
      "token_hash",
      "ticket_number",
      "display_label",
      "status",
      "created_at",
      "redeemed_at",
    ]);
    expect(config.indexes).toHaveLength(2);
    expect(config.checks.map((check) => check.name)).toContain(
      "tickets_redemption_state_check",
    );
  });
});

describe("server environment", () => {
  it("accepts a PostgreSQL connection URL", () => {
    expect(
      parseServerEnv({
        DATABASE_URL: "postgresql://user:password@example.com/database",
      }),
    ).toEqual({
      DATABASE_URL: "postgresql://user:password@example.com/database",
    });
  });

  it("rejects a missing database URL", () => {
    expect(() => parseServerEnv({})).toThrow();
  });
});
