import { LabelHTMLAttributes } from "react";

export type TLabel = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
};
