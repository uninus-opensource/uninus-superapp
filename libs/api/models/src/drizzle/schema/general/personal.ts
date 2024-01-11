import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { employees, students, employeeOnEducation, degreeProgram } from "..";

export const citizenship = pgTable("app_citizenship", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const citizenshipRelations = relations(citizenship, ({ many }) => ({
  country: many(country),
  students: many(students),
  employees: many(employees),
}));

export const country = pgTable("app_country", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  citizenshipId: uuid("citizenship_id").references(() => citizenship.id),
});

export const countryRelations = relations(country, ({ one, many }) => ({
  citizenship: one(citizenship, {
    fields: [country.citizenshipId],
    references: [citizenship.id],
  }),
  students: many(students),
  employees: many(employees),
}));

export const province = pgTable("app_province", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const provinceRelations = relations(province, ({ many }) => ({
  city: many(city),
  students: many(students, {
    relationName: "students_province",
  }),
  parents: many(students, {
    relationName: "parents_province",
  }),
  guardians: many(students, {
    relationName: "guardians_province",
  }),
  employees: many(employees),
}));

export const city = pgTable("app_city", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  provinceId: uuid("province_id").references(() => province.id),
});

export const cityRelations = relations(city, ({ one, many }) => ({
  province: one(province, {
    fields: [city.provinceId],
    references: [province.id],
  }),
  subdistrict: many(subdistrict),
  students: many(students, {
    relationName: "students_city",
  }),
  parents: many(students, {
    relationName: "parents_city",
  }),
  guardians: many(students, {
    relationName: "guardians_city",
  }),
  employees: many(employees),
}));

export const subdistrict = pgTable("app_subdistrict", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  cityId: uuid("city_id").references(() => city.id),
});

export const subdistrictRelations = relations(subdistrict, ({ one, many }) => ({
  city: one(city, {
    fields: [subdistrict.cityId],
    references: [city.id],
  }),
  students: many(students, {
    relationName: "students_subdistrict",
  }),
  parents: many(students, {
    relationName: "parents_subdistrict",
  }),
  guardians: many(students, {
    relationName: "guardians_subdistrict",
  }),
  employees: many(employees),
}));

export const religion = pgTable("app_religion", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const religionRelations = relations(religion, ({ many }) => ({
  students: many(students),
  employees: many(employees),
}));

export const maritalStatus = pgTable("app_marital_status", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const maritalStatusRelations = relations(maritalStatus, ({ many }) => ({
  students: many(students),
  employees: many(employees),
}));

export const gender = pgTable("app_gender", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const genderRelations = relations(gender, ({ many }) => ({
  students: many(students),
  employees: many(employees),
}));

export const salary = pgTable("app_salary", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const salaryRelations = relations(salary, ({ many }) => ({
  students: many(students, {
    relationName: "students_salary",
  }),
  fathers: many(students, {
    relationName: "fathers_salary",
  }),
  mothers: many(students, {
    relationName: "mothers_salary",
  }),
  guardians: many(students, {
    relationName: "guardians_salary",
  }),
}));

export const occupation = pgTable("app_occupation", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const occupationRelations = relations(occupation, ({ many }) => ({
  students: many(students, {
    relationName: "students_occupation",
  }),
  fathers: many(students, {
    relationName: "fathers_occupation",
  }),
  mothers: many(students, {
    relationName: "mothers_occupation",
  }),
  guardians: many(students, {
    relationName: "guardians_occupation",
  }),
}));

export const disabilities = pgTable("app_dissabilities", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const disabilitiesRelations = relations(disabilities, ({ many }) => ({
  students: many(students),
}));

export const parentStatus = pgTable("app_parent_status", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const parentStatusRelations = relations(parentStatus, ({ many }) => ({
  fathers: many(students, {
    relationName: "fathers_status",
  }),
  mothers: many(students, {
    relationName: "mothers_status",
  }),
  guardians: many(students, {
    relationName: "guardians_status",
  }),
}));

export const parentEducation = pgTable("app_parent_education", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const parentEducationRelations = relations(parentEducation, ({ many }) => ({
  fathers: many(students, {
    relationName: "fathers_education",
  }),
  mothers: many(students, {
    relationName: "mothers_education",
  }),
  guardians: many(students, {
    relationName: "guardians_education",
  }),
}));

export const educations = pgTable("app_educations", {
  id: uuid("id").defaultRandom().primaryKey(),
  npsn: text("npsn").unique(),
  name: text("name").unique(),
  province: text("province"),
  city: text("city"),
  subdistrict: text("subdistrict"),
  streetAddress: text("street_address"),
  educationTypeId: uuid("education_type_id").references(() => educationType.id),
});

export const educationRelations = relations(educations, ({ one, many }) => ({
  educationType: one(educationType, {
    fields: [educations.educationTypeId],
    references: [educationType.id],
  }),
  students: many(students),
  employeeOnEducation: many(employeeOnEducation),
}));

export const educationType = pgTable("app_education_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  degreeProgramId: uuid("degree_program_id").references(() => degreeProgram.id),
});

export const educationTypeRelations = relations(educationType, ({ many, one }) => ({
  educationMajor: many(educationMajor),
  educations: many(educations),
  students: many(students),
  degreeProgram: one(degreeProgram, {
    fields: [educationType.degreeProgramId],
    references: [degreeProgram.id],
  }),
}));

export const educationMajor = pgTable("app_education_major", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  educationTypeId: uuid("education_type_id").references(() => educationType.id),
});

export const educationMajorRelations = relations(educationMajor, ({ one, many }) => ({
  educationType: one(educationType, {
    fields: [educationMajor.educationTypeId],
    references: [educationType.id],
  }),
  students: many(students),
}));
