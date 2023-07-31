import { UseQueryResult, useQuery } from '@tanstack/react-query';
import {
  TLocationRequest,
  TLocationResponse,
  TMetaErrorResponse,
} from '@uninus/entities';
import { LocationGet } from './api';

export const useLocationGet = (
  params: TLocationRequest
): UseQueryResult<TLocationResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ['getLocation', params],
    queryFn: async () => await LocationGet(params),
  });
};
