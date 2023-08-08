/*
  Warnings:

  - You are about to drop the column `citizenship` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `marital_status` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_address` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_city` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_name` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_npsn` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_province` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_subdistrict` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `school_type` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `subdistrict` on the `Students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Students" DROP COLUMN "citizenship",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "gender",
DROP COLUMN "marital_status",
DROP COLUMN "province",
DROP COLUMN "religion",
DROP COLUMN "school_address",
DROP COLUMN "school_city",
DROP COLUMN "school_name",
DROP COLUMN "school_npsn",
DROP COLUMN "school_province",
DROP COLUMN "school_subdistrict",
DROP COLUMN "school_type",
DROP COLUMN "subdistrict",
ADD COLUMN     "citizenship_id" INTEGER,
ADD COLUMN     "city_id" INTEGER,
ADD COLUMN     "country_id" INTEGER,
ADD COLUMN     "education_history_id" INTEGER,
ADD COLUMN     "gender_id" INTEGER,
ADD COLUMN     "marital_status_id" INTEGER,
ADD COLUMN     "province_id" INTEGER,
ADD COLUMN     "religion_id" INTEGER,
ADD COLUMN     "school_type_id" INTEGER,
ADD COLUMN     "subdistrict_id" INTEGER;

-- CreateTable
CREATE TABLE "SchoolType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SchoolType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "Gender"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_religion_id_fkey" FOREIGN KEY ("religion_id") REFERENCES "Religion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_citizenship_id_fkey" FOREIGN KEY ("citizenship_id") REFERENCES "Citizenship"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_marital_status_id_fkey" FOREIGN KEY ("marital_status_id") REFERENCES "MaritalStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_subdistrict_id_fkey" FOREIGN KEY ("subdistrict_id") REFERENCES "SubDistrict"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_school_type_id_fkey" FOREIGN KEY ("school_type_id") REFERENCES "SchoolType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_education_history_id_fkey" FOREIGN KEY ("education_history_id") REFERENCES "EducationHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
