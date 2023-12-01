import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

export type TButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "success" | "warning" | "error" | "cancel" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  href?: string;
};
