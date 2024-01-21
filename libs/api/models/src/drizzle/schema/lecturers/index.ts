import { relations } from "drizzle-orm";
import { pgTable, text, uuid, boolean, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { department, employees, faculty, students } from "..";

export const lecturers = pgTable("app_lecturers", {
  id: uuid("id").defaultRandom().primaryKey(),
  lecturerCertification: boolean("lecturer_certification"),
  lecturerTypeId: uuid("lecturer_type_id").references(() => lecturerType.id),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const lecturersRelations = relations(lecturers, ({ many, one }) => ({
  students: many(students),
  lecturerOnDepartment: many(lecturerOnDepartment),
  lecturerOnFaculty: many(lecturerOnFaculty),
  lecturerType: one(lecturerType, {
    fields: [lecturers.lecturerTypeId],
    references: [lecturerType.id],
  }),
}));

export const lecturerType = pgTable("app_lecturer_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const lecturerTypeRelations = relations(lecturerType, ({ many }) => ({
  lecturers: many(lecturers),
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
