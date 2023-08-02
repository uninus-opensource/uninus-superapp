/*
  Warnings:

  - The `religion` column on the `Students` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Students" DROP COLUMN "religion",
ADD COLUMN     "religion" TEXT;

-- DropEnum
DROP TYPE "Religion";

-- CreateTable
CREATE TABLE "MaritalStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MaritalStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Religion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Religion_pkey" PRIMARY KEY ("id")
);
