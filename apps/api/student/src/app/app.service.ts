import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@uninus/api/services";
import {
  IGetStudentRequest,
  IGetStudentResponse,
  IDeleteStudentRequest,
  TDeleteStudentResponse,
  IUpdateStudentResponse,
  IUpdateStudentRequest,
  TGraduationStatusRequest,
  TGraduationStatusReponse,
  TPaymentObligationsResponse,
  IGetPaymentObligationsRequest,
} from "@uninus/entities";
import { RpcException } from "@nestjs/microservices";
import { convertNumberToWords } from "@uninus/api/utilities";

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
            payment_history: {
              include: {
                payment_obligation: true,
              },
            },
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
      students: { pmb, test_score, payment_history, ...studentData },
    } = student;

    return JSON.parse(
      JSON.stringify(
        {
          avatar,
          email,
          fullname,
          test_score,
          first_department_id: pmb.first_department_id,
          second_department_id: pmb.second_department_id,
          selection_path_id: pmb.selection_path_id,
          registration_path_id: pmb.registration_path_id,
          registration_number: pmb.registration_number,
          degree_program_id: pmb.degree_program_id,
          student_grade: pmb.student_grade,
          average_grade: pmb.average_grade,
          average_utbk: pmb.average_utbk,
          utbk_pu: pmb.utbk_pu,
          utbk_kk: pmb.utbk_kk,
          utbk_ppu: pmb.utbk_ppu,
          utbk_kmbm: pmb.utbk_kmbm,
          documents: pmb.documents,
          payment: payment_history?.map((el) => ({
            name: el.payment_obligation.name,
            amount: el.payment_obligation.amount,
            payment_method: el.payment_method,
            payment_code: el.payment_code,
          })),
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
      registration_status_id,
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
      test_score,
      education_npsn,
      education_name,
      education_province,
      education_district_city,
      education_sub_district,
      education_street_address,
      education_type_id,
      ...updateStudentPayload
    } = payload;
    if (documents && typeof documents[0]?.isVerified != "undefined") {
      for await (const data of documents) {
        const documentsStudent = await this.prisma.users.update({
          where: {
            id,
          },
          data: {
            students: {
              update: {
                test_score,
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

    if (
      education_npsn &&
      education_name &&
      education_province &&
      education_district_city &&
      education_sub_district &&
      education_street_address &&
      education_type_id
    ) {
      const findEducation = await this.prisma.education.findUnique({
        where: {
          npsn: education_npsn,
        },
      });
      if (findEducation) {
        throw new RpcException(new BadRequestException("Data sekolah sudah ada"));
      }

      const createEducation = await this.prisma.education.create({
        data: {
          npsn: education_npsn,
          name: education_name,
          province: education_province,
          district_city: education_district_city,
          sub_district: education_sub_district,
          street_address: education_street_address,
          education_type_id: education_type_id,
        },
      });

      if (!createEducation) {
        throw new RpcException(new BadRequestException("Gagal menambahkan data sekolah"));
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
            test_score,
            education_npsn,
            education_type_id,
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
                registration_status_id: registration_status_id
                  ? registration_status_id
                  : ((documents && typeof documents[0]?.isVerified == "undefined") ||
                      (document && typeof document?.name != "undefined")) &&
                    2,
                ...(documents &&
                  typeof documents[0]?.name != "undefined" && {
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
                registration_status: {
                  select: {
                    name: true,
                  },
                },
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
          registration_status: pmb?.registration_status.name,
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
  async getPaymentObligations(
    payload: IGetPaymentObligationsRequest,
  ): Promise<TPaymentObligationsResponse> {
    const [paymentObligations, user] = await Promise.all([
      this.prisma.paymentObligations.findMany({
        where: {
          ...(payload?.search && {
            name: {
              contains: payload?.search || "",
              mode: "insensitive",
            },
          }),
          ...(payload?.id && {
            id: Number(payload?.id),
          }),
        },
        select: {
          id: true,
          name: true,
          amount: true,
        },
      }),
      this.prisma.users.findUnique({
        where: {
          id: payload?.userId,
        },
        select: {
          students: {
            select: {
              scholarship: {
                select: {
                  name: true,
                  discount: true,
                },
              },
            },
          },
        },
      }),
    ]);

    if (!paymentObligations || !user) {
      throw new RpcException(new NotFoundException("Gagal dalam mengambil data"));
    }

    return user?.students?.scholarship?.discount
      ? paymentObligations.map((el) =>
          el?.name?.includes("UKT")
            ? {
                id: el?.id,
                name: el?.name,
                amount: el?.amount - (el?.amount * user?.students?.scholarship?.discount) / 100,
                spelled_out: convertNumberToWords(
                  String(el?.amount - (el?.amount * user?.students?.scholarship?.discount) / 100),
                ),
              }
            : { ...el, spelled_out: convertNumberToWords(String(el?.amount)) },
        )
      : paymentObligations.map((el) => ({
          ...el,
          spelled_out: convertNumberToWords(String(el?.amount)),
        }));
  }
}
