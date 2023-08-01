/*
  Warnings:

  - The `father_occupation` column on the `Students` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mother_occupation` column on the `Students` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `guardian_occupation` column on the `Students` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Occupation" AS ENUM ('TNI', 'POLRI', 'PNS', 'Buruh', 'Swasta', 'Wirausaha', 'Wiraswasta', 'Petani', 'Guru', 'Dokter', 'Perawat', 'Peternak', 'Nelayan');

-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "father_occupation_position" TEXT,
ADD COLUMN     "guardian_occupation_position" TEXT,
ADD COLUMN     "mother_occupation_position" TEXT,
DROP COLUMN "father_occupation",
ADD COLUMN     "father_occupation" "Occupation",
DROP COLUMN "mother_occupation",
ADD COLUMN     "mother_occupation" "Occupation",
DROP COLUMN "guardian_occupation",
ADD COLUMN     "guardian_occupation" "Occupation";
