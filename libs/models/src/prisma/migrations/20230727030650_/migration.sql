-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_province_id_fkey";

-- DropForeignKey
ALTER TABLE "SubDistrict" DROP CONSTRAINT "SubDistrict_city_id_fkey";

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubDistrict" ADD CONSTRAINT "SubDistrict_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
