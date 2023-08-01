/*
  Warnings:

  - The `gender` column on the `Students` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `citizenship` column on the `Students` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "citizenshipId" INTEGER,
DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT,
DROP COLUMN "citizenship",
ADD COLUMN     "citizenship" TEXT;

-- DropEnum
DROP TYPE "Citizenship";

-- DropEnum
DROP TYPE "Gender";

-- CreateTable
CREATE TABLE "Gender" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Citizenship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Citizenship_pkey" PRIMARY KEY ("id")
);
