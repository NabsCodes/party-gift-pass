CREATE TYPE "public"."ticket_status" AS ENUM('unused', 'redeemed');--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token_hash" varchar(64) NOT NULL,
	"ticket_number" varchar(24) NOT NULL,
	"display_label" varchar(120),
	"status" "ticket_status" DEFAULT 'unused' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"redeemed_at" timestamp with time zone,
	CONSTRAINT "tickets_redemption_state_check" CHECK (("tickets"."status" = 'unused' AND "tickets"."redeemed_at" IS NULL) OR ("tickets"."status" = 'redeemed' AND "tickets"."redeemed_at" IS NOT NULL))
);
--> statement-breakpoint
CREATE UNIQUE INDEX "tickets_token_hash_unique" ON "tickets" USING btree ("token_hash");--> statement-breakpoint
CREATE UNIQUE INDEX "tickets_ticket_number_unique" ON "tickets" USING btree ("ticket_number");