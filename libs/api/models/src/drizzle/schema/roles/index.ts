import { relations } from "drizzle-orm";
import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "..";

export const roles = pgTable("app_roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: date("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));
