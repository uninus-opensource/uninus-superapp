import {
  useMutation,
  useQuery,
  UseMutationResult,
} from '@tanstack/react-query';
import { BiodataCreate, BiodataGet, BiodataUpdate } from './api';
import {
  TBiodataRequest,
  TBiodataResponse,
  TBiodataUpdateRequest,
  TBiodataUpdateResponse,
  TMetaErrorResponse,
} from '@uninus/entities';

export const useBiodataCreate = (): UseMutationResult<
  TBiodataRequest,
  TMetaErrorResponse,
  TBiodataResponse
> =>
  useMutation({
    mutationKey: ['createBiodata'],
    mutationFn: async (payload: TBiodataRequest) => {
      return await BiodataCreate(payload);
    },
  });

export const useBiodataUpdate = (): UseMutationResult<
  TBiodataUpdateRequest,
  TMetaErrorResponse,
  TBiodataUpdateResponse
> =>
  useMutation({
    mutationKey: ['updateBiodata'],
    mutationFn: async (payload: TBiodataUpdateRequest) => {
      return await BiodataUpdate(payload);
    },
  });

export const useBiodataGet = () => {
  return useQuery({
    queryKey: ['getBiodata'],
    queryFn: async () => await BiodataGet(),
  });
};
