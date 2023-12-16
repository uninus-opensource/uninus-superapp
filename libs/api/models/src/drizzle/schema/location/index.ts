import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const citizenship = pgTable("app_citizenship", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("fullname").notNull(),
});

export const country = pgTable("app_country", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("fullname").notNull(),
  citizenshipId: uuid("citizenship_id").references(() => citizenship.id),
});

export const province = pgTable("app_province", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("fullname").notNull(),
});

export const city = pgTable("app_city", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("fullname").notNull(),
  provinceId: uuid("province_id").references(() => province.id),
});

export const subdistrict = pgTable("app_subdistrict", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("fullname").notNull(),
  cityId: uuid("city_id").references(() => city.id),
});

export const citizenshipRelations = relations(citizenship, ({ many }) => ({
  country: many(country),
}));

export const countryRelations = relations(country, ({ one }) => ({
  citizenship: one(citizenship, {
    fields: [country.citizenshipId],
    references: [citizenship.id],
  }),
}));

export const provinceRelations = relations(province, ({ many }) => ({
  city: many(city),
}));

export const cityRelations = relations(city, ({ one, many }) => ({
  province: one(province, {
    fields: [city.provinceId],
    references: [province.id],
  }),
  subdistrict: many(subdistrict),
}));

export const subdistrictRelations = relations(subdistrict, ({ one }) => ({
  city: one(city, {
    fields: [subdistrict.cityId],
    references: [city.id],
  }),
}));
