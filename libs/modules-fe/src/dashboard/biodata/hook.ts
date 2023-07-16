import { useMutation, useQuery } from '@tanstack/react-query';
import { BiodataCreate, BiodataGet } from './api';
import { TBiodataRequest } from '@uninus/entities';

export const useBiodataCreate = () => {
  return useMutation({
    mutationKey: ['createBiodata'],
    mutationFn: async (payload: TBiodataRequest) =>
      await BiodataCreate(payload),
  });
};

export const useBiodataUpdate = () => {
  return useMutation({
    mutationKey: ['updateBiodata'],
    mutationFn: async (payload: TBiodataRequest) =>
      await BiodataCreate(payload),
  });
};

export const useBiodataGet = () => {
  return useQuery({
    queryKey: ['getBiodata'],
    queryFn: async () => await BiodataGet(),
  });
};
