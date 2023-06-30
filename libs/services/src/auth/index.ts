import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Users } from '@prisma/client';
import { LoginDto, TPaginationArgs, TRegisterResponse } from '@uninus/entities';
import { paginate } from '@uninus/utilities';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/index';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

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

  async findOne(nik: string, email: string): Promise<Users | undefined> {
    return this.prisma.users.findUnique({
      where: {
        nik,
        email,
      },
    }) as Promise<Users | undefined>;
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

    return {
      ...createdUser,
      message: 'Akun Berhasil dibuat!',
    };
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const User = await this.prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        fullname: true,
        password: true,
      },
    });

    if (!User) {
      throw new BadRequestException('Akun tidak ditemukan');
    }

    const isMatch = await this.comparePasswords({
      password,
      hash: User.password,
    });

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

    return {
      message: 'Berhasil Login',
      token: {
        access_token: aToken,
        refresh_token: rToken,
      },
      user: {
        id: User.id,
        email: User.email,
        fullname: User.fullname,
      },
    };
  }

  async logout(email: string) {
    await this.prisma.users.update({
      where: {
        email: email.toLowerCase(),
      },
      data: {
        refresh_token: null,
      },
    });
  }

  async getUsers() {
    return await this.prisma.users.findMany({
      select: { id: true, email: true },
    });
  }

  async comparePasswords(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
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
}
