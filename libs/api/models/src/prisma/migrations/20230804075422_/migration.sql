/*
  Warnings:

  - You are about to drop the `RegistrationStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "degree_program_id" INTEGER;

-- DropTable
DROP TABLE "RegistrationStatus";

-- CreateTable
CREATE TABLE "SelectionPath" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SelectionPath_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_degree_program_id_fkey" FOREIGN KEY ("degree_program_id") REFERENCES "DegreeProgram"("id") ON DELETE SET NULL ON UPDATE CASCADE;
