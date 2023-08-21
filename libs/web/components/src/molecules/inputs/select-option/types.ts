import { Control, UseControllerProps } from "react-hook-form";
import { Ref } from "react";

export type TSelectOption = {
  label: string;
  value: string;
};

export interface SelectInputProps extends UseControllerProps {
  options: TSelectOption[];
  disabled?: boolean;
  className?: string;
  labelName?: string;
  labelClassName?: string;
  labels?: string;
  control: Control;
  required?: boolean;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  ref?: Ref<any>;
}
