export type TGenerateTokenResponse = {
  access_token: string;
  refresh_token: string;
};

export type TReqToken = {
  user: { userId: string; email: string; role: string };
};

export type TGenerateToken = {
  userId: string;
  email: string;
  role: string;
};
