import { TCommonForm, TInput } from "@uninus/entities";

export type TFieldText = TInput & Omit<TCommonForm, "text">;
