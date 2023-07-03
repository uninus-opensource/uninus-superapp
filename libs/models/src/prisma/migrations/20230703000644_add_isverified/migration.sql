/*
  Warnings:

  - A unique constraint covering the columns `[refresh_token]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `fullname` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "isVerified" BOOLEAN DEFAULT false,
ALTER COLUMN "fullname" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_refresh_token_key" ON "Users"("refresh_token");
