import { relations } from "drizzle-orm";
import { date, pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { roles, notifications, otp, students } from "..";

export const users = pgTable("app_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  fullname: text("fullname").notNull(),
  password: text("password").notNull(),
  avatar: text("avatar"),
  isVerified: boolean("is_verified").default(false).notNull(),
  isNotificationRead: boolean("is_notification_read").default(false).notNull(),
  roleId: uuid("role_id").references(() => roles.id),
  notificationId: uuid("notification_id").references(() => notifications.id),
  otpId: uuid("otp_id").references(() => otp.id),
  studentId: uuid("otp_id").references(() => students.id),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: date("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ one }) => ({
  roles: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  notifications: one(notifications, {
    fields: [users.notificationId],
    references: [notifications.id],
  }),
  otp: one(otp, {
    fields: [users.otpId],
    references: [otp.id],
  }),
  students: one(students, {
    fields: [users.studentId],
    references: [students.id],
  }),
}));
