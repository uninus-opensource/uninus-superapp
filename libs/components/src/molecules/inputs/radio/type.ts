import { FieldValues, UseControllerProps } from 'react-hook-form';
import { ChangeEventHandler } from 'react';

export type TRadioButtonProps<T extends FieldValues> = UseControllerProps<T> & {
  variant?: 'primary' | 'error' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  labelSize?: 'sm' | 'md' | 'lg';
  label?: string;
  name?: string;
  inputname?: string;
  required?: boolean;
  message?: 'primary' | 'error' | 'warning';
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value: string;
  id: string;
};
