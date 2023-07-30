import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '@uninus/api/models';
import { CloudinaryService } from '../cloudinary';
import { excludeSchema } from '@uninus/api/utilities';
import {
  IGetStudentRequest,
  IGetStudentResponse,
  IDeleteStudentRequest,
  IDeleteStudentResponse,
  IUpdateStudentResponse,
  IUpdateStudentRequest,
} from '@uninus/entities';

@Injectable()
export class StudentService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService
  ) {}
  async getStudent(args: IGetStudentRequest): Promise<IGetStudentResponse> {
    const student = await this.prisma.users.findUnique({
      where: {
        id: args.id,
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

    const studentData = excludeSchema(student?.students, [
      'id',
      'user_id',
      'createdAt',
    ]);
    return {
      avatar: student.avatar,
      email: student.email,
      fullname: student.fullname,
      ...studentData,
    };
  }

  async updateStudent(
    args: IUpdateStudentRequest
  ): Promise<IUpdateStudentResponse> {
    const { fullname, email, ...updateStudentPayload } = args.studentData;
    const student = await this.prisma.users.update({
      where: {
        id: args.id,
      },
      data: {
        fullname,
        students: {
          update: {
            ...updateStudentPayload,
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
    if (args.avatar) {
      const avatar = await this.cloudinaryService.uploadImage(args.avatar);

      await this.prisma.users.update({
        where: {
          id: args.id,
        },
        data: {
          avatar: avatar?.secure_url,
        },
      });
    }

    const studentData = excludeSchema(student?.students, [
      'id',
      'user_id',
      'createdAt',
    ]);
    return {
      avatar: student.avatar,
      email: student.email,
      fullname: student.fullname,
      ...studentData,
    };
  }

  async deleteStudent(
    args: IDeleteStudentRequest
  ): Promise<IDeleteStudentResponse> {
    const student = await this.prisma.users.delete({
      where: {
        id: args.id,
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

    const studentData = excludeSchema(student?.students, [
      'id',
      'user_id',
      'createdAt',
    ]);
    return {
      avatar: student.avatar,
      email: student.email,
      fullname: student.fullname,
      ...studentData,
    };
  }
}
