import {
  useMutation,
  useQuery,
  UseMutationResult,
} from '@tanstack/react-query';
import { BiodataCreate, BiodataGet } from './api';
import { TBiodataResponse } from '@uninus/entities';

export const useBiodataCreate = (): UseMutationResult<
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
  TBiodataResponse,
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
