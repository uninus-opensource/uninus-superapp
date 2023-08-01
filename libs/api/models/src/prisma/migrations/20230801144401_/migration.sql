/*
  Warnings:

  - You are about to drop the `BachelorDegree` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MasterDegree` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "degreeProgram_id" INTEGER;

-- DropTable
DROP TABLE "BachelorDegree";

-- DropTable
DROP TABLE "MasterDegree";

-- CreateTable
CREATE TABLE "DegreeProgram" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DegreeProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationHistory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EducationHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_degreeProgram_id_fkey" FOREIGN KEY ("degreeProgram_id") REFERENCES "DegreeProgram"("id") ON DELETE SET NULL ON UPDATE CASCADE;
