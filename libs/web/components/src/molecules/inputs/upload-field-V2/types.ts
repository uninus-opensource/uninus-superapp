import { FieldValues, UseControllerProps } from "react-hook-form";

export type TUploadFieldV2Props<T extends FieldValues> = UseControllerProps<T> & {
  name: string;
  required?: boolean;
  disabled?: boolean;
};
