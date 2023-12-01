import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { TCommonForm } from "../common";

export type TOption<T = string | number> = {
  label: string;
  value: T;
};

export type TFieldSet = Omit<
  DetailedHTMLProps<
    | InputHTMLAttributes<HTMLInputElement>
    | SelectHTMLAttributes<HTMLSelectElement>
    | TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  "size" | "type"
> &
  TCommonForm &
  Pick<InputHTMLAttributes<HTMLInputElement>, "type">;
