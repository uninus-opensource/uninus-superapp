import { FieldValues, UseControllerProps } from 'react-hook-form';
import { ChangeEventHandler } from 'react';
import { RADIO_BUTTON_SIZE, RADIO_BUTTON_VARIANT, LABEL_SIZE } from './enum';

export type TRadioButtonProps<T extends FieldValues> = UseControllerProps<T> & {
  variant?: RADIO_BUTTON_VARIANT | string;
  size?: RADIO_BUTTON_SIZE | string;
  labelSize?: LABEL_SIZE | string;
  label?: string;
  name?: string;
  required?: boolean;
  message?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
