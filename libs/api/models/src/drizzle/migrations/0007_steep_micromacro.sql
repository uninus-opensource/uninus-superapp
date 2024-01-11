ALTER TABLE "app_admission" ALTER COLUMN "degree_program_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_admission" ALTER COLUMN "first_department_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_admission" ALTER COLUMN "second_department_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_admission" ALTER COLUMN "student_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_admission" ALTER COLUMN "registration_status_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_admission" ALTER COLUMN "registration_path_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_admission" ALTER COLUMN "scholarship_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_admission" ALTER COLUMN "selection_path_id" DROP NOT NULL;