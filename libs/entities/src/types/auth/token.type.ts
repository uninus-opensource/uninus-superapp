export type TGenerateTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type TToken = {
  accessToken: string;
  exp: number;
  refreshToken: string;
};

export type TReqToken = {
  user: {
    sub: string;
    email: string;
    role: {
      name: string;
      permissions: string[];
    };
  };
};

export type TGenerateToken = {
  sub: string;
  email: string;
  role: {
    name: string;
    permissions: string[];
  };
};
export type TResRefreshToken = {
  accessToken: string;
  exp: number;
};

export type TJwtPayload = {
  sub: string;
  email: string;
  role: string;
};
