export type TForgotPasswordRequest = {
  email: string;
};

export type TForgotPasswordResponse = {
  message: string;
};

export type TResetPasswordRequest = {
  email: string;
  password: string;
};

export type TResetPasswordResponse = {
  message: string;
};
