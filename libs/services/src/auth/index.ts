import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TPaginationArgs } from '@uninus/entities';
import { TRegisterResponse } from '@uninus/entities';
import { PrismaService } from '../prisma/index';
import { paginate } from '@uninus/utilities';
import { Prisma, Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUser({ where, orderBy, page, perPage }: TPaginationArgs) {
    return paginate(this.prisma.users, {
      where,
      orderBy,
    }, {
      page,
      perPage,
    });
  }

  async findOne(nik: string, email: string): Promise<Users | undefined> {
    return this.prisma.users.findUnique({
      where: {
        nik,
        email,
      },
    }) as Promise<Users | undefined>;
  }

  async profile(nik: string, email: string): Promise<Omit<Users, 'password' | 'refresh_token'> | null> {
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
        photo: true,
      },
    });
  }

  async signup(data: Prisma.UsersCreateInput): Promise<TRegisterResponse> {
    const exist = await this.prisma.users.findFirst({
      where: {
        nik: data.nik,
        email: data.email.toLowerCase(),
      },
    });

    if (exist) {
      throw new HttpException('User Already Exist', HttpStatus.CONFLICT);
    }

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(data.password, salt);

    const createdUser = await this.prisma.users.create({
      data: {
        ...data,
        email: data.email.toLowerCase(),
        password: hashed,
        role: data.role

      },
    });

    return {
      ...createdUser,
      role_id: 1, // Menambahkan properti 'role' dengan nilai yang sesuai
    };
  }
}
