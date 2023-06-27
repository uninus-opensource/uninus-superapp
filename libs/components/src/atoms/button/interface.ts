import { ButtonHTMLAttributes } from 'react';
import { BUTTON_SIZE, BUTTON_VARIANT } from './enums';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: BUTTON_SIZE | string;
  variant?: BUTTON_VARIANT | string;
  loading?: boolean;
  href?: string;
  width?: string;
  height?: string;
}
