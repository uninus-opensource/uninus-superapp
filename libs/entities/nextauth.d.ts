// nextauth.d.ts
import { DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  token?: {
    accessToken: string;
    refreshToken: string;
  };
}

declare module "next-auth" {
  interface Session {
    user?: IUser;
  }
}
