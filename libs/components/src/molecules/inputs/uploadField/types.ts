import { ChangeEventHandler } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';

export type TUploadFieldProps<T extends FieldValues> = UseControllerProps<T> & {
  variant: 'lg' | 'md' | 'sm';
  label?: string;
  disabled?: boolean;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  status?: 'success' | 'error' | 'warning' | 'none';
  name: string;
  labelClassName?: string;
  accept?: string;
};
