/*
  Warnings:

  - You are about to drop the column `additional_documents` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `citizenship` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `father_status` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `kipk_card` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `marital_status` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `mother_status` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `pass_photo` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_address` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_city` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_name` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_npsn` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_phone_number` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_postal_code` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_province` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_report_card` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_subdistrict` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `study_program` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `subdistrict` on the `Students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Students" DROP COLUMN "additional_documents",
DROP COLUMN "citizenship",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "father_status",
DROP COLUMN "gender",
DROP COLUMN "kipk_card",
DROP COLUMN "marital_status",
DROP COLUMN "mother_status",
DROP COLUMN "pass_photo",
DROP COLUMN "province",
DROP COLUMN "religion",
DROP COLUMN "school_address",
DROP COLUMN "school_city",
DROP COLUMN "school_name",
DROP COLUMN "school_npsn",
DROP COLUMN "school_phone_number",
DROP COLUMN "school_postal_code",
DROP COLUMN "school_province",
DROP COLUMN "school_report_card",
DROP COLUMN "school_subdistrict",
DROP COLUMN "study_program",
DROP COLUMN "subdistrict",
ADD COLUMN     "assignment_certificate" TEXT,
ADD COLUMN     "citizenship_id" INTEGER,
ADD COLUMN     "city_id" INTEGER,
ADD COLUMN     "country_id" INTEGER,
ADD COLUMN     "disabilities_id" INTEGER,
ADD COLUMN     "education_history_id" INTEGER,
ADD COLUMN     "engl_grade_first_semester" INTEGER,
ADD COLUMN     "engl_grade_forth_semester" INTEGER,
ADD COLUMN     "engl_grade_second_semester" INTEGER,
ADD COLUMN     "engl_grade_third_semester" INTEGER,
ADD COLUMN     "family_card_number" TEXT,
ADD COLUMN     "father_status_id" INTEGER,
ADD COLUMN     "first_study_program" TEXT,
ADD COLUMN     "gender_id" INTEGER,
ADD COLUMN     "indo_grade_first_semester" INTEGER,
ADD COLUMN     "indo_grade_forth_semester" INTEGER,
ADD COLUMN     "indo_grade_second_semester" INTEGER,
ADD COLUMN     "indo_grade_thrid_semester" INTEGER,
ADD COLUMN     "marital_status_id" INTEGER,
ADD COLUMN     "math_grade_first_semester" INTEGER,
ADD COLUMN     "math_grade_forth_semester" INTEGER,
ADD COLUMN     "math_grade_second_semester" INTEGER,
ADD COLUMN     "math_grade_third_semester" INTEGER,
ADD COLUMN     "medical_certificate" TEXT,
ADD COLUMN     "mother_status_id" INTEGER,
ADD COLUMN     "non_academic_certificate" TEXT,
ADD COLUMN     "nu_membership" TEXT,
ADD COLUMN     "province_id" INTEGER,
ADD COLUMN     "quran_certificate" TEXT,
ADD COLUMN     "religion_id" INTEGER,
ADD COLUMN     "scholarship_id" INTEGER,
ADD COLUMN     "school_report_card_first_semester" TEXT,
ADD COLUMN     "school_report_card_forth_semester" TEXT,
ADD COLUMN     "school_report_card_second_semester" TEXT,
ADD COLUMN     "school_report_card_third_semester" TEXT,
ADD COLUMN     "second_study_program" TEXT,
ADD COLUMN     "subdistrict_id" INTEGER,
ADD COLUMN     "utbk_certificate" TEXT,
ADD COLUMN     "utbk_grade" TEXT;

-- CreateTable
CREATE TABLE "FatherStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "FatherStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotherStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "MotherStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "Gender"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_religion_id_fkey" FOREIGN KEY ("religion_id") REFERENCES "Religion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_citizenship_id_fkey" FOREIGN KEY ("citizenship_id") REFERENCES "Citizenship"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_marital_status_id_fkey" FOREIGN KEY ("marital_status_id") REFERENCES "MaritalStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_subdistrict_id_fkey" FOREIGN KEY ("subdistrict_id") REFERENCES "SubDistrict"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_education_history_id_fkey" FOREIGN KEY ("education_history_id") REFERENCES "EducationHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_father_status_id_fkey" FOREIGN KEY ("father_status_id") REFERENCES "FatherStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_mother_status_id_fkey" FOREIGN KEY ("mother_status_id") REFERENCES "MotherStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_disabilities_id_fkey" FOREIGN KEY ("disabilities_id") REFERENCES "Disabilities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_scholarship_id_fkey" FOREIGN KEY ("scholarship_id") REFERENCES "Scholarship"("id") ON DELETE SET NULL ON UPDATE CASCADE;
