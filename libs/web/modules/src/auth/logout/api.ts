import { api } from '@uninus/web/services';
import { TLogoutPayload } from './types';

export const logoutRequest = async (payload: TLogoutPayload) => {
  await api.post('auth/logout', payload);
};
