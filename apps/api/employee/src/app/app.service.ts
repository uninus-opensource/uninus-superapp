import { Injectable, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { PrismaService } from "@uninus/api/services";
import { errorMappings } from "@uninus/api/utilities";
import {
  ISelectRequest,
  TAcademicStaffResponse,
  TEmployeePaginationArgs,
  TEmployeeParamsResponse,
  TEmployeesResponse,
  TLecturerResponse,
  TTotalEmployeesResponse,
} from "@uninus/entities";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
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

  async getLecturer(payload: { id: string }): Promise<TLecturerResponse> {
    try {
      const { id } = payload;
      const lecturer = await this.prisma.lecturers.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          employee: {
            select: {
              user: {
                select: {
                  fullname: true,
                },
              },
              nip: true,
              nidn: true,
              nik: true,
              addition_task: true,
              gender: {
                select: {
                  name: true,
                },
              },
              employee_has_workunit: {
                select: {
                  work_unit: {
                    select: {
                      id: true,
                      name: true,
                      work_unit_category: {
                        select: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
              employee_document: {
                select: {
                  name: true,
                },
              },
            },
          },
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
          lecturer_position: {
            select: {
              name: true,
              civil_service: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          lecturer_type: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!lecturer) {
        throw new NotFoundException("Dosen tidak ditemukan");
      }

      return {
        id,
        fullname: lecturer.employee.user.fullname,
        nip: lecturer.employee.nip,
        nidn: lecturer.employee.nidn,
        nik: lecturer.employee.nik,
        gender: lecturer.employee.gender.name,
        addition_task: lecturer.employee.addition_task,
        lecturer_type: lecturer.lecturer_type.name,
        lecturer_position: lecturer.lecturer_position.name,
        civil_service_level: lecturer.lecturer_position.civil_service?.name,
        employee_work_unit: lecturer.employee.employee_has_workunit?.map((el) => ({
          id: el.work_unit.id,
          name: el.work_unit.name,
          work_unit_category: el.work_unit.work_unit_category.name,
        })),
        lecturer_faculty_department: lecturer.lecturer_faculty_department?.map((el) => ({
          id: el.department.id,
          department: el.department.name,
          faculty: el.faculty.name,
        })),
        employee_document: lecturer.employee.employee_document?.map((el) => ({
          name: el.name,
        })),
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getAcademicStaff(payload: { id: string }): Promise<TAcademicStaffResponse> {
    try {
      const { id } = payload;
      const academicStaff = await this.prisma.academicStaff.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          employee: {
            select: {
              user: {
                select: {
                  fullname: true,
                },
              },
              nip: true,
              nik: true,
              gender: {
                select: {
                  name: true,
                },
              },
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
              employee_document: {
                select: {
                  name: true,
                },
              },
            },
          },
          academic_staff_type: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!academicStaff) {
        throw new NotFoundException("Tendik tidak ditemukan");
      }

      return {
        id: academicStaff.id,
        fullname: academicStaff.employee.user.fullname,
        nip: academicStaff.employee.nip,
        nik: academicStaff.employee.nik,
        gender: academicStaff.employee.gender.name,
        academic_staff_type: academicStaff.academic_staff_type.name,
        employee_work_unit: academicStaff.employee.employee_has_workunit.map((el) => ({
          name: el.work_unit.name,
          work_unit_category: el.work_unit.work_unit_category.name,
        })),
        employee_document: academicStaff.employee.employee_document.map((el) => ({
          name: el.name,
        })),
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getCategories({ search, id }: ISelectRequest): Promise<TEmployeeParamsResponse> {
    try {
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
        throw new NotFoundException("Data tidak ditemukan");
      }
      return employeeCategories;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getEmployeeTypes({ search, id }: ISelectRequest): Promise<TEmployeeParamsResponse> {
    try {
      const employeeTypes = await this.prisma.employeeType.findMany({
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
      if (!employeeTypes) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return employeeTypes;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getEmployeeStatus({ id, search }: ISelectRequest): Promise<TEmployeeParamsResponse> {
    try {
      const employeeStatus = await this.prisma.employeeStatus.findMany({
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
      if (!employeeStatus) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return employeeStatus;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getLecturerTypes({ search, id }: ISelectRequest): Promise<TEmployeeParamsResponse> {
    try {
      const lecturerTypes = await this.prisma.lecturerType.findMany({
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
      if (!lecturerTypes) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return lecturerTypes;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getLecturerPositions({ search, id }: ISelectRequest): Promise<TEmployeeParamsResponse> {
    try {
      const lecturerPositions = await this.prisma.lecturerPosition.findMany({
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
      if (!lecturerPositions) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return lecturerPositions;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getAcademicStaffTypes({ search, id }: ISelectRequest): Promise<TEmployeeParamsResponse> {
    try {
      const academicStaffTypes = await this.prisma.academicStaffType.findMany({
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
      if (!academicStaffTypes) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return academicStaffTypes;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getAcademicStaffPositions({
    search,
    id,
  }: ISelectRequest): Promise<TEmployeeParamsResponse> {
    try {
      const academicStaffPositions = await this.prisma.academicStaffPosition.findMany({
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
      if (!academicStaffPositions) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return academicStaffPositions;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getWorkUnitCategories({ search, id }: ISelectRequest): Promise<TEmployeeParamsResponse> {
    try {
      const workUnitCategories = await this.prisma.workUnitCategory.findMany({
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
      if (!workUnitCategories) {
        throw new NotFoundException("Data tidak ditemukan");
      }
      return workUnitCategories;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getWorkUnit({ search, id }: ISelectRequest): Promise<TEmployeeParamsResponse> {
    try {
      const workUnit = await this.prisma.workUnit.findMany({
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
