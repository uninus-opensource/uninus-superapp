import { DetailedHTMLProps, HTMLAttributes } from "react";

export type TMessage = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
  status?: "error" | "success" | "warning" | "none";
  size?: "sm" | "md" | "lg";
};
