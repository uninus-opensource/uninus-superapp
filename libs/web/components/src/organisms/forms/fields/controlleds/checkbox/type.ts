import { FieldValues, UseControllerProps } from "react-hook-form";
import { TCommonForm, TInput } from "@uninus/entities";
type TFieldCheckbox = Omit<TInput, "size" | "type"> & Omit<TCommonForm, "preppend" | "append">;

export type TControlledFieldText<T extends FieldValues> = UseControllerProps<T> & TFieldCheckbox;
