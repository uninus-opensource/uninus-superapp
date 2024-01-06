import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { PrismaService } from "@uninus/api/services";
import { errorMappings } from "@uninus/api/utilities";
import {
  ISelectRequest,
  // TAcademicStaffResponse,
  TEmployeePaginationArgs,
  // TEmployeeParamsResponse,
  TEmployeesResponse,
  // TLecturerResponse,
  TTotalEmployeesResponse,
} from "@uninus/entities";
import * as schema from "@uninus/api/models";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { and, eq, ilike } from "drizzle-orm";

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    @Inject("drizzle") private drizzle: NodePgDatabase<typeof schema>,
  ) {}
  async getEmployees({
    search,
    filterBy,
    type,
    orderBy,
    page = 1,
    perPage = 10,
  }: TEmployeePaginationArgs): Promise<TEmployeesResponse> {
    try {
      const skip = Number(page > 0 ? perPage * (page - 1) : 0);
      const take = Number(perPage ?? 10);

      const [data] = await Promise.all([
        this.prisma.employees.findMany({
          take,
          skip,
          where: {
            OR: [
              {
                user: {
                  fullname: {
                    contains: search || "",
                    mode: "insensitive",
                  },
                },
                employee_has_category: {
                  some: {
                    employee_category_id: Number(type),
                  },
                },
              },
            ],
          },
          select: {
            user: {
              select: {
                fullname: true,
              },
            },
            nip: true,
            employee_has_category: {
              select: {
                employee_category: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            ...(type == 1
              ? {
                  nidn: true,
                  lecturers: {
                    select: {
                      lecturer_faculty_department: {
                        select: {
                          faculty: {
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
                        },
                      },
                    },
                  },
                }
              : {}),
            ...(type == 2
              ? {
                  employee_has_workunit: {
                    select: {
                      work_unit: {
                        select: {
                          name: true,
                          work_unit_category: {
                            select: {
                              name: true,
                            },
                          },
                        },
                      },
                    },
                  },
                }
              : {}),
            employee_status: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            [orderBy]: filterBy,
          },
        }),
      ]);

      const lastPage = Math.ceil(data.length / perPage);

      const mappedData = data?.map((el) => ({
        fullname: el.user.fullname,
        nip: el.nip,
        nidn: el.nidn,
        faculty: el.lecturers?.lecturer_faculty_department?.map((el) => el.faculty.name),
        department: el.lecturers?.lecturer_faculty_department?.map((el) => el.department.name),
        employee_status: el.employee_status.name,
        work_unit: el.employee_has_workunit?.map((el) => ({
          category: el.work_unit.work_unit_category.name,
          unit: el.work_unit.name,
        })),
      }));

      return {
        data: mappedData,
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
        total_employees,
        total_lecturer,
        total_academic_staff,
        total_reguler_employee,
        total_temporary_employee,
        total_fondation_lecturer,
        total_dpk_lecturer,
        total_temporary_lecturer,
        total_reguler_academic_staff,
        total_temporary_academic_staff,
      ] = await Promise.all([
        this.prisma.employees.count({
          where: {
            NOT: {
              employee_status_id: 4,
            },
          },
        }),
        this.prisma.employeeHasCategory.count({
          where: {
            employee_category_id: 1,
          },
        }),
        this.prisma.employeeHasCategory.count({
          where: {
            employee_category_id: 2,
          },
        }),
        this.prisma.employees.count({
          where: {
            employee_type_id: 1,
          },
        }),
        this.prisma.employees.count({
          where: {
            employee_type_id: 2,
          },
        }),
        this.prisma.lecturers.count({
          where: {
            lecturer_type_id: 1,
          },
        }),
        this.prisma.lecturers.count({
          where: {
            lecturer_type_id: 2,
          },
        }),
        this.prisma.lecturers.count({
          where: {
            lecturer_type_id: 3,
          },
        }),
        this.prisma.academicStaff.count({
          where: {
            academic_staff_type_id: 1,
          },
        }),
        this.prisma.academicStaff.count({
          where: {
            academic_staff_type_id: 2,
          },
        }),
      ]);
      return {
        total_employees: total_employees,
        total_lecturer: total_lecturer,
        total_academic_staff: total_academic_staff,
        total_reguler_employee: total_reguler_employee,
        total_temporary_employee: total_temporary_employee,
        total_fondation_lecturer: total_fondation_lecturer,
        total_dpk_lecturer: total_dpk_lecturer,
        total_temporary_lecturer: total_temporary_lecturer,
        total_reguler_academic_staff: total_reguler_academic_staff,
        total_temporary_academic_staff: total_temporary_academic_staff,
      };
    } catch (error) {
      return {
        message: "Failed to get total employees!",
      };
    }
  }

  async getLecturer(payload: { id: string }) {
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
          lecturerPosition: schema.lecturerPosition.name,
          civilServiceLevel: schema.civilServiceLevel.name,
          employeeId: schema.lecturers.employeeId,
        })
        .from(schema.lecturers)
        .leftJoin(schema.employees, eq(schema.employees.id, schema.lecturers.employeeId))
        .leftJoin(schema.users, eq(schema.users.id, schema.employees.userId))
        .leftJoin(schema.gender, eq(schema.gender.id, schema.employees.genderId))
        .leftJoin(schema.lecturerType, eq(schema.lecturerType.id, schema.lecturers.lecturerTypeId))
        .leftJoin(
          schema.lecturerPosition,
          eq(schema.lecturerPosition.id, schema.lecturers.lecturerPositionId),
        )
        .leftJoin(
          schema.civilServiceLevel,
          eq(schema.civilServiceLevel.id, schema.lecturerPosition.civilServiceLevelId),
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
        addition_task: lecturer.additionTask,
        lecturer_type: lecturer.lecturerType,
        lecturer_position: lecturer.lecturerPosition,
        civil_service_level: lecturer.civilServiceLevel,
        employee_work_unit: workUnits,
        faculty,
        department,
        employee_document: documents,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getAcademicStaff(payload: { id: string }) {
    try {
      const { id } = payload;
      const academicStaff = await this.drizzle
        .select({
          id: schema.academicStaff.id,
          fullname: schema.users.fullname,
          nip: schema.employees.nip,
          nik: schema.employees.nik,
          gender: schema.gender.name,
          academicStaffType: schema.academicStaffType.name,
          employeeId: schema.academicStaff.employeeId,
        })
        .from(schema.academicStaff)
        .leftJoin(schema.employees, eq(schema.employees.id, schema.academicStaff.employeeId))
        .leftJoin(schema.users, eq(schema.users.id, schema.employees.userId))
        .leftJoin(schema.gender, eq(schema.gender.id, schema.employees.genderId))
        .leftJoin(
          schema.academicStaffType,
          eq(schema.academicStaffType.id, schema.academicStaff.academicStaffTypeId),
        )
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
        academic_staff_type: academicStaff.academicStaffType,
        employee_work_unit: workUnits,
        employee_document: documents,
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
            ilike(schema.employeeCategories.name, `%${search || ""}%`),
            ilike(schema.employeeCategories.id, `%${id || ""}%`),
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
            ilike(schema.employeeType.name, `%${search || ""}%`),
            ilike(schema.employeeType.id, `%${id || ""}%`),
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
            ilike(schema.employeeStatus.name, `%${search || ""}%`),
            ilike(schema.employeeStatus.id, `%${id || ""}%`),
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
            ilike(schema.lecturerType.name, `%${search || ""}%`),
            ilike(schema.lecturerType.id, `%${id || ""}%`),
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

  async getLecturerPositions({ search, id }: ISelectRequest) {
    try {
      const lecturerPositions = await this.drizzle
        .select({
          id: schema.lecturerPosition.id,
          name: schema.lecturerPosition.name,
        })
        .from(schema.lecturerPosition)
        .where(
          and(
            ilike(schema.lecturerPosition.name, `%${search || ""}%`),
            ilike(schema.lecturerPosition.id, `%${id || ""}%`),
          ),
        );
      if (!lecturerPositions) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return lecturerPositions;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getAcademicStaffTypes({ search, id }: ISelectRequest) {
    try {
      const academicStaffTypes = await await this.drizzle
        .select({
          id: schema.academicStaffType.id,
          name: schema.academicStaffType.name,
        })
        .from(schema.academicStaffType)
        .where(
          and(
            ilike(schema.academicStaffType.name, `%${search || ""}%`),
            ilike(schema.academicStaffType.id, `%${id || ""}%`),
          ),
        );
      if (!academicStaffTypes) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return academicStaffTypes;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getAcademicStaffPositions({ search, id }: ISelectRequest) {
    try {
      const academicStaffPositions = await await this.drizzle
        .select({
          id: schema.academicStaffPosition.id,
          name: schema.academicStaffPosition.name,
        })
        .from(schema.academicStaffPosition)
        .where(
          and(
            ilike(schema.academicStaffPosition.name, `%${search || ""}%`),
            ilike(schema.academicStaffPosition.id, `%${id || ""}%`),
          ),
        );
      if (!academicStaffPositions) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return academicStaffPositions;
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
            ilike(schema.workUnitCategories.name, `%${search || ""}%`),
            ilike(schema.workUnitCategories.id, `%${id || ""}%`),
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
            ilike(schema.workUnits.name, `%${search || ""}%`),
            ilike(schema.workUnits.id, `%${id || ""}%`),
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
