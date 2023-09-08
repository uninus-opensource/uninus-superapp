import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getStudent(payload: IGetStudentRequest): Promise<IGetStudentResponse> {
    const student = await this.prisma.users.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        avatar: true,
        email: true,
        fullname: true,
        students: {
          include: {
            pmb: {
              include: {
                student_grade: true,
                documents: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      throw new RpcException(new BadRequestException("User tidak ditemukan"));
    }
    const { avatar, email, fullname, students } = student;

    const studentData = excludeSchema(student?.students, ["id", "user_id", "createdAt", "pmb"]);
    return {
      avatar,
      email,
      fullname,
      first_deparment_id: students?.pmb?.first_deparment_id,
      second_deparment_id: students?.pmb?.second_deparment_id,
      selection_path_id: students?.pmb?.selection_path_id,
      degree_program_id: students?.pmb?.degree_program_id,
      student_grade: students?.pmb?.student_grade,
      average_grade: students?.pmb?.average_grade,
      average_utbk: student.students?.pmb?.average_utbk,
      utbk_pu: student.students?.pmb?.utbk_pu,
      utbk_kk: student.students?.pmb?.utbk_kk,
      utbk_ppu: student.students?.pmb?.utbk_ppu,
      utbk_kmbm: student.students?.pmb?.utbk_kmbm,
      documents: student.students?.pmb?.documents,
      ...studentData,
    };
  }

  async updateStudent(payload: IUpdateStudentRequest): Promise<IUpdateStudentResponse> {
    const {
      id,
      fullname,
      avatar,
      email,
      first_deparment_id,
      second_deparment_id,
      selection_path_id,
      degree_program_id,
      average_utbk,
      utbk_pu,
      utbk_kk,
      utbk_ppu,
      utbk_kmbm,
      student_grade,
      average_grade,
      document,
      documents,
      ...updateStudentPayload
    } = payload;
    if (student_grade) {
      for await (const data of student_grade) {
        const updateStudentGrade = await this.prisma.users.update({
          where: {
            id,
          },
          data: {
            students: {
              update: {
                pmb: {
                  update: {
                    average_grade: Number(average_grade.toFixed(1)),
                    student_grade: {
                      updateMany: {
                        where: {
                          subject: data.subject,
                          semester: data.semester,
                        },
                        data: {
                          grade: data.grade,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });
        if (!updateStudentGrade) {
          throw new RpcException(new BadRequestException("Gagal update nilai"));
        }
      }
    }

    const student = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        fullname,
        avatar,
        students: {
          update: {
            ...updateStudentPayload,
            pmb: {
              update: {
                first_deparment_id,
                second_deparment_id,
                selection_path_id,
                degree_program_id,
                utbk_pu,
                utbk_kk,
                utbk_ppu,
                utbk_kmbm,
                average_utbk,
                registration_status_id: 2,
                ...(documents && {
                  documents: {
                    createMany: {
                      data: documents,
                    },
                  },
                }),
                ...(document && {
                  documents: {
                    createMany: {
                      data: [document],
                    },
                  },
                }),
              },
            },
          },
        },
      },
      select: {
        avatar: true,
        email: true,
        fullname: true,
        students: {
          include: {
            pmb: {
              include: {
                student_grade: true,
                documents: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      throw new RpcException(new NotFoundException("Nomor User tidak ditemukan"));
    }
    const studentData = excludeSchema(student?.students, ["id", "user_id", "createdAt", "pmb"]);
    return {
      avatar: student.avatar,
      email: student.email,
      fullname: student.fullname,
      first_deparment_id: student.students?.pmb?.first_deparment_id,
      second_deparment_id: student.students?.pmb?.second_deparment_id,
      selection_path_id: student.students?.pmb?.selection_path_id,
      degree_program_id: student.students?.pmb?.degree_program_id,
      student_grade: student.students?.pmb?.student_grade,
      average_grade: student.students?.pmb?.average_grade,
      documents: student.students?.pmb?.documents,
      average_utbk: student.students?.pmb?.average_utbk,
      utbk_pu: student.students?.pmb?.utbk_pu,
      utbk_kk: student.students?.pmb?.utbk_kk,
      utbk_ppu: student.students?.pmb?.utbk_ppu,
      utbk_kmbm: student.students?.pmb?.utbk_kmbm,
      ...studentData,
    };
  }

  async deleteStudent(payload: IDeleteStudentRequest): Promise<IDeleteStudentResponse> {
    const student = await this.prisma.users.delete({
      where: {
        id: payload.id,
      },
      select: {
        avatar: true,
        email: true,
        fullname: true,
        students: true,
      },
    });
    if (!student) {
      throw new RpcException(new NotFoundException("Nomor User tidak ditemukan"));
    }

    const studentData = excludeSchema(student?.students, ["id", "user_id", "createdAt"]);

    return {
      avatar: student.avatar,
      email: student.email,
      fullname: student.email,
      ...studentData,
    };
  }

  async checkGraduationStatus(
    payload: TGraduationStatusRequest,
  ): Promise<TGraduationStatusReponse> {
    const graduationStatus = await this.prisma.pMB.findFirst({
      where: {
        registration_number: payload.registration_number,
      },
      include: {
        student: {
          include: {
            user: true,
            department: true,
          },
        },
        selection_path: true,
        registration_status: true,
      },
    });

    if (!graduationStatus) {
      throw new RpcException(new NotFoundException("Nomor registrasi tidak valid"));
    }

    const { registration_status_id } = graduationStatus;
    if ((registration_status_id as number) < 5) {
      return {
        message: "Sedang Dalam Proses Seleksi",
      };
    }

    return {
      registration_number: graduationStatus.registration_number,
      fullname: graduationStatus.student?.user.fullname,
      department: graduationStatus.student?.department?.name,
      selection_path: graduationStatus.selection_path?.name,
      registration_status: graduationStatus.registration_status.name,
    };
  }
}
