import { useMutation } from '@tanstack/react-query';
import { forgotRequest } from './api';
import { TForgotRequest } from '@uninus/entities';

export const useForgot = () => {
  return useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: async (payload: TForgotRequest) => await forgotRequest(payload),
  });
};
