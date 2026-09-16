import { sql } from "drizzle-orm";
import {
  check,
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const ticketStatus = pgEnum("ticket_status", ["unused", "redeemed"]);

export const tickets = pgTable(
  "tickets",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tokenHash: varchar("token_hash", { length: 64 }).notNull(),
    ticketNumber: varchar("ticket_number", { length: 24 }).notNull(),
    displayLabel: varchar("display_label", { length: 120 }),
    status: ticketStatus("status").default("unused").notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
    redeemedAt: timestamp("redeemed_at", {
      withTimezone: true,
      mode: "date",
    }),
    sharedAt: timestamp("shared_at", { withTimezone: true, mode: "date" }),
    isDemo: boolean("is_demo").default(false).notNull(),
    batchId: uuid("batch_id"),
    batchIndex: integer("batch_index"),
    redemptionAttempt: uuid("redemption_attempt"),
  },
  (table) => [
    uniqueIndex("tickets_token_hash_unique").on(table.tokenHash),
    uniqueIndex("tickets_ticket_number_unique").on(table.ticketNumber),
    uniqueIndex("tickets_batch_item_unique").on(
      table.batchId,
      table.batchIndex,
    ),
    check(
      "tickets_redemption_state_check",
      sql`(${table.status} = 'unused' AND ${table.redeemedAt} IS NULL) OR (${table.status} = 'redeemed' AND ${table.redeemedAt} IS NOT NULL)`,
    ),
  ],
);

export type Ticket = typeof tickets.$inferSelect;
export type NewTicket = typeof tickets.$inferInsert;

export const appState = pgTable("app_state", {
  key: varchar("key", { length: 80 }).primaryKey(),
  value: varchar("value", { length: 200 }).notNull(),
});

export const loginWindows = pgTable("login_windows", {
  key: varchar("key", { length: 80 }).primaryKey(),
  attempts: integer("attempts").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});
