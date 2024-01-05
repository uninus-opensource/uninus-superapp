import { relations } from "drizzle-orm";
import { date, pgTable, text, uuid, boolean, integer } from "drizzle-orm/pg-core";
import { students } from "..";
export const paymentHistory = pgTable("app_payment_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: text("order_id").notNull().unique(),
  paymentMethod: text("payment_method"),
  paymentCode: text("payment_code"),
  paymentBank: text("payment_bank"),
  isPaid: boolean("is_paid").default(false),
  paymentTypeId: uuid("payment_type_id").references(() => paymentType.id),
  paymentObligationId: uuid("payment_obligation_id").references(() => paymentObligations.id),
  studentId: uuid("student_id").references(() => students.id),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const paymentHistoryRelations = relations(paymentHistory, ({ one }) => ({
  paymentType: one(paymentType, {
    fields: [paymentHistory.paymentTypeId],
    references: [paymentType.id],
  }),
  paymentObligations: one(paymentObligations, {
    fields: [paymentHistory.paymentObligationId],
    references: [paymentObligations.id],
  }),
  student: one(students, {
    fields: [paymentHistory.studentId],
    references: [students.id],
  }),
}));

export const paymentType = pgTable("app_payment_type", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
});

export const paymentTypeRelations = relations(paymentType, ({ many }) => ({
  paymentHistory: many(paymentHistory),
}));

export const paymentObligations = pgTable("app_payment_obligations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  amount: integer("amount").notNull(),
});

export const paymentObligationsRelations = relations(paymentObligations, ({ many }) => ({
  paymentHistory: many(paymentHistory),
}));
