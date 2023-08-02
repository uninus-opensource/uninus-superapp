import { TToken } from "./token";
import { TUser } from "./user";

export type TLoginResponse = {
  id: string;
  message: string;
  user: TUser;
  token: TToken;
};

export type TLoginRequest = {
  email?: string;
  password?: string;
};

export type TLoginAuth = {
  user: {
    email: string;
  };
};
