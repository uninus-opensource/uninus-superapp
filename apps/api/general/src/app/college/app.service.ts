import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

import { PrismaService } from "@uninus/api/services";
import { errorMappings } from "@uninus/api/utilities";
import {
  IDegreeProgramRequest,
  IDegreeProgramResponse,
  IGetFacultyRequest,
  ICreateFacultyRequest,
  IGetFacultyResponse,
  ICreateFacultyResponse,
  IUpdateFacultyRequest,
  IUpdateFacultyResponse,
  IDeleteFacultyRequest,
  IDeleteFacultyResponse,
  IGetDepartmentResponse,
  IGetDepartmentRequest,
  ICreateDepartmentRequest,
  ICreateDepartmentResponse,
  IUpdateDepartmentRequest,
  IUpdateDepartmentResponse,
  IDeleteDepartmentRequest,
  IDeleteDepartmentResponse,
} from "@uninus/entities";

@Injectable()
export class CollegeService {
  constructor(private prisma: PrismaService) {}

  async getDegreeProgram(payload: IDegreeProgramRequest): Promise<IDegreeProgramResponse> {
    try {
      const degreeProgram = await this.prisma.degreeProgram.findMany({
        where: {
          name: {
            ...(payload.search && { contains: payload.search }),
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

      return degreeProgram;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getFaculty(payload: IGetFacultyRequest): Promise<IGetFacultyResponse> {
    const { search, degree_program_id } = payload;
    try {
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

      return faculty;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async createFaculty(payload: ICreateFacultyRequest): Promise<ICreateFacultyResponse> {
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
  async updateFaculty(payload: IUpdateFacultyRequest): Promise<IUpdateFacultyResponse> {
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
  async deleteFaculty(payload: IDeleteFacultyRequest): Promise<IDeleteFacultyResponse> {
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

  async getDepartment(payload: IGetDepartmentRequest): Promise<IGetDepartmentResponse> {
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

      return department;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async createDepartment(payload: ICreateDepartmentRequest): Promise<ICreateDepartmentResponse> {
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
  async updateDepartment(payload: IUpdateDepartmentRequest): Promise<IUpdateDepartmentResponse> {
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
  async deleteDepartment(payload: IDeleteDepartmentRequest): Promise<IDeleteDepartmentResponse> {
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
}
