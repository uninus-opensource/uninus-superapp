// nextauth.d.ts
import { DefaultUser } from 'next-auth';
import { TToken } from '@uninus/entities';

interface IUser extends DefaultUser {
  token?: TToken;
}

declare module 'next-auth' {
  interface Session {
    user?: IUser;
  }
}
