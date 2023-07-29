import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '@uninus/api/models';
import { CloudinaryService } from '../cloudinary';
import { excludeSchema } from '@uninus/api/utilities';

@Injectable()
export class StudentService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService
  ) {}
  async getStudent(id: string) {
    const student = await this.prisma.users.findUnique({
      where: {
        id: id,
      },
      select: {
        avatar: true,
        email: true,
        fullname: true,
        students: true,
      },
    });

    if (!student) {
      throw new BadRequestException('Data tidak ditemukan', {
        cause: new Error(),
      });
    }
    const excludeDataStudent = excludeSchema(student?.students, [
      'id',
      'user_id',
      'createdAt',
    ]);
    return {
      avatar: student.avatar,
      email: student.email,
      fullname: student.fullname,
      ...excludeDataStudent,
    };
  }

  async updateStudent(
    id: string,
    file: Express.Multer.File,
    payload: Prisma.UsersUpdateInput
  ) {
    const { fullname, email, ...studentData } = payload;
    const student = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        fullname,
        students: {
          update: {
            ...studentData,
          },
        },
      },
      select: {
        avatar: true,
        email: true,
        fullname: true,
        students: true,
      },
    });

    if (!student) {
      throw new BadRequestException('User tidak ditemukan', {
        cause: new Error(),
      });
    }
    if (file) {
      const avatar = await this.cloudinaryService.uploadImage(file);

      await this.prisma.users.update({
        where: {
          id,
        },
        data: {
          avatar: avatar?.secure_url,
        },
      });
    }

    const excludeDataStudent = excludeSchema(student?.students, [
      'id',
      'user_id',
      'createdAt',
    ]);
    return {
      avatar: student.avatar,
      email: student.email,
      fullname: student.fullname,
      ...excludeDataStudent,
    };
  }

  async deleteStudent(id: string) {
    const student = await this.prisma.users.delete({
      where: {
        id: id,
      },
      select: {
        avatar: true,
        email: true,
        fullname: true,
        students: true,
      },
    });
    if (!student) {
      throw new BadRequestException('User tidak ditemukan', {
        cause: new Error(),
      });
    }
    const excludeDataStudent = excludeSchema(student?.students, [
      'id',
      'user_id',
      'createdAt',
    ]);
    return {
      avatar: student.avatar,
      email: student.email,
      fullname: student.fullname,
      ...excludeDataStudent,
    };
  }
}
