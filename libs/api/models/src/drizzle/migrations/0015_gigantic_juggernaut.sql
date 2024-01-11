ALTER TABLE "app_last_education_major" RENAME TO "app_education_major";--> statement-breakpoint
ALTER TABLE "app_last_education_type" RENAME TO "app_education_type";--> statement-breakpoint
ALTER TABLE "app_last_educations" RENAME TO "app_educations";--> statement-breakpoint
ALTER TABLE "app_employee_on_last_education" RENAME COLUMN "lastEducation_npsn" TO "education_npsn";--> statement-breakpoint
ALTER TABLE "app_education_major" RENAME COLUMN "last_education_type_id" TO "education_type_id";--> statement-breakpoint
ALTER TABLE "app_educations" RENAME COLUMN "last_education_type_id" TO "education_type_id";--> statement-breakpoint
ALTER TABLE "app_education_major" DROP CONSTRAINT "app_last_education_major_name_unique";--> statement-breakpoint
ALTER TABLE "app_education_type" DROP CONSTRAINT "app_last_education_type_name_unique";--> statement-breakpoint
ALTER TABLE "app_educations" DROP CONSTRAINT "app_last_educations_npsn_unique";--> statement-breakpoint
ALTER TABLE "app_educations" DROP CONSTRAINT "app_last_educations_name_unique";--> statement-breakpoint
ALTER TABLE "app_employee_on_last_education" DROP CONSTRAINT "app_employee_on_last_education_lastEducation_npsn_app_last_educations_id_fk";
--> statement-breakpoint
ALTER TABLE "app_students" DROP CONSTRAINT "app_students_last_education_npsn_app_last_educations_npsn_fk";
--> statement-breakpoint
ALTER TABLE "app_students" DROP CONSTRAINT "app_students_last_education_major_id_app_last_education_major_id_fk";
--> statement-breakpoint
ALTER TABLE "app_students" DROP CONSTRAINT "app_students_last_education_type_id_app_last_education_type_id_fk";
--> statement-breakpoint
ALTER TABLE "app_education_major" DROP CONSTRAINT "app_last_education_major_last_education_type_id_app_last_education_type_id_fk";
--> statement-breakpoint
ALTER TABLE "app_education_type" DROP CONSTRAINT "app_last_education_type_degree_program_id_app_degree_program_id_fk";
--> statement-breakpoint
ALTER TABLE "app_educations" DROP CONSTRAINT "app_last_educations_last_education_type_id_app_last_education_type_id_fk";
--> statement-breakpoint
ALTER TABLE "app_employee_on_last_education" DROP CONSTRAINT "app_employee_on_last_education_employee_id_lastEducation_npsn_pk";--> statement-breakpoint
ALTER TABLE "app_academic_staff" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_documents" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_employees" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_admission" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_courses" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_curriculum" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_curriculum" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_users" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_users" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "app_users" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app_users" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_users" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "app_students" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_roles" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_roles" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_roles" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "app_payment_history" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_otp" ALTER COLUMN "expired_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_notifications" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_lecturers" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "app_employee_on_last_education" ADD CONSTRAINT "app_employee_on_last_education_employee_id_education_npsn_pk" PRIMARY KEY("employee_id","education_npsn");--> statement-breakpoint
ALTER TABLE "app_registration_path" ADD COLUMN "degree_program_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employee_on_last_education" ADD CONSTRAINT "app_employee_on_last_education_education_npsn_app_educations_id_fk" FOREIGN KEY ("education_npsn") REFERENCES "app_educations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_registration_path" ADD CONSTRAINT "app_registration_path_degree_program_id_app_degree_program_id_fk" FOREIGN KEY ("degree_program_id") REFERENCES "app_degree_program"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_last_education_npsn_app_educations_npsn_fk" FOREIGN KEY ("last_education_npsn") REFERENCES "app_educations"("npsn") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_last_education_major_id_app_education_major_id_fk" FOREIGN KEY ("last_education_major_id") REFERENCES "app_education_major"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_last_education_type_id_app_education_type_id_fk" FOREIGN KEY ("last_education_type_id") REFERENCES "app_education_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_education_major" ADD CONSTRAINT "app_education_major_education_type_id_app_education_type_id_fk" FOREIGN KEY ("education_type_id") REFERENCES "app_education_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_education_type" ADD CONSTRAINT "app_education_type_degree_program_id_app_degree_program_id_fk" FOREIGN KEY ("degree_program_id") REFERENCES "app_degree_program"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_educations" ADD CONSTRAINT "app_educations_education_type_id_app_education_type_id_fk" FOREIGN KEY ("education_type_id") REFERENCES "app_education_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "app_education_major" ADD CONSTRAINT "app_education_major_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "app_education_type" ADD CONSTRAINT "app_education_type_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "app_educations" ADD CONSTRAINT "app_educations_npsn_unique" UNIQUE("npsn");--> statement-breakpoint
ALTER TABLE "app_educations" ADD CONSTRAINT "app_educations_name_unique" UNIQUE("name");