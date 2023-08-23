import { BadRequestException, Injectable } from "@nestjs/common";
import { TPaginationArgs, IUserRequest, IUserResponse } from "@uninus/entities";
import { PrismaService } from "@uninus/api/models";
import { encryptPassword, generateOtp, paginate } from "@uninus/api/utilities";
import { EmailService } from "../email";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private readonly emailService: EmailService) {}
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
  async createUser(payload: IUserRequest): Promise<IUserResponse> {
    const isEmailExist = await this.prisma.users.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (isEmailExist) {
      throw new BadRequestException("Email sudah digunakan", {
        cause: new Error(),
      });
    }

    const password = await encryptPassword(payload.password);

    const user = await this.prisma.users.create({
      data: {
        email: payload.email.toLowerCase(),
        fullname: payload.fullname,
        password,
        role_id: payload.role_id,
        avatar:
          "https://res.cloudinary.com/dyominih0/image/upload/v1688846789/MaleProfileDefault_hxtqcy.png",
        students: {
          create: {
            phone_number: `62${payload.phone_number}`,
          },
        },
      },
    });

    const isCreateOtp = await generateOtp(user?.email, user?.id);

    if (!isCreateOtp) {
      throw new BadRequestException("Gagal membuat otp");
    }

    const sendEmail = this.emailService.sendEmail(
      payload.email.toLowerCase(),
      "Verifikasi Email",
      `Kode OTP anda adalah ${isCreateOtp?.token}`,
    );

    if (!sendEmail) {
      throw new BadRequestException("Gagal mengirimkan kode verifikasi");
    }

    return {
      ...user,
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
      throw new BadRequestException("User tidak ditemukan", {
        cause: new Error(),
      });
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
      throw new BadRequestException("User tidak ditemukan", {
        cause: new Error(),
      });
    }

    return {
      data: user,
      message: `Berhasil delete user`,
    };
  }
}
