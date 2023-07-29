import { ChangeEventHandler } from 'react';

export type SearchProps = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  placeholder?: string;
};
