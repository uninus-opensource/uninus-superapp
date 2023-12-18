import { pgTable, uuid, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { users } from "..";

export const employees = pgTable("app_employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const employeesRelations = relations(employees, ({ one }) => ({
  users: one(users, {
    fields: [employees.userId],
    references: [users.id],
  }),
}));
