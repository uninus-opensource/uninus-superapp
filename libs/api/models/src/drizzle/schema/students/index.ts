import { relations } from "drizzle-orm";
import { pgTable, text, uuid, doublePrecision } from "drizzle-orm/pg-core";
import { users } from "..";

export const students = pgTable("app_students", {
  id: uuid("id").defaultRandom().primaryKey(),
  token: text("title").notNull(),
  studentStatusId: uuid("student_status_id").references(() => studentStatus.id),
});

export const studentStatus = pgTable("app_student_status", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const studentGrade = pgTable("app_student_grade", {
  id: uuid("id").defaultRandom().primaryKey(),
  subject: text("subject").notNull(),
  semester: text("semester").notNull(),
  grade: doublePrecision("grade").notNull(),
});

export const studentStatusRelations = relations(studentStatus, ({ many }) => ({
  students: many(users),
}));

export const studentsRelations = relations(students, ({ many, one }) => ({
  users: many(users),
  studentStatus: one(studentStatus, {
    fields: [students.studentStatusId],
    references: [studentStatus.id],
  }),
}));
