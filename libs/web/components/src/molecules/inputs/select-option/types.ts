import { Control, UseControllerProps } from 'react-hook-form';

export type SelectOption = {
  label: string;
  value: string;
};

export interface SelectInputProps extends UseControllerProps {
  options: SelectOption[];
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
}
