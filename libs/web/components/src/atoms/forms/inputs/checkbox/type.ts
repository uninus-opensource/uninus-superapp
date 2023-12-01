import { TInput } from '@uninus/entities';

export type TInputCheckbox = Omit<TInput, 'type' | 'size'>;