import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { PrismaService } from "@uninus/api/services";
import {
  TCitizenshipResponse,
  TDepartmentResponse,
  TFacultyResponse,
  TGenderResponse,
  TMaritalStatusResponse,
  TReligionResponse,
  TSalaryResponse,
  TSelectionResponse,
  ISelectRequest,
  TEducationHistoryResponse,
  TDegreeProgramResponse,
  ISelectFacultyRequest,
  ISelectDepartmentRequest,
  TOccupationResponse,
  TDisabilitiesResponse,
  TYearGraduationResponse,
  ISelectEducationHistoryRequest,
  TScholarshipResponse,
  TOccupationPositionResponse,
  IOccupationPositionRequest,
  TSchoolTypeResponse,
  TCreateQuestionRequest,
  TUpdateQuestionRequest,
  TDeleteQuestionResponse,
  TParentStatusResponse,
  TTotalRegistransResponse,
  TParentEducationResponse,
  IEducationMajorRequest,
  TEducationMajorResponse,
  IEducationTypeRequest,
  ISelectionRequest,
  TCountryResponse,
  ICountryRequest,
  IRegistransRequest,
  IInterestEducationPrograms,
  TProvinceResponse,
  ICityRequest,
  TCityResponse,
  ISubDistrictRequest,
  TSubDistrictResponse,
  EFilterTypeTotalRegistrans,
  TInterestEducationPrograms,
  EFilterTypeInterestProgram,
  EFilterTypeStudyProgramInterest,
  TRegistrationStatusResponse,
  IInterestDepartment,
  TInterestDepartmentResponse,
  TStudentsPaginationArgs,
  TStudentsPaginatonResponse,
  TRolesResponse,
  TCreateFacultyRequest,
  TCreateDepartmentRequest,
  TCreateSelectionPathRequest,
  TCreateEducationRequest,
  TGeneralResponse,
  TCreateScholarshipRequest,
  TRegistrationPathResponse,
  TEmployeeCategoriesResponse,
  TQuestionResponse,
} from "@uninus/entities";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getDegreeProgram({ search, id }: ISelectRequest): Promise<TDegreeProgramResponse> {
    const degreeProgram = await this.prisma.degreeProgram.findMany({
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

    if (!degreeProgram) {
      throw new RpcException(new NotFoundException("Data Program Pendidikan Tidak Ditemukan!"));
    }

    return { degree_program: degreeProgram };
  }

  async getFaculty({
    search,
    degree_program_id,
    id,
  }: ISelectFacultyRequest): Promise<TFacultyResponse> {
    const faculty = await this.prisma.faculty.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },

        ...(degree_program_id && {
          degree_program_id: Number(degree_program_id),
        }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!faculty) {
      throw new RpcException(new NotFoundException("Data Fakultas Tidak Ditemukan!"));
    }

    return { faculty };
  }

  async getDepartment({
    search,
    faculty_id,
    degree_program_id,
    id,
  }: ISelectDepartmentRequest): Promise<TDepartmentResponse> {
    const department = await this.prisma.department.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        ...(faculty_id && { faculty_id: Number(faculty_id) }),
        ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!department) {
      throw new RpcException(new NotFoundException("Data Program Studi Tidak Ditemukan!"));
    }

    return { department };
  }

  async getReligion({ search, id }: ISelectRequest): Promise<TReligionResponse> {
    const religion = await this.prisma.religion.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!religion) {
      throw new RpcException(new NotFoundException("Data Agama Tidak Ditemukan!"));
    }

    return { religion };
  }

  async getMaritalStatus({ search, id }: ISelectRequest): Promise<TMaritalStatusResponse> {
    const maritalStatus = await this.prisma.maritalStatus.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!maritalStatus) {
      throw new RpcException(new NotFoundException("Data Status Pernikahan Tidak Ditemukan!"));
    }

    return { maritalStatus };
  }

  async getGender({ search, id }: ISelectRequest): Promise<TGenderResponse> {
    const gender = await this.prisma.gender.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!gender) {
      throw new RpcException(new NotFoundException("Data Jenis Kelamin Tidak Ditemukan!"));
    }

    return { gender };
  }

  async getCitizenship({ search, id }: ISelectRequest): Promise<TCitizenshipResponse> {
    const citizenship = await this.prisma.citizenship.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!citizenship) {
      throw new RpcException(new NotFoundException("Data Kewarganegaraan Tidak Ditemukan!"));
    }

    return { citizenship };
  }

  async getSelectionPath({
    search,
    id,
    degree_program_id,
  }: ISelectionRequest): Promise<TSelectionResponse> {
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
      throw new RpcException(new NotFoundException("Data Jalur Seleksi Tidak Ditemukan!"));
    }

    return { selection };
  }

  async getRegistrationPath({ search, id }: ISelectionRequest): Promise<TRegistrationPathResponse> {
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
      throw new RpcException(new NotFoundException("Data Jalur Seleksi Tidak Ditemukan!"));
    }

    return { registration_path };
  }
  async getSalary({ search, id }: ISelectRequest): Promise<TSalaryResponse> {
    const salary = await this.prisma.salary.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!salary) {
      throw new RpcException(new NotFoundException("Data Gaji Tidak Ditemukan!"));
    }

    return { salary };
  }

  async getEducation({
    search,
    npsn,
    id,
  }: ISelectEducationHistoryRequest): Promise<TEducationHistoryResponse> {
    const education = await this.prisma.education.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        npsn: { ...(npsn && { contains: npsn }) },
      },
      select: {
        id: true,
        npsn: true,
        name: true,
        province: true,
        sub_district: true,
        district_city: true,
        street_address: true,
      },
    });

    if (!education || education.length === 0) {
      throw new RpcException(new NotFoundException("Data Pendidikan Tidak Ditemukan!"));
    }

    return { education: education };
  }

  async getOccupation({ search, id }: ISelectRequest): Promise<TOccupationResponse> {
    const occupation = await this.prisma.occupation.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!occupation) {
      throw new RpcException(new NotFoundException("Data Pekerjaan Tidak Ditemukan!"));
    }

    return { occupation };
  }

  async getOccupationPosition({
    search,
    occupation_id,
    id,
  }: IOccupationPositionRequest): Promise<TOccupationPositionResponse> {
    const occupationPosition = await this.prisma.occupationPosition.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        ...(occupation_id && { occupation_id: Number(occupation_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!occupationPosition) {
      throw new RpcException(new NotFoundException("Data Jabatan Tidak Ditemukan!"));
    }

    return { occupation_position: occupationPosition };
  }

  async getDisabilites({ search, id }: ISelectRequest): Promise<TDisabilitiesResponse> {
    const disabilities = await this.prisma.disabilities.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!disabilities) {
      throw new RpcException(new NotFoundException("Data Disabilitas Tidak Ditemukan!"));
    }

    return { disabilities };
  }

  async getYearGraduate(): Promise<TYearGraduationResponse> {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 40;

    const year = Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
      const year = startYear + index;
      const id = index + 1;
      return { id: +id, name: year };
    });

    return { year };
  }

  async getScholarship({ search, id }: ISelectRequest): Promise<TScholarshipResponse> {
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
      throw new RpcException(new NotFoundException("Data Beasiswa Tidak Ditemukan!"));
    }

    return { scholarship };
  }

  async getEducationType({
    search,
    id,
    degree_program_id,
  }: IEducationTypeRequest): Promise<TSchoolTypeResponse> {
    const educationTypes = await this.prisma.educationTypes.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!educationTypes) {
      throw new RpcException(new NotFoundException("Data Jenis Sekola Tidak Ditemukan!"));
    }

    return { school_type: educationTypes };
  }

  async getAllQuestion(): Promise<TQuestionResponse[]> {
    const questions = await this.prisma.questions.findMany();
    if (questions.length === 0) {
      throw new RpcException(new NotFoundException("Soal tidak tersedia"));
    }

    const formattedQuestions: TQuestionResponse[] = questions.map((question) => ({
      id: question.id,
      question: question.question,
      correct_answer: question.correct_answer,
      incorrect_answers: question.incorrect_answers,
    }));

    return formattedQuestions;
  }

  async createQuestion(data: TCreateQuestionRequest) {
    const { question } = data;

    const existingQuestion = await this.prisma.questions.findFirst({
      where: { question },
    });

    if (existingQuestion) {
      throw new RpcException(new ConflictException("Soal sudah tersedia"));
    }

    const newQuestion = await this.prisma.questions.create({
      data: {
        question: data.question,
        correct_answer: data.correct_answer,
        incorrect_answers: data.incorrect_answers,
      },
    });

    return newQuestion;
  }

  async updateQuestion(id: number, data: TUpdateQuestionRequest): Promise<TGeneralResponse> {
    const existingQuestion = await this.prisma.questions.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!existingQuestion) {
      throw new RpcException(new NotFoundException("Soal tidak ditemukan"));
    }

    const updateQuestion = await this.prisma.questions.update({
      where: {
        id: Number(id),
      },
      data: {
        question: data.question,
        correct_answer: data.correct_answer,
        incorrect_answers: data.incorrect_answers,
      },
    });

    if (!updateQuestion) {
      throw new RpcException(new BadRequestException("Gagal mengubah soal"));
    }

    return {
      message: "Berhasil mengubah soal",
    };
  }

  async deleteQuestion(id: number): Promise<TDeleteQuestionResponse> {
    const deletedQuestion = await this.prisma.questions.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedQuestion) {
      throw new RpcException(new BadRequestException("Soal tidak tersedia"));
    }

    return {
      message: "Soal berhasil dihapus",
    };
  }

  async getParentStatus({ search, id }: ISelectRequest): Promise<TParentStatusResponse> {
    const parentStatus = await this.prisma.parentStatus.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!parentStatus) {
      throw new RpcException(new NotFoundException("Data Status Orang Tua Tidak Ditemukan!"));
    }

    return { parent_status: parentStatus };
  }

  async getParentEducation({ search, id }: ISelectRequest): Promise<TParentEducationResponse> {
    const parentEducation = await this.prisma.parentEducation.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!parentEducation) {
      throw new RpcException(new NotFoundException("Data Pendidikan Orang Tua Tidak Ditemukan!"));
    }

    return { parent_education: parentEducation };
  }

  async getEducationMajor({
    search,
    education_type_id,
    id,
  }: IEducationMajorRequest): Promise<TEducationMajorResponse> {
    const schoolMajorTypes = await this.prisma.educationMajor.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        ...(education_type_id && { education_type_id: Number(education_type_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!schoolMajorTypes) {
      throw new RpcException(new NotFoundException("Data Jurusan Sekolah Tidak Ditemukan!"));
    }

    return { education_major: schoolMajorTypes };
  }

  async getTotalRegistrans({
    filter_type,
    start_date,
    end_date,
  }: IRegistransRequest): Promise<TTotalRegistransResponse> {
    let whereClause: {
      createdAt?: {
        gte?: Date;
        lte?: Date;
      };
    } = {};

    if (filter_type) {
      switch (filter_type) {
        case EFilterTypeTotalRegistrans.WEEKLY: {
          const now = new Date();
          const today = now.getUTCDay();
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

        case EFilterTypeTotalRegistrans.MONTHLY: {
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

        case EFilterTypeTotalRegistrans.YEARLY: {
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

        case EFilterTypeTotalRegistrans.RANGE: {
          if (!start_date || !end_date) {
            throw new RpcException(
              new BadRequestException(
                "start date dan end date wajib diisi ketika memilih filter range",
              ),
            );
          }

          whereClause = {
            createdAt: {
              gte: new Date(`${start_date}T00:00:00Z`),
              lte: new Date(`${end_date}T23:59:59Z`),
            },
          };
          break;
        }

        default: {
          throw new RpcException(new BadRequestException("Filter Tidak Valid"));
        }
      }
    }

    const [total_registrans, accepted_registrans, paidsCount, unpaidsCount] = await Promise.all([
      this.prisma.users.count({
        select: {
          _all: true,
        },
        where: whereClause,
      }),
      this.prisma.pMB.count({
        where: {
          ...whereClause,
          registration_status_id: 5,
        },
      }),
      this.prisma.pMB.count({
        where: {
          ...whereClause,
          registration_status_id: 3,
        },
      }),
      this.prisma.pMB.count({
        where: {
          ...whereClause,
          registration_status_id: 2,
        },
      }),
    ]);
    return {
      total_registrans: total_registrans._all,
      paids: paidsCount,
      unpaids: unpaidsCount,
      accepted_registrans: accepted_registrans,
    };
  }

  async getInterestEducationPrograms({
    filter_type,
  }: IInterestEducationPrograms): Promise<TInterestEducationPrograms> {
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
          throw new RpcException(new BadRequestException("Filter Tidak Valid"));
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

    if (bachelorCount === 0 && magisterCount === 0 && doctorCount === 0) {
      throw new RpcException(new NotFoundException("Data tidak ditemukan"));
    }

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
  }

  async getInterestDepartment({
    filter_type,
    degree_program_id,
  }: IInterestDepartment): Promise<TInterestDepartmentResponse> {
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
          throw new RpcException(new BadRequestException("Invalid Type Filter"));
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
          first_department_id: 1,
          ...whereClause,
        },
      },
    });
    response.mPai = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 2,
        },
      },
    });
    response.mIHukum = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 3,
        },
      },
    });
    response.pai = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 4,
        },
      },
    });
    response.pbs = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 5,
        },
      },
    });
    response.pgmi = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 6,
        },
      },
    });
    response.kpi = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 7,
        },
      },
    });
    response.plb = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 8,
        },
      },
    });
    response.pls = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 9,
        },
      },
    });
    response.pgpaud = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 10,
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
          first_department_id: 13,
        },
      },
    });
    response.pmath = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 14,
        },
      },
    });
    response.ppkn = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 15,
        },
      },
    });
    response.te = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 16,
        },
      },
    });
    response.tif = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 17,
        },
      },
    });
    response.ti = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 18,
        },
      },
    });
    response.iKomunikasi = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 19,
        },
      },
    });
    response.iPerpustakaan = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 20,
        },
      },
    });
    response.akuntansi = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 21,
        },
      },
    });
    response.manajemen = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 22,
        },
      },
    });
    response.iHukum = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 23,
        },
      },
    });
    response.agrotek = await this.prisma.students.count({
      where: {
        pmb: {
          ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
          ...whereClause,
          first_department_id: 24,
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
  }

  async getRegistrationStatus({
    search,
    id,
  }: ISelectRequest): Promise<TRegistrationStatusResponse> {
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
      throw new RpcException(new NotFoundException("Status pendaftaran tidak ditemukan"));
    }
    return { registration_status: registration_status };
  }

  async getProvince({ search, id }: ISelectRequest): Promise<TProvinceResponse> {
    const province = await this.prisma.province.findMany({
      where: {
        id: id && Number(id),
        name: {
          ...(search && { contains: search.toUpperCase() }),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!province) {
      throw new RpcException(new NotFoundException("Data tidak ditemukan"));
    }
    return {
      province,
    };
  }

  async getCity({ id, province_id, search }: ICityRequest): Promise<TCityResponse> {
    const city = await this.prisma.city.findMany({
      where: {
        id: id && Number(id),
        name: {
          ...(search && { contains: search.toUpperCase() }),
        },
        ...(province_id && { province_id: Number(province_id) }),
      },
    });
    if (!city) {
      throw new RpcException(new NotFoundException("Data tidak ditemukan"));
    }
    return {
      city,
    };
  }

  async getSubDistrict({
    id,
    city_id,
    search,
  }: ISubDistrictRequest): Promise<TSubDistrictResponse> {
    const subDistrict = await this.prisma.subDistrict.findMany({
      where: {
        id: id && Number(id),
        name: {
          ...(search && { contains: search.toUpperCase() }),
        },
        ...(city_id && { city_id: Number(city_id) }),
      },
    });
    if (!subDistrict) {
      throw new RpcException(new NotFoundException("Data tidak ditemukan"));
    }
    return {
      subdistrict: subDistrict,
    };
  }

  async getCountry({ search, citizenship_id, id }: ICountryRequest): Promise<TCountryResponse> {
    const country = await this.prisma.country.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search.toUpperCase() }) },
        ...(citizenship_id && { citizenship_id: Number(citizenship_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!country) {
      throw new RpcException(new NotFoundException("Data tidak ditemukan"));
    }

    return { country };
  }

  async getStudentsPagination({
    where,
    orderBy,
    page = 1,
    perPage = 10,
  }: TStudentsPaginationArgs): Promise<TStudentsPaginatonResponse> {
    const [data, total] = await Promise.all([
      this.prisma.pMB.findMany({
        ...(perPage && { take: Number(perPage ?? 10) }),
        ...(page && { skip: Number(page > 0 ? perPage * (page - 1) : 0) }),
        where,
        select: {
          id: true,
          registration_number: true,
          average_grade: true,
          average_utbk: true,
          createdAt: true,
          selection_path: {
            select: {
              id: true,
              name: true,
            },
          },
          first_department: {
            select: {
              id: true,
              name: true,
            },
          },
          second_department: {
            select: {
              id: true,
              name: true,
            },
          },
          registration_status: {
            select: {
              id: true,
              name: true,
            },
          },
          student: {
            select: {
              user: {
                select: {
                  id: true,
                  fullname: true,
                },
              },
            },
          },
        },
        orderBy,
      }),
      this.prisma.pMB.count({
        where,
      }),
    ]);

    const lastPage = Math.ceil(total / perPage);

    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: Number(page),
        perPage: Number(perPage),
        prev: page > 1 ? Number(page) - 1 : null,
        next: page < lastPage ? Number(page) + 1 : null,
      },
    };
  }

  async getRoles({ search, id }: ISelectRequest): Promise<TRolesResponse> {
    const roles = await this.prisma.roles.findMany({
      where: {
        id: id && Number(id),
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
    if (!roles) {
      throw new RpcException(new NotFoundException("Data tidak ditemukan"));
    }
    return roles;
  }

  async createFaculty(payload: TCreateFacultyRequest): Promise<TGeneralResponse> {
    const newFaculty = await this.prisma.faculty.create({
      data: {
        name: payload.name,
        degreeProgram: {
          connect: {
            id: payload.degree_program_id,
          },
        },
      },
    });

    if (!newFaculty) {
      throw new RpcException(new BadRequestException("Gagal menambahkan fakultas baru"));
    }

    return {
      message: "Berhasil menambahkan fakultas baru",
    };
  }

  async createDepartment(payload: TCreateDepartmentRequest): Promise<TGeneralResponse> {
    const newDepartment = await this.prisma.department.create({
      data: {
        name: payload.name,
        Faculty: {
          connect: {
            id: payload.faculty_id,
          },
        },
        degreeProgram: {
          connect: {
            id: payload.degree_program_id,
          },
        },
      },
    });

    if (!newDepartment) {
      throw new RpcException(new BadRequestException("Gagal menambahkan program studi baru"));
    }
    return {
      message: "Berhasil menambahkan program studi baru",
    };
  }

  async createSelectionPath(payload: TCreateSelectionPathRequest): Promise<TGeneralResponse> {
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
      throw new RpcException(new BadRequestException("Gagal menambahkan Jalur Seleksi baru"));
    }

    return {
      message: "Berhasil menambahkan jalur seleksi baru",
    };
  }

  async createEducation(payload: TCreateEducationRequest): Promise<TGeneralResponse> {
    const newEducation = await this.prisma.education.create({
      data: {
        name: payload.name,
        npsn: payload.npsn,
        district_city: payload.district_city,
        sub_district: payload.sub_district,
        province: payload.province,
        street_address: payload.street_address,
        education_type: {
          connect: {
            id: payload.education_type_id,
          },
        },
      },
    });

    if (!newEducation) {
      throw new RpcException(new BadRequestException("Gagal membuat data sekolah baru"));
    }

    return {
      message: "Berhasil menambahkan data sekolah baru",
    };
  }

  async createScholarship(payload: TCreateScholarshipRequest): Promise<TGeneralResponse> {
    const newScholarship = await this.prisma.scholarship.create({
      data: {
        name: payload.name,
      },
    });

    if (!newScholarship) {
      throw new RpcException(new BadRequestException("Gagal menambahkan gagal beasiswa baru"));
    }

    return {
      message: "Berhasil menambahkan beasiswa baru",
    };
  }

  async updateFaculty(id: number, payload: TCreateFacultyRequest): Promise<TGeneralResponse> {
    const updatedFaculty = await this.prisma.faculty.update({
      where: {
        id: Number(id),
      },
      data: {
        name: payload.name,
        degree_program_id: payload.degree_program_id,
      },
    });

    if (!updatedFaculty) {
      throw new RpcException(new BadRequestException(`Gagal memperbarui fakultas dengan ID ${id}`));
    }

    return {
      message: `Berhasil memperbarui fakultas dengan ID ${id}`,
    };
  }
  async updateDepartment(id: number, payload: TCreateDepartmentRequest): Promise<TGeneralResponse> {
    const updatedDepartment = await this.prisma.department.update({
      where: {
        id: Number(id),
      },
      data: {
        name: payload.name,
        faculty_id: payload.faculty_id,
        degree_program_id: payload.degree_program_id,
      },
    });

    if (!updatedDepartment) {
      throw new RpcException(new BadRequestException("Gagal memperbarui program studi"));
    }

    return {
      message: "Berhasil memperbarui program studi",
    };
  }

  async updateSelectionPath(
    id: number,
    payload: TCreateSelectionPathRequest,
  ): Promise<TGeneralResponse> {
    const updatedSelectionPath = await this.prisma.selectionPath.update({
      where: {
        id: Number(id),
      },
      data: {
        name: payload.name,
        degree_program_id: payload.degree_program_id,
      },
    });

    if (!updatedSelectionPath) {
      throw new RpcException(new BadRequestException("Gagal memperbarui jalur seleksi"));
    }

    return {
      message: "Berhasil memperbarui jalur seleksi",
    };
  }

  async updateEducation(id: number, payload: TCreateEducationRequest): Promise<TGeneralResponse> {
    const updatedEducation = await this.prisma.education.update({
      where: {
        id: Number(id),
      },
      data: {
        name: payload.name,
        npsn: payload.npsn,
        district_city: payload.district_city,
        sub_district: payload.sub_district,
        province: payload.province,
        street_address: payload.street_address,
        education_type_id: payload.education_type_id,
      },
    });

    if (!updatedEducation) {
      throw new RpcException(new BadRequestException("Gagal memperbarui data sekolah"));
    }

    return {
      message: "Berhasil memperbarui data sekolah",
    };
  }

  async updateScholarship(
    id: number,
    payload: TCreateScholarshipRequest,
  ): Promise<TGeneralResponse> {
    const updateScholarship = await this.prisma.scholarship.update({
      where: {
        id: Number(id),
      },
      data: {
        name: payload.name,
      },
    });

    if (!updateScholarship) {
      throw new RpcException(new BadRequestException("Gagal memperbarui Beasiswa"));
    }

    return {
      message: "Berhasil memperbarui data beasiswa",
    };
  }

  async deleteFaculty(id: number): Promise<TGeneralResponse> {
    const deletedFaculty = await this.prisma.faculty.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedFaculty) {
      throw new RpcException(new BadRequestException(`Gagal menghapus fakultas`));
    }

    return {
      message: `Berhasil menghapus fakultas `,
    };
  }

  async deleteDepartment(id: number): Promise<TGeneralResponse> {
    const deleteDepartment = await this.prisma.department.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deleteDepartment) {
      throw new RpcException(new BadRequestException(`Gagal menghapus program studi`));
    }

    return {
      message: `Berhasil menghapus program studi `,
    };
  }

  async deleteSelectionPath(id: number): Promise<TGeneralResponse> {
    const selctionPath = await this.prisma.selectionPath.delete({
      where: {
        id: Number(id),
      },
    });

    if (!selctionPath) {
      throw new RpcException(new BadRequestException(`Gagal menghapus Jalur seleksi`));
    }

    return {
      message: `Berhasil menghapus Jalur seleksi `,
    };
  }

  async deleteEducation(id: number): Promise<TGeneralResponse> {
    const deleteEducation = await this.prisma.education.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deleteEducation) {
      throw new RpcException(new BadRequestException(`Gagal menghapus data sekolah`));
    }

    return {
      message: `Berhasil menghapus data sekolah `,
    };
  }

  async deleteScholarship(id: number): Promise<TGeneralResponse> {
    const deleteScholarship = await this.prisma.scholarship.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deleteScholarship) {
      throw new RpcException(new BadRequestException(`Gagal menghapus beasiswa`));
    }

    return {
      message: `Berhasil menghapus beasiswa `,
    };
  }

  async getCategories({ search, id }: ISelectRequest): Promise<TEmployeeCategoriesResponse> {
    const employeeCategories = await this.prisma.employeeCategories.findMany({
      where: {
        id: id && Number(id),
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
    if (!employeeCategories) {
      throw new RpcException(new NotFoundException("Data tidak ditemukan"));
    }
    return employeeCategories;
  }
}
