import {
  BadRequestException,
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { IUserRequest, IUserResponse, TPaginationArgs } from "@uninus/entities";
import { Prisma, PrismaService } from "@uninus/api/models";
import { encryptPassword, paginate } from "@uninus/api/utilities";
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
        select: {
          id: true,
          email: true,
          fullname: true,
          password: true,
          createdAt: true,
          avatar: true,
          isVerified: true,
          role: {
            select: {
              id: true,
              name: true,
            },
          },
        },
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
      throw new RpcException(new ConflictException("Email sudah digunakan"));
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
        students: {
          select: {
            pmb: {
              select: {
                registration_status: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new RpcException(new NotFoundException("User tidak ditemukan"));
    }
    const { students, ...dataUser } = user;
    return {
      registration_status: students?.pmb?.registration_status?.name,
      ...dataUser,
    };
  }

  async updateUser(id: string, payload: IUserRequest): Promise<IUserResponse> {
    const password = await encryptPassword(payload.password);
    const user = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        email: payload.email,
        fullname: payload.fullname,
        password,
      },
    });
    if (!user) {
      throw new BadRequestException("User tidak ditemukan", {
        cause: new Error(),
      });
    }

    return {
      ...user,
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
      throw new RpcException(new NotFoundException("User tidak ditemukan"));
    }

    return {
      data: user,
      message: `Berhasil delete user`,
    };
  }
}
