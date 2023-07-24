/*
  Warnings:

  - You are about to drop the column `guardiang_status` on the `Students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Students" DROP COLUMN "guardiang_status",
ADD COLUMN     "guardian_status" TEXT;
