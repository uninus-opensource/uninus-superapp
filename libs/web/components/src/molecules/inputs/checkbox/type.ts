import { FieldValues, UseControllerProps } from "react-hook-form";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { CHECKBOX_SIZE, CHECKBOX_VARIANT, LABEL_SIZE } from "./enum";

export type TCheckBoxProps<T extends FieldValues> = UseControllerProps<T> & {
  variant?: CHECKBOX_VARIANT | string;
  size?: CHECKBOX_SIZE | string;
  labelSize?: LABEL_SIZE | string;
  label?: string;
  name?: string;
  required?: boolean;
  checked?: boolean;
  message?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  disabled?: boolean;
};
