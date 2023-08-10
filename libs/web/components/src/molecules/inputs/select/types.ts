import { ChangeEventHandler } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";
import { SELECT_SIZE, SELECT_STATUS } from "./enum";

export type TSelectProps<T extends FieldValues> = UseControllerProps<T> & {
  label: string;
  width?: string;
  size: SELECT_SIZE | string;
  name: string;
  options: Array<{
    label: string;
    value: string | number;
  }>;
  placeholder: string;
  message?: string;
  status?: SELECT_STATUS | string;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
