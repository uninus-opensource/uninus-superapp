import { TVSRegister } from "../../schemas";

export type TRegisterResponse = {
  fullname?: string | null;
  message?: string | null;
  otp?: string | null;
};

export type TRegisterRequest = TVSRegister;

export type TLResponse = {
  message: string;
  token: {
    access_token: string;
    refresh_token: string;
  };
  User: {
    id: string;
    email: string;
    fullname: string | null;
    password: string;
  };
};
