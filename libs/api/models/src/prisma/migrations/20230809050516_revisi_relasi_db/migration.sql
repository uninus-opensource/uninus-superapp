/*
  Warnings:

  - You are about to drop the column `additional_documents_id` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `english_language_grade_id` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `indonesian_language_grade_id` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `math_grade_id` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_report_card_id` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the `AdditionalDocuments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EnglishLangGrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IndonesianLangGrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MathGrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SchoolReportCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SchoolType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_additional_documents_id_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_english_language_grade_id_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_indonesian_language_grade_id_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_math_grade_id_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_school_report_card_id_fkey";

-- AlterTable
ALTER TABLE "Students" DROP COLUMN "additional_documents_id",
DROP COLUMN "english_language_grade_id",
DROP COLUMN "indonesian_language_grade_id",
DROP COLUMN "math_grade_id",
DROP COLUMN "school_report_card_id",
ADD COLUMN     "assignment_certificate" TEXT,
ADD COLUMN     "engl_grade_first_semester" INTEGER,
ADD COLUMN     "engl_grade_forth_semester" INTEGER,
ADD COLUMN     "engl_grade_second_semester" INTEGER,
ADD COLUMN     "engl_grade_third_semester" INTEGER,
ADD COLUMN     "indo_grade_first_semester" INTEGER,
ADD COLUMN     "indo_grade_forth_semester" INTEGER,
ADD COLUMN     "indo_grade_second_semester" INTEGER,
ADD COLUMN     "indo_grade_thrid_semester" INTEGER,
ADD COLUMN     "math_grade_first_semester" INTEGER,
ADD COLUMN     "math_grade_forth_semester" INTEGER,
ADD COLUMN     "math_grade_second_semester" INTEGER,
ADD COLUMN     "math_grade_third_semester" INTEGER,
ADD COLUMN     "medical_certificate" TEXT,
ADD COLUMN     "non_academic_certificate" TEXT,
ADD COLUMN     "nu_membership" TEXT,
ADD COLUMN     "quran_certificate" TEXT,
ADD COLUMN     "school_report_card_first_semester" TEXT,
ADD COLUMN     "school_report_card_forth_semester" TEXT,
ADD COLUMN     "school_report_card_second_semester" TEXT,
ADD COLUMN     "school_report_card_third_semester" TEXT,
ALTER COLUMN "utbk_grade" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "AdditionalDocuments";

-- DropTable
DROP TABLE "EnglishLangGrade";

-- DropTable
DROP TABLE "IndonesianLangGrade";

-- DropTable
DROP TABLE "MathGrade";

-- DropTable
DROP TABLE "SchoolReportCard";

-- DropTable
DROP TABLE "SchoolType";
