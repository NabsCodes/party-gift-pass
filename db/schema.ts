import { sql } from "drizzle-orm";
import {
  check,
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
  },
  (table) => [
    uniqueIndex("tickets_token_hash_unique").on(table.tokenHash),
    uniqueIndex("tickets_ticket_number_unique").on(table.ticketNumber),
    check(
      "tickets_redemption_state_check",
      sql`(${table.status} = 'unused' AND ${table.redeemedAt} IS NULL) OR (${table.status} = 'redeemed' AND ${table.redeemedAt} IS NOT NULL)`,
    ),
  ],
);

export type Ticket = typeof tickets.$inferSelect;
export type NewTicket = typeof tickets.$inferInsert;
