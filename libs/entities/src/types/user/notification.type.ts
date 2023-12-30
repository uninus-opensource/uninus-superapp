import { notifications } from "@uninus/api/models";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
export type TCreateNotificationRequest = Omit<
  InferInsertModel<typeof notifications>,
  "id" | "created_at" | "userId"
> & { user_id: string };

export type TCreateNotificationResponse = {
  message: string;
};

export type TGetNotificationResponse = Array<
  Omit<InferSelectModel<typeof notifications>, "userId">
>;
