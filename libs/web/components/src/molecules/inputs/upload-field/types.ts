import { ReactNode } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TUploadFile<T extends FieldValues> = UseControllerProps<T> & {
  name: string;
  className?: string;
  defaultImage?: string;
  previewImage?: string;
  classNameField?: string;
  preview?: boolean;
  labels?: string | ReactNode;
  labelClassName?: string;
  required?: boolean;
  variant: string;
  message?: string;
};
