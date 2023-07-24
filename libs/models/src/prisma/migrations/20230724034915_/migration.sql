/*
  Warnings:

  - You are about to drop the column `academic_year` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `identification_number` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `identification_type` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `kk_number` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `nim` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `parent_phone_number` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `parent_rt` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `parent_rw` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `program` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `registration_wave` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `rt` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `rw` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `selection_type` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `nik` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nik]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nik` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Students_nim_key";

-- DropIndex
DROP INDEX "Users_nik_key";

-- AlterTable
ALTER TABLE "Students" DROP COLUMN "academic_year",
DROP COLUMN "identification_number",
DROP COLUMN "identification_type",
DROP COLUMN "kk_number",
DROP COLUMN "nim",
DROP COLUMN "parent_phone_number",
DROP COLUMN "parent_rt",
DROP COLUMN "parent_rw",
DROP COLUMN "phone_number",
DROP COLUMN "program",
DROP COLUMN "registration_wave",
DROP COLUMN "rt",
DROP COLUMN "rw",
DROP COLUMN "selection_type",
ADD COLUMN     "father_status" TEXT,
ADD COLUMN     "guardiang_address" TEXT,
ADD COLUMN     "guardiang_city" TEXT,
ADD COLUMN     "guardiang_postal_code" TEXT,
ADD COLUMN     "guardiang_province" TEXT,
ADD COLUMN     "guardiang_status" TEXT,
ADD COLUMN     "guardiang_subdistrict" TEXT,
ADD COLUMN     "mother_status" TEXT,
ADD COLUMN     "nik" TEXT NOT NULL,
ADD COLUMN     "parent_city" TEXT,
ADD COLUMN     "school_npsm" TEXT;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "nik";

-- DropEnum
DROP TYPE "IdentificationType";

-- CreateIndex
CREATE UNIQUE INDEX "Students_nik_key" ON "Students"("nik");
