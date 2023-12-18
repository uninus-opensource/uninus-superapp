import { date, pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { students, employees } from "..";
export const documents = pgTable("app_documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  path: text("path").notNull(),
  isVerified: boolean("is_verified").default(false).notNull(),
  studentId: uuid("student_id").references(() => students.id),
  employeeId: uuid("student_id").references(() => students.id),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const documentsRelations = relations(documents, ({ one }) => ({
  student: one(students, {
    fields: [documents.studentId],
    references: [students.id],
  }),
  employee: one(employees, {
    fields: [documents.employeeId],
    references: [employees.id],
    relationName: "employees",
  }),
  certificationProfession: one(employees, {
    fields: [documents.employeeId],
    references: [employees.id],
    relationName: "certification_profession",
  }),
}));
