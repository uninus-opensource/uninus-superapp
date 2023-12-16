import { relations } from "drizzle-orm";
import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "..";

export const otp = pgTable("app_otp", {
  id: uuid("id").defaultRandom().primaryKey(),
  token: text("token").notNull(),
  expiredAt: date("expired_at", { mode: "date" }).notNull(),
});

export const otpRelations = relations(otp, ({ many }) => ({
  users: many(users),
}));
