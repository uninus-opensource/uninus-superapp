/*
  Warnings:

  - You are about to drop the column `school_npsm` on the `Students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Students" DROP COLUMN "school_npsm",
ADD COLUMN     "school_npsn" TEXT;
