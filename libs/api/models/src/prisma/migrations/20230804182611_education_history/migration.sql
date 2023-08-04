/*
  Warnings:

  - A unique constraint covering the columns `[npsn]` on the table `EducationHistory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `district_city` to the `EducationHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `npsn` to the `EducationHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `EducationHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_address` to the `EducationHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_district` to the `EducationHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EducationHistory" ADD COLUMN     "district_city" TEXT NOT NULL,
ADD COLUMN     "npsn" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "street_address" TEXT NOT NULL,
ADD COLUMN     "sub_district" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EducationHistory_npsn_key" ON "EducationHistory"("npsn");
