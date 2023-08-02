import { ButtonHTMLAttributes } from "react";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?:
    | "elevated"
    | "filled"
    | "filled-tonal"
    | "outlined"
    | "text-icon"
    | "float-bottom-right"
    | "custom"
    | "sidebarlist"
    | "sidebarbutton"
    | "green-outline";
  loading?: boolean;
  href?: string;
  width?: string;
  height?: string;
  uppercase?: boolean;
  styling?: string;
}
