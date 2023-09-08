export type TJwtPayload = {
  email: string;
  sub: string;
  role: string;
};

export type TRefreshTokenPayload = TJwtPayload & { refreshToken: string };
