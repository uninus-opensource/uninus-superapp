import { ReactNode } from "react";

export type TUploadFile = {
  control: any;
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
};
