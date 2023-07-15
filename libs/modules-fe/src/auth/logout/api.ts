import { signOut } from 'next-auth/react';
import { api } from '@uninus/services-fe';
import { TLogoutPayload } from './types';

export const logoutRequest = async (payload: TLogoutPayload) => {
  await api.post('auth/logout', payload);
  await signOut({ callbackUrl: '/auth/login' });
};
