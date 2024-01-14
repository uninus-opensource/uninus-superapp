import { relations } from "drizzle-orm";
import { timestamp, pgTable, uuid } from "drizzle-orm/pg-core";
import { employees } from "..";

export const academicStaff = pgTable("app_academic_staff", {
  id: uuid("id").defaultRandom().primaryKey(),

  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const academicStaffRelations = relations(academicStaff, ({ one }) => ({
  employee: one(employees, {
    fields: [academicStaff.employeeId],
    references: [employees.id],
  }),
}));
