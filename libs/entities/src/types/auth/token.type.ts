export type TGenerateTokenResponse = {
  access_token: string;
  refresh_token: string;
};

export type TToken = {
  access_token: string;
  exp: number;
  refresh_token: string;
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
  access_token: string;
  exp: number;
};

export type TJwtPayload = {
  sub: string;
  email: string;
  role: string;
};
