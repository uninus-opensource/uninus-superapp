import { FieldValues, UseControllerProps } from "react-hook-form";
import { TCommonForm, TInput } from "@uninus/entities";

type TFieldText = TInput & Omit<TCommonForm, "text">;
export type TControlledFieldText<T extends FieldValues> = UseControllerProps<T> & TFieldText;
