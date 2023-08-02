import { ChangeEventHandler } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TSelectProps<T extends FieldValues> = UseControllerProps<T> & {
  label: string;
  width?: string;
  size: "sm" | "md";
  name: string;
  options: Array<{
    label: string;
    value: string | number;
  }>;
  placeholder: string;
  message?: string;
  status?: "success" | "error" | "warning" | "none";
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
