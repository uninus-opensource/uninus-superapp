import { pgTable, text, uuid, date, integer, decimal } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { students, degreeProgram, department } from "..";

export const admissionTest = pgTable("app_admission_test", {
  id: uuid("id").defaultRandom().primaryKey(),
  question: text("question").notNull(),
  correctAnswer: text("correct_answer").notNull(),
  answers: text("answers").array(),
});

export const registrationStatus = pgTable("app_registration_status", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const registrationStatusRelations = relations(registrationStatus, ({ many }) => ({
  admission: many(admission),
}));

export const registrationPath = pgTable("app_registration_path", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const registrationPathRelations = relations(registrationStatus, ({ many }) => ({
  admission: many(admission),
}));

export const scholarship = pgTable("app_scholarship", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  discount: integer("discount").notNull(),
});
export const scholarshipRelations = relations(scholarship, ({ many }) => ({
  admission: many(admission),
}));

export const selectionPath = pgTable("app_selection_path", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const selectionPathRelations = relations(selectionPath, ({ many }) => ({
  admission: many(admission),
}));

export const admission = pgTable("app_admission", {
  id: uuid("id").defaultRandom().primaryKey(),
  utbkPu: decimal("utbk_pug"),
  utbkKk: decimal("utbk_kk"),
  utbkPpu: decimal("utbk_ppu"),
  utbkKmbm: decimal("utbk_kmbm"),
  utbk_average: decimal("utbk_average"),
  utbk: decimal("utbk"),
  registrationNumber: text("registration_number"),
  grade_average: decimal("grade_average"),
  testScore: integer("test_score"),
  degreeProgramId: uuid("degree_program_id")
    .references(() => degreeProgram.id)
    .notNull(),
  firstDepartmentId: uuid("first_department_id")
    .references(() => department.id)
    .notNull(),
  secondDepartmentId: uuid("second_department_id")
    .references(() => department.id)
    .notNull(),
  studentId: uuid("student_id")
    .references(() => students.id)
    .notNull(),
  registrationStatusId: uuid("registration_status_id")
    .references(() => registrationStatus.id)
    .notNull(),
  registrationPathId: uuid("registration_path_id")
    .references(() => registrationPath.id)
    .notNull(),
  scholarshipId: uuid("scholarship_id")
    .references(() => scholarship.id)
    .notNull(),
  selectionPathId: uuid("selection_path_id")
    .references(() => selectionPath.id)
    .notNull(),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const admissionRelations = relations(admission, ({ many, one }) => ({
  studentGrade: many(studentGrade),
  degreeProgram: one(degreeProgram, {
    fields: [admission.degreeProgramId],
    references: [degreeProgram.id],
  }),
  firstDepartment: one(department, {
    fields: [admission.firstDepartmentId],
    references: [department.id],
    relationName: "first_department",
  }),
  secondDepartment: one(department, {
    fields: [admission.secondDepartmentId],
    references: [department.id],
    relationName: "second_department",
  }),
  registrationStatus: one(registrationStatus, {
    fields: [admission.registrationStatusId],
    references: [registrationStatus.id],
  }),
  registrationPath: one(registrationPath, {
    fields: [admission.registrationPathId],
    references: [registrationPath.id],
  }),
  scholarship: one(scholarship, {
    fields: [admission.scholarshipId],
    references: [scholarship.id],
  }),
  selectionPath: one(selectionPath, {
    fields: [admission.selectionPathId],
    references: [selectionPath.id],
  }),
  student: one(students, {
    fields: [admission.studentId],
    references: [students.id],
  }),
}));

export const studentGrade = pgTable("app_student_grade", {
  id: uuid("id").defaultRandom().primaryKey(),
  subject: text("subject").notNull(),
  semester: text("semester").notNull(),
  grade: decimal("grade").notNull(),
  admissionId: uuid("admission_id")
    .references(() => admission.id)
    .notNull(),
});

export const studentGradeRelations = relations(studentGrade, ({ one }) => ({
  admission: one(admission, {
    fields: [studentGrade.admissionId],
    references: [admission.id],
  }),
}));
