
import { TToken } from './token';

export type TLoginResponse = {
  id: string;
  token: TToken;
  user: {
    nik: string;
    fullname: string | null;
    email: string;
    avatar: string | null;
    role_id: number | null;
  }
};

export type TLoginRequest = {
  email?: string;
  password?: string;
};
