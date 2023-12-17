import { relations } from "drizzle-orm";
import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import {
  users,
  paymentHistory,
  citizenship,
  country,
  province,
  city,
  subdistrict,
  religion,
  maritalStatus,
  gender,
  salary,
  occupation,
  parentStatus,
  parentEducation,
  lastEducations,
  lastEducationMajor,
  lastEducationType,
  documents,
  scholarship,
  disabilities,
  faculty,
  department,
} from "..";

export const students = pgTable("app_students", {
  id: uuid("id").defaultRandom().primaryKey(),
  nik: text("nik").unique(),
  nisn: text("nisn"),
  kk: text("kk"),
  genderId: uuid("gender_id").references(() => gender.id),
  religionId: uuid("religion_id").references(() => religion.id),
  birthPlace: text("birth_place"),
  birthDate: text("birth_date"),
  phoneNumber: text("phone_number").unique(),
  citizenshipId: uuid("citizenship_id").references(() => citizenship.id),
  maritalStatusId: uuid("marital_status_id").references(() => maritalStatus.id),
  countryId: uuid("country_id").references(() => country.id),
  address: text("address"),
  provinceId: uuid("province_id").references(() => province.id),
  cityId: uuid("city_id").references(() => city.id),
  subdistrictId: uuid("subdistrict_id").references(() => subdistrict.id),
  lastEducationNpsn: uuid("last_education_npsn").references(() => lastEducations.npsn),
  lastEducationMajorId: uuid("last_education_major_id").references(() => lastEducationMajor.id),
  lastEducationTypeId: uuid("last_education_type_id").references(() => lastEducationType.id),
  salaryId: uuid("salary_id").references(() => salary.id),
  occupationId: uuid("occupation_id").references(() => occupation.id),
  position: text("position"),
  graduationYear: text("graduation_year"),
  companyName: text("company_name"),
  companyAddress: text("company_address"),
  fatherName: text("father_name"),
  fatherStatusId: uuid("father_status_id").references(() => parentStatus.id),
  fatherEducationId: uuid("father_education_id").references(() => parentEducation.id),
  fatherOccupationId: uuid("father_occupation_id").references(() => occupation.id),
  fatherPosition: text("father_position"),
  fatherSalaryId: uuid("father_salary_id").references(() => salary.id),
  motherName: text("mother_name"),
  motherStatusId: uuid("mother_status_id").references(() => parentStatus.id),
  motherEducationId: uuid("mother_education_id").references(() => parentEducation.id),
  motherOccupationId: uuid("mother_occupation_id").references(() => occupation.id),
  motherPosition: text("mother_position"),
  motherSalaryId: uuid("mother_salary_id").references(() => salary.id),
  parentProvinceId: uuid("parent_province_id").references(() => province.id),
  parentCityId: uuid("parent_city_id").references(() => city.id),
  parentSubdistrictId: uuid("parent_subdistrict_id").references(() => subdistrict.id),
  parentAddress: text("parent_address"),
  guardianName: text("guardian_name"),
  guardianStatusId: uuid("guardian_status_id").references(() => parentStatus.id),
  guardianProvinceId: uuid("guardian_province_id").references(() => province.id),
  guardianCityId: uuid("guardian_city_id").references(() => city.id),
  guardianSubdistrictId: uuid("guardian_subdistrict_id").references(() => subdistrict.id),
  guardianAddress: text("guardian_address"),
  guardianOccupationId: uuid("guardian_occupation_id").references(() => occupation.id),
  guardianPosition: text("guardian_position"),
  scholarshipId: uuid("scholarship_id").references(() => scholarship.id),
  disabilitiesId: uuid("dissabilities_id").references(() => disabilities.id),
  academicYear: text("academic_year"),
  facultyId: uuid("faculty_id").references(() => faculty.id),
  departmentId: uuid("department_id").references(() => department.id),

  studentStatusId: uuid("student_status_id").references(() => studentStatus.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),

  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const studentsRelations = relations(students, ({ one, many }) => ({
  studentStatus: one(studentStatus, {
    fields: [students.studentStatusId],
    references: [studentStatus.id],
  }),
  citizenship: one(citizenship, {
    fields: [students.citizenshipId],
    references: [citizenship.id],
  }),
  country: one(country, {
    fields: [students.countryId],
    references: [country.id],
  }),
  province: one(province, {
    fields: [students.provinceId],
    references: [province.id],
  }),
  city: one(city, {
    fields: [students.cityId],
    references: [city.id],
  }),
  subdistrict: one(subdistrict, {
    fields: [students.subdistrictId],
    references: [subdistrict.id],
  }),
  paymentHistory: many(paymentHistory),
  documents: many(documents),
}));

export const studentStatus = pgTable("app_student_status", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const studentStatusRelations = relations(studentStatus, ({ many }) => ({
  students: many(students),
}));
