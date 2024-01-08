import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "..";
import { relations } from "drizzle-orm";

export const roles = pgTable("app_roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  permissions: text("permissions").array(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));
