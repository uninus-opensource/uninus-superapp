-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('Islam', 'Kristen', 'Katolik', 'Konghucu', 'Hindu', 'Budha');

-- CreateEnum
CREATE TYPE "Citizenship" AS ENUM ('WNI', 'WNA');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT,
    "role_id" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatar" TEXT,
    "isVerified" BOOLEAN DEFAULT false
);

-- CreateTable
CREATE TABLE "Students" (
    "id" TEXT NOT NULL,
    "nik" TEXT,
    "nisn" TEXT,
    "birth_place" TEXT,
    "birth_date" TEXT,
    "gender" "Gender",
    "phone_number" TEXT,
    "religion" "Religion",
    "citizenship" "Citizenship",
    "marital_status" TEXT,
    "country" TEXT,
    "address" TEXT,
    "postal_code" TEXT,
    "subdistrict" TEXT,
    "province" TEXT,
    "city" TEXT,
    "school_type" TEXT,
    "graduation_year" TEXT,
    "school_major" TEXT,
    "school_name" TEXT,
    "school_npsm" TEXT,
    "school_address" TEXT,
    "school_postal_code" TEXT,
    "school_subdistrict" TEXT,
    "school_province" TEXT,
    "school_city" TEXT,
    "school_phone_number" TEXT,
    "father_name" TEXT,
    "mother_name" TEXT,
    "guardian_name" TEXT,
    "father_status" TEXT,
    "mother_status" TEXT,
    "guardian_status" TEXT,
    "parent_address" TEXT,
    "parent_postal_code" TEXT,
    "parent_subdistrict" TEXT,
    "parent_province" TEXT,
    "parent_city" TEXT,
    "father_education" TEXT,
    "mother_education" TEXT,
    "guardian_education" TEXT,
    "father_occupation" TEXT,
    "mother_occupation" TEXT,
    "guardian_occupation" TEXT,
    "father_income" TEXT,
    "mother_income" TEXT,
    "guardian_income" TEXT,
    "guardian_address" TEXT,
    "guardian_postal_code" TEXT,
    "guardian_subdistrict" TEXT,
    "guardian_province" TEXT,
    "guardian_city" TEXT,
    "faculty_type" TEXT,
    "education_programs" TEXT,
    "study_program" TEXT,
    "selection_type" TEXT,
    "family_card" TEXT,
    "pass_photo" TEXT,
    "ktp_card" TEXT,
    "school_report_card" TEXT,
    "birth_certificate" TEXT,
    "additional_documents" TEXT,
    "ijazah_card" TEXT,
    "kipk_card" TEXT,
    "academic_year" TEXT,
    "registration_wave" TEXT,
    "registration_status" TEXT,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Lecturers" (
    "id" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Employees" (
    "id" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Province" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "province_id" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubDistrict" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "SubDistrict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolesPermissions" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RolesPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OTP" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expiredAt" INTEGER NOT NULL,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermissionsToRoles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Students_id_key" ON "Students"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Students_nik_key" ON "Students"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "Students_nisn_key" ON "Students"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "Students_user_id_key" ON "Students"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Lecturers_id_key" ON "Lecturers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lecturers_nip_key" ON "Lecturers"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "Lecturers_user_id_key" ON "Lecturers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_id_key" ON "Employees"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_nim_key" ON "Employees"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_user_id_key" ON "Employees"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "OTP_user_id_key" ON "OTP"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionsToRoles_AB_unique" ON "_PermissionsToRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionsToRoles_B_index" ON "_PermissionsToRoles"("B");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecturers" ADD CONSTRAINT "Lecturers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubDistrict" ADD CONSTRAINT "SubDistrict_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesPermissions" ADD CONSTRAINT "RolesPermissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesPermissions" ADD CONSTRAINT "RolesPermissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionsToRoles" ADD CONSTRAINT "_PermissionsToRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "Permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionsToRoles" ADD CONSTRAINT "_PermissionsToRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
