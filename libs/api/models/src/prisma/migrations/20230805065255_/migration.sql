-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "citizenship_id" INTEGER;

-- CreateTable
CREATE TABLE "Scholarship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Scholarship_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_citizenship_id_fkey" FOREIGN KEY ("citizenship_id") REFERENCES "Citizenship"("id") ON DELETE SET NULL ON UPDATE CASCADE;
