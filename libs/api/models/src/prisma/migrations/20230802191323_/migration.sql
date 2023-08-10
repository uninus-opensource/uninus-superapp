/*
  Warnings:

  - You are about to drop the `RegistrationStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "RegistrationStatus";

-- CreateTable
CREATE TABLE "SelectionPath" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SelectionPath_pkey" PRIMARY KEY ("id")
);
