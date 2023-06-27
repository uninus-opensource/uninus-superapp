import { ButtonHTMLAttributes } from 'react';
import { BUTTON_SIZE, BUTTON_VARIANT } from './enums';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: BUTTON_SIZE;
  variant?: BUTTON_VARIANT;
  loading?: boolean;
  href?: string;
  width?: string;
  height?: string;
}
