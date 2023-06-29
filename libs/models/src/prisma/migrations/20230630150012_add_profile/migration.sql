/*
  Warnings:

  - You are about to drop the column `photo` on the `Users` table. All the data in the column will be lost.
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
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('Islam', 'Kristen', 'Katholik', 'Konghucu', 'Hindu', 'Budha');

-- CreateEnum
CREATE TYPE "Citizenship" AS ENUM ('WNI', 'WNA');

-- CreateEnum
CREATE TYPE "IdentificationType" AS ENUM ('KTP', 'SIM', 'Kartu Pelajar');

-- DropForeignKey
ALTER TABLE "Employees" DROP CONSTRAINT "Employees_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Lecturers" DROP CONSTRAINT "Lecturers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_user_id_fkey";

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
ALTER TABLE "Users" DROP COLUMN "photo",
ADD COLUMN     "avatar" TEXT DEFAULT null;

-- CreateTable
CREATE TABLE "Profiles" (
    "id" TEXT NOT NULL,
    "birth_place" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
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
    "phone_number" TEXT NOT NULL,
    "student_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_id_key" ON "Profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_student_id_key" ON "Profiles"("student_id");

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecturers" ADD CONSTRAINT "Lecturers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
