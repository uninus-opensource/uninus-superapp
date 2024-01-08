import { TVSRegister } from "../../schemas";

export type TRegisterResponse = {
  fullname?: string | null;
  message?: string | null;
  otp?: string | null;
};

export type TRegisterRequest = TVSRegister;
