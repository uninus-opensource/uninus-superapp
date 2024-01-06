import { relations } from "drizzle-orm";
import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { civilServiceLevel, employees } from "..";

export const academicStaff = pgTable("app_academic_staff", {
  id: uuid("id").defaultRandom().primaryKey(),
  academicStaffTypeId: uuid("academic_staff_type_id").references(() => academicStaffType.id),
  academicStaffPositionId: uuid("academic_staff_position_id").references(
    () => academicStaffPosition.id,
  ),

  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const academicStaffRelations = relations(academicStaff, ({ one }) => ({
  academicStaffType: one(academicStaffType, {
    fields: [academicStaff.academicStaffTypeId],
    references: [academicStaffType.id],
  }),
  academicStaffPosition: one(academicStaffPosition, {
    fields: [academicStaff.academicStaffPositionId],
    references: [academicStaffPosition.id],
  }),
  employee: one(employees, {
    fields: [academicStaff.employeeId],
    references: [employees.id],
  }),
}));

export const academicStaffType = pgTable("app_academic_staff_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const academicStaffTypeRelations = relations(academicStaffType, ({ many }) => ({
  academicStaff: many(academicStaff),
}));

export const academicStaffPosition = pgTable("app_academic_staff_position", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  civilServiceLevelId: uuid("civil_service_level_id").references(() => civilServiceLevel.id),
});

export const academicStaffPositionRelations = relations(academicStaffPosition, ({ one }) => ({
  civilServiceLevel: one(civilServiceLevel, {
    fields: [academicStaffPosition.civilServiceLevelId],
    references: [civilServiceLevel.id],
  }),
}));
