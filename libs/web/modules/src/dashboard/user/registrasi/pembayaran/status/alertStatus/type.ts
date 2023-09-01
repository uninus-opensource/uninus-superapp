export type TStatusAlert = {
  status: "success" | "pending" | "failed" | "unpaid";
  message?: string;
  messageDetails?: string;
  onStatusChange?: (newStatus: string) => void;
};
