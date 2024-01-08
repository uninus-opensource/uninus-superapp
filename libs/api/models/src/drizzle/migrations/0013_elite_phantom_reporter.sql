ALTER TABLE "app_users" ALTER COLUMN "created_at" SET DEFAULT (unixepoch('subsecond')*1000);--> statement-breakpoint
ALTER TABLE "app_users" ALTER COLUMN "created_at" DROP NOT NULL;