import { UseMutationResult, useMutation } from '@tanstack/react-query';
import {
  TMetaErrorResponse,
  TRegisterRequest,
  TRegisterResponse,
} from '@uninus/entities';
import { registerRequest } from './api';

export const useRegister = (): UseMutationResult<
  TRegisterResponse,
  TMetaErrorResponse,
  TRegisterRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (params) => await registerRequest(params),
  });
};
