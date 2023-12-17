import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const degreeProgram = pgTable("app_degree_program", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const degreeProgramRelations = relations(degreeProgram, ({ many }) => ({
  curriculum: many(curriculum),
}));

export const faculty = pgTable("app_faculty", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const facultyRelations = relations(faculty, ({ many }) => ({
  curriculum: many(curriculum),
}));

export const department = pgTable("app_department", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const departmentRelations = relations(department, ({ many }) => ({
  curriculum: many(curriculum),
}));

export const courses = pgTable("app_courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  courseCode: text("course_code").notNull(),
  credit: integer("credit").notNull(),
  semester: integer("semester").notNull(),
  status: text("status"),
  curriculumId: uuid("curriculum_id").references(() => curriculum.id),
  courseCategoryId: uuid("course_category_id").references(() => courseCategory.id),
  courseTypeId: uuid("course_type_id").references(() => courseType.id),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const coursesRelations = relations(courses, ({ one }) => ({
  curriculum: one(courses, {
    fields: [courses.curriculumId],
    references: [curriculum.id],
  }),
  courseCategory: one(courseCategory, {
    fields: [courses.courseCategoryId],
    references: [courseCategory.id],
  }),
  courseType: one(courseType, {
    fields: [courses.courseTypeId],
    references: [courseType.id],
  }),
}));

export const courseType = pgTable("app_course_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const courseTypeRelations = relations(courseType, ({ many }) => ({
  courses: many(courses),
}));

export const courseCategory = pgTable("app_course_category", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const courseCategoryRelations = relations(courseCategory, ({ many }) => ({
  courses: many(courses),
}));

export const curriculum = pgTable("app_curriculum", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  batch: text("batch").notNull(),
  releaseYear: text("release_year").notNull(),
  inEffect: text("in_effect").notNull(),
  status: text("status"),
  degreeProgramId: uuid("degree_program_id").references(() => degreeProgram.id),
  facultyId: uuid("faculty_id").references(() => faculty.id),
  departmentId: uuid("department_id").references(() => department.id),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: date("updated_at", { mode: "date" }),
});

export const curriculumRelations = relations(curriculum, ({ many }) => ({
  courses: many(courses),
  degreeProgram: one(degreeProgram, {
    fields: [curriculum.degreeProgramId],
    references: [degreeProgram.id],
  }),
  faculty: one(faculty, {
    fields: [curriculum.facultyId],
    references: [faculty.id],
  }),
  department: one(department, {
    fields: [curriculum.departmentId],
    references: [department.id],
  }),
}));
