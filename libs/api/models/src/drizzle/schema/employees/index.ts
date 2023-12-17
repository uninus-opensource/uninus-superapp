import { pgTable, uuid } from "drizzle-orm/pg-core";
import { users } from "..";

export const employees = pgTable("app_employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
});
