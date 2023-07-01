import { ChangeEventHandler, ReactNode } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { StaticImageData } from 'next/image';

export type TTextFieldProps<T extends FieldValues> = UseControllerProps<T> & {
  type?: 'text' | 'password' | 'email' | 'number' | 'date';
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  className?: string;
  labelClassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  status?: 'success' | 'error' | 'warning' | 'none';
  message?: string;
  variant: 'lg' | 'md' | 'sm' | 'otp';
  icon?: ReactNode | StaticImageData;
  prepend?: ReactNode;
  append?: ReactNode;
  prependColor?: string;
  appendColor?: string;
  hint?: string;
  isTextArea?: boolean;
  textAreaRow?: number;
};
