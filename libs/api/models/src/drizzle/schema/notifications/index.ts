import { relations } from "drizzle-orm";
import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "..";

export const notifications = pgTable("app_notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  detail: text("detail"),
  createdAt: date("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const notificationsRelations = relations(notifications, ({ many }) => ({
  users: many(users),
}));
