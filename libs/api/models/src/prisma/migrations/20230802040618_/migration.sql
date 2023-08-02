/*
  Warnings:

  - The `father_occupation` column on the `Students` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mother_occupation` column on the `Students` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `guardian_occupation` column on the `Students` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Students" DROP COLUMN "father_occupation",
ADD COLUMN     "father_occupation" TEXT,
DROP COLUMN "mother_occupation",
ADD COLUMN     "mother_occupation" TEXT,
DROP COLUMN "guardian_occupation",
ADD COLUMN     "guardian_occupation" TEXT;

-- DropEnum
DROP TYPE "Occupation";

-- CreateTable
CREATE TABLE "Occupation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Occupation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OccupationPosition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "occupation_id" INTEGER,

    CONSTRAINT "OccupationPosition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OccupationPosition" ADD CONSTRAINT "OccupationPosition_occupation_id_fkey" FOREIGN KEY ("occupation_id") REFERENCES "Occupation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
