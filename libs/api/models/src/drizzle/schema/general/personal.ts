import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { students } from "..";

export const citizenship = pgTable("app_citizenship", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const citizenshipRelations = relations(citizenship, ({ many }) => ({
  country: many(country),
  student: many(students),
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
  student: many(students),
}));

export const province = pgTable("app_province", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const provinceRelations = relations(province, ({ many }) => ({
  city: many(city),
  student: many(students),
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
  student: many(students),
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
  student: many(students),
}));

export const religion = pgTable("app_religion", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const religionRelations = relations(religion, ({ many }) => ({
  student: many(students),
}));

export const maritalStatus = pgTable("app_marital_status", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const maritalStatusRelations = relations(maritalStatus, ({ many }) => ({
  student: many(students),
}));

export const gender = pgTable("app_gender", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const genderRelations = relations(gender, ({ many }) => ({
  student: many(students),
}));

export const salary = pgTable("app_salary", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const salaryRelations = relations(salary, ({ many }) => ({
  student: many(students),
}));

export const occupation = pgTable("app_occupation", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const occupationRelations = relations(occupation, ({ many }) => ({
  student: many(students),
}));

export const disabilities = pgTable("app_dissabilities", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const disabilitiesRelations = relations(disabilities, ({ many }) => ({
  student: many(students),
}));

export const parentStatus = pgTable("app_parent_status", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const parentStatusRelations = relations(parentStatus, ({ many }) => ({
  student: many(students),
}));

export const parentEducation = pgTable("app_parent_education", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const parentEducationRelations = relations(parentEducation, ({ many }) => ({
  student: many(students),
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
  student: many(students),
}));

export const lastEducationType = pgTable("app_last_education_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
});

export const lastEducationTypeRelations = relations(lastEducationType, ({ many }) => ({
  lastEducationMajor: many(lastEducationMajor),
  lastEducations: many(lastEducations),
  student: many(students),
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
  student: many(students),
}));
