import { ButtonHTMLAttributes } from "react";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?:
    | "elevated"
    | "filled"
    | "filled-tonal"
    | "outlined"
    | "outlined-white"
    | "text-icon"
    | "navlist"
    | "float-bottom-right"
    | "custom"
    | "sidebarlist"
    | "sidebarbutton"
    | "green-outline"
    | "filled-red"
    | "filled-yellow";

  loading?: boolean;
  href?: string;
  target?: string;
  width?: string;
  height?: string;
  uppercase?: boolean;
  styling?: string;
  as?: string;
}
