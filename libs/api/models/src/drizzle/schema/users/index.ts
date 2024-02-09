import { relations } from "drizzle-orm";
import { pgTable, text, uuid, boolean, timestamp } from "drizzle-orm/pg-core";
import { roles, notifications, otp, students, employees } from "..";

export const users = pgTable("app_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  fullname: text("fullname").notNull(),
  password: text("password").notNull(),
  avatar: text("avatar").notNull(),
  refreshToken: text("refresh_token"),
  isVerified: boolean("is_verified").default(false),
  isNotificationRead: boolean("is_notification_read").default(false),
  roleId: uuid("role_id")
    .references(() => roles.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  notifications: many(notifications),
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  otp: many(otp),
  student: one(students, {
    fields: [users.id],
    references: [students.userId],
  }),
  employees: one(employees, {
    fields: [users.id],
    references: [employees.userId],
  }),
}));
