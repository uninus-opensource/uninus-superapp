import { BadRequestException, Injectable } from '@nestjs/common';
import { TPaginationArgs } from '@uninus/entities';
import { Prisma, PrismaService } from '@uninus/models';
import { paginate } from '@uninus/utilities';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
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
  async createUser(payload: Prisma.UsersCreateInput) {
    const isEmailExist = await this.prisma.users.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (isEmailExist) {
      throw new BadRequestException('Email sudah digunakan', {
        cause: new Error(),
      });
    }
    const isNikExist = await this.prisma.users.findUnique({
      where: {
        nik: payload.nik,
      },
    });
    if (isNikExist) {
      throw new BadRequestException('NIK sudah digunakan', {
        cause: new Error(),
      });
    }
    const user = await this.prisma.users.create({
      data: payload,
    });
    return {
      data: user,
    };
  }

  async getUserById(id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new BadRequestException('User tidak ditemukan', {
        cause: new Error(),
      });
    }
    return {
      data: user,
    };
  }

  async updateUser(id: string, payload: any) {
    const user = await this.prisma.users.update({
      where: {
        id,
      },
      data: payload,
    });
    if (!user) {
      throw new BadRequestException('User tidak ditemukan', {
        cause: new Error(),
      });
    }

    return {
      data: user,
      message: `Berhasil update user`,
    };
  }

  async deleteUser(id: string) {
    const user = await this.prisma.users.delete({
      where: {
        id,
      },
      select: {
        id: true,
        fullname: true,
        nik: true,
        email: true,
      },
    });
    if (!user) {
      throw new BadRequestException('User tidak ditemukan', {
        cause: new Error(),
      });
    }

    return {
      data: user,
      message: `Berhasil delete user`,
    };
  }
}
