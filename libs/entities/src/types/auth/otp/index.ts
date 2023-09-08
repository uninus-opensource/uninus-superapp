export type TVerifyOtpRequest = {
  email: string;
  otp: string;
};

export type TVerifyOtpResponse = {
  message: string;
};

export type TResendOtpRequest = {
  email: string;
};

export type TResendOtpResponse = {
  message: string;
};

export type TVerifyOtpPasswordRequest = {
  email: string;
  otp: string;
};

export type TVerifyOtpPasswordResponse = {
  message: string;
};
