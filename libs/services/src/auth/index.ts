import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  TLoginResponse,
  TProfileRequest,
  TProfileResponse,
  TRegisterResponse,
  TReqToken,
  getEmailMessageTemplate,
} from '@uninus/entities';
import { PrismaService } from '@uninus/models';
import {
  compareOtp,
  comparePassword,
  encryptPassword,
  generateAccessToken,
  generateOtp,
  generateToken,
  clearOtp,
} from '@uninus/utilities';

import { EmailService } from '../email';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly emailService: EmailService
  ) {}

  async getProfile(reqUser: TProfileRequest): Promise<TProfileResponse> {
    const { email, nik } = reqUser;

    const profile = await this.prisma.users.findUnique({
      where: {
        nik,
        email,
      },
      select: {
        id: true,
        email: true,
        fullname: true,
        role_id: true,
        createdAt: true,
        nik: true,
        avatar: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('Profil tidak ditemukan');
    }

    return profile;
  }

  async register(data: Prisma.UsersCreateInput): Promise<TRegisterResponse> {
    const isEmailExist = await this.prisma.users.findUnique({
      where: {
        email: data.email.toLowerCase(),
      },
    });

    if (isEmailExist) {
      throw new ConflictException('Email sudah terdaftar');
    }

    const isNikExist = await this.prisma.users.findUnique({
      where: {
        nik: data.nik,
      },
    });

    if (isNikExist) {
      throw new ConflictException('Nik sudah terdaftar');
    }

    const password = await encryptPassword(data.password);

    const createdUser = await this.prisma.users.create({
      data: {
        ...data,
        email: data.email.toLowerCase(),
        password,
        role: data.role,
        avatar:
          'https://res.cloudinary.com/dyominih0/image/upload/v1688846789/MaleProfileDefault_hxtqcy.png',
      },
    });

    if (!createdUser) {
      throw new BadRequestException('Gagal Mendaftar');
    }
    const otp = await generateOtp(createdUser?.email);

    const msg = 'verifikasi akun anda';

    const html = getEmailMessageTemplate(data.fullname, otp, msg);

    const sendEmail = this.emailService.sendEmail(
      data.email.toLowerCase(),
      'Verifikasi Email',
      html
    );

    if (!sendEmail) {
      throw new BadRequestException('Gagal mengirimkan kode verifikasi');
    }

    return {
      message: 'Akun Berhasil dibuat!, check email untuk verifikasi',
    };
  }

  async login(email: string, password: string): Promise<TLoginResponse> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: email.toLowerCase(),
      },
      select: {
        id: true,
        nik: true,
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
      throw new NotFoundException('Akun tidak ditemukan');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('Email belum terverifikasi');
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Password salah');
    }
    const { access_token, refresh_token } = await generateToken({
      sub: user.id,
      email: user.email,
      role: user.role?.name || '',
    });

    return {
      message: 'Berhasil Login',
      token: {
        access_token,
        refresh_token,
      },
      id: user.id,
      user: {
        id: user.id,
        nik: user.nik,
        email: user.email,
        fullname: user.fullname,
        role: user.role?.name || '',
        createdAt: user.createdAt,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    };
  }

  async logout(refreshToken: string): Promise<{ message: string }> {
    const result = await this.prisma.users.updateMany({
      where: {
        refresh_token: refreshToken,
      },
      data: {
        refresh_token: null,
      },
    });

    if (!result) {
      throw new UnauthorizedException('Gagal logout');
    }

    return {
      message: 'Berhasil logout',
    };
  }

  async refreshToken(reqToken: TReqToken): Promise<{ access_token: string }> {
    const access_token = await generateAccessToken(reqToken.user);

    return {
      access_token,
    };
  }

  async verifyOtp(email: string, otp: string) {
    await clearOtp();

    const isVerified = await compareOtp(email, otp);
    if (!isVerified) {
      throw new NotFoundException('Email atau OTP tidak valid');
    }

    const user = await this.prisma.users.update({
      where: {
        email,
      },
      data: {
        isVerified: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Gagal verifikasi OTP');
    }
    return {
      message: 'Berhasil verifikasi OTP',
    };
  }

  async resendOtp(email: string) {
    await clearOtp();
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException('Akun tidak ditemukan');
    }

    const otp = await generateOtp(email);

    const msg = 'verifikasi akun anda';

    const html = getEmailMessageTemplate(user?.fullname, otp, msg);

    const sendEmail = this.emailService.sendEmail(
      email.toLowerCase(),
      'Verifikasi Email',
      html
    );

    if (!sendEmail) {
      throw new BadRequestException('Gagal mengirimkan kode verifikasi');
    }

    return {
      message: 'Berhasil kirim OTP',
    };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        fullname: true,
      },
    });
    const msg = 'memperbarui kata sandi anda';

    const otp = await generateOtp(email);
    const html = getEmailMessageTemplate(user?.fullname ?? '', otp, msg);

    const sendEmail = this.emailService.sendEmail(
      email.toLowerCase(),
      'Reset Password',
      html
    );
    if (!sendEmail) {
      throw new BadRequestException('Gagal mengirimkan kode verifikasi');
    }
    return {
      message: 'Berhasil kirim OTP',
    };
  }

  async resetPassword(args: { email: string; password: string }) {
    const newPassword = await encryptPassword(args.password);

    const user = await this.prisma.users.update({
      where: {
        email: args.email,
      },
      data: {
        password: newPassword,
      },
    });
    if (!user) {
      throw new BadRequestException('Gagal mengganti password');
    }
    return {
      message: 'Berhasil mengganti password',
    };
  }
}
