import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import {
  TLoginResponse,
  TProfileResponse,
  TRegisterRequest,
  TReqToken,
  TResRefreshToken,
  TForgotPasswordRequest,
  TResetPasswordResponse,
  TResetPasswordRequest,
  TVerifyOtpRequest,
  TVerifyOtpResponse,
  TVerifyOtpPasswordRequest,
  TVerifyOtpPasswordResponse,
  TLogoutRequest,
  TLogoutResponse,
  TLoginRequest,
  TUserEmail,
  TUserEmailResponse,
} from "@uninus/entities";
import { PrismaService } from "@uninus/api/models";
import {
  compareOtp,
  comparePassword,
  encryptPassword,
  generateAccessToken,
  generateToken,
  clearOtp,
} from "@uninus/api/utilities";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async register(payload: TRegisterRequest): Promise<TProfileResponse> {
    const isUserExist = await this.prisma.users.findMany({
      where: {
        OR: [
          {
            email: payload.email,
          },
          {
            students: {
              phone_number: `62${payload.phone_number}`,
            },
          },
        ],
      },
    });

    if (isUserExist.length > 0) {
      throw new RpcException(new ConflictException("Email atau nomor telepon sudah terdaftar"));
    }

    const password = await encryptPassword(payload.password);
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");

    const lastRegistration = await this.prisma.pMB.findFirst({
      orderBy: { registration_number: "desc" },
    });

    let registrationCounter = 1;
    if (lastRegistration) {
      registrationCounter = parseInt(lastRegistration.registration_number.substring(8)) + 1;
    }

    const formattedCounter = registrationCounter.toString().padStart(6, "0");

    const registrationNumber = `${year}${month}${day}${formattedCounter}`;

    const createUser = await this.prisma.users.create({
      data: {
        fullname: payload.fullname,
        email: payload.email.toLowerCase(),
        password,
        role_id: payload.role_id,
        avatar: "https://uninus-demo.s3.ap-southeast-1.amazonaws.com/avatar-default.png",
        ...(!payload.role_id && {
          students: {
            create: {
              phone_number: `62${payload.phone_number}`,
              pmb: {
                create: {
                  registration_number: registrationNumber,
                  registration_status_id: 1,
                  student_grade: {
                    createMany: {
                      data: [
                        {
                          subject: "indonesia",
                          semester: "1",
                        },
                        {
                          subject: "indonesia",
                          semester: "2",
                        },
                        {
                          subject: "indonesia",
                          semester: "3",
                        },
                        {
                          subject: "indonesia",
                          semester: "4",
                        },
                        {
                          subject: "matematika",
                          semester: "1",
                        },
                        {
                          subject: "matematika",
                          semester: "2",
                        },
                        {
                          subject: "matematika",
                          semester: "3",
                        },
                        {
                          subject: "matematika",
                          semester: "4",
                        },
                        {
                          subject: "inggris",
                          semester: "1",
                        },
                        {
                          subject: "inggris",
                          semester: "2",
                        },
                        {
                          subject: "inggris",
                          semester: "3",
                        },
                        {
                          subject: "inggris",
                          semester: "4",
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        }),
      },
    });

    if (!createUser) {
      throw new RpcException(new BadRequestException("Gagal membuat akun"));
    }

    return createUser;
  }

  async login(payload: TLoginRequest): Promise<TLoginResponse> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        email: true,
        fullname: true,
        password: true,
        refresh_token: true,
        role_id: true,
        createdAt: true,
        avatar: true,
        isVerified: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    const isMatch = user && (await comparePassword(payload.password as string, user.password));

    if (!user || !isMatch) {
      throw new RpcException(new UnauthorizedException("Email atau password tidak valid"));
    }
    if (!user.isVerified) {
      throw new RpcException(new UnauthorizedException("Email belum terverifikasi"));
    }

    const { access_token, refresh_token } = await generateToken({
      sub: user.id,
      email: user.email,
      role: user.role?.name || "",
    });
    const expiresIn = 15 * 60 * 1000;
    const now = Date.now();
    const expirationTime = now + expiresIn;

    return {
      message: "Berhasil Login",
      token: {
        access_token,
        exp: expirationTime,
        refresh_token,
      },
      id: user.id,
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        role: user.role?.name || "",
        createdAt: user.createdAt,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    };
  }

  async logout(payload: TLogoutRequest): Promise<TLogoutResponse> {
    const result = await this.prisma.users.updateMany({
      where: {
        refresh_token: payload.refresh_token,
      },
      data: {
        refresh_token: null,
      },
    });

    if (!result) {
      throw new RpcException(new UnauthorizedException("Gagal Logout"));
    }

    return {
      message: "Berhasil logout",
    };
  }

  async getEmailUser(payload: TUserEmail): Promise<TUserEmailResponse> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (!user) {
      throw new RpcException(new NotFoundException("Email tidak ditemukan"));
    }

    return { id: user.id, email: user.email, fullname: user.fullname };
  }

  async refreshToken({ user }: TReqToken): Promise<TResRefreshToken> {
    const expiresIn = 15 * 60 * 1000;
    const access_token = await generateAccessToken(user);

    const now = Date.now();
    const expirationTime = now + expiresIn;

    if (now > expirationTime) {
      throw new RpcException(new UnauthorizedException("Access Token telah berakhir"));
    }

    return {
      access_token,
      exp: expirationTime,
    };
  }

  async verifyOtp(payload: TVerifyOtpRequest): Promise<TVerifyOtpResponse> {
    await clearOtp();

    const isVerified = await compareOtp(payload?.email, payload?.otp);
    if (!isVerified) {
      throw new RpcException(new UnauthorizedException("Email atau OTP tidak valid"));
    }

    const user = await this.prisma.users.update({
      where: {
        email: payload.email,
      },
      data: {
        isVerified: true,
      },
    });

    if (!user) {
      throw new RpcException(new BadRequestException("Gagal verifikasi OTP"));
    }
    return {
      message: "Berhasil verifikasi OTP",
    };
  }

  async forgotPassword(payload: TForgotPasswordRequest): Promise<TProfileResponse> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (!user) {
      throw new RpcException(new NotFoundException("Email tidak ditemukan"));
    }

    return user;
  }

  async verifyOtpPassword(payload: TVerifyOtpPasswordRequest): Promise<TVerifyOtpPasswordResponse> {
    await clearOtp();

    const isVerified = await compareOtp(payload?.email, payload?.otp);
    if (!isVerified) {
      throw new RpcException(new UnauthorizedException("Email atau OTP tidak valid"));
    }

    return {
      message: "Berhasil verifikasi OTP",
    };
  }

  async resetPassword(payload: TResetPasswordRequest): Promise<TResetPasswordResponse> {
    const newPassword = await encryptPassword(payload.password);

    const isEmailExist = await this.prisma.users.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!isEmailExist) {
      throw new RpcException(new NotFoundException("Email tidak ditemukan"));
    }

    const user = await this.prisma.users.update({
      where: {
        email: payload.email,
      },
      data: {
        password: newPassword,
      },
    });

    if (!user) {
      throw new RpcException(new BadRequestException("Gagal mengganti password"));
    }
    return {
      message: "Berhasil mengganti password",
    };
  }
}
