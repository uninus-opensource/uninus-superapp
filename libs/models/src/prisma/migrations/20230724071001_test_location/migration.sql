-- CreateTable
CREATE TABLE "Province" (
    "autoId" SERIAL NOT NULL,
    "apiId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("autoId")
);

-- CreateTable
CREATE TABLE "City" (
    "autoId" SERIAL NOT NULL,
    "apiId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provinceId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("autoId")
);

-- CreateTable
CREATE TABLE "District" (
    "autoId" SERIAL NOT NULL,
    "apiId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("autoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Province_apiId_key" ON "Province"("apiId");

-- CreateIndex
CREATE UNIQUE INDEX "City_apiId_key" ON "City"("apiId");

-- CreateIndex
CREATE UNIQUE INDEX "District_apiId_key" ON "District"("apiId");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("apiId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("apiId") ON DELETE RESTRICT ON UPDATE CASCADE;
