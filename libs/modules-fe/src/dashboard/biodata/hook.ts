import { useMutation } from '@tanstack/react-query';
import { BiodataCreate } from './api';
import { TBiodataRequest } from '@uninus/entities';

export const useBiodataCreate = () => {
  return useMutation({
    mutationKey: ['createBiodata'],
    mutationFn: async (payload: TBiodataRequest) =>
      await BiodataCreate(payload),
  });
};
