import { relations } from "drizzle-orm";
import { date, pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { roles } from "..";

export const users = pgTable("app_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  roleId: uuid("role_id").references(() => roles.id),
  email: text("email").notNull(),
  fullname: text("fullname").notNull(),
  password: text("password").notNull(),
  avatar: text("avatar"),
  isVerified: boolean("is_verified").default(false).notNull(),
  isNotificationRead: boolean("is_notification_read").default(false).notNull(),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: date("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ one }) => ({
  roles: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));
