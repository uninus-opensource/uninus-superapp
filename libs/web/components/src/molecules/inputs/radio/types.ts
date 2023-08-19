import { FieldValues, UseControllerProps } from "react-hook-form";
import { ChangeEventHandler } from "react";
import { LABEL_SIZE, RADIO_SIZE, RADIO_VARIANT } from "./enum";

export type TRadioButtonProps<T extends FieldValues> = UseControllerProps<T> & {
  variant?: RADIO_VARIANT | string;
  size?: RADIO_SIZE | string;
  fieldName?: string;
  labelSize?: LABEL_SIZE | string;
  options?: Array<{ label?: string; value?: string }>;
  label?: string;
  name?: string;
  inputname?: string;
  required?: boolean;
  message?: "primary" | "error" | "warning";
  onChange?: ChangeEventHandler<HTMLInputElement>;
  buttonValue?: string | null | void;
  disabled?: boolean;
};
