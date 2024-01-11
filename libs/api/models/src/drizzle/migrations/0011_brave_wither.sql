ALTER TABLE "app_civil_service_level" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_selection_path" ALTER COLUMN "degree_program_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "app_department" ALTER COLUMN "faculty_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "app_department" ALTER COLUMN "faculty_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_department" ALTER COLUMN "degree_program_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "app_department" ALTER COLUMN "degree_program_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_faculty" ALTER COLUMN "degree_program_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "app_city" ALTER COLUMN "province_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "app_country" ALTER COLUMN "citizenship_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "app_last_education_major" ALTER COLUMN "last_education_type_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "app_last_education_type" ALTER COLUMN "degree_program_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "app_last_educations" ALTER COLUMN "last_education_type_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "app_subdistrict" ALTER COLUMN "city_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "app_users" ALTER COLUMN "avatar" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app_users" ALTER COLUMN "is_verified" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_users" ALTER COLUMN "is_notification_read" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_users" ALTER COLUMN "role_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app_users" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_students" ALTER COLUMN "religion_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "app_payment_history" ALTER COLUMN "is_paid" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_payment_history" ALTER COLUMN "payment_type_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_payment_history" ALTER COLUMN "payment_obligation_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_payment_history" ALTER COLUMN "student_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_lecturer_Position" ALTER COLUMN "civil_service_level_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_selection_path" ADD CONSTRAINT "app_selection_path_degree_program_id_app_degree_program_id_fk" FOREIGN KEY ("degree_program_id") REFERENCES "app_degree_program"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_department" ADD CONSTRAINT "app_department_faculty_id_app_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "app_faculty"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_department" ADD CONSTRAINT "app_department_degree_program_id_app_degree_program_id_fk" FOREIGN KEY ("degree_program_id") REFERENCES "app_degree_program"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_faculty" ADD CONSTRAINT "app_faculty_degree_program_id_app_degree_program_id_fk" FOREIGN KEY ("degree_program_id") REFERENCES "app_degree_program"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_city" ADD CONSTRAINT "app_city_province_id_app_province_id_fk" FOREIGN KEY ("province_id") REFERENCES "app_province"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_country" ADD CONSTRAINT "app_country_citizenship_id_app_citizenship_id_fk" FOREIGN KEY ("citizenship_id") REFERENCES "app_citizenship"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_last_education_major" ADD CONSTRAINT "app_last_education_major_last_education_type_id_app_last_education_type_id_fk" FOREIGN KEY ("last_education_type_id") REFERENCES "app_last_education_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_last_education_type" ADD CONSTRAINT "app_last_education_type_degree_program_id_app_degree_program_id_fk" FOREIGN KEY ("degree_program_id") REFERENCES "app_degree_program"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_last_educations" ADD CONSTRAINT "app_last_educations_last_education_type_id_app_last_education_type_id_fk" FOREIGN KEY ("last_education_type_id") REFERENCES "app_last_education_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_subdistrict" ADD CONSTRAINT "app_subdistrict_city_id_app_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "app_city"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_religion_id_app_religion_id_fk" FOREIGN KEY ("religion_id") REFERENCES "app_religion"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "app_academic_staff" DROP COLUMN IF EXISTS "name";