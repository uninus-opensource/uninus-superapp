import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
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
} from "@uninus/entities";
import * as schema from "@uninus/api/models";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { and, eq, ilike } from "drizzle-orm";
@Injectable()
export class CollegeService {
  constructor(@Inject("drizzle") private drizzle: NodePgDatabase<typeof schema>) {}

  async getDegreeProgram(payload: ISelectRequest): Promise<TDegreeProgramResponse> {
    try {
      const { search } = payload;
      const degreeProgram = await this.drizzle
        .select()
        .from(schema.degreeProgram)
        .where(ilike(schema.degreeProgram.name, `%${search || ""}%`));

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
      const faculty = await this.drizzle
        .select({
          id: schema.faculty.id,
          name: schema.faculty.name,
        })
        .from(schema.faculty)
        .where(
          and(
            ilike(schema.faculty.name, `%${search || ""}%`),
            ilike(schema.faculty.degreeProgramId, `%${degree_program_id || ""}%`),
          ),
        );

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
      const newFaculty = await this.drizzle.insert(schema.faculty).values({
        name: payload.name,
        degreeProgramId: payload.degree_program_id,
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
      const updatedFaculty = await this.drizzle
        .update(schema.faculty)
        .set({
          name: payload.name,
          degreeProgramId: payload.degree_program_id,
        })
        .where(eq(schema.faculty.id, payload.id));

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
      const deletedFaculty = await this.drizzle
        .delete(schema.faculty)
        .where(ilike(schema.lastEducations.id, String(payload.id)));

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
      const department = await this.drizzle
        .select({
          id: schema.department.id,
          name: schema.department.name,
        })
        .from(schema.department)
        .where(
          and(
            ilike(schema.department.name, `%${search || ""}%`),
            ilike(schema.department.facultyId, `%${faculty_id || ""}%`),
            ilike(schema.department.degreeProgramId, `%${degree_program_id || ""}%`),
          ),
        );

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
      const newDepartment = await this.drizzle.insert(schema.department).values({
        name: payload.name,
        facultyId: payload.faculty_id,
        degreeProgramId: payload.degree_program_id,
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
      const updatedDepartment = await this.drizzle
        .update(schema.department)
        .set({
          name: payload.name,
          facultyId: payload.faculty_id,
          degreeProgramId: payload.degree_program_id,
        })
        .where(eq(schema.department.id, payload.id));

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
  async deleteDepartment(payload: { id: string }): Promise<TGeneralResponse> {
    try {
      const deleteDepartment = await this.drizzle
        .delete(schema.department)
        .where(eq(schema.department.id, payload.id));
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
