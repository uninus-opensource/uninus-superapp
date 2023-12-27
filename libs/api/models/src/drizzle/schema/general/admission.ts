import { pgTable, text, uuid, date, integer, doublePrecision } from "drizzle-orm/pg-core";
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
  discount: integer("discount"),
});
export const scholarshipRelations = relations(scholarship, ({ many }) => ({
  admission: many(admission),
}));

export const selectionPath = pgTable("app_selection_path", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  degreeProgramId: text("degree_program_id"),
});

export const selectionPathRelations = relations(selectionPath, ({ many, one }) => ({
  admission: many(admission),
  degreeProgram: one(degreeProgram, {
    fields: [selectionPath.degreeProgramId],
    references: [degreeProgram.id],
  }),
}));

export const admission = pgTable("app_admission", {
  id: uuid("id").defaultRandom().primaryKey(),
  utbkPu: doublePrecision("utbk_pug"),
  utbkKk: doublePrecision("utbk_kk"),
  utbkPpu: doublePrecision("utbk_ppu"),
  utbkKmbm: doublePrecision("utbk_kmbm"),
  utbk_average: doublePrecision("utbk_average"),
  utbk: doublePrecision("utbk"),
  registrationNumber: text("registration_number"),
  grade_average: doublePrecision("grade_average"),
  testScore: integer("test_score"),
  degreeProgramId: uuid("degree_program_id").references(() => degreeProgram.id),

  firstDepartmentId: uuid("first_department_id").references(() => department.id),

  secondDepartmentId: uuid("second_department_id").references(() => department.id),

  studentId: uuid("student_id").references(() => students.id),

  registrationStatusId: uuid("registration_status_id").references(() => registrationStatus.id),

  registrationPathId: uuid("registration_path_id").references(() => registrationPath.id),

  scholarshipId: uuid("scholarship_id").references(() => scholarship.id),

  selectionPathId: uuid("selection_path_id").references(() => selectionPath.id),

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
  grade: doublePrecision("grade").default(0),
  admissionId: uuid("admission_id").references(() => admission.id),
});

export const studentGradeRelations = relations(studentGrade, ({ one }) => ({
  admission: one(admission, {
    fields: [studentGrade.admissionId],
    references: [admission.id],
  }),
}));
