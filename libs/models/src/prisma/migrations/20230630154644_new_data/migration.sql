-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('ISLAM', 'KRISTEN', 'KATHOLIK', 'KONGHUCU', 'HINDU', 'BUDHA');

-- CreateEnum
CREATE TYPE "Citizenship" AS ENUM ('WNI', 'WNA');

-- CreateEnum
CREATE TYPE "IdentificationType" AS ENUM ('KTP', 'SIM', 'KartuPelajar');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT,
    "role_id" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "photo" TEXT DEFAULT null
);

-- CreateTable
CREATE TABLE "Students" (
    "id" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "identification_type" "IdentificationType" NOT NULL,
    "identification_number" TEXT NOT NULL,
    "kk_number" TEXT NOT NULL,
    "school_type" TEXT NOT NULL,
    "school_major" TEXT NOT NULL,
    "school_name" TEXT NOT NULL,
    "school_address" TEXT NOT NULL,
    "school_postal_code" TEXT NOT NULL,
    "school_subdistrict" TEXT NOT NULL,
    "school_province" TEXT NOT NULL,
    "school_city" TEXT NOT NULL,
    "school_phone_number" TEXT NOT NULL,
    "graduation_year" TEXT NOT NULL,
    "father_name" TEXT NOT NULL,
    "mother_name" TEXT NOT NULL,
    "guardian_name" TEXT NOT NULL,
    "parent_address" TEXT NOT NULL,
    "parent_rt" TEXT NOT NULL,
    "parent_rw" TEXT NOT NULL,
    "parent_postal_code" TEXT NOT NULL,
    "parent_subdistrict" TEXT NOT NULL,
    "parent_province" TEXT NOT NULL,
    "parent_phone_number" TEXT NOT NULL,
    "father_education" TEXT NOT NULL,
    "mother_education" TEXT NOT NULL,
    "guardian_education" TEXT,
    "father_occupation" TEXT NOT NULL,
    "mother_occupation" TEXT NOT NULL,
    "guardian_occupation" TEXT,
    "father_income" TEXT NOT NULL,
    "mother_income" TEXT NOT NULL,
    "guardian_income" TEXT,
    "selection_type" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "registration_wave" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "profile_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "place_of_birth" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "religion" "Religion" NOT NULL,
    "citizenship" "Citizenship" NOT NULL,
    "marital_status" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "rt" TEXT NOT NULL,
    "rw" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "subdistrict" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Lecturers" (
    "id" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profile_id" TEXT
);

-- CreateTable
CREATE TABLE "Employees" (
    "id" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profile_id" TEXT
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
CREATE TABLE "_PermissionsToRoles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_nik_key" ON "Users"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Students_id_key" ON "Students"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Students_nim_key" ON "Students"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Students_user_id_key" ON "Students"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Students_profile_id_key" ON "Students"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lecturers_id_key" ON "Lecturers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lecturers_nip_key" ON "Lecturers"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "Lecturers_user_id_key" ON "Lecturers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Lecturers_profile_id_key" ON "Lecturers"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_id_key" ON "Employees"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_nim_key" ON "Employees"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_user_id_key" ON "Employees"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_profile_id_key" ON "Employees"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionsToRoles_AB_unique" ON "_PermissionsToRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionsToRoles_B_index" ON "_PermissionsToRoles"("B");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecturers" ADD CONSTRAINT "Lecturers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecturers" ADD CONSTRAINT "Lecturers_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesPermissions" ADD CONSTRAINT "RolesPermissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesPermissions" ADD CONSTRAINT "RolesPermissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionsToRoles" ADD CONSTRAINT "_PermissionsToRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "Permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionsToRoles" ADD CONSTRAINT "_PermissionsToRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
