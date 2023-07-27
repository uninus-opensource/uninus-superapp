export type TPayloadVerifyOTP = {
  email: string;
  otp: string;
};

export type TVerifyOTPResponse = {
  message: string;
};

export type TNewOtpRequest = {
  email: string;
};
