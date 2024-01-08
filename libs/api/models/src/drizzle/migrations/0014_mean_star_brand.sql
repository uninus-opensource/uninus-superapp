ALTER TABLE "app_users" ALTER COLUMN "created_at" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "app_users" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;