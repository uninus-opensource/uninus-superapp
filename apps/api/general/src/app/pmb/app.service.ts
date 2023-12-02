import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { CreateScholarship } from "@uninus/api/dto";
import { PrismaService } from "@uninus/api/services";
import { errorMappings } from "@uninus/api/utilities";
import {
  TSelectionResponse,
  ISelectRequest,
  TScholarshipResponse,
  TCreateQuestionRequest,
  TUpdateQuestionRequest,
  TDeleteQuestionResponse,
  ISelectionRequest,
  IRegistransRequest,
  IInterestEducationPrograms,
  EFilterTypeTotalRegistrans,
  TInterestEducationPrograms,
  EFilterTypeInterestProgram,
  EFilterTypeStudyProgramInterest,
  TRegistrationStatusResponse,
  IInterestDepartment,
  TInterestDepartmentResponse,
  TCreateSelectionPathRequest,
  TGeneralResponse,
  TCreateScholarshipRequest,
  TRegistrationPathResponse,
  TQuestionResponse,
  TTotalRegistransRes,
} from "@uninus/entities";

@Injectable()
export class PMBService {
  constructor(private prisma: PrismaService) {}

  async getScholarship({ search, id }: ISelectRequest): Promise<TScholarshipResponse> {
    try {
      const scholarship = await this.prisma.scholarship.findMany({
        where: {
          ...(id && { id: Number(id) }),
          name: { ...(search && { contains: search }), mode: "insensitive" },
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (!scholarship) {
        throw new NotFoundException("Data Beasiswa Tidak Ditemukan!");
      }

      return { scholarship };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async createScholarship(payload: TCreateScholarshipRequest): Promise<TGeneralResponse> {
    try {
      const newScholarship = await this.prisma.scholarship.create({
        data: {
          name: payload.name,
        },
      });

      if (!newScholarship) {
        throw new BadRequestException("Gagal menambahkan gagal beasiswa baru");
      }

      return {
        message: "Berhasil menambahkan beasiswa baru",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async updateScholarship(payload: CreateScholarship & { id: number }): Promise<TGeneralResponse> {
    try {
      const updateScholarship = await this.prisma.scholarship.update({
        where: {
          id: Number(payload.id),
        },
        data: {
          name: payload.name,
        },
      });

      if (!updateScholarship) {
        throw new BadRequestException("Gagal memperbarui Beasiswa");
      }

      return {
        message: "Berhasil memperbarui data beasiswa",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async deleteScholarship(payload: { id: number }): Promise<TGeneralResponse> {
    try {
      const deleteScholarship = await this.prisma.scholarship.delete({
        where: {
          id: Number(payload.id),
        },
      });

      if (!deleteScholarship) {
        throw new BadRequestException(`Gagal menghapus beasiswa`);
      }

      return {
        message: `Berhasil menghapus beasiswa `,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getSelectionPath({
    search,
    id,
    degree_program_id,
  }: ISelectionRequest): Promise<TSelectionResponse> {
    try {
      const selection = await this.prisma.selectionPath.findMany({
        where: {
          ...(id && { id: Number(id) }),
          name: { ...(search && { contains: search }), mode: "insensitive" },
          degree_program_id: degree_program_id && Number(degree_program_id),
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (!selection) {
        throw new NotFoundException("Data Jalur Seleksi Tidak Ditemukan!");
      }

      return { selection };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getRegistrationPath({ search, id }: ISelectionRequest): Promise<TRegistrationPathResponse> {
    try {
      const registration_path = await this.prisma.registrationPath.findMany({
        where: {
          ...(id && { id: Number(id) }),
          name: { ...(search && { contains: search }), mode: "insensitive" },
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (!registration_path) {
        throw new NotFoundException("Data Jalur Seleksi Tidak Ditemukan!");
      }

      return { registration_path };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async createSelectionPath(payload: TCreateSelectionPathRequest): Promise<TGeneralResponse> {
    try {
      const newSelectionPath = await this.prisma.selectionPath.create({
        data: {
          name: payload.name,
          degree_program: {
            connect: {
              id: payload.degree_program_id,
            },
          },
        },
      });

      if (!newSelectionPath) {
        throw new BadRequestException("Gagal menambahkan Jalur Seleksi baru");
      }

      return {
        message: "Berhasil menambahkan jalur seleksi baru",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async updateSelectionPath(
    payload: TCreateSelectionPathRequest & { id: number },
  ): Promise<TGeneralResponse> {
    try {
      const updatedSelectionPath = await this.prisma.selectionPath.update({
        where: {
          id: Number(payload.id),
        },
        data: {
          name: payload.name,
          degree_program_id: payload.degree_program_id,
        },
      });

      if (!updatedSelectionPath) {
        throw new BadRequestException("Gagal memperbarui jalur seleksi");
      }

      return {
        message: "Berhasil memperbarui jalur seleksi",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async deleteSelectionPath(payload: { id: number }): Promise<TGeneralResponse> {
    try {
      const selctionPath = await this.prisma.selectionPath.delete({
        where: {
          id: Number(payload.id),
        },
      });

      if (!selctionPath) {
        throw new BadRequestException(`Gagal menghapus Jalur seleksi`);
      }

      return {
        message: `Berhasil menghapus Jalur seleksi `,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getTotalRegistrans({
    filter_type,
    start_date,
    end_date,
  }: IRegistransRequest): Promise<TTotalRegistransRes> {
    try {
      const whereClause: {
        createdAt?: {
          gte?: Date;
          lte?: Date;
        };
      } = {};

      const responseData: TTotalRegistransRes = {
        data: [],
        summary: {
          total_registrans: 0,
          total_interest: 0,
          paids_form: 0,
          paids_ukt: 0,
          accepted_registrans: 0,
        },
      };

      if (filter_type) {
        switch (filter_type) {
          case EFilterTypeTotalRegistrans.WEEKLY: {
            const weekData: TTotalRegistransRes["data"] = [];

            for (let i = 0; i < 7; i++) {
              const currentDate = new Date();
              currentDate.setDate(currentDate.getDate() - i);
              currentDate.setUTCHours(0, 0, 0, 0);

              const total_registrans = await this.prisma.students.count({
                select: {
                  _all: true,
                },
                where: {
                  ...whereClause,
                  createdAt: {
                    gte: currentDate,
                    lte: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 - 1),
                  },
                  pmb: {
                    documents: {
                      some: {
                        pmb_id: {
                          not: null,
                        },
                      },
                    },
                  },
                },
              });

              const total_interest = await this.prisma.students.findMany({
                where: {
                  ...whereClause,
                  createdAt: {
                    gte: currentDate,
                    lte: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 - 1),
                  },
                  pmb: {
                    documents: {
                      none: {},
                    },
                  },
                },
              });

              const accepted_registrans = await this.prisma.pMB.count({
                where: {
                  ...whereClause,
                  createdAt: {
                    gte: currentDate,
                    lte: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 - 1),
                  },
                  registration_status_id: 6,
                },
              });

              const paidsUKTCount = await this.prisma.pMB.count({
                where: {
                  ...whereClause,
                  createdAt: {
                    gte: currentDate,
                    lte: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 - 1),
                  },
                  registration_status_id: 4,
                },
              });

              const paidsFormCount = await this.prisma.pMB.count({
                where: {
                  ...whereClause,
                  createdAt: {
                    gte: currentDate,
                    lte: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 - 1),
                  },
                  registration_status_id: 3,
                },
              });

              const label = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
                currentDate,
              );
              const dailyStats = {
                label,
                total_registrans: total_registrans._all,
                total_interest: total_interest.length,
                paids_form: paidsFormCount,
                accepted_registrans: accepted_registrans,
                paids_ukt: paidsUKTCount,
              };

              weekData.push(dailyStats);
            }

            responseData.data = weekData;

            break;
          }

          case EFilterTypeTotalRegistrans.MONTHLY: {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
            const monthData: TTotalRegistransRes["data"] = [];

            for (let i = 0; i < 12; i++) {
              const start = new Date(startOfMonth);
              start.setMonth(start.getMonth() - i);
              start.setHours(0, 0, 0, 0);
              const end = new Date(endOfMonth);
              end.setMonth(end.getMonth() - i);
              end.setHours(23, 59, 59, 999);

              const total_registrans = await this.prisma.students.count({
                select: {
                  _all: true,
                },
                where: {
                  ...whereClause,
                  createdAt: {
                    gte: start,
                    lte: end,
                  },
                  pmb: {
                    documents: {
                      some: {
                        pmb_id: {
                          not: null,
                        },
                      },
                    },
                  },
                },
              });

              const total_interest = await this.prisma.students.findMany({
                where: {
                  ...whereClause,
                  createdAt: {
                    gte: start,
                    lte: end,
                  },
                  pmb: {
                    documents: {
                      none: {},
                    },
                  },
                },
              });

              const accepted_registrans = await this.prisma.pMB.count({
                where: {
                  ...whereClause,
                  createdAt: {
                    gte: start,
                    lte: end,
                  },
                  registration_status_id: 6,
                },
              });

              const paidsUKTCount = await this.prisma.pMB.count({
                where: {
                  ...whereClause,
                  createdAt: {
                    gte: start,
                    lte: end,
                  },
                  registration_status_id: 4,
                },
              });

              const paidsFormCount = await this.prisma.pMB.count({
                where: {
                  ...whereClause,
                  createdAt: {
                    gte: start,
                    lte: end,
                  },
                  registration_status_id: 3,
                },
              });

              const label = `${start.toLocaleString("default", {
                month: "long",
              })} ${start.getFullYear()}`;

              const monthlyStast = {
                label,
                total_registrans: total_registrans._all,
                total_interest: total_interest.length,
                paids_form: paidsFormCount,
                accepted_registrans: accepted_registrans,
                paids_ukt: paidsUKTCount,
              };

              monthData.push(monthlyStast);
            }
            monthData.reverse();
            responseData.data = monthData;
            break;
          }

          case EFilterTypeTotalRegistrans.YEARLY: {
            const now = new Date();
            const yearData: TTotalRegistransRes["data"] = [];

            for (let i = 0; i < 5; i++) {
              const currentYear = now.getFullYear() - i;
              const currentYearStart = new Date(currentYear, 0, 1);
              const currentYearEnd = new Date(currentYear, 11, 31, 23, 59, 59, 999);

              const total_registrans = await this.prisma.students.count({
                select: {
                  _all: true,
                },
                where: {
                  ...whereClause,
                  createdAt: {
                    gte: currentYearStart,
                    lte: currentYearEnd,
                  },
                  pmb: {
                    documents: {
                      some: {
                        pmb_id: {
                          not: null,
                        },
                      },
                    },
                  },
                },
              });

              const total_interest = await this.prisma.students.findMany({
                where: {
                  ...whereClause,
                  createdAt: {
                    gte: currentYearStart,
                    lte: currentYearEnd,
                  },
                  pmb: {
                    documents: {
                      none: {},
                    },
                  },
                },
              });

              const accepted_registrans = await this.prisma.pMB.count({
                where: {
                  ...whereClause,
                  createdAt: {
                    gte: currentYearStart,
                    lte: currentYearEnd,
                  },
                  registration_status_id: 6,
                },
              });

              const paidsUKTCount = await this.prisma.pMB.count({
                where: {
                  ...whereClause,
                  createdAt: {
                    gte: currentYearStart,
                    lte: currentYearEnd,
                  },
                  registration_status_id: 4,
                },
              });

              const paidsFormCount = await this.prisma.pMB.count({
                where: {
                  ...whereClause,
                  createdAt: {
                    gte: currentYearStart,
                    lte: currentYearEnd,
                  },
                  registration_status_id: 3,
                },
              });

              const label = currentYear.toString();

              const yearlyStats = {
                label,
                total_registrans: total_registrans._all,
                total_interest: total_interest.length,
                paids_form: paidsFormCount,
                accepted_registrans: accepted_registrans,
                paids_ukt: paidsUKTCount,
              };

              yearData.push(yearlyStats);
            }

            responseData.data = yearData;

            break;
          }

          case EFilterTypeTotalRegistrans.RANGE: {
            if (!start_date || !end_date) {
              throw new BadRequestException(
                "start date dan end date wajib diisi ketika memilih filter range",
              );
            }

            const startOfRange = new Date(start_date);
            const endOfRange = new Date(end_date);
            const total_registrans = await this.prisma.students.count({
              select: {
                _all: true,
              },
              where: {
                ...whereClause,
                createdAt: {
                  gte: startOfRange,
                  lte: endOfRange,
                },
                pmb: {
                  documents: {
                    some: {
                      pmb_id: {
                        not: null,
                      },
                    },
                  },
                },
              },
            });

            const total_interest = await this.prisma.students.findMany({
              where: {
                ...whereClause,
                createdAt: {
                  gte: startOfRange,
                  lte: endOfRange,
                },
                pmb: {
                  documents: {
                    none: {},
                  },
                },
              },
            });

            const accepted_registrans = await this.prisma.pMB.count({
              where: {
                ...whereClause,
                createdAt: {
                  gte: startOfRange,
                  lte: endOfRange,
                },
                registration_status_id: 6,
              },
            });

            const paidsUKTCount = await this.prisma.pMB.count({
              where: {
                ...whereClause,
                createdAt: {
                  gte: startOfRange,
                  lte: endOfRange,
                },
                registration_status_id: 4,
              },
            });

            const paidsFormCount = await this.prisma.pMB.count({
              where: {
                ...whereClause,
                createdAt: {
                  gte: startOfRange,
                  lte: endOfRange,
                },
                registration_status_id: 3,
              },
            });

            const label = `Data dari ${start_date} hingga ${end_date}`;

            const rangeStats = {
              label,
              total_registrans: total_registrans._all,
              total_interest: total_interest.length,
              paids_form: paidsFormCount,
              accepted_registrans: accepted_registrans,
              paids_ukt: paidsUKTCount,
            };

            responseData.data = [rangeStats];

            break;
          }

          default: {
            throw new BadRequestException("Filter Tidak Valid");
          }
        }
      }

      const total_registrans = await this.prisma.students.count({
        select: {
          _all: true,
        },
        where: {
          ...whereClause,
          pmb: {
            documents: {
              some: {
                pmb_id: {
                  not: null,
                },
              },
            },
          },
        },
      });

      const total_interest = await this.prisma.students.findMany({
        where: {
          ...whereClause,
          pmb: {
            documents: {
              none: {},
            },
          },
        },
      });

      const accepted_registrans = await this.prisma.pMB.count({
        where: {
          ...whereClause,
          registration_status_id: 6,
        },
      });

      const paidsUKTCount = await this.prisma.pMB.count({
        where: {
          ...whereClause,
          registration_status_id: 4,
        },
      });

      const paidsFormCount = await this.prisma.pMB.count({
        where: {
          ...whereClause,
          registration_status_id: 3,
        },
      });

      (responseData.summary.total_registrans = total_registrans._all),
        (responseData.summary.total_interest = total_interest.length),
        (responseData.summary.accepted_registrans = accepted_registrans),
        (responseData.summary.paids_form = paidsFormCount),
        (responseData.summary.paids_ukt = paidsUKTCount);

      return responseData;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getInterestEducationPrograms({
    filter_type,
  }: IInterestEducationPrograms): Promise<TInterestEducationPrograms> {
    try {
      let whereClause: {
        createdAt?: {
          gte?: Date;
          lte?: Date;
        };
      } = {};

      if (filter_type) {
        switch (filter_type) {
          case EFilterTypeInterestProgram.WEEKLY: {
            const now = new Date();
            const today = now.getUTCDate();
            const weekStart = new Date(now);
            weekStart.setUTCDate(now.getUTCDate() - today);
            weekStart.setUTCHours(0, 0, 0, 0);
            const weekEnd = new Date(weekStart);
            weekEnd.setUTCDate(weekStart.getUTCDate() + 6);
            weekEnd.setUTCHours(23, 59, 59, 999);

            whereClause = {
              createdAt: {
                gte: weekStart,
                lte: weekEnd,
              },
            };

            break;
          }

          case EFilterTypeInterestProgram.MONTHLY: {
            const currentDate = new Date();
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonth = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              0,
              23,
              59,
              59,
              999,
            );

            whereClause = {
              createdAt: {
                gte: startOfMonth,
                lte: endOfMonth,
              },
            };
            break;
          }

          case EFilterTypeInterestProgram.YEARLY: {
            const currentYear = new Date().getFullYear();
            const startOfYear = new Date(currentYear, 0, 1);
            const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

            whereClause = {
              createdAt: {
                gte: startOfYear,
                lte: endOfYear,
              },
            };
            break;
          }

          default: {
            throw new BadRequestException("Filter Tidak Valid");
          }
        }
      }
      const [bachelorCount, magisterCount, doctorCount] = await Promise.all([
        this.prisma.pMB.count({
          where: {
            ...whereClause,
            degree_program_id: 1,
          },
        }),
        this.prisma.pMB.count({
          where: {
            ...whereClause,
            degree_program_id: 2,
          },
        }),
        this.prisma.pMB.count({
          where: {
            ...whereClause,
            degree_program_id: 3,
          },
        }),
      ]);

      const result = {
        data: [
          {
            name: "Program Sarjana(S1)",
            total: bachelorCount,
          },
          {
            name: "Program Pascasarjana(S2)",
            total: magisterCount,
          },
          {
            name: "Program Pascasarjana(S3)",
            total: doctorCount,
          },
        ],
      };

      return result;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getInterestDepartment({
    filter_type,
    degree_program_id,
  }: IInterestDepartment): Promise<TInterestDepartmentResponse> {
    try {
      let whereClause: {
        createdAt?: {
          gte?: Date;
          lte?: Date;
        };
      } = {};

      if (filter_type) {
        switch (filter_type) {
          case EFilterTypeStudyProgramInterest.WEEKLY: {
            const now = new Date();
            const today = now.getUTCDate();
            const weekStart = new Date(now);
            weekStart.setUTCDate(now.getUTCDate() - today);
            weekStart.setUTCHours(0, 0, 0, 0);
            const weekEnd = new Date(weekStart);
            weekEnd.setUTCDate(weekStart.getUTCDate() + 6);
            weekEnd.setUTCHours(23, 59, 59, 999);

            whereClause = {
              createdAt: {
                gte: weekStart,
                lte: weekEnd,
              },
            };

            break;
          }

          case EFilterTypeStudyProgramInterest.MONTHLY: {
            const currentDate = new Date();
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonth = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              0,
              23,
              59,
              59,
              999,
            );

            whereClause = {
              createdAt: {
                gte: startOfMonth,
                lte: endOfMonth,
              },
            };

            break;
          }

          case EFilterTypeStudyProgramInterest.YEARLY: {
            const currentYear = new Date().getFullYear();
            const startOfYear = new Date(currentYear, 0, 1);
            const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

            whereClause = {
              createdAt: {
                gte: startOfYear,
                lte: endOfYear,
              },
            };
            break;
          }

          default: {
            throw new BadRequestException("Invalid Type Filter");
          }
        }
      }

      const response: TInterestDepartmentResponse = {
        kpi: 0,
        pai: 0,
        pgmi: 0,
        pbs: 0,
        akuntansi: 0,
        manajemen: 0,
        iHukum: 0,
        iKomunikasi: 0,
        iPerpustakaan: 0,
        pba: 0,
        pbsi: 0,
        pbing: 0,
        pgpaud: 0,
        plb: 0,
        pls: 0,
        pmath: 0,
        ppkn: 0,
        agrotek: 0,
        te: 0,
        tif: 0,
        ti: 0,
        mAdmPendidikan: 0,
        mPai: 0,
        mIHukum: 0,
        dIPendidikan: 0,
      };

      response.mAdmPendidikan = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            first_department_id: 22,
            ...whereClause,
          },
        },
      });
      response.mPai = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 23,
          },
        },
      });
      response.mIHukum = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 24,
          },
        },
      });
      response.pai = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 2,
          },
        },
      });
      response.pbs = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 4,
          },
        },
      });
      response.pgmi = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 3,
          },
        },
      });
      response.kpi = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 1,
          },
        },
      });

      response.pls = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 15,
          },
        },
      });

      response.plb = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 14,
          },
        },
      });
      response.pgpaud = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 13,
          },
        },
      });
      response.pbsi = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 11,
          },
        },
      });
      response.pbing = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 12,
          },
        },
      });
      response.pba = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 10,
          },
        },
      });
      response.pmath = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 16,
          },
        },
      });
      response.ppkn = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 17,
          },
        },
      });
      response.te = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 19,
          },
        },
      });
      response.tif = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 20,
          },
        },
      });
      response.ti = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 21,
          },
        },
      });
      response.iKomunikasi = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 8,
          },
        },
      });
      response.iPerpustakaan = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 9,
          },
        },
      });
      response.akuntansi = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 5,
          },
        },
      });
      response.manajemen = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 6,
          },
        },
      });
      response.iHukum = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 7,
          },
        },
      });
      response.agrotek = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 18,
          },
        },
      });
      response.dIPendidikan = await this.prisma.students.count({
        where: {
          pmb: {
            ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
            ...whereClause,
            first_department_id: 25,
          },
        },
      });

      return response;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getRegistrationStatus({
    search,
    id,
  }: ISelectRequest): Promise<TRegistrationStatusResponse> {
    try {
      const registration_status = await this.prisma.registrationStatus.findMany({
        where: {
          ...(id && { id: Number(id) }),
          name: {
            ...(search && { contains: search }),
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (registration_status.length === 0) {
        throw new NotFoundException("Status pendaftaran tidak ditemukan");
      }
      return { registration_status: registration_status };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getAllQuestion(): Promise<TQuestionResponse[]> {
    try {
      const questions = await this.prisma.questions.findMany();
      if (questions.length === 0) {
        throw new NotFoundException("Soal tidak tersedia");
      }

      const formattedQuestions: TQuestionResponse[] = questions.map((question) => ({
        id: question.id,
        question: question.question,
        correct_answer: question.correct_answer,
        answers: question.answers.reduce((accumulator, value, index) => {
          return {
            ...accumulator,
            [String.fromCharCode("a".charCodeAt(0) + index).toUpperCase()]: value,
          };
        }, {}),
      }));

      return formattedQuestions;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async createQuestion(data: TCreateQuestionRequest) {
    try {
      const { question } = data;

      const existingQuestion = await this.prisma.questions.findFirst({
        where: { question },
      });

      if (existingQuestion) {
        throw new ConflictException("Soal sudah tersedia");
      }

      const newQuestion = await this.prisma.questions.create({
        data: {
          question: data.question,
          correct_answer: data.correct_answer,
          answers: Object.values(data.answers),
        },
      });
      if (!newQuestion) {
        throw new BadRequestException("Gagal mengubah soal");
      }
      return {
        message: "Berhasil membuat soal",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async updateQuestion(
    payload: TUpdateQuestionRequest & { id: number },
  ): Promise<TGeneralResponse> {
    try {
      const existingQuestion = await this.prisma.questions.findFirst({
        where: {
          id: Number(payload.id),
        },
      });

      if (!existingQuestion) {
        throw new NotFoundException("Soal tidak ditemukan");
      }

      const updateQuestion = await this.prisma.questions.update({
        where: {
          id: Number(payload.id),
        },
        data: {
          question: payload.question,
          correct_answer: payload.correct_answer,
          ...(payload.answers && { answers: Object.values(payload.answers) }),
        },
      });

      if (!updateQuestion) {
        throw new BadRequestException("Gagal mengubah soal");
      }

      return {
        message: "Berhasil mengubah soal",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async deleteQuestion(payload: { id: number }): Promise<TDeleteQuestionResponse> {
    try {
      const deletedQuestion = await this.prisma.questions.delete({
        where: {
          id: Number(payload.id),
        },
      });

      if (!deletedQuestion) {
        throw new BadRequestException("Soal tidak tersedia");
      }

      return {
        message: "Soal berhasil dihapus",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
}
