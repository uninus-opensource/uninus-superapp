/*
  Warnings:

  - You are about to drop the column `additional_documents` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `father_status` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `kipk_card` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `mother_status` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `pass_photo` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_phone_number` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_postal_code` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_report_card` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_type_id` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `study_program` on the `Students` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_school_type_id_fkey";

-- AlterTable
ALTER TABLE "Students" DROP COLUMN "additional_documents",
DROP COLUMN "father_status",
DROP COLUMN "kipk_card",
DROP COLUMN "mother_status",
DROP COLUMN "pass_photo",
DROP COLUMN "school_phone_number",
DROP COLUMN "school_postal_code",
DROP COLUMN "school_report_card",
DROP COLUMN "school_type_id",
DROP COLUMN "study_program",
ADD COLUMN     "additional_documents_id" INTEGER,
ADD COLUMN     "disabilities_id" INTEGER,
ADD COLUMN     "english_language_grade_id" INTEGER,
ADD COLUMN     "family_card_number" TEXT,
ADD COLUMN     "father_status_id" INTEGER,
ADD COLUMN     "first_study_program" TEXT,
ADD COLUMN     "indonesian_language_grade_id" INTEGER,
ADD COLUMN     "math_grade_id" INTEGER,
ADD COLUMN     "mother_status_id" INTEGER,
ADD COLUMN     "scholarship_id" INTEGER,
ADD COLUMN     "school_report_card_id" INTEGER,
ADD COLUMN     "school_type" TEXT,
ADD COLUMN     "second_study_program" TEXT,
ADD COLUMN     "utbk_certificate" TEXT,
ADD COLUMN     "utbk_grade" INTEGER;

-- CreateTable
CREATE TABLE "MathGrade" (
    "id" SERIAL NOT NULL,
    "first_semester" INTEGER,
    "second_semester" INTEGER,
    "third_semester" INTEGER,
    "fourth_semester" INTEGER,

    CONSTRAINT "MathGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndonesianLangGrade" (
    "id" SERIAL NOT NULL,
    "first_semester" INTEGER,
    "second_semester" INTEGER,
    "third_semester" INTEGER,
    "fourth_semester" INTEGER,

    CONSTRAINT "IndonesianLangGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnglishLangGrade" (
    "id" SERIAL NOT NULL,
    "first_semester" INTEGER,
    "second_semester" INTEGER,
    "third_semester" INTEGER,
    "fourth_semester" INTEGER,

    CONSTRAINT "EnglishLangGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolReportCard" (
    "id" SERIAL NOT NULL,
    "first_semester" TEXT,
    "second_semester" TEXT,
    "third_semester" TEXT,
    "fourth_semester" TEXT,

    CONSTRAINT "SchoolReportCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdditionalDocuments" (
    "id" SERIAL NOT NULL,
    "nu_membership" TEXT,
    "assignment_certificate" TEXT,
    "medical_certificate" TEXT,
    "quran_certificate" TEXT,
    "non_academic_certificate" TEXT,

    CONSTRAINT "AdditionalDocuments_pkey" PRIMARY KEY ("id")
);

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
ALTER TABLE "Students" ADD CONSTRAINT "Students_father_status_id_fkey" FOREIGN KEY ("father_status_id") REFERENCES "FatherStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_mother_status_id_fkey" FOREIGN KEY ("mother_status_id") REFERENCES "MotherStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_school_report_card_id_fkey" FOREIGN KEY ("school_report_card_id") REFERENCES "SchoolReportCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_additional_documents_id_fkey" FOREIGN KEY ("additional_documents_id") REFERENCES "AdditionalDocuments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_disabilities_id_fkey" FOREIGN KEY ("disabilities_id") REFERENCES "Disabilities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_math_grade_id_fkey" FOREIGN KEY ("math_grade_id") REFERENCES "MathGrade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_indonesian_language_grade_id_fkey" FOREIGN KEY ("indonesian_language_grade_id") REFERENCES "IndonesianLangGrade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_english_language_grade_id_fkey" FOREIGN KEY ("english_language_grade_id") REFERENCES "EnglishLangGrade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_scholarship_id_fkey" FOREIGN KEY ("scholarship_id") REFERENCES "Scholarship"("id") ON DELETE SET NULL ON UPDATE CASCADE;
