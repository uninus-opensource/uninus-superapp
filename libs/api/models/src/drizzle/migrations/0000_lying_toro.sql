CREATE TABLE IF NOT EXISTS "app_academic_staff" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"academic_staff_type_id" uuid,
	"academic_staff_position_id" uuid,
	"employee_id" uuid NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_academic_staff_position" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"civil_service_level_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_academic_staff_type" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"path" text NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"student_id" uuid,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_civil_service_level" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_employee_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_employee_on_employee_categories" (
	"employee_id" uuid NOT NULL,
	"employee_categories_id" uuid NOT NULL,
	CONSTRAINT "app_employee_on_employee_categories_employee_id_employee_categories_id_pk" PRIMARY KEY("employee_id","employee_categories_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_employee_on_last_education" (
	"employee_id" uuid NOT NULL,
	"lastEducation_npsn" uuid NOT NULL,
	CONSTRAINT "app_employee_on_last_education_employee_id_lastEducation_npsn_pk" PRIMARY KEY("employee_id","lastEducation_npsn")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_employee_on_work_unit" (
	"employee_id" uuid NOT NULL,
	"work_unit_id" uuid NOT NULL,
	CONSTRAINT "app_employee_on_work_unit_employee_id_work_unit_id_pk" PRIMARY KEY("employee_id","work_unit_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_employee_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_employee_type" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_employees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nik" text,
	"address" text,
	"nip" text,
	"nidn" text,
	"gender_id" uuid,
	"phone_number" text,
	"birth_place" text,
	"birth_date" text,
	"addition_task" text,
	"religion_id" uuid,
	"country_id" uuid,
	"province_id" uuid,
	"city_id" uuid,
	"subdistrict_id" uuid,
	"citizenship_id" uuid,
	"marital_status_id" uuid,
	"employee_status_id" uuid,
	"employee_type_id" uuid,
	"user_id" uuid NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_work_unit_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_work_units" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"work_unit_category_id" uuid,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_admission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"utbk_pug" numeric,
	"utbk_kk" numeric,
	"utbk_ppu" numeric,
	"utbk_kmbm" numeric,
	"utbk_average" numeric,
	"utbk" numeric,
	"registration_number" text,
	"grade_average" numeric,
	"test_score" integer,
	"degree_program_id" uuid NOT NULL,
	"first_department_id" uuid NOT NULL,
	"second_department_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"registration_status_id" uuid NOT NULL,
	"registration_path_id" uuid NOT NULL,
	"scholarship_id" uuid NOT NULL,
	"selection_path_id" uuid NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_admission_test" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text NOT NULL,
	"correct_answer" text NOT NULL,
	"answers" text[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_registration_path" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_registration_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_scholarship" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"discount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_selection_path" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_student_grade" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subject" text NOT NULL,
	"semester" text NOT NULL,
	"grade" numeric NOT NULL,
	"admission_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_course_category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_course_type" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"course_code" text NOT NULL,
	"credit" integer NOT NULL,
	"semester" integer NOT NULL,
	"status" text,
	"curriculum_id" uuid,
	"course_category_id" uuid,
	"course_type_id" uuid,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_curriculum" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"batch" text NOT NULL,
	"release_year" text NOT NULL,
	"in_effect" text NOT NULL,
	"status" text,
	"degree_program_id" uuid,
	"faculty_id" uuid,
	"department_id" uuid,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_degree_program" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_department" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_faculty" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_citizenship" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_city" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"province_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_country" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"citizenship_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_dissabilities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_gender" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_last_education_major" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"last_education_type_id" uuid,
	CONSTRAINT "app_last_education_major_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_last_education_type" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "app_last_education_type_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_last_educations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"npsn" text NOT NULL,
	"name" text NOT NULL,
	"province" text NOT NULL,
	"city" text NOT NULL,
	"subdistrict" text NOT NULL,
	"street_address" text NOT NULL,
	"last_education_type_id" uuid,
	CONSTRAINT "app_last_educations_npsn_unique" UNIQUE("npsn"),
	CONSTRAINT "app_last_educations_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_marital_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_occupation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_parent_education" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_parent_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_province" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_religion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_salary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_subdistrict" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"city_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"fullname" text NOT NULL,
	"password" text NOT NULL,
	"avatar" text,
	"is_verified" boolean DEFAULT false NOT NULL,
	"is_notification_read" boolean DEFAULT false NOT NULL,
	"role_id" uuid,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_student_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nik" text,
	"nisn" text,
	"kk" text,
	"nim" text,
	"guardian_lecturer_id" uuid,
	"gender_id" uuid,
	"religion_id" uuid,
	"birth_place" text,
	"birth_date" text,
	"phone_number" text,
	"citizenship_id" uuid,
	"marital_status_id" uuid,
	"country_id" uuid,
	"address" text,
	"province_id" uuid,
	"city_id" uuid,
	"subdistrict_id" uuid,
	"last_education_npsn" text,
	"last_education_major_id" uuid,
	"last_education_type_id" uuid,
	"salary_id" uuid,
	"occupation_id" uuid,
	"position" text,
	"graduation_year" text,
	"company_name" text,
	"company_address" text,
	"working_status" uuid,
	"father_name" text,
	"father_status_id" uuid,
	"father_education_id" uuid,
	"father_occupation_id" uuid,
	"father_position" text,
	"father_salary_id" uuid,
	"mother_name" text,
	"mother_status_id" uuid,
	"mother_education_id" uuid,
	"mother_occupation_id" uuid,
	"mother_position" text,
	"mother_salary_id" uuid,
	"parent_province_id" uuid,
	"parent_city_id" uuid,
	"parent_subdistrict_id" uuid,
	"parent_address" text,
	"guardian_name" text,
	"guardian_status_id" uuid,
	"guardian_province_id" uuid,
	"guardian_city_id" uuid,
	"guardian_subdistrict_id" uuid,
	"guardian_address" text,
	"guardian_education_id" uuid,
	"guardian_occupation_id" uuid,
	"guardian_salary_id" uuid,
	"guardian_position" text,
	"scholarship_id" uuid,
	"dissabilities_id" uuid,
	"academic_year" text,
	"faculty_id" uuid,
	"department_id" uuid,
	"student_status_id" uuid,
	"user_id" uuid NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "app_students_nik_unique" UNIQUE("nik"),
	CONSTRAINT "app_students_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_working_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"permissions" text[],
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_payment_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" text NOT NULL,
	"payment_method" text,
	"payment_code" text,
	"payment_bank" text,
	"is_paid" boolean DEFAULT false NOT NULL,
	"payment_type_id" uuid NOT NULL,
	"payment_obligation_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "app_payment_history_order_id_unique" UNIQUE("order_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_payment_obligations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"amount" integer NOT NULL,
	CONSTRAINT "app_payment_obligations_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_payment_type" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "app_payment_type_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_otp" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token" text NOT NULL,
	"user_id" uuid,
	"expired_at" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"detail" text,
	"user_id" uuid,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_lecturer_on_department" (
	"lecturer_id" uuid NOT NULL,
	"department_id" uuid NOT NULL,
	CONSTRAINT "app_lecturer_on_department_lecturer_id_department_id_pk" PRIMARY KEY("lecturer_id","department_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_lecturer_on_Faculty" (
	"lecturer_id" uuid NOT NULL,
	"faculty_id" uuid NOT NULL,
	CONSTRAINT "app_lecturer_on_Faculty_lecturer_id_faculty_id_pk" PRIMARY KEY("lecturer_id","faculty_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_lecturer_Position" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"civil_service_level_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_lecturer_type" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_lecturers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"lecturer_certification" boolean,
	"lecturer_type_id" uuid,
	"lecturer_position_id" uuid,
	"employee_id" uuid NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_academic_staff" ADD CONSTRAINT "app_academic_staff_academic_staff_type_id_app_academic_staff_type_id_fk" FOREIGN KEY ("academic_staff_type_id") REFERENCES "app_academic_staff_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_academic_staff" ADD CONSTRAINT "app_academic_staff_academic_staff_position_id_app_academic_staff_position_id_fk" FOREIGN KEY ("academic_staff_position_id") REFERENCES "app_academic_staff_position"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_academic_staff" ADD CONSTRAINT "app_academic_staff_employee_id_app_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "app_employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_academic_staff_position" ADD CONSTRAINT "app_academic_staff_position_civil_service_level_id_app_civil_service_level_id_fk" FOREIGN KEY ("civil_service_level_id") REFERENCES "app_civil_service_level"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_documents" ADD CONSTRAINT "app_documents_student_id_app_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "app_students"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employee_on_employee_categories" ADD CONSTRAINT "app_employee_on_employee_categories_employee_id_app_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "app_employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employee_on_employee_categories" ADD CONSTRAINT "app_employee_on_employee_categories_employee_categories_id_app_employee_categories_id_fk" FOREIGN KEY ("employee_categories_id") REFERENCES "app_employee_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employee_on_last_education" ADD CONSTRAINT "app_employee_on_last_education_employee_id_app_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "app_employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employee_on_last_education" ADD CONSTRAINT "app_employee_on_last_education_lastEducation_npsn_app_last_educations_id_fk" FOREIGN KEY ("lastEducation_npsn") REFERENCES "app_last_educations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employee_on_work_unit" ADD CONSTRAINT "app_employee_on_work_unit_employee_id_app_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "app_employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employee_on_work_unit" ADD CONSTRAINT "app_employee_on_work_unit_work_unit_id_app_work_units_id_fk" FOREIGN KEY ("work_unit_id") REFERENCES "app_work_units"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employees" ADD CONSTRAINT "app_employees_gender_id_app_gender_id_fk" FOREIGN KEY ("gender_id") REFERENCES "app_gender"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employees" ADD CONSTRAINT "app_employees_religion_id_app_religion_id_fk" FOREIGN KEY ("religion_id") REFERENCES "app_religion"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employees" ADD CONSTRAINT "app_employees_country_id_app_country_id_fk" FOREIGN KEY ("country_id") REFERENCES "app_country"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employees" ADD CONSTRAINT "app_employees_province_id_app_province_id_fk" FOREIGN KEY ("province_id") REFERENCES "app_province"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employees" ADD CONSTRAINT "app_employees_city_id_app_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "app_city"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employees" ADD CONSTRAINT "app_employees_subdistrict_id_app_subdistrict_id_fk" FOREIGN KEY ("subdistrict_id") REFERENCES "app_subdistrict"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employees" ADD CONSTRAINT "app_employees_citizenship_id_app_citizenship_id_fk" FOREIGN KEY ("citizenship_id") REFERENCES "app_citizenship"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employees" ADD CONSTRAINT "app_employees_marital_status_id_app_marital_status_id_fk" FOREIGN KEY ("marital_status_id") REFERENCES "app_marital_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employees" ADD CONSTRAINT "app_employees_employee_status_id_app_employee_status_id_fk" FOREIGN KEY ("employee_status_id") REFERENCES "app_employee_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employees" ADD CONSTRAINT "app_employees_employee_type_id_app_employee_type_id_fk" FOREIGN KEY ("employee_type_id") REFERENCES "app_employee_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_employees" ADD CONSTRAINT "app_employees_user_id_app_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "app_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_work_units" ADD CONSTRAINT "app_work_units_work_unit_category_id_app_work_unit_categories_id_fk" FOREIGN KEY ("work_unit_category_id") REFERENCES "app_work_unit_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_admission" ADD CONSTRAINT "app_admission_degree_program_id_app_degree_program_id_fk" FOREIGN KEY ("degree_program_id") REFERENCES "app_degree_program"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_admission" ADD CONSTRAINT "app_admission_first_department_id_app_department_id_fk" FOREIGN KEY ("first_department_id") REFERENCES "app_department"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_admission" ADD CONSTRAINT "app_admission_second_department_id_app_department_id_fk" FOREIGN KEY ("second_department_id") REFERENCES "app_department"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_admission" ADD CONSTRAINT "app_admission_student_id_app_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "app_students"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_admission" ADD CONSTRAINT "app_admission_registration_status_id_app_registration_status_id_fk" FOREIGN KEY ("registration_status_id") REFERENCES "app_registration_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_admission" ADD CONSTRAINT "app_admission_registration_path_id_app_registration_path_id_fk" FOREIGN KEY ("registration_path_id") REFERENCES "app_registration_path"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_admission" ADD CONSTRAINT "app_admission_scholarship_id_app_scholarship_id_fk" FOREIGN KEY ("scholarship_id") REFERENCES "app_scholarship"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_admission" ADD CONSTRAINT "app_admission_selection_path_id_app_selection_path_id_fk" FOREIGN KEY ("selection_path_id") REFERENCES "app_selection_path"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_student_grade" ADD CONSTRAINT "app_student_grade_admission_id_app_admission_id_fk" FOREIGN KEY ("admission_id") REFERENCES "app_admission"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_courses" ADD CONSTRAINT "app_courses_curriculum_id_app_curriculum_id_fk" FOREIGN KEY ("curriculum_id") REFERENCES "app_curriculum"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_courses" ADD CONSTRAINT "app_courses_course_category_id_app_course_category_id_fk" FOREIGN KEY ("course_category_id") REFERENCES "app_course_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_courses" ADD CONSTRAINT "app_courses_course_type_id_app_course_type_id_fk" FOREIGN KEY ("course_type_id") REFERENCES "app_course_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_curriculum" ADD CONSTRAINT "app_curriculum_degree_program_id_app_degree_program_id_fk" FOREIGN KEY ("degree_program_id") REFERENCES "app_degree_program"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_curriculum" ADD CONSTRAINT "app_curriculum_faculty_id_app_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "app_faculty"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_curriculum" ADD CONSTRAINT "app_curriculum_department_id_app_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "app_department"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "app_users" ADD CONSTRAINT "app_users_role_id_app_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "app_roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_guardian_lecturer_id_app_lecturers_id_fk" FOREIGN KEY ("guardian_lecturer_id") REFERENCES "app_lecturers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_gender_id_app_gender_id_fk" FOREIGN KEY ("gender_id") REFERENCES "app_gender"("id") ON DELETE no action ON UPDATE no action;
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
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_citizenship_id_app_citizenship_id_fk" FOREIGN KEY ("citizenship_id") REFERENCES "app_citizenship"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_marital_status_id_app_marital_status_id_fk" FOREIGN KEY ("marital_status_id") REFERENCES "app_marital_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_country_id_app_country_id_fk" FOREIGN KEY ("country_id") REFERENCES "app_country"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_province_id_app_province_id_fk" FOREIGN KEY ("province_id") REFERENCES "app_province"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_city_id_app_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "app_city"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_subdistrict_id_app_subdistrict_id_fk" FOREIGN KEY ("subdistrict_id") REFERENCES "app_subdistrict"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_last_education_npsn_app_last_educations_npsn_fk" FOREIGN KEY ("last_education_npsn") REFERENCES "app_last_educations"("npsn") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_last_education_major_id_app_last_education_major_id_fk" FOREIGN KEY ("last_education_major_id") REFERENCES "app_last_education_major"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_last_education_type_id_app_last_education_type_id_fk" FOREIGN KEY ("last_education_type_id") REFERENCES "app_last_education_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_salary_id_app_salary_id_fk" FOREIGN KEY ("salary_id") REFERENCES "app_salary"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_occupation_id_app_occupation_id_fk" FOREIGN KEY ("occupation_id") REFERENCES "app_occupation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_working_status_app_working_status_id_fk" FOREIGN KEY ("working_status") REFERENCES "app_working_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_father_status_id_app_parent_status_id_fk" FOREIGN KEY ("father_status_id") REFERENCES "app_parent_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_father_education_id_app_parent_education_id_fk" FOREIGN KEY ("father_education_id") REFERENCES "app_parent_education"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_father_occupation_id_app_occupation_id_fk" FOREIGN KEY ("father_occupation_id") REFERENCES "app_occupation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_father_salary_id_app_salary_id_fk" FOREIGN KEY ("father_salary_id") REFERENCES "app_salary"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_mother_status_id_app_parent_status_id_fk" FOREIGN KEY ("mother_status_id") REFERENCES "app_parent_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_mother_education_id_app_parent_education_id_fk" FOREIGN KEY ("mother_education_id") REFERENCES "app_parent_education"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_mother_occupation_id_app_occupation_id_fk" FOREIGN KEY ("mother_occupation_id") REFERENCES "app_occupation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_mother_salary_id_app_salary_id_fk" FOREIGN KEY ("mother_salary_id") REFERENCES "app_salary"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_parent_province_id_app_province_id_fk" FOREIGN KEY ("parent_province_id") REFERENCES "app_province"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_parent_city_id_app_city_id_fk" FOREIGN KEY ("parent_city_id") REFERENCES "app_city"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_parent_subdistrict_id_app_subdistrict_id_fk" FOREIGN KEY ("parent_subdistrict_id") REFERENCES "app_subdistrict"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_guardian_status_id_app_parent_status_id_fk" FOREIGN KEY ("guardian_status_id") REFERENCES "app_parent_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_guardian_province_id_app_province_id_fk" FOREIGN KEY ("guardian_province_id") REFERENCES "app_province"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_guardian_city_id_app_city_id_fk" FOREIGN KEY ("guardian_city_id") REFERENCES "app_city"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_guardian_subdistrict_id_app_subdistrict_id_fk" FOREIGN KEY ("guardian_subdistrict_id") REFERENCES "app_subdistrict"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_guardian_education_id_app_parent_education_id_fk" FOREIGN KEY ("guardian_education_id") REFERENCES "app_parent_education"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_guardian_occupation_id_app_occupation_id_fk" FOREIGN KEY ("guardian_occupation_id") REFERENCES "app_occupation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_guardian_salary_id_app_salary_id_fk" FOREIGN KEY ("guardian_salary_id") REFERENCES "app_salary"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_scholarship_id_app_scholarship_id_fk" FOREIGN KEY ("scholarship_id") REFERENCES "app_scholarship"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_dissabilities_id_app_dissabilities_id_fk" FOREIGN KEY ("dissabilities_id") REFERENCES "app_dissabilities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_faculty_id_app_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "app_faculty"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_department_id_app_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "app_department"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_student_status_id_app_student_status_id_fk" FOREIGN KEY ("student_status_id") REFERENCES "app_student_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_students" ADD CONSTRAINT "app_students_user_id_app_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "app_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_payment_history" ADD CONSTRAINT "app_payment_history_payment_type_id_app_payment_type_id_fk" FOREIGN KEY ("payment_type_id") REFERENCES "app_payment_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_payment_history" ADD CONSTRAINT "app_payment_history_payment_obligation_id_app_payment_obligations_id_fk" FOREIGN KEY ("payment_obligation_id") REFERENCES "app_payment_obligations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_payment_history" ADD CONSTRAINT "app_payment_history_student_id_app_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "app_students"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_otp" ADD CONSTRAINT "app_otp_user_id_app_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "app_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_notifications" ADD CONSTRAINT "app_notifications_user_id_app_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "app_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_lecturer_on_department" ADD CONSTRAINT "app_lecturer_on_department_lecturer_id_app_lecturers_id_fk" FOREIGN KEY ("lecturer_id") REFERENCES "app_lecturers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_lecturer_on_department" ADD CONSTRAINT "app_lecturer_on_department_department_id_app_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "app_department"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_lecturer_on_Faculty" ADD CONSTRAINT "app_lecturer_on_Faculty_lecturer_id_app_lecturers_id_fk" FOREIGN KEY ("lecturer_id") REFERENCES "app_lecturers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_lecturer_on_Faculty" ADD CONSTRAINT "app_lecturer_on_Faculty_faculty_id_app_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "app_faculty"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_lecturer_Position" ADD CONSTRAINT "app_lecturer_Position_civil_service_level_id_app_civil_service_level_id_fk" FOREIGN KEY ("civil_service_level_id") REFERENCES "app_civil_service_level"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_lecturers" ADD CONSTRAINT "app_lecturers_lecturer_type_id_app_lecturer_type_id_fk" FOREIGN KEY ("lecturer_type_id") REFERENCES "app_lecturer_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_lecturers" ADD CONSTRAINT "app_lecturers_lecturer_position_id_app_lecturer_Position_id_fk" FOREIGN KEY ("lecturer_position_id") REFERENCES "app_lecturer_Position"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_lecturers" ADD CONSTRAINT "app_lecturers_employee_id_app_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "app_employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
