import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { TRegisterRequest, TRegisterResponse } from '@uninus/entities';
import { registerRequest } from './api';

export const useRegister = (): UseMutationResult<
  TRegisterResponse,
  unknown,
  TRegisterRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (payload) => await registerRequest(payload),
  });
};
