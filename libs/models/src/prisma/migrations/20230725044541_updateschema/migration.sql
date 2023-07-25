/*
  Warnings:

  - You are about to drop the column `program` on the `Students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Students" DROP COLUMN "program",
ADD COLUMN     "additional_documents" TEXT,
ADD COLUMN     "birth_certificate" TEXT,
ADD COLUMN     "education_programs" TEXT,
ADD COLUMN     "faculty_type" TEXT,
ADD COLUMN     "family_card" TEXT,
ADD COLUMN     "ijazah_card" TEXT,
ADD COLUMN     "kipk_card" TEXT,
ADD COLUMN     "ktp_card" TEXT,
ADD COLUMN     "pass_photo" TEXT,
ADD COLUMN     "registration_status" TEXT,
ADD COLUMN     "school_report_card" TEXT,
ADD COLUMN     "study_program" TEXT;
