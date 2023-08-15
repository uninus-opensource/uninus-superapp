import { BadRequestException, Injectable } from "@nestjs/common";
import { TPaginationArgs } from "@uninus/entities";
import { Prisma, PrismaService } from "@uninus/api/models";
import { generateOtp, paginate } from "@uninus/api/utilities";
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
  async createUser(payload: Prisma.UsersCreateInput) {
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

    const user = await this.prisma.users.create({
      data: payload,
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
      throw new BadRequestException("User tidak ditemukan", {
        cause: new Error(),
      });
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
      throw new BadRequestException("User tidak ditemukan", {
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
