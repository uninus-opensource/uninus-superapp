DROP TABLE "app_academic_staff_position";--> statement-breakpoint
ALTER TABLE "app_academic_staff" DROP CONSTRAINT "app_academic_staff_academic_staff_position_id_app_academic_staff_position_id_fk";
--> statement-breakpoint
ALTER TABLE "app_lecturers" DROP CONSTRAINT "app_lecturers_lecturer_position_id_app_lecturer_Position_id_fk";
--> statement-breakpoint
ALTER TABLE "app_employees" ADD COLUMN "employee_position_id" uuid;--> statement-breakpoint
ALTER TABLE "app_lecturer_Position" ADD COLUMN "employee_category_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employees" ADD CONSTRAINT "app_employees_employee_position_id_app_lecturer_Position_id_fk" FOREIGN KEY ("employee_position_id") REFERENCES "public"."app_lecturer_Position"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_lecturer_Position" ADD CONSTRAINT "app_lecturer_Position_employee_category_id_app_employee_categories_id_fk" FOREIGN KEY ("employee_category_id") REFERENCES "public"."app_employee_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "app_academic_staff" DROP COLUMN IF EXISTS "academic_staff_position_id";--> statement-breakpoint
ALTER TABLE "app_lecturers" DROP COLUMN IF EXISTS "lecturer_position_id";