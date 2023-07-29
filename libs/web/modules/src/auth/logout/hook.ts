import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { logoutRequest } from './api';
import { TMetaErrorResponse } from '@uninus/entities';
import { useSession } from 'next-auth/react';

export const useLogout = (): UseMutationResult<
  unknown,
  TMetaErrorResponse,
  unknown,
  unknown
> => {
  const { data } = useSession();
  const refreshToken = data?.user?.token?.refresh_token as string;
  return useMutation({
    mutationKey: ['logout-request'],
    mutationFn: async () => logoutRequest({ refresh_token: refreshToken }),
  });
};
