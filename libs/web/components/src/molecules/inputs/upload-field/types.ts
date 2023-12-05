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
  labelClassName?:
    | "labelText"
    | "labelTextUploaded"
    | "labelTextDisabled"
    | "iconUpload"
    | "labelTextDisabledLarge"
    | "labelTextUploadedLarge"
    | "labelTextLarge"
    | "labelUploadFieldV2";
  layoutInputClassName?: string;
  required?: boolean;
  variant: "default" | "custom";
  message?: string;
  isDisabled?: boolean;
  label?: string;
};
