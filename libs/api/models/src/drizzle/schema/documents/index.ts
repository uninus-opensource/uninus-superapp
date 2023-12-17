import { date, pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { students } from "..";
export const documents = pgTable("app_documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  path: text("path").notNull(),
  isVerified: boolean("is_verified").default(false).notNull(),
  studentId: uuid("student_id").references(() => students.id),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const documentsRelations = relations(documents, ({ one }) => ({
  student: one(students, {
    fields: [documents.studentId],
    references: [students.id],
  }),
}));
