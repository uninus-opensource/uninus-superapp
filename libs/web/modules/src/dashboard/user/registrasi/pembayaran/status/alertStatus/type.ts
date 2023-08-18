export type TStatusAlert = {
  status: "success" | "pending" | "failed";
  message?: string;
  messageDetails?: string;
};
