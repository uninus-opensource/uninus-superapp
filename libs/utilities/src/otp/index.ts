import { PrismaService } from '@uninus/models';

const prisma = new PrismaService();

const generateTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

export const generateOtp = async (email: string, id: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const isCreateOtp = await prisma.oTP.upsert({
    where: {
      user_id: id,
    },
    update: {
      token: otp,
      expiredAt: generateTime() + 120,
    },
    create: {
      token: otp,
      expiredAt: generateTime() + 120,
      user: {
        connect: {
          id: id,
        },
      },
    },
  });

  return isCreateOtp;
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
        lte: generateTime(),
      },
    },
  });
};
