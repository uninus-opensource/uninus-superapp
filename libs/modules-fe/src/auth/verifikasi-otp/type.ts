export type TPayloadVerify = {
  email: string;
  otp: string;
};

export type TVerifyResponse = {
  message: string;
};

export type TNewOtpRequest = {
  email: string;
};
