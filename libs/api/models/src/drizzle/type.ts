import { users } from "./schema";
import { createInsertSchema } from "drizzle-zod";
export const insertUserSchema = createInsertSchema(users);
