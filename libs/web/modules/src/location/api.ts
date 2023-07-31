import { api } from '@uninus/web/services';
import { TLocationRequest, TLocationResponse } from '@uninus/entities';

export const LocationGet = async (
  params: TLocationRequest
): Promise<TLocationResponse> => {
  const { data } = await api<TLocationResponse>({
    method: 'GET',
    url: '/location',
    params,
  });
  return data;
};
