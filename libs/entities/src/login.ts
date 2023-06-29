import { Users } from '@prisma/client';
import { TToken } from './token';

export type TLoginResponse = {
  id: string;
  token: TToken;
  user: Users;
};

export type TLoginRequest = {
  email?: string;
  password?: string;
};