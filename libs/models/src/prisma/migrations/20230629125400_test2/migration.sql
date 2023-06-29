/*
  Warnings:

  - A unique constraint covering the columns `[profile_id]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profile_id]` on the table `Lecturers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profile_id]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `academic_year` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_education` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_income` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_name` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_occupation` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `graduation_year` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guardian_name` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identification_number` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identification_type` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kk_number` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mother_education` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mother_income` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mother_name` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mother_occupation` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nisn` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_address` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_phone_number` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_postal_code` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_province` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_rt` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_rw` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_subdistrict` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `program` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration_wave` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_address` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_city` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_major` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_name` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_phone_number` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_postal_code` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_province` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_subdistrict` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_type` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selection_type` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('ISLAM', 'KRISTEN', 'KATHOLIK', 'KONGHUCU', 'HINDU', 'BUDHA');

-- CreateEnum
CREATE TYPE "Citizenship" AS ENUM ('WNI', 'WNA');

-- CreateEnum
CREATE TYPE "IdentificationType" AS ENUM ('KTP', 'SIM', 'KartuPelajar');

-- AlterTable
ALTER TABLE "Employees" ADD COLUMN     "profile_id" TEXT;

-- AlterTable
ALTER TABLE "Lecturers" ADD COLUMN     "profile_id" TEXT;

-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "academic_year" TEXT NOT NULL,
ADD COLUMN     "father_education" TEXT NOT NULL,
ADD COLUMN     "father_income" TEXT NOT NULL,
ADD COLUMN     "father_name" TEXT NOT NULL,
ADD COLUMN     "father_occupation" TEXT NOT NULL,
ADD COLUMN     "graduation_year" TEXT NOT NULL,
ADD COLUMN     "guardian_education" TEXT,
ADD COLUMN     "guardian_income" TEXT,
ADD COLUMN     "guardian_name" TEXT NOT NULL,
ADD COLUMN     "guardian_occupation" TEXT,
ADD COLUMN     "identification_number" TEXT NOT NULL,
ADD COLUMN     "identification_type" "IdentificationType" NOT NULL,
ADD COLUMN     "kk_number" TEXT NOT NULL,
ADD COLUMN     "mother_education" TEXT NOT NULL,
ADD COLUMN     "mother_income" TEXT NOT NULL,
ADD COLUMN     "mother_name" TEXT NOT NULL,
ADD COLUMN     "mother_occupation" TEXT NOT NULL,
ADD COLUMN     "nisn" TEXT NOT NULL,
ADD COLUMN     "parent_address" TEXT NOT NULL,
ADD COLUMN     "parent_phone_number" TEXT NOT NULL,
ADD COLUMN     "parent_postal_code" TEXT NOT NULL,
ADD COLUMN     "parent_province" TEXT NOT NULL,
ADD COLUMN     "parent_rt" TEXT NOT NULL,
ADD COLUMN     "parent_rw" TEXT NOT NULL,
ADD COLUMN     "parent_subdistrict" TEXT NOT NULL,
ADD COLUMN     "profile_id" TEXT,
ADD COLUMN     "program" TEXT NOT NULL,
ADD COLUMN     "registration_wave" TEXT NOT NULL,
ADD COLUMN     "school_address" TEXT NOT NULL,
ADD COLUMN     "school_city" TEXT NOT NULL,
ADD COLUMN     "school_major" TEXT NOT NULL,
ADD COLUMN     "school_name" TEXT NOT NULL,
ADD COLUMN     "school_phone_number" TEXT NOT NULL,
ADD COLUMN     "school_postal_code" TEXT NOT NULL,
ADD COLUMN     "school_province" TEXT NOT NULL,
ADD COLUMN     "school_subdistrict" TEXT NOT NULL,
ADD COLUMN     "school_type" TEXT NOT NULL,
ADD COLUMN     "selection_type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "photo" SET DEFAULT null;

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "place_of_birth" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "religion" "Religion" NOT NULL,
    "citizenship" "Citizenship" NOT NULL,
    "marital_status" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "rt" TEXT NOT NULL,
    "rw" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "subdistrict" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_profile_id_key" ON "Employees"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Lecturers_profile_id_key" ON "Lecturers"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Students_profile_id_key" ON "Students"("profile_id");

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecturers" ADD CONSTRAINT "Lecturers_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
