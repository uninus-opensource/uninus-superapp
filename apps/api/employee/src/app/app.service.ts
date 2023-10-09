import { Injectable, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { PrismaService } from "@uninus/api/models";
import {
  TAcademicStaffResponse,
  TEmployeePaginationArgs,
  TEmployeesResponse,
  TTotalEmployeesResponse,
} from "@uninus/entities";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getEmployees({
    type,
    where,
    orderBy,
    page = 1,
    perPage = 10,
  }: TEmployeePaginationArgs): Promise<TEmployeesResponse> {
    const skip = Number(page > 0 ? perPage * (page - 1) : 0);
    const take = Number(perPage ?? 10);

    const [data, total] = await Promise.all([
      this.prisma.employees.findMany({
        take,
        skip,
        where,
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
                    lecturer_position: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              }
            : {}),
          employee_has_education: {
            select: {
              education: {
                select: {
                  id: true,
                  name: true,
                },
              },
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
          employee_status: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy,
      }),
      this.prisma.employees.count({
        where,
      }),
    ]);

    const lastPage = Math.ceil(total / perPage);

    const mappedData = data?.map((el) => ({
      fullname: el.user.fullname,
      nip: el.nip,
      nidn: el.nidn,
      faculty: el.lecturers.lecturer_faculty_department?.map((el) => ({
        id: el.faculty.id,
        name: el.faculty.name,
      })),
      department: el.lecturers.lecturer_faculty_department?.map((el) => ({
        id: el.department.id,
        name: el.department.name,
      })),
      employee_category: el.employee_has_category?.map((el) => ({
        id: el.employee_category.id,
        name: el.employee_category.name,
      })),
      employee_education: el.employee_has_education?.map((el) => ({
        id: el.education.id,
        name: el.education.name,
      })),
      employee_workunit: el.employee_has_workunit?.map((el) => ({
        id: el.work_unit.id,
        name: el.work_unit.name,
        category_id: el.work_unit.work_unit_category.id,
        category: el.work_unit.work_unit_category.name,
      })),
      employee_status: el.employee_status.name,
    }));

    return {
      data: mappedData,
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
            lecturer_status_id: 1,
          },
        }),
        this.prisma.lecturers.count({
          where: {
            lecturer_status_id: 2,
          },
        }),
        this.prisma.lecturers.count({
          where: {
            lecturer_status_id: 3,
          },
        }),
        this.prisma.academicStaff.count({
          where: {
            academic_status_id: 1,
          },
        }),
        this.prisma.academicStaff.count({
          where: {
            academic_status_id: 2,
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

  async getLecturer(id: string) {
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
        lecturer_status: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!lecturer) {
      throw new RpcException(new NotFoundException("Dosen tidak ditemukan"));
    }

    return {
      id,
      fullname: lecturer.employee.user.fullname,
      nip: lecturer.employee.nip,
      nidn: lecturer.employee.nidn,
      nik: lecturer.employee.nik,
      addition_task: lecturer.employee.addition_task,
      lecturer_status: lecturer.lecturer_status.name,
      lecturer_position: lecturer.lecturer_position.name,
      civil_service_level: lecturer.lecturer_position.civil_service?.name,
      employee_work_unit: lecturer.employee.employee_has_workunit.map((el) => ({
        id: el.work_unit.id,
        name: el.work_unit.name,
        work_unit_category: el.work_unit.work_unit_category.name,
      })),
      lecturer_faculty_department: lecturer.lecturer_faculty_department.map((el) => ({
        id: el.department.id,
        department: el.department.name,
        faculty: el.faculty.name,
      })),
    };
  }

  async getAcademicStaff(id: string): Promise<TAcademicStaffResponse> {
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
        academic_status: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!academicStaff) {
      throw new RpcException(new NotFoundException("Tendik tidak ditemukan"));
    }

    return {
      id: academicStaff.id,
      fullname: academicStaff.employee.user.fullname,
      nip: academicStaff.employee.nip,
      nik: academicStaff.employee.nik,
      gender: academicStaff.employee.gender.name,
      academic_status: academicStaff.academic_status.name,
      employee_work_unit: academicStaff.employee.employee_has_workunit.map((el) => ({
        name: el.work_unit.name,
        work_unit_category: el.work_unit.work_unit_category.name,
      })),
      employee_document: academicStaff.employee.employee_document.map((el) => ({
        name: el.name,
      })),
    };
  }
}
