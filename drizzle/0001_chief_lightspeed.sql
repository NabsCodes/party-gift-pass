CREATE TABLE "app_state" (
	"key" varchar(80) PRIMARY KEY NOT NULL,
	"value" varchar(200) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "login_windows" (
	"key" varchar(80) PRIMARY KEY NOT NULL,
	"attempts" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "shared_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "is_demo" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "batch_id" uuid;--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "batch_index" integer;--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "redemption_attempt" uuid;--> statement-breakpoint
CREATE UNIQUE INDEX "tickets_batch_item_unique" ON "tickets" USING btree ("batch_id","batch_index");