import { FieldValues, UseControllerProps } from 'react-hook-form';

export type TUploadFieldProps<T> = UseControllerProps<FieldValues, string> & {
  className?: string;
  labels?: string;
};
