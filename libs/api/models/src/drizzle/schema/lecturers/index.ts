import { relations } from "drizzle-orm";
import { pgTable, text, uuid, boolean, primaryKey, date } from "drizzle-orm/pg-core";
import { civilServiceLevel, department, employees, faculty, students } from "..";

export const lecturers = pgTable("app_lecturers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  lecturerCertification: boolean("lecturer_certification"),
  lecturerTypeId: uuid("lecturer_type_id").references(() => lecturerType.id),
  lecturerPositionId: uuid("lecturer_position_id").references(() => lecturerPosition.id),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const lecturersRelations = relations(lecturers, ({ many, one }) => ({
  students: many(students),
  lecturerType: one(lecturerType, {
    fields: [lecturers.lecturerTypeId],
    references: [lecturerType.id],
  }),
  lecturerPosition: one(lecturerPosition, {
    fields: [lecturers.lecturerPositionId],
    references: [lecturerPosition.id],
  }),
}));

export const lecturerType = pgTable("app_lecturer_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const lecturerTypeRelations = relations(lecturerType, ({ many }) => ({
  lecturers: many(lecturers),
}));

export const lecturerPosition = pgTable("app_lecturer_Position", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  civilServiceLevelId: uuid("civil_service_level_id").references(() => civilServiceLevel.id),
});

export const lecturerPositionRelations = relations(lecturerPosition, ({ many, one }) => ({
  lecturers: many(lecturers),
  civilServiceLevel: one(civilServiceLevel, {
    fields: [lecturerPosition.civilServiceLevelId],
    references: [civilServiceLevel.id],
  }),
}));

export const lecturerOnDepartment = pgTable(
  "app_lecturer_on_department",
  {
    lecturerId: uuid("lecturer_id")
      .notNull()
      .references(() => lecturers.id),
    departmentId: uuid("department_id")
      .notNull()
      .references(() => department.id),
  },
  (t) => ({
    pk: primaryKey(t.lecturerId, t.departmentId),
  }),
);

export const lecturerOnDepartmentRelations = relations(lecturerOnDepartment, ({ one }) => ({
  lecturer: one(lecturers, {
    fields: [lecturerOnDepartment.lecturerId],
    references: [lecturers.id],
  }),
  department: one(department, {
    fields: [lecturerOnDepartment.departmentId],
    references: [department.id],
  }),
}));

export const lecturerOnFaculty = pgTable(
  "app_lecturer_on_Faculty",
  {
    lecturerId: uuid("lecturer_id")
      .notNull()
      .references(() => lecturers.id),
    facultyId: uuid("faculty_id")
      .notNull()
      .references(() => faculty.id),
  },
  (t) => ({
    pk: primaryKey(t.lecturerId, t.facultyId),
  }),
);

export const lecturerOnFacultyRelations = relations(lecturerOnFaculty, ({ one }) => ({
  lecturer: one(lecturers, {
    fields: [lecturerOnFaculty.lecturerId],
    references: [lecturers.id],
  }),
  faculty: one(faculty, {
    fields: [lecturerOnFaculty.facultyId],
    references: [faculty.id],
  }),
}));
