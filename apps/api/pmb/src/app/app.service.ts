import { Injectable } from "@nestjs/common";
import { TPaginationArgs } from "@uninus/entities";
import { Prisma, PrismaService } from "@uninus/api/models";
import { paginate } from "@uninus/api/utilities";

import { RpcException } from "@nestjs/microservices";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getUsers({ where, orderBy, page, perPage }: TPaginationArgs) {
    return paginate(
      this.prisma.users,
      {
        where,
        orderBy,
      },
      {
        page,
        perPage,
      },
    );
  }

  async createUser(payload: Prisma.UsersCreateInput) {
    const isEmailExist = await this.prisma.users.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (isEmailExist) {
      throw new RpcException("Email sudah digunakan");
    }

    const user = await this.prisma.users.create({
      data: payload,
    });
    return {
      data: user,
    };
  }

  async getUser(id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        avatar: true,
        students: true,
      },
    });
    if (!user) {
      throw new RpcException("User tidak ditemukan");
    }
    return {
      data: user,
    };
  }

  async updateUser(id: string, payload: Prisma.UsersUpdateInput) {
    const user = await this.prisma.users.update({
      where: {
        id,
      },
      data: payload,
    });
    if (!user) {
      throw new RpcException("User Tidak ditemukan");
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
        email: true,
      },
    });
    if (!user) {
      throw new RpcException("User Tidak ditemukan");
    }

    return {
      data: user,
      message: `Berhasil delete user`,
    };
  }
  async getUserEmail(email: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
