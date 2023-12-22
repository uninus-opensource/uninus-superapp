ALTER TABLE "app_employees" DROP CONSTRAINT "app_employees_religion_id_app_religion_id_fk";
--> statement-breakpoint
ALTER TABLE "app_students" DROP CONSTRAINT "app_students_religion_id_app_religion_id_fk";
--> statement-breakpoint
ALTER TABLE "app_employees" DROP COLUMN IF EXISTS "religion_id";--> statement-breakpoint
ALTER TABLE "app_students" DROP COLUMN IF EXISTS "religion_id";