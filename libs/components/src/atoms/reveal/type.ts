import { ReactNode } from 'react';

export type TRevealProps = {
  children: ReactNode;
  w?: 'w-fit' | 'w-full';
  blur?: boolean;
};
