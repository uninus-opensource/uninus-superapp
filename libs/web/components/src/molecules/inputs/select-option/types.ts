import { Control, UseControllerProps } from "react-hook-form";
import { Ref } from "react";
import { GroupBase, SelectInstance } from "react-select";

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
  ref?: Ref<SelectInstance<TSelectOption, true, GroupBase<TSelectOption>>>;
}
