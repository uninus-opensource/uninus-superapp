import { TToken } from "./token.type";
import { TUser } from "../user";
import { TVSLogin } from "../../schemas";

export type TLoginResponse = {
  id: string;
  message: string;
  user: TUser;
  token: TToken;
};

export type TLoginRequest = TVSLogin;
