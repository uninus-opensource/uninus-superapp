import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

import { PrismaService } from "@uninus/api/services";
import { errorMappings } from "@uninus/api/utilities";
import {
  TDepartmentResponse,
  TFacultyResponse,
  ISelectRequest,
  TDegreeProgramResponse,
  ISelectFacultyRequest,
  ISelectDepartmentRequest,
  TCreateFacultyRequest,
  TCreateDepartmentRequest,
  TGeneralResponse,
  TUpdateFacultyRequest,
  TUpdateDepartmentRequest,
  IGetCurriculumResponse,
  ICreateCurriculumRequest,
  ICreateCurriculumResponse,
  IUpdateCurriculumRequest,
  IUpdateCurriculumResponse,
  IDeleteCurriculumResponse,
  IGetCurriculumByIdResponse,
  IGetCoursesResponse,
  IDeleteCourseResponse,
  IUpdateCourseResponse,
  ICreateCourseResponse,
  IGetCourseByIdResponse,
  ICreateCourseRequest,
  IUpdateCourseRequest,
} from "@uninus/entities";

@Injectable()
export class CollegeService {
  constructor(private prisma: PrismaService) {}

  async getDegreeProgram(payload: ISelectRequest): Promise<TDegreeProgramResponse> {
    try {
      const { search } = payload;
      const degreeProgram = await this.prisma.degreeProgram.findMany({
        where: {
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
        throw new NotFoundException("Data Program Pendidikan Tidak Ditemukan!");
      }

      return { degree_program: degreeProgram };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getFaculty(payload: ISelectFacultyRequest): Promise<TFacultyResponse> {
    try {
      const { search, degree_program_id } = payload;
      const faculty = await this.prisma.faculty.findMany({
        where: {
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
        throw new NotFoundException("Data Fakultas Tidak Ditemukan!");
      }

      return { faculty };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async createFaculty(payload: TCreateFacultyRequest): Promise<TGeneralResponse> {
    try {
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
        throw new BadRequestException("Gagal menambahkan fakultas baru");
      }

      return {
        message: "Berhasil menambahkan fakultas baru",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async updateFaculty(payload: TUpdateFacultyRequest): Promise<TGeneralResponse> {
    try {
      const updatedFaculty = await this.prisma.faculty.update({
        where: {
          id: Number(payload.id),
        },
        data: {
          name: payload.name,
          degree_program_id: payload.degree_program_id,
        },
      });

      if (!updatedFaculty) {
        throw new BadRequestException(`Gagal memperbarui fakultas dengan ID ${payload.id}`);
      }

      return {
        message: `Berhasil memperbarui fakultas dengan ID ${payload.id}`,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async deleteFaculty(payload: { id: number }): Promise<TGeneralResponse> {
    try {
      const deletedFaculty = await this.prisma.faculty.delete({
        where: {
          id: Number(payload.id),
        },
      });

      if (!deletedFaculty) {
        throw new BadRequestException(`Gagal menghapus fakultas`);
      }

      return {
        message: `Berhasil menghapus fakultas `,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getDepartment(payload: ISelectDepartmentRequest): Promise<TDepartmentResponse> {
    try {
      const { search, faculty_id, degree_program_id } = payload;
      const department = await this.prisma.department.findMany({
        where: {
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
        throw new NotFoundException("Data Program Studi Tidak Ditemukan!");
      }

      return { department };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async createDepartment(payload: TCreateDepartmentRequest): Promise<TGeneralResponse> {
    try {
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
        throw new BadRequestException("Gagal menambahkan program studi baru");
      }
      return {
        message: "Berhasil menambahkan program studi baru",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async updateDepartment(payload: TUpdateDepartmentRequest): Promise<TGeneralResponse> {
    try {
      const updatedDepartment = await this.prisma.department.update({
        where: {
          id: Number(payload.id),
        },
        data: {
          name: payload.name,
          faculty_id: payload.faculty_id,
          degree_program_id: payload.degree_program_id,
        },
      });

      if (!updatedDepartment) {
        throw new BadRequestException("Gagal memperbarui program studi");
      }

      return {
        message: "Berhasil memperbarui program studi",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async deleteDepartment(payload: { id: number }): Promise<TGeneralResponse> {
    try {
      const deleteDepartment = await this.prisma.department.delete({
        where: {
          id: Number(payload.id),
        },
      });

      if (!deleteDepartment) {
        throw new BadRequestException(`Gagal menghapus program studi`);
      }

      return {
        message: `Berhasil menghapus program studi `,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getCurriculum(payload: ISelectRequest): Promise<IGetCurriculumResponse> {
    try {
      const { search } = payload;
      const getCurriculum = await this.prisma.curriculum.findMany({
        where: {
          name: { ...(search && { contains: search }), mode: "insensitive" },
        },
        select: {
          id: true,
          name: true,
          batch: true,
          release_year: true,
          in_effect: true,
          status: true,
          degree_program: {
            select: {
              id: true,
              name: true,
            },
          },
          department: {
            select: {
              id: true,
              name: true,
            },
          },
          faculty: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      if (!getCurriculum) {
        throw new BadRequestException("Gagal mengambil data Kurikulum");
      }
      return getCurriculum as IGetCurriculumResponse;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getCurriculumById(payload: { id: string }): Promise<IGetCurriculumByIdResponse> {
    try {
      const { id } = payload;
      const getCurriculum = await this.prisma.curriculum.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          batch: true,
          release_year: true,
          in_effect: true,
          status: true,
          degree_program: {
            select: {
              id: true,
              name: true,
            },
          },
          department: {
            select: {
              id: true,
              name: true,
            },
          },
          faculty: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      if (!getCurriculum) {
        throw new BadRequestException("Gagal mengambil data Kurikulum");
      }
      return getCurriculum;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async createCurriculum(payload: ICreateCurriculumRequest): Promise<ICreateCurriculumResponse> {
    try {
      const {
        name,
        degree_program_id,
        department_id,
        faculty_id,
        batch,
        release_year = new Date().getFullYear(),
        in_effect,
      } = payload;
      const createCurriculum = await this.prisma.curriculum.create({
        data: {
          name,
          batch,
          status: "Aktif",
          release_year: String(release_year),
          in_effect,
          degree_program: {
            connect: {
              id: Number(degree_program_id),
            },
          },
          department: {
            connect: {
              id: Number(department_id),
            },
          },
          faculty: {
            connect: {
              id: Number(faculty_id),
            },
          },
        },
      });
      if (!createCurriculum) {
        throw new BadRequestException("Gagal menambahkan Kurikulum");
      }
      return {
        message: "Berhasil menambahkan Kurikulum",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async updateCurriculum(payload: IUpdateCurriculumRequest): Promise<IUpdateCurriculumResponse> {
    try {
      const {
        id,
        status,
        name,
        degree_program_id,
        department_id,
        faculty_id,
        batch,
        release_year = new Date().getFullYear(),
        in_effect,
      } = payload;
      const updateCurriculum = await this.prisma.curriculum.update({
        where: {
          id,
        },
        data: {
          name,
          status,
          batch,
          release_year: String(release_year),
          in_effect,
          ...(degree_program_id && {
            degree_program: {
              connect: {
                id: Number(degree_program_id),
              },
            },
          }),
          ...(faculty_id && {
            faculty: {
              connect: {
                id: Number(faculty_id),
              },
            },
          }),
          ...(department_id && {
            department: {
              connect: {
                id: Number(department_id),
              },
            },
          }),
        },
      });
      if (!updateCurriculum) {
        throw new BadRequestException("Gagal update Kurikulum");
      }
      return {
        message: "Berhasil update Kurikulum",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async deleteCurriculum(payload: { id: string }): Promise<IDeleteCurriculumResponse> {
    try {
      const { id } = payload;
      const deleteCurriculum = await this.prisma.curriculum.deleteMany({
        where: {
          id,
        },
      });
      if (!deleteCurriculum) {
        throw new BadRequestException("Gagal menghapus Kurikulum");
      }
      return {
        message: "Berhasil menghapus kurikulum",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getCourses(payload: ISelectRequest): Promise<IGetCoursesResponse> {
    try {
      const { search } = payload;
      const getCourses = await this.prisma.courses.findMany({
        where: {
          name: { ...(search && { contains: search }), mode: "insensitive" },
        },
        include: {
          curriculum: {
            include: {
              degree_program: {
                select: {
                  id: true,
                  name: true,
                },
              },
              department: {
                select: {
                  id: true,
                  name: true,
                },
              },
              faculty: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          course_type: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      if (!getCourses) {
        throw new BadRequestException("Gagal data mengambil mata kuliah");
      }
      return getCourses;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getCourseById(payload: { id: string }): Promise<IGetCourseByIdResponse> {
    try {
      const { id } = payload;
      const getCourse = await this.prisma.courses.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          curriculum: {
            include: {
              degree_program: {
                select: {
                  id: true,
                  name: true,
                },
              },
              department: {
                select: {
                  id: true,
                  name: true,
                },
              },
              faculty: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          course_type: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      if (!getCourse) {
        throw new BadRequestException("Gagal mengambil data mata kuliah");
      }
      return getCourse;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async createCourse(payload: ICreateCourseRequest): Promise<ICreateCourseResponse> {
    try {
      const { name, course_code, curriculum_id, category_id, course_type_id, credit, semester } =
        payload;
      const createCourse = await this.prisma.courses.create({
        data: {
          name,
          course_code,
          curriculum_id,
          category_id,
          course_type_id,
          credit,
          semester,
          status: "Aktif",
        },
      });
      if (!createCourse) {
        throw new BadRequestException("Gagal menambahkan mata kuliah");
      }
      return {
        message: "Berhasil menambahkan mata kuliah",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async updateCourse(payload: IUpdateCourseRequest): Promise<IUpdateCourseResponse> {
    try {
      const {
        id,
        status,
        name,
        course_code,
        curriculum_id,
        category_id,
        course_type_id,
        credit,
        semester,
      } = payload;
      const createCourse = await this.prisma.courses.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          course_code,
          curriculum_id,
          category_id,
          course_type_id,
          credit,
          semester,
          status,
        },
      });
      if (!createCourse) {
        throw new BadRequestException("Gagal menambahkan mata kuliah");
      }
      return {
        message: "Berhasil update mata kuliah",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async deleteCourse(payload: { id: string }): Promise<IDeleteCourseResponse> {
    try {
      const { id } = payload;
      const deleteCourse = await this.prisma.courses.delete({
        where: {
          id: Number(id),
        },
      });
      if (!deleteCourse) {
        throw new BadRequestException("Gagal menambahkan mata kuliah");
      }
      return {
        message: "Berhasil menghapus mata kuliah",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
}
