import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { students } from "..";

export const citizenship = pgTable("app_citizenship", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const citizenshipRelations = relations(citizenship, ({ many }) => ({
  country: many(country),
  students: many(students),
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
}));

export const province = pgTable("app_province", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const provinceRelations = relations(province, ({ many }) => ({
  city: many(city),
  students: many(students, {
    relationName: "students",
  }),
  parents: many(students, {
    relationName: "parents",
  }),
  guardians: many(students, {
    relationName: "guardians",
  }),
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
    relationName: "students",
  }),
  parents: many(students, {
    relationName: "parents",
  }),
  guardians: many(students, {
    relationName: "guardians",
  }),
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
    relationName: "students",
  }),
  parents: many(students, {
    relationName: "parents",
  }),
  guardians: many(students, {
    relationName: "guardians",
  }),
}));

export const religion = pgTable("app_religion", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const religionRelations = relations(religion, ({ many }) => ({
  students: many(students),
}));

export const maritalStatus = pgTable("app_marital_status", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const maritalStatusRelations = relations(maritalStatus, ({ many }) => ({
  students: many(students),
}));

export const gender = pgTable("app_gender", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const genderRelations = relations(gender, ({ many }) => ({
  students: many(students),
}));

export const salary = pgTable("app_salary", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const salaryRelations = relations(salary, ({ many }) => ({
  students: many(students, {
    relationName: "students",
  }),
  fathers: many(students, {
    relationName: "fathers",
  }),
  mothers: many(students, {
    relationName: "mothers",
  }),
  guardians: many(students, {
    relationName: "guardians",
  }),
}));

export const occupation = pgTable("app_occupation", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const occupationRelations = relations(occupation, ({ many }) => ({
  students: many(students, {
    relationName: "students",
  }),
  fathers: many(students, {
    relationName: "fathers",
  }),
  mothers: many(students, {
    relationName: "mothers",
  }),
  guardians: many(students, {
    relationName: "guardians",
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
    relationName: "fathers",
  }),
  mothers: many(students, {
    relationName: "mothers",
  }),
  guardians: many(students, {
    relationName: "guardians",
  }),
}));

export const parentEducation = pgTable("app_parent_education", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const parentEducationRelations = relations(parentEducation, ({ many }) => ({
  fathers: many(students, {
    relationName: "fathers",
  }),
  mothers: many(students, {
    relationName: "mothers",
  }),
  guardians: many(students, {
    relationName: "guardians",
  }),
}));

export const lastEducations = pgTable("app_last_educations", {
  id: uuid("id").defaultRandom().primaryKey(),
  npsn: text("npsn").notNull().unique(),
  name: text("name").notNull().unique(),
  province: text("province").notNull(),
  city: text("city").notNull(),
  subdistrict: text("subdistrict").notNull(),
  streetAddress: text("street_address").notNull(),
  lastEducationTypeId: uuid("last_education_type_id").references(() => lastEducationType.id),
});

export const lastEducationRelations = relations(lastEducations, ({ one, many }) => ({
  lastEducationType: one(lastEducationType, {
    fields: [lastEducations.lastEducationTypeId],
    references: [lastEducationType.id],
  }),
  students: many(students),
}));

export const lastEducationType = pgTable("app_last_education_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
});

export const lastEducationTypeRelations = relations(lastEducationType, ({ many }) => ({
  lastEducationMajor: many(lastEducationMajor),
  lastEducations: many(lastEducations),
  students: many(students),
}));

export const lastEducationMajor = pgTable("app_last_education_major", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  lastEducationTypeId: uuid("last_education_type_id").references(() => lastEducationType.id),
});

export const lastEducationMajorRelations = relations(lastEducationMajor, ({ one, many }) => ({
  lastEducationType: one(lastEducationType, {
    fields: [lastEducationMajor.lastEducationTypeId],
    references: [lastEducationType.id],
  }),
  students: many(students),
}));
