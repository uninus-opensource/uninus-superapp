import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import {
  TLoginResponse,
  TProfileRequest,
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
  constructor(
    private prisma: PrismaService,
  ) {}

  async getProfile(reqUser: TProfileRequest): Promise<TProfileResponse> {
    const { email } = reqUser;

    const profile = await this.prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        fullname: true,
        role_id: true,
        createdAt: true,
        avatar: true,
      },
    });

    if (!profile) {
      throw new RpcException("Profil tidak ditemukan");
    }

    return profile;
  }

  async register(data: TRegisterRequest): Promise<TProfileResponse> {
    const isEmailExist = await this.prisma.users.findUnique({
      where: {
        email: data.email.toLowerCase(),
      },
    });

    if (isEmailExist) {
      throw new RpcException("Email sudah terdaftar");
    }

    const password = await encryptPassword(data.password);

    const createdUser = await this.prisma.users.create({
      data: {
        fullname: data.fullname,
        email: data.email.toLowerCase(),
        password,
        role_id: data.role_id,
        avatar:
          "https://res.cloudinary.com/dyominih0/image/upload/v1688846789/MaleProfileDefault_hxtqcy.png",
        students: {
          create: {
            phone_number: `62${data.phone_number}`,
            pmb: {
              create: {
                registration_number: String(Math.floor(1000000000 + Math.random() * 9000000000)),
                registration_status_id: 1
              },
            },
          },
        },
      },
    });

    if (!createdUser) {
      throw new RpcException("Gagal Mendaftar");
    }


    return createdUser;
  }

  async login(args: TLoginRequest): Promise<TLoginResponse> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: args.email?.toLowerCase(),
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
    if (!user) {
      throw new RpcException(new UnauthorizedException("Akun Tidak ditemukan"))
    }

    if (!user.isVerified) {
      throw new RpcException(new UnauthorizedException("Email Belum terverifikasi"))
    }

    const isMatch = await comparePassword(args.password as string, user.password);

    if (!isMatch) {
      throw new RpcException(new UnauthorizedException("Password Salah!"))
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

  async logout(args: TLogoutRequest): Promise<TLogoutResponse> {
    const result = await this.prisma.users.updateMany({
      where: {
        refresh_token: args.refresh_token,
      },
      data: {
        refresh_token: null,
      },
    });

    if (!result) {
      throw new RpcException(new UnauthorizedException("Gagal Logout"))
    }

    return {
      message: "Berhasil logout",
    };
  }

  async refreshToken(reqToken: TReqToken): Promise<TResRefreshToken> {
    const expiresIn = 15 * 60 * 1000;
    const access_token = await generateAccessToken(reqToken.user);

    const now = Date.now();
    const expirationTime = now + expiresIn;

    if (now > expirationTime) {
      throw new RpcException(new UnauthorizedException("Access Token telah berakhir"))
    }

    return {
      access_token,
      exp: expirationTime,
    };
  }

  async verifyOtp(args: TVerifyOtpRequest): Promise<TVerifyOtpResponse> {
    await clearOtp();

    const isVerified = await compareOtp(args?.email, args?.otp);
    if (!isVerified) {
      throw new RpcException("Email atau OTP tidak valid");
    }

    const user = await this.prisma.users.update({
      where: {
        email: args.email,
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


  async forgotPassword(data: TForgotPasswordRequest): Promise<TProfileResponse> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: data?.email,
      },
    });

    if (!user) {
      throw new RpcException("Akun tidak ditemukan");
    }

    return user;
  }

  async verifyOtpPassword(args: TVerifyOtpPasswordRequest): Promise<TVerifyOtpPasswordResponse> {
    await clearOtp();

    const isVerified = await compareOtp(args?.email, args?.otp);
    if (!isVerified) {
      throw new RpcException("Email atau OTP tidak valid");
    }

    return {
      message: "Berhasil verifikasi OTP",
    };
  }

  async resetPassword(args: TResetPasswordRequest): Promise<TResetPasswordResponse> {
    const newPassword = await encryptPassword(args.password);

    const isEmailExist = await this.prisma.users.findUnique({
      where: {
        email: args.email.toLowerCase(),
      },
    });

    if (!isEmailExist) {
      throw new RpcException("Email tidak ditemukan");
    }

    const user = await this.prisma.users.update({
      where: {
        email: args.email,
      },
      data: {
        password: newPassword,
      },
    });

    if (!user) {
      throw new RpcException(
        new BadRequestException("Gagal mengganti password")
      );
    }
    return {
      message: "Berhasil mengganti password",
    };
  }
}
