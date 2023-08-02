/*
  Warnings:

  - You are about to drop the column `citizenshipId` on the `Students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Students" DROP COLUMN "citizenshipId";

-- CreateTable
CREATE TABLE "RegistrationStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RegistrationStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BachelorDegree" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BachelorDegree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterDegree" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MasterDegree_pkey" PRIMARY KEY ("id")
);
