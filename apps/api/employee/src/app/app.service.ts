import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

import { errorMappings } from "@uninus/api/utilities";
import {
  EOrderByPagination,
  ISelectRequest,
  TAcademicStaffResponse,
  TEmployeePaginationArgs,
  // TEmployeeParamsResponse,
  TEmployeesResponse,
  TLecturerResponse,
  TTotalEmployeesResponse,
  TGetEmployeePositionRequest,
} from "@uninus/entities";
import * as schema from "@uninus/api/models";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { and, asc, desc, eq, ilike, notIlike } from "drizzle-orm";

@Injectable()
export class AppService {
  constructor(@Inject("drizzle") private drizzle: NodePgDatabase<typeof schema>) {}
  async getEmployees({
    search,
    // filterBy,
    employeeCategoriesId,
    orderBy,
    page = 1,
    perPage = 10,
  }: TEmployeePaginationArgs): Promise<TEmployeesResponse> {
    try {
      const orderByFunction = orderBy == EOrderByPagination.DESC ? desc : asc;

      const data = await this.drizzle
        .select({
          id: schema.employees.id,
          fullname: schema.users.fullname,
          nip: schema.employees.nip,
          nidn: schema.employees.nidn,
          employeeStatus: {
            id: schema.employeeStatus.id,
            name: schema.employeeStatus.name,
          },
        })
        .from(schema.employees)
        .leftJoin(schema.users, eq(schema.users.id, schema.employees.userId))
        .leftJoin(
          schema.employeeOnEmployeeCategories,
          eq(schema.employees.id, schema.employeeOnEmployeeCategories.employeeId),
        )
        .leftJoin(
          schema.employeeCategories,
          eq(
            schema.employeeCategories.id,
            schema.employeeOnEmployeeCategories.employeeCategoriesId,
          ),
        )
        .leftJoin(
          schema.employeeStatus,
          eq(schema.employeeStatus.id, schema.employees.employeeStatusId),
        )
        .leftJoin(
          schema.employeeOnWorkUnit,
          eq(schema.employees.id, schema.employeeOnWorkUnit.employeeId),
        )
        .leftJoin(schema.workUnits, eq(schema.workUnits.id, schema.employeeOnWorkUnit.workUnitId))
        .leftJoin(
          schema.workUnitCategories,
          eq(schema.workUnitCategories.id, schema.workUnits.workUnitCategoryId),
        )
        .leftJoin(schema.lecturers, eq(schema.lecturers.employeeId, schema.employees.id))
        .leftJoin(
          schema.lecturerOnDepartment,
          eq(schema.lecturers.id, schema.lecturerOnDepartment.lecturerId),
        )
        .leftJoin(
          schema.department,
          eq(schema.department.id, schema.lecturerOnDepartment.departmentId),
        )
        .leftJoin(
          schema.lecturerOnFaculty,
          eq(schema.lecturers.id, schema.lecturerOnFaculty.lecturerId),
        )
        .leftJoin(schema.faculty, eq(schema.faculty.id, schema.lecturerOnFaculty.facultyId))

        .where(
          and(
            ...(search ? [ilike(schema.users.fullname, `%${search}%`)] : []),
            ...(employeeCategoriesId
              ? [eq(schema.employeeCategories.id, employeeCategoriesId)]
              : []),
          ),
        )
        .limit(perPage)
        .offset((page - 1) * perPage)
        .orderBy(orderByFunction(schema.employees.createdAt));

      const lastPage = Math.ceil(data.length / perPage);

      return {
        data: data,
        meta: {
          total: data.length,
          lastPage,
          currentPage: Number(page),
          perPage: Number(perPage),
          prev: page > 1 ? Number(page) - 1 : null,
          next: page < lastPage ? Number(page) + 1 : null,
        },
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getTotalEmployees(): Promise<TTotalEmployeesResponse> {
    try {
      const [
        totalEmployees,
        totalLecturer,
        totalAcademicStaff,
        totalRegulerEmployee,
        totalTemporaryEmployee,
        totalFondationLecturer,
        totalDpkLecturer,
        totalTemporaryLecturer,
        totalRegulerAcademicStaff,
        totalTemporaryAcademicStaff,
      ] = await Promise.all([
        this.drizzle
          .select({
            id: schema.employees.id,
          })
          .from(schema.employees)
          .leftJoin(
            schema.employeeStatus,
            eq(schema.employeeStatus.id, schema.employees.employeeStatusId),
          )
          .where(notIlike(schema.employeeStatus.name, "tidak aktif"))
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.employees.id,
          })
          .from(schema.employees)
          .leftJoin(
            schema.employeeOnEmployeeCategories,
            eq(schema.employees.id, schema.employeeOnEmployeeCategories.employeeId),
          )
          .leftJoin(
            schema.employeeCategories,
            eq(
              schema.employeeCategories.id,
              schema.employeeOnEmployeeCategories.employeeCategoriesId,
            ),
          )
          .where(ilike(schema.employeeCategories.name, "dosen"))
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.employees.id,
          })
          .from(schema.employees)
          .leftJoin(
            schema.employeeOnEmployeeCategories,
            eq(schema.employees.id, schema.employeeOnEmployeeCategories.employeeId),
          )
          .leftJoin(
            schema.employeeCategories,
            eq(
              schema.employeeCategories.id,
              schema.employeeOnEmployeeCategories.employeeCategoriesId,
            ),
          )
          .where(ilike(schema.employeeCategories.name, "tekndik"))
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.employees.id,
          })
          .from(schema.employees)
          .leftJoin(
            schema.employeeType,
            eq(schema.employeeType.id, schema.employees.employeeTypeId),
          )
          .where(ilike(schema.employeeType.name, "tetap"))
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.employees.id,
          })
          .from(schema.employees)
          .leftJoin(
            schema.employeeType,
            eq(schema.employeeType.id, schema.employees.employeeTypeId),
          )
          .where(ilike(schema.employeeType.name, "kontrak"))
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.lecturers.id,
          })
          .from(schema.lecturers)
          .leftJoin(
            schema.lecturerType,
            eq(schema.lecturerType.id, schema.lecturers.lecturerTypeId),
          )
          .where(ilike(schema.lecturerType.name, "dpk"))
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.lecturers.id,
          })
          .from(schema.lecturers)
          .leftJoin(
            schema.lecturerType,
            eq(schema.lecturerType.id, schema.lecturers.lecturerTypeId),
          )
          .where(ilike(schema.lecturerType.name, "yayasan"))
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.lecturers.id,
          })
          .from(schema.lecturers)
          .leftJoin(
            schema.lecturerType,
            eq(schema.lecturerType.id, schema.lecturers.lecturerTypeId),
          )
          .where(ilike(schema.lecturerType.name, "lb"))
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.academicStaff.id,
          })
          .from(schema.academicStaff)
          .leftJoin(schema.employees, eq(schema.employees.id, schema.academicStaff.employeeId))

          .leftJoin(
            schema.employeeType,
            eq(schema.employeeType.id, schema.employees.employeeTypeId),
          )
          .where(ilike(schema.employeeType.name, "tetap"))
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.academicStaff.id,
          })
          .from(schema.academicStaff)
          .leftJoin(schema.employees, eq(schema.employees.id, schema.academicStaff.employeeId))

          .leftJoin(
            schema.employeeType,
            eq(schema.employeeType.id, schema.employees.employeeTypeId),
          )
          .where(ilike(schema.employeeType.name, "kontrak"))
          .then((res) => res.length),
      ]);
      return {
        totalEmployees,
        totalLecturer,
        totalAcademicStaff,
        totalRegulerEmployee,
        totalTemporaryEmployee,
        totalFondationLecturer,
        totalDpkLecturer,
        totalTemporaryLecturer,
        totalRegulerAcademicStaff: totalRegulerAcademicStaff,
        totalTemporaryAcademicStaff: totalTemporaryAcademicStaff,
      };
    } catch (error) {
      return {
        message: "Failed to get total employees!",
      };
    }
  }

  async getLecturer(payload: { id: string }): Promise<TLecturerResponse> {
    try {
      const { id } = payload;
      const lecturer = await this.drizzle
        .select({
          id: schema.lecturers.id,
          fullname: schema.users.fullname,
          nip: schema.employees.nip,
          nik: schema.employees.nik,
          nidn: schema.employees.nidn,
          additionTask: schema.employees.additionTask,
          gender: schema.gender.name,
          lecturerCertification: schema.lecturers.lecturerCertification,
          lecturerType: schema.lecturerType.name,
          employeePosition: schema.employeePosition.name,
          civilServiceLevel: schema.civilServiceLevel.name,
          employeeId: schema.lecturers.employeeId,
        })
        .from(schema.lecturers)
        .leftJoin(schema.employees, eq(schema.employees.id, schema.lecturers.employeeId))
        .leftJoin(schema.users, eq(schema.users.id, schema.employees.userId))
        .leftJoin(schema.gender, eq(schema.gender.id, schema.employees.genderId))
        .leftJoin(schema.lecturerType, eq(schema.lecturerType.id, schema.lecturers.lecturerTypeId))
        .leftJoin(
          schema.employeePosition,
          eq(schema.employeePosition.id, schema.employees.employeePositionId),
        )
        .leftJoin(
          schema.civilServiceLevel,
          eq(schema.civilServiceLevel.id, schema.employeePosition.civilServiceLevelId),
        )
        .where(eq(schema.lecturers.id, id))
        .limit(1)
        .then((res) => res.at(0));

      const [documents, workUnits, faculty, department] = await Promise.all([
        this.drizzle
          .select({
            id: schema.documents.id,
            name: schema.documents.name,
            path: schema.documents.path,
          })
          .from(schema.documents)
          .where(eq(schema.documents.employeeId, lecturer.employeeId)),

        this.drizzle
          .select()
          .from(schema.employeeOnWorkUnit)
          .leftJoin(schema.workUnits, eq(schema.workUnits.id, schema.employeeOnWorkUnit.workUnitId))
          .leftJoin(
            schema.workUnitCategories,
            eq(schema.workUnitCategories.id, schema.workUnits.workUnitCategoryId),
          )
          .where(eq(schema.employeeOnWorkUnit.employeeId, lecturer.employeeId)),
        this.drizzle
          .select({
            id: schema.faculty.id,
            name: schema.faculty.name,
          })
          .from(schema.lecturerOnFaculty)
          .leftJoin(schema.faculty, eq(schema.faculty.id, schema.lecturerOnFaculty.facultyId))
          .where(eq(schema.lecturerOnFaculty.lecturerId, id)),
        this.drizzle
          .select({
            id: schema.department.id,
            name: schema.department.name,
          })
          .from(schema.lecturerOnDepartment)
          .leftJoin(
            schema.department,
            eq(schema.department.id, schema.lecturerOnDepartment.departmentId),
          )
          .where(eq(schema.lecturerOnDepartment.lecturerId, id)),
      ]);

      if (!lecturer) {
        throw new NotFoundException("Dosen tidak ditemukan");
      }

      return {
        id,
        fullname: lecturer.fullname,
        nip: lecturer.nip,
        nidn: lecturer.nidn,
        nik: lecturer.nik,
        gender: lecturer.gender,
        additionTask: lecturer.additionTask,
        lecturerType: lecturer.lecturerType,
        employeePosition: lecturer.employeePosition,
        civilServiceLevel: lecturer.civilServiceLevel,
        workUnits: workUnits,
        faculty,
        department,
        documents,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getAcademicStaff(payload: { id: string }): Promise<TAcademicStaffResponse> {
    try {
      const { id } = payload;
      const academicStaff = await this.drizzle
        .select({
          id: schema.academicStaff.id,
          fullname: schema.users.fullname,
          nip: schema.employees.nip,
          nik: schema.employees.nik,
          gender: schema.gender.name,
          employeeType: schema.employeeType.name,
          employeeId: schema.academicStaff.employeeId,
        })
        .from(schema.academicStaff)
        .leftJoin(schema.employees, eq(schema.employees.id, schema.academicStaff.employeeId))
        .leftJoin(schema.users, eq(schema.users.id, schema.employees.userId))
        .leftJoin(schema.gender, eq(schema.gender.id, schema.employees.genderId))
        .leftJoin(schema.employeeType, eq(schema.employeeType.id, schema.employees.employeeTypeId))
        .where(eq(schema.academicStaff.id, id))
        .limit(1)
        .then((res) => res.at(0));

      const [documents, workUnits] = await Promise.all([
        this.drizzle
          .select({
            id: schema.documents.id,
            name: schema.documents.name,
            path: schema.documents.path,
          })
          .from(schema.documents)
          .where(eq(schema.documents.employeeId, academicStaff.employeeId)),

        this.drizzle
          .select()
          .from(schema.employeeOnWorkUnit)
          .leftJoin(schema.workUnits, eq(schema.workUnits.id, schema.employeeOnWorkUnit.workUnitId))
          .leftJoin(
            schema.workUnitCategories,
            eq(schema.workUnitCategories.id, schema.workUnits.workUnitCategoryId),
          )
          .where(eq(schema.employeeOnWorkUnit.employeeId, academicStaff.employeeId)),
      ]);

      if (!academicStaff) {
        throw new NotFoundException("Tendik tidak ditemukan");
      }

      return {
        id: academicStaff.id,
        fullname: academicStaff.fullname,
        nip: academicStaff.nip,
        nik: academicStaff.nik,
        gender: academicStaff.gender,
        employeeType: academicStaff.employeeType,
        workUnits,
        documents,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getCategories({ search, id }: ISelectRequest) {
    try {
      const employeeCategories = await this.drizzle
        .select({
          id: schema.employeeCategories.id,
          name: schema.employeeCategories.name,
        })
        .from(schema.employeeCategories)
        .where(
          and(
            ...(search ? [ilike(schema.employeeCategories.name, `%${search}%`)] : []),
            ...(id ? [eq(schema.employeeCategories.id, `${id}`)] : []),
          ),
        );
      if (!employeeCategories) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return employeeCategories;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getEmployeeTypes({ search, id }: ISelectRequest) {
    try {
      const employeeTypes = await this.drizzle
        .select({
          id: schema.employeeType.id,
          name: schema.employeeType.name,
        })
        .from(schema.employeeType)
        .where(
          and(
            ...(search ? [ilike(schema.employeeType.name, `%${search}%`)] : []),
            ...(id ? [eq(schema.employeeType.id, `${id}`)] : []),
          ),
        );
      if (!employeeTypes) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return employeeTypes;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getEmployeeStatus({ id, search }: ISelectRequest) {
    try {
      const employeeStatus = await this.drizzle
        .select({
          id: schema.employeeStatus.id,
          name: schema.employeeStatus.name,
        })
        .from(schema.employeeStatus)
        .where(
          and(
            ...(search ? [ilike(schema.employeeStatus.name, `%${search}%`)] : []),
            ...(id ? [eq(schema.employeeStatus.id, `${id}`)] : []),
          ),
        );
      if (!employeeStatus) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return employeeStatus;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getLecturerTypes({ search, id }: ISelectRequest) {
    try {
      const lecturerTypes = await this.drizzle
        .select({
          id: schema.lecturerType.id,
          name: schema.lecturerType.name,
        })
        .from(schema.lecturerType)
        .where(
          and(
            ...(search ? [ilike(schema.lecturerType.name, `%${search}%`)] : []),
            ...(id ? [eq(schema.lecturerType.id, `${id}`)] : []),
          ),
        );
      if (!lecturerTypes) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return lecturerTypes;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getEmployeePositions({ search, id, employeeCategoryId }: TGetEmployeePositionRequest) {
    try {
      const employeePosition = await this.drizzle
        .select({
          id: schema.employeePosition.id,
          name: schema.employeePosition.name,
        })
        .from(schema.employeePosition)
        .where(
          and(
            ...(search ? [ilike(schema.employeePosition.name, `%${search}%`)] : []),
            ...(id ? [eq(schema.employeePosition.id, `${id}`)] : []),
            ...(employeeCategoryId
              ? [eq(schema.employeePosition.employeeCategoryId, `${employeeCategoryId}`)]
              : []),
          ),
        );
      if (!employeePosition) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return employeePosition;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getWorkUnitCategories({ search, id }: ISelectRequest) {
    try {
      const workUnitCategories = await this.drizzle
        .select({
          id: schema.workUnitCategories.id,
          name: schema.workUnitCategories.name,
        })
        .from(schema.workUnitCategories)
        .where(
          and(
            ...(search ? [ilike(schema.workUnitCategories.name, `%${search}%`)] : []),
            ...(id ? [eq(schema.workUnitCategories.id, `${id}`)] : []),
          ),
        );

      if (!workUnitCategories) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return workUnitCategories;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getWorkUnit({ search, id }: ISelectRequest) {
    try {
      const workUnit = await this.drizzle
        .select({
          id: schema.workUnits.id,
          name: schema.workUnits.name,
        })
        .from(schema.workUnits)
        .where(
          and(
            ...(search ? [ilike(schema.workUnits.name, `%${search}%`)] : []),
            ...(id ? [eq(schema.workUnits.id, `${id}`)] : []),
          ),
        );

      if (!workUnit) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return workUnit;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async createEmployee() {
    return "Success";
  }
}
