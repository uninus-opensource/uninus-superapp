// nextauth.d.ts
import { DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  token?: {
    access_token: string;
    refresh_token: string;
  };
}

declare module "next-auth" {
  interface Session {
    user?: IUser;
  }
}
