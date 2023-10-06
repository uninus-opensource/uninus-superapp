import { ReactNode } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TUploadFile<T extends FieldValues> = UseControllerProps<T> & {
  name: string;
  className?: string;
  defaultImage?: string;
  previewImage?: string;
  classNameField?: string;
  preview?: boolean;
  inputLabel?: string | ReactNode;
  labelClassName?: string;
  layoutInputClassName?: string;
  required?: boolean;
  variant: string;
  message?: string;
  isDisabled?: boolean;
  label?: string;
};
