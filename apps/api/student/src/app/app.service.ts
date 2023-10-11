import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@uninus/api/models";
import {
  IGetStudentRequest,
  IGetStudentResponse,
  IDeleteStudentRequest,
  TDeleteStudentResponse,
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
    const {
      avatar,
      email,
      fullname,
      students: { pmb, ...studentData },
    } = student;

    return JSON.parse(
      JSON.stringify(
        {
          avatar,
          email,
          fullname,
          first_department_id: pmb.first_department_id,
          second_department_id: pmb.second_department_id,
          selection_path_id: pmb.selection_path_id,
          registration_path_id: pmb.registration_path_id,
          degree_program_id: pmb.degree_program_id,
          student_grade: pmb.student_grade,
          average_grade: pmb.average_grade,
          average_utbk: pmb.average_utbk,
          utbk_pu: pmb.utbk_pu,
          utbk_kk: pmb.utbk_kk,
          utbk_ppu: pmb.utbk_ppu,
          utbk_kmbm: pmb.utbk_kmbm,
          documents: pmb.documents,
          ...studentData,
        },
        (key, value) => {
          if (value !== null) return value;
        },
      ),
    );
  }

  async updateStudent(payload: IUpdateStudentRequest): Promise<IUpdateStudentResponse> {
    const {
      id,
      fullname,
      avatar,
      first_department_id,
      second_department_id,
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
      registration_path_id,
      ...updateStudentPayload
    } = payload;
    if (documents && typeof documents[0]["isVerified"] == "undefined") {
      for await (const data of documents) {
        const documentsStudent = await this.prisma.users.update({
          where: {
            id,
          },
          data: {
            students: {
              update: {
                pmb: {
                  update: {
                    documents: {
                      update: {
                        where: {
                          id: data.id,
                        },
                        data: {
                          isVerified: data.isVerified,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });
        if (!documentsStudent) {
          throw new RpcException(new BadRequestException("Gagal update berkas"));
        }
      }
    }
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
                first_department_id,
                second_department_id,
                selection_path_id,
                registration_path_id,
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
      throw new RpcException(new NotFoundException("Gagal update data"));
    }
    const {
      students: { pmb, ...studentData },
    } = student;
    return JSON.parse(
      JSON.stringify(
        {
          avatar: student.avatar,
          email: student.email,
          fullname: student.fullname,
          first_department_id: pmb?.first_department_id,
          second_department_id: pmb?.second_department_id,
          selection_path_id: pmb?.selection_path_id,
          registration_path_id: pmb?.registration_path_id,
          degree_program_id: pmb?.degree_program_id,
          student_grade: pmb?.student_grade,
          average_grade: average_grade,
          documents: pmb?.documents,
          average_utbk: pmb?.average_utbk,
          utbk_pu: pmb?.utbk_pu,
          utbk_kk: pmb?.utbk_kk,
          utbk_ppu: pmb?.utbk_ppu,
          utbk_kmbm: pmb?.utbk_kmbm,
          ...studentData,
        },
        (key, value) => {
          if (value !== null) return value;
        },
      ),
    );
  }

  async deleteStudent(payload: IDeleteStudentRequest): Promise<TDeleteStudentResponse> {
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
      throw new RpcException(new NotFoundException("User tidak ditemukan"));
    }

    return {
      message: "Berhasil menghapus data",
    };
  }

  async checkGraduationStatus(
    payload: TGraduationStatusRequest,
  ): Promise<TGraduationStatusReponse> {
    const { registration_number } = payload;
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
