import { FieldValues, UseControllerProps } from 'react-hook-form';
import { ChangeEventHandler } from 'react';
import {
  CHECKBOX_SIZE,
  CHECKBOX_VARIANT,
  LABEL_SIZE,
  STATUS_MESSAGE,
} from './enum';

export type TCheckBoxProps<T extends FieldValues> = UseControllerProps<T> & {
  variant?: CHECKBOX_VARIANT;
  size?: CHECKBOX_SIZE;
  labelSize?: LABEL_SIZE;
  label?: string;
  name?: string;
  required?: boolean;
  message?: string;
  messageStatus?: STATUS_MESSAGE;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
