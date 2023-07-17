/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEventHandler } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';

export type TUploadFieldProps<T> = UseControllerProps<FieldValues, string> & {
  multiple?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  files?: string;
  value?: string;
  accepted?: string;
  onDrop?: (acceptedFiles: any) => void;
  path?: File;
  type?: string;
  variant: 'sm' | 'md' | 'lg';
  status?: 'error' | 'success' | 'warning' | 'none';
  message?: string;
};
