import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@uninus/api/models";
import { excludeSchema } from "@uninus/api/utilities";
import {
  IGetStudentRequest,
  IGetStudentResponse,
  IDeleteStudentRequest,
  IDeleteStudentResponse,
  IUpdateStudentResponse,
  IUpdateStudentRequest,
  TGraduationStatusRequest,
  TGraduationStatusReponse,
} from "@uninus/entities";

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

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
      throw new BadRequestException("Data tidak ditemukan", {
        cause: new Error(),
      });
    }

    const studentData = excludeSchema(student?.students, ["id", "user_id", "createdAt"]);
    return {
      avatar: student.avatar,
      email: student.email,
      fullname: student.fullname,
      ...studentData,
    };
  }

  async updateStudent(args: IUpdateStudentRequest): Promise<any> {
    console.log(args);
    return "";
    // const { id, fullname, avatar, ...updateStudentPayload } = args;
    // const student = await this.prisma.users.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     fullname,
    //     students: {
    //       update: {
    //         ...updateStudentPayload,
    //         pmb: {
    //           update: {},
    //         },
    //       },
    //     },
    //   },
    //   select: {
    //     avatar: true,
    //     email: true,
    //     fullname: true,
    //     students: true,
    //   },
    // });

    // if (!student) {
    //   throw new BadRequestException("User tidak ditemukan", {
    //     cause: new Error(),
    //   });
    // }

    // const studentData = excludeSchema(student?.students, ["id", "user_id", "createdAt"]);
    // return {
    //   avatar: student.avatar,
    //   email: student.email,
    //   fullname: student.fullname,
    //   ...studentData,
    // };
  }

  async deleteStudent(args: IDeleteStudentRequest): Promise<IDeleteStudentResponse> {
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
      throw new BadRequestException("User tidak ditemukan", {
        cause: new Error(),
      });
    }

    const studentData = excludeSchema(student?.students, ["id", "user_id", "createdAt"]);

    return {
      avatar: student.avatar,
      email: student.email,
      fullname: student.email,
      ...studentData,
    };
  }

  async checkGraduationStatus({
    registration_number,
  }: TGraduationStatusRequest): Promise<TGraduationStatusReponse> {
    const graduationStatus = await this.prisma.pMB.findFirst({
      where: {
        registration_number,
      },
      include: {
        student: {
          include: {
            user: true,
            department: true,
          },
        },
        selection_path: true,
      },
    });

    if (!graduationStatus) {
      throw new BadRequestException("Data tidak ditemukan", {
        cause: new Error(),
      });
    }

    return {
      registration_number: graduationStatus.registration_number,
      fullname: graduationStatus.student?.user.fullname,
      department: graduationStatus.student?.department?.name,
      selection_path: graduationStatus.selection_path?.name,
      registration_status: graduationStatus.registration_status,
    };
  }
}
