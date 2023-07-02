import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Users } from '@prisma/client';
import {
  TJwtPayload,
  TLoginResponse,
  TPaginationArgs,
  TRegisterResponse,
  TToken,
} from '@uninus/entities';
import { PrismaService } from '@uninus/models';
import { paginate } from '@uninus/utilities';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mailerService: MailerService
  ) {}
  private otpMap: Map<string, string> = new Map();

  async getUser({ where, orderBy, page, perPage }: TPaginationArgs) {
    return paginate(
      this.prisma.users,
      {
        where,
        orderBy,
      },
      {
        page,
        perPage,
      }
    );
  }

  async findOne(email: string) {
    return this.prisma.users.findUnique({
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
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async profile(
    nik: string,
    email: string
  ): Promise<Omit<Users, 'password' | 'refresh_token'> | null> {
    return this.prisma.users.findUnique({
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
  }

  async register(data: Prisma.UsersCreateInput): Promise<TRegisterResponse> {
    const isEmailExist = await this.prisma.users.findUnique({
      where: {
        email: data.email.toLowerCase(),
      },
    });

    if (isEmailExist) {
      throw new BadRequestException('Email sudah terdaftar', {
        cause: new Error(),
      });
    }

    const isNikExist = await this.prisma.users.findUnique({
      where: {
        nik: data.nik,
      },
    });

    if (isNikExist) {
      throw new BadRequestException('Nik sudah terdaftar', {
        cause: new Error(),
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(data.password, salt);

    const createdUser = await this.prisma.users.create({
      data: {
        ...data,
        email: data.email.toLowerCase(),
        password: hashed,
        role: data.role,
      },
    });

    if (!createdUser) {
      throw new BadRequestException('Gagal Mendaftar');
    }
    return {
      message: 'Akun Berhasil dibuat!',
    };
  }

  // Login Service
  async login(email: string, password: string): Promise<TLoginResponse> {
    const User = await this.findOne(email.toLowerCase());
    if (!User) {
      throw new BadRequestException('Akun tidak ditemukan');
    }
    const isMatch = await this.comparePasswords(password, User.password);

    if (!isMatch) {
      throw new BadRequestException('Password salah');
    }
    const aToken = await this.signToken({
      id: User.id,
      email: User.email,
    });

    const rToken = await this.refreshToken({
      id: User.id,
      email: User.email,
    });

    if (!aToken) {
      throw new ForbiddenException();
    }

    await this.prisma.users.update({
      where: {
        email: User.email,
      },
      data: {
        refresh_token: rToken,
      },
    });

    const roleName = User.role?.name || '';
    return {
      message: 'Berhasil Login',
      token: {
        access_token: aToken,
        refresh_token: rToken,
      },
      id: User.id,
      user: {
        id: User.id,
        nik: User.nik,
        email: User.email,
        fullname: User.fullname,
        role: roleName,
        createdAt: User.createdAt,
        avatar: User.avatar,
      },
    };
  }

  async logout(refresh_token: string) {
    const result = await this.prisma.users.updateMany({
      where: {
        refresh_token: refresh_token,
      },
      data: {
        refresh_token: null,
      },
    });

    if (result.count > 0) {
      return {
        message: 'Berhasil logout',
      };
    } else {
      throw new BadRequestException('Gagal logout');
    }
  }

  async getUsers() {
    return await this.prisma.users.findMany({
      select: { id: true, email: true },
    });
  }

  async comparePasswords(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async signToken(args: { id: string; email: string }) {
    const payLoad = args;

    return this.jwt.signAsync(payLoad, {
      secret: process.env.ACCESS_SECRET,
      expiresIn: '1h',
    });
  }

  async refreshToken(args: { id: string; email: string }) {
    const payLoad = args;

    return this.jwt.signAsync(payLoad, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '2h',
    });
  }

  async sendOtp(email: string) {
    const otp = await this.generatorOtp();
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return { message: 'Email tidak ditemukan!' };
    }

    const store = await this.storeOtp(email, otp);
    const receipt = await this.emailTemplates(email, otp);

    return { message: 'Kode verifikasi telah terkirim', receipt, store };
  }

  async emailTemplates(email: string, otp: string) {
    this.mailerService.sendMail({
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for Verification is: ${otp}`,
    });
  }

  async generatorOtp() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }

  async storeOtp(email: string, otp: string) {
    this.otpMap.set(email, otp);
  }

  async verifyOtp(email: string, otpProvided: string) {
    const storedOtp = this.otpMap.get(email);
    return otpProvided === storedOtp;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(rt, salt);
    await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token: hash,
      },
    });
  }

  async getTokens(userId: string, email: string): Promise<TToken> {
    const jwtPayload: TJwtPayload = {
      id: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(jwtPayload, {
        secret: process.env.ACCESS_SECRET,
        expiresIn: '15m',
      }),
      this.jwt.signAsync(jwtPayload, {
        secret: process.env.REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
