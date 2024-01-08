import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
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
  lecturers,
  admission,
} from "..";

export const students = pgTable("app_students", {
  id: uuid("id").defaultRandom().primaryKey(),
  nik: text("nik").unique(),
  nisn: text("nisn"),
  kk: text("kk"),
  nim: text("nim"),
  guardianLecturerId: uuid("guardian_lecturer_id").references(() => lecturers.id),
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
  lastEducationNpsn: text("last_education_npsn").references(() => lastEducations.npsn),
  lastEducationMajorId: uuid("last_education_major_id").references(() => lastEducationMajor.id),
  lastEducationTypeId: uuid("last_education_type_id").references(() => lastEducationType.id),
  salaryId: uuid("salary_id").references(() => salary.id),
  occupationId: uuid("occupation_id").references(() => occupation.id),
  position: text("position"),
  lastEducationGraduation: text("last_education_graduation"),
  companyName: text("company_name"),
  companyAddress: text("company_address"),
  workingStatusId: uuid("working_status").references(() => workingStatus.id),
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
  guardianEducationId: uuid("guardian_education_id").references(() => parentEducation.id),
  guardianOccupationId: uuid("guardian_occupation_id").references(() => occupation.id),
  guardianSalaryId: uuid("guardian_salary_id").references(() => salary.id),
  guardianPosition: text("guardian_position"),
  scholarshipId: uuid("scholarship_id").references(() => scholarship.id),
  disabilitiesId: uuid("dissabilities_id").references(() => disabilities.id),
  academicYear: text("academic_year"),
  graduationYear: text("graduation_year"),
  facultyId: uuid("faculty_id").references(() => faculty.id),
  departmentId: uuid("department_id").references(() => department.id),
  studentStatusId: uuid("student_status_id").references(() => studentStatus.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const studentsRelations = relations(students, ({ one, many }) => ({
  workingStatus: one(workingStatus, {
    fields: [students.workingStatusId],
    references: [workingStatus.id],
  }),
  guardianLecturer: one(lecturers, {
    fields: [students.guardianLecturerId],
    references: [lecturers.id],
  }),
  gender: one(gender, {
    fields: [students.genderId],
    references: [gender.id],
  }),
  religion: one(religion, {
    fields: [students.religionId],
    references: [religion.id],
  }),
  citizenship: one(citizenship, {
    fields: [students.citizenshipId],
    references: [citizenship.id],
  }),
  maritalStatus: one(maritalStatus, {
    fields: [students.maritalStatusId],
    references: [maritalStatus.id],
  }),
  country: one(country, {
    fields: [students.countryId],
    references: [country.id],
  }),
  province: one(province, {
    fields: [students.provinceId],
    references: [province.id],
    relationName: "students_province",
  }),
  city: one(city, {
    fields: [students.cityId],
    references: [city.id],
    relationName: "students_city",
  }),
  subdistrict: one(subdistrict, {
    fields: [students.subdistrictId],
    references: [subdistrict.id],
    relationName: "students_subdistrict",
  }),
  lastEducation: one(lastEducations, {
    fields: [students.lastEducationNpsn],
    references: [lastEducations.npsn],
  }),
  lastEducationMajor: one(lastEducationMajor, {
    fields: [students.lastEducationMajorId],
    references: [lastEducationMajor.id],
  }),
  lastEducationType: one(lastEducationType, {
    fields: [students.lastEducationTypeId],
    references: [lastEducationType.id],
  }),
  salary: one(salary, {
    fields: [students.salaryId],
    references: [salary.id],
    relationName: "students_salary",
  }),
  occupation: one(occupation, {
    fields: [students.occupationId],
    references: [occupation.id],
    relationName: "students_occupation",
  }),
  fatherStatus: one(parentStatus, {
    fields: [students.fatherStatusId],
    references: [parentStatus.id],
    relationName: "fathers_status",
  }),
  fatherEducation: one(parentEducation, {
    fields: [students.fatherEducationId],
    references: [parentEducation.id],
    relationName: "fathers_education",
  }),
  fatherOccupation: one(occupation, {
    fields: [students.fatherOccupationId],
    references: [occupation.id],
    relationName: "fathers_occupation",
  }),
  fatherSalary: one(salary, {
    fields: [students.fatherSalaryId],
    references: [salary.id],
    relationName: "fathers_salary",
  }),

  motherStatus: one(parentStatus, {
    fields: [students.motherStatusId],
    references: [parentStatus.id],
    relationName: "mothers_status",
  }),
  motherEducation: one(parentEducation, {
    fields: [students.motherEducationId],
    references: [parentEducation.id],
    relationName: "mothers_education",
  }),
  motherOccupation: one(occupation, {
    fields: [students.motherOccupationId],
    references: [occupation.id],
    relationName: "mothers_occupation",
  }),
  motherSalary: one(salary, {
    fields: [students.motherSalaryId],
    references: [salary.id],
    relationName: "mothers_salary",
  }),
  parentProvince: one(province, {
    fields: [students.parentProvinceId],
    references: [province.id],
    relationName: "parents_province",
  }),
  parentCity: one(city, {
    fields: [students.parentCityId],
    references: [city.id],
    relationName: "parents_city",
  }),
  parentSubdistrict: one(subdistrict, {
    fields: [students.parentSubdistrictId],
    references: [subdistrict.id],
    relationName: "parents_subdistrict",
  }),

  guardianStatus: one(parentStatus, {
    fields: [students.guardianStatusId],
    references: [parentStatus.id],
    relationName: "guardians_status",
  }),
  guardianProvince: one(province, {
    fields: [students.guardianProvinceId],
    references: [province.id],
    relationName: "guardians_province",
  }),
  guardianCity: one(city, {
    fields: [students.guardianCityId],
    references: [city.id],
    relationName: "guardians_city",
  }),
  guardianSubdistrict: one(subdistrict, {
    fields: [students.guardianSubdistrictId],
    references: [subdistrict.id],
    relationName: "guardians_subdistrict",
  }),
  guardianEducation: one(parentEducation, {
    fields: [students.guardianEducationId],
    references: [parentEducation.id],
    relationName: "guardians_education",
  }),
  guardianOccupation: one(occupation, {
    fields: [students.guardianOccupationId],
    references: [occupation.id],
    relationName: "guardians_occupation",
  }),
  guardianSalary: one(salary, {
    fields: [students.guardianSalaryId],
    references: [salary.id],
    relationName: "guardians_salary",
  }),
  scholarship: one(scholarship, {
    fields: [students.scholarshipId],
    references: [scholarship.id],
  }),
  disabilities: one(disabilities, {
    fields: [students.disabilitiesId],
    references: [disabilities.id],
  }),
  faculty: one(faculty, {
    fields: [students.facultyId],
    references: [faculty.id],
  }),
  department: one(department, {
    fields: [students.departmentId],
    references: [department.id],
  }),
  studentStatus: one(studentStatus, {
    fields: [students.studentStatusId],
    references: [studentStatus.id],
  }),

  paymentHistory: many(paymentHistory),
  documents: many(documents),
  user: one(users, {
    fields: [students.userId],
    references: [users.id],
  }),
  admission: one(admission, {
    fields: [students.id],
    references: [admission.studentId],
  }),
}));

export const studentStatus = pgTable("app_student_status", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const studentStatusRelations = relations(studentStatus, ({ many }) => ({
  students: many(students),
}));

export const workingStatus = pgTable("app_working_status", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const workingStatusRelations = relations(workingStatus, ({ many }) => ({
  students: many(students),
}));
