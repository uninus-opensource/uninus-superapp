import {
  useMutation,
  useQuery,
  UseMutationResult,
} from '@tanstack/react-query';
import { BiodataCreate, BiodataGet } from './api';
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
  TBiodataResponse,
  unknown
> =>
  useMutation({
    mutationKey: ['createBiodata'],
    mutationFn: async (payload) => {
      return await BiodataCreate(payload);
    },
  });

export const useBiodataUpdate = (): UseMutationResult<
  TBiodataUpdateRequest,
  TMetaErrorResponse,
  TBiodataUpdateResponse,
  unknown
> =>
  useMutation({
    mutationKey: ['updateBiodata'],
    mutationFn: async (payload) => {
      return await BiodataCreate(payload);
    },
  });

export const useBiodataGet = () => {
  return useQuery({
    queryKey: ['getBiodata'],
    queryFn: async () => await BiodataGet(),
  });
};
