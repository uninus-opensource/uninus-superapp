ALTER TABLE "app_last_education_major" DROP CONSTRAINT "app_last_education_major_last_education_type_id_app_last_education_type_id_fk";
--> statement-breakpoint
ALTER TABLE "app_last_educations" DROP CONSTRAINT "app_last_educations_last_education_type_id_app_last_education_type_id_fk";
--> statement-breakpoint
ALTER TABLE "app_subdistrict" DROP CONSTRAINT "app_subdistrict_city_id_app_city_id_fk";
--> statement-breakpoint
ALTER TABLE "app_scholarship" ALTER COLUMN "discount" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_last_education_major" ALTER COLUMN "last_education_type_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "app_last_educations" ALTER COLUMN "npsn" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_last_educations" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_last_educations" ALTER COLUMN "province" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_last_educations" ALTER COLUMN "city" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_last_educations" ALTER COLUMN "subdistrict" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_last_educations" ALTER COLUMN "street_address" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_last_educations" ALTER COLUMN "last_education_type_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "app_subdistrict" ALTER COLUMN "city_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "app_selection_path" ADD COLUMN "degree_program_id" text;--> statement-breakpoint
ALTER TABLE "app_department" ADD COLUMN "faculty_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "app_department" ADD COLUMN "degree_program_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "app_faculty" ADD COLUMN "degree_program_id" text;--> statement-breakpoint
ALTER TABLE "app_last_education_type" ADD COLUMN "degree_program_id" text;