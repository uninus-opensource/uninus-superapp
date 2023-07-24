import { FieldValues, UseControllerProps } from 'react-hook-form';

export type TUploadFieldProps = UseControllerProps<FieldValues, string> & {
  className?: string;
  labels?: string;
  required?: boolean;
};
