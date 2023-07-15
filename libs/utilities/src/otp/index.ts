import { PrismaService } from '@uninus/models';

const prisma = new PrismaService();

export const generateOtp = async (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await prisma.users.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  await prisma.oTP.upsert({
    where: {
      user_id: user?.id,
    },
    update: {
      token: otp,
      expiredAt: Math.floor(new Date().getTime() / 1000) + 120,
    },
    create: {
      token: otp,
      expiredAt: Math.floor(new Date().getTime() / 1000) + 120,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  return otp;
};

export const compareOtp = async (
  email: string,
  otp: string
): Promise<boolean> => {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
    select: {
      otp: {
        select: {
          token: true,
        },
      },
    },
  });
  const isVerified = user?.otp?.token === otp;
  return isVerified;
};

export const clearOtp = async (): Promise<void> => {
  await prisma.oTP.deleteMany({
    where: {
      expiredAt: {
        lte: Math.floor(new Date().getTime() / 1000),
      },
    },
  });
};
