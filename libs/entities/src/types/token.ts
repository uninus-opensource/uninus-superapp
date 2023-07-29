export type TGenerateTokenResponse = {
  access_token: string;
  refresh_token: string;
};

export type TReqToken = {
  user: { sub: string; email: string; role: string };
};

export type TGenerateToken = {
  sub: string;
  email: string;
  role: string;
};
export type TResRefreshToken = {
  access_token: string;
  exp: number;
};
