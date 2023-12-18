import { TCommonForm, TInput } from '@uninus/entities';

export type TInputText = Omit<TInput, 'size'> &
  Pick<TCommonForm, 'size' | 'status'>;