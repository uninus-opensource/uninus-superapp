import { pgTable, uuid, date, text, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  users,
  documents,
  maritalStatus,
  gender,
  religion,
  province,
  city,
  subdistrict,
  citizenship,
  country,
  lastEducations,
  lecturers,
  lecturerPosition,
  academicStaff,
  academicStaffPosition,
} from "..";

export const employees = pgTable("app_employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  nik: text("nik"),
  address: text("address"),
  nip: text("nip"),
  nidn: text("nidn"),
  genderId: uuid("gender_id").references(() => gender.id),
  phoneNumber: text("phone_number"),
  birthPlace: text("birth_place"),
  birthDate: text("birth_date"),
  additionTask: text("addition_task"),
  religionId: text("religion_id"),
  countryId: uuid("country_id").references(() => country.id),
  provinceId: uuid("province_id").references(() => province.id),
  cityId: uuid("city_id").references(() => city.id),
  subdistrictId: uuid("subdistrict_id").references(() => subdistrict.id),
  citizenshipId: uuid("citizenship_id").references(() => citizenship.id),
  maritalStatusId: uuid("marital_status_id").references(() => maritalStatus.id),
  employeeStatusId: uuid("employee_status_id").references(() => employeeStatus.id),
  employeeTypeId: uuid("employee_type_id").references(() => employeeType.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const employeesRelations = relations(employees, ({ one, many }) => ({
  gender: one(gender, {
    fields: [employees.genderId],
    references: [gender.id],
  }),
  religion: one(religion, {
    fields: [employees.religionId],
    references: [religion.id],
  }),
  country: one(country, {
    fields: [employees.countryId],
    references: [country.id],
  }),
  province: one(province, {
    fields: [employees.provinceId],
    references: [province.id],
  }),
  city: one(city, {
    fields: [employees.cityId],
    references: [city.id],
  }),
  subdistrict: one(subdistrict, {
    fields: [employees.subdistrictId],
    references: [subdistrict.id],
  }),
  citizenship: one(citizenship, {
    fields: [employees.citizenshipId],
    references: [citizenship.id],
  }),
  maritalStatus: one(maritalStatus, {
    fields: [employees.maritalStatusId],
    references: [maritalStatus.id],
  }),
  employeeStatus: one(employeeStatus, {
    fields: [employees.employeeStatusId],
    references: [employeeStatus.id],
  }),
  employeeType: one(employeeType, {
    fields: [employees.employeeTypeId],
    references: [employeeType.id],
  }),
  lecturer: one(lecturers, {
    fields: [employees.id],
    references: [lecturers.employeeId],
  }),
  academicStaff: one(academicStaff, {
    fields: [employees.id],
    references: [academicStaff.employeeId],
  }),
  certificationProfession: many(documents, {
    relationName: "certification_profession",
  }),
  documents: many(documents, {
    relationName: "employees",
  }),
  employeeOnEmployeeCategories: many(employeeOnEmployeeCategories),
  employeeOnLastEducation: many(employeeOnLastEducation),
  employeeOnWorkUnit: many(employeeOnWorkUnit),
}));

export const employeeStatus = pgTable("app_employee_status", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const employeeStatusRelations = relations(employeeStatus, ({ many }) => ({
  employees: many(employees),
}));

export const employeeType = pgTable("app_employee_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const employeeTypeRelations = relations(employeeType, ({ many }) => ({
  employees: many(employees),
}));

export const employeeCategories = pgTable("app_employee_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const employeeCategoriesRelations = relations(employeeCategories, ({ many }) => ({
  employeeOnEmployeeCategories: many(employeeOnEmployeeCategories),
}));

export const employeeOnEmployeeCategories = pgTable(
  "app_employee_on_employee_categories",
  {
    employeeId: uuid("employee_id")
      .notNull()
      .references(() => employees.id),
    employeeCategoriesId: uuid("employee_categories_id")
      .notNull()
      .references(() => employeeCategories.id),
  },
  (t) => ({
    pk: primaryKey(t.employeeId, t.employeeCategoriesId),
  }),
);

export const employeeOnEmployeeCategoriesRelations = relations(
  employeeOnEmployeeCategories,
  ({ one }) => ({
    employee: one(employees, {
      fields: [employeeOnEmployeeCategories.employeeId],
      references: [employees.id],
    }),
    employeeCategorie: one(employeeCategories, {
      fields: [employeeOnEmployeeCategories.employeeCategoriesId],
      references: [employeeCategories.id],
    }),
  }),
);

export const employeeOnLastEducation = pgTable(
  "app_employee_on_last_education",
  {
    employeeId: uuid("employee_id")
      .notNull()
      .references(() => employees.id),
    lastEducationNpsn: uuid("lastEducation_npsn")
      .notNull()
      .references(() => lastEducations.id),
  },
  (t) => ({
    pk: primaryKey(t.employeeId, t.lastEducationNpsn),
  }),
);

export const employeeOnLastEducationRelations = relations(employeeOnLastEducation, ({ one }) => ({
  employee: one(employees, {
    fields: [employeeOnLastEducation.employeeId],
    references: [employees.id],
  }),
  lastEducationNpsn: one(lastEducations, {
    fields: [employeeOnLastEducation.lastEducationNpsn],
    references: [lastEducations.npsn],
  }),
}));

export const workUnits = pgTable("app_work_units", {
  id: uuid("id").defaultRandom().primaryKey(),
  workUnitCategoryId: uuid("work_unit_category_id").references(() => workUnitCategories.id),
  name: text("name").notNull(),
});

export const workUnitsRelations = relations(workUnits, ({ one, many }) => ({
  employeeOnWorkUnit: many(employeeOnWorkUnit),
  workUnitCategories: one(workUnitCategories, {
    fields: [workUnits.workUnitCategoryId],
    references: [workUnitCategories.id],
  }),
}));

export const employeeOnWorkUnit = pgTable(
  "app_employee_on_work_unit",
  {
    employeeId: uuid("employee_id")
      .notNull()
      .references(() => employees.id),
    workUnitId: uuid("work_unit_id")
      .notNull()
      .references(() => workUnits.id),
  },
  (t) => ({
    pk: primaryKey(t.employeeId, t.workUnitId),
  }),
);

export const employeeOnWorkUnitRelations = relations(employeeOnWorkUnit, ({ one }) => ({
  employee: one(employees, {
    fields: [employeeOnWorkUnit.employeeId],
    references: [employees.id],
  }),
  workUnit: one(workUnits, {
    fields: [employeeOnWorkUnit.workUnitId],
    references: [workUnits.id],
  }),
}));

export const workUnitCategories = pgTable("app_work_unit_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const workUnitCategoriesRelations = relations(workUnitCategories, ({ many }) => ({
  workUnits: many(workUnits),
}));

export const civilServiceLevel = pgTable("app_civil_service_level", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
});

export const civilServiceLevelRelations = relations(civilServiceLevel, ({ many }) => ({
  lecturerPosition: many(lecturerPosition),
  academicStaffPosition: many(academicStaffPosition),
}));
