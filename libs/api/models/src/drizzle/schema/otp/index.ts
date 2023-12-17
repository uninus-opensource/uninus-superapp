import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "..";

export const otp = pgTable("app_otp", {
  id: uuid("id").defaultRandom().primaryKey(),
  token: text("token").notNull(),
  userId: uuid("user_id").references(() => users.id),
  expiredAt: date("expired_at", { mode: "date" }).notNull(),
});
