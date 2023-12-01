import { TCommonForm, TInput } from "@uninus/entities";
export type TFieldCheckbox = Omit<TInput, "size" | "type"> &
  Omit<TCommonForm, "preppend" | "append">;
