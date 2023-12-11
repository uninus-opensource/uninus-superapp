export type TCreateNotificationRequest = {
  title: string;
  detail: string;
  user_id?: string;
};

export type TCreateNotificationResponse = {
  message: string;
};

export type TGetNotificationResponse = Array<TCreateNotificationRequest & { created_at: Date }>;
