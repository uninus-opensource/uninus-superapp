import { JwtService } from "@nestjs/jwt";
import { TGenerateToken, TGenerateTokenResponse } from "@uninus/entities";

const jwt = new JwtService();

export const generateAccessToken = async (payload: TGenerateToken): Promise<string> => {
  const accessToken = await jwt.signAsync(payload, {
    secret: process.env["ACCESS_SECRET"],
    expiresIn: "15m",
  });

  return accessToken;
};

export const generateToken = async (payload: TGenerateToken): Promise<TGenerateTokenResponse> => {
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(payload),
    jwt.signAsync(payload, {
      secret: process.env["REFRESH_SECRET"],
      expiresIn: "7d",
    }),
  ]);

  return {
    accessToken: String(accessToken),
    refreshToken: String(refreshToken),
  };
};
