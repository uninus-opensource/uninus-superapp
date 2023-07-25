/*
  Warnings:

  - You are about to drop the column `guardiang_address` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `guardiang_city` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `guardiang_postal_code` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `guardiang_province` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `guardiang_subdistrict` on the `Students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Students" DROP COLUMN "guardiang_address",
DROP COLUMN "guardiang_city",
DROP COLUMN "guardiang_postal_code",
DROP COLUMN "guardiang_province",
DROP COLUMN "guardiang_subdistrict",
ADD COLUMN     "guardian_address" TEXT,
ADD COLUMN     "guardian_city" TEXT,
ADD COLUMN     "guardian_postal_code" TEXT,
ADD COLUMN     "guardian_province" TEXT,
ADD COLUMN     "guardian_subdistrict" TEXT;
