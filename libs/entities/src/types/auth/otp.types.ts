import { TVSResendOtp, TVSVerifyOtp } from "../../schemas";

export type TVerifyOtpRequest = TVSVerifyOtp;

export type TVerifyOtpResponse = {
  message: string;
};

export type TResendOtpRequest = TVSResendOtp;

export type TResendOtpResponse = {
  message: string;
};

export type TVerifyOtpPasswordRequest = TVSVerifyOtp;

export type TVerifyOtpPasswordResponse = {
  message: string;
};
