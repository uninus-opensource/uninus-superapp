import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

export type TSelect = Omit<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  'size'
>;