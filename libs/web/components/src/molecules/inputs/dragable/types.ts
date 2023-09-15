import { FieldValues, UseControllerProps } from "react-hook-form";

export type TUploadFieldProps<T extends FieldValues> = UseControllerProps<T> & {
  className?: string;
  labels?: string;
  required?: boolean;
};
