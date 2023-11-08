import { FieldValues, UseControllerProps } from "react-hook-form";
import { Ref } from "react";
import { GroupBase, SelectInstance } from "react-select";

export type TSelectOption = {
  label: string;
  value: string;
  color?: string;
};

export type TSelectFieldProps<T extends FieldValues> = UseControllerProps<T> & {
  options: TSelectOption[];
  disabled?: boolean;
  className?: string;
  labelName?: string;
  labelClassName?: string;
  labels?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  status?: "error" | "warning" | "success" | "none";
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  ref?: Ref<SelectInstance<TSelectOption, true, GroupBase<TSelectOption>>>;
  message?: string;
  selectedColor?: string;
  textColor?: string;
  renderSelectColor?: boolean;
  selectColor?: string;
  optionColor?: string;
  isBordered?: boolean;
};
