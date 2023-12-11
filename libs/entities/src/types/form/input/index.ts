import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type TInput = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>;
