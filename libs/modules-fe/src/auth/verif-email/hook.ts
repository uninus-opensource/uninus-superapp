import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { TPayloadVerify, TVerifyResponse } from './type';
import { TMetaErrorResponse } from '@uninus/entities';
import { verifyRequest } from './api';

export const useVerify = (): UseMutationResult<
  TVerifyResponse,
  TMetaErrorResponse,
  TPayloadVerify,
  unknown
> => {
  return useMutation({
    mutationKey: ['verify'],
    mutationFn: async (params) => await verifyRequest(params),
  });
};
