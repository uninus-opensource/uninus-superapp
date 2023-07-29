export type TVerifyOtpPasswordRequest = {
  email: string;
  otp: string;
};

export type TVerifyOtpPasswordResponse = {
  message: string;
};
