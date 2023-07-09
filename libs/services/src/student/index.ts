import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '@uninus/models';
import { CloudinaryService } from '../cloudinary';
import { CreateStudentDto } from '@uninus/entities';

@Injectable()
export class StudentService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService
  ) {}
  async getStudent(id: string) {
    const student = await this.prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        students: true,
        nik: true,
        email: true,
        avatar: true,
        fullname: true,
      },
    });

    if (!student) {
      throw new BadRequestException('data tidak ditemukan', {
        cause: new Error(),
      });
    }

    return {
      nik: student.nik,
      fullname: student.fullname,
      email: student.email,
      avatar: student.avatar,
      ...student.students,
    };
  }

  async createStudent(
    id: string,
    file: Express.Multer.File,
    payload: Prisma.StudentsCreateWithoutUserInput
  ) {
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
    const avatar = await this.cloudinaryService.uploadImage(file);

    await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        avatar: avatar?.secure_url,
      },
    });
    const student = await this.prisma.students.create({
      data: {
        ...(payload as CreateStudentDto),
        user_id: id,
      },
    });

    return { ...student };
  }

  async updateStudent(
    id: string,
    file: Express.Multer.File,
    payload: Prisma.StudentsUpdateWithoutUserInput
  ) {
    const student = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        students: {
          update: {
            ...payload,
          },
        },
      },
      select: {
        students: true,
      },
    });

    if (!student) {
      throw new BadRequestException('User tidak ditemukan', {
        cause: new Error(),
      });
    }
    const avatar = await this.cloudinaryService.uploadImage(file);

    await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        avatar: avatar?.secure_url,
      },
    });
    return {
      ...student,
    };
  }

  async deleteStudent(id: string) {
    const student = await this.prisma.students.delete({
      where: {
        user_id: id,
      },
    });
    if (!student) {
      throw new BadRequestException('User tidak ditemukan', {
        cause: new Error(),
      });
    }
    return {
      ...student,
    };
  }
}
