import { TToken } from "./token.types";
import { TUser } from "../user";
import { TVSLogin } from "../../schemas";

export type TLoginResponse = {
  id: string;
  message: string;
  user: TUser;
  token: TToken;
};

export type TLoginRequest =
  | {
      email?: string;
      password?: string;
    }
  | TVSLogin;

export type TLoginAuth = {
  user: {
    email: string;
  };
};
