import { TVSForgotPassword, TVSNewPassword } from "../../schemas";

export type TForgotPasswordRequest = TVSForgotPassword;

export type TForgotPasswordResponse = {
  message: string;
};

export type TResetPasswordRequest = TVSNewPassword;

export type TResetPasswordResponse = {
  message: string;
};
