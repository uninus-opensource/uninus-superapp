import { notifications } from "@uninus/api/models";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
export type TCreateNotificationRequest = InferInsertModel<typeof notifications>;

export type TCreateNotificationResponse = {
  message: string;
};

export type TGetNotificationResponse = Array<
  Omit<InferSelectModel<typeof notifications>, "userId">
>;
