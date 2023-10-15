import { JwtService } from "@nestjs/jwt";
import { TGenerateToken, TGenerateTokenResponse } from "@uninus/entities";
import { PrismaService } from "@uninus/api/services";

const jwt = new JwtService();
const prisma = new PrismaService();

export const generateAccessToken = async (payload: TGenerateToken): Promise<string> => {
  const access_token = await jwt.signAsync(payload, {
    secret: process.env["ACCESS_SECRET"],
    expiresIn: "15m",
  });

  return access_token;
};

export const generateToken = async (payload: TGenerateToken): Promise<TGenerateTokenResponse> => {
  const [access_token, refresh_token] = await Promise.all([
    generateAccessToken(payload),
    jwt.signAsync(payload, {
      secret: process.env["REFRESH_SECRET"],
      expiresIn: "7d",
    }),
  ]);

  await prisma.users.update({
    where: {
      email: payload.email,
    },
    data: {
      refresh_token: String(refresh_token),
    },
  });

  return {
    access_token: String(access_token),
    refresh_token: String(refresh_token),
  };
};
