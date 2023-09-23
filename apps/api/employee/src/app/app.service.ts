import { Injectable } from "@nestjs/common";
import { PrismaService } from "@uninus/api/models";
import {
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
    const [data, total] = await Promise.all([
      this.prisma.employees.findMany({
        ...(perPage && { take: Number(perPage ?? 10) }),
        ...(page && { skip: Number(page > 0 ? perPage * (page - 1) : 0) }),
        where,
        select: {
          user: {
            select: {
              fullname: true,
            },
          },
          nip: true,
          nidn: true,
          birth_date: true,
          employee_has_category: {
            select: {
              employee_category: {
                select: {
                  name: true,
                },
              },
            },
          },
          ...(type == 1
            ? {
                lecturers: {
                  select: {
                    faculty: {
                      select: {
                        name: true,
                      },
                    },
                    department: {
                      select: {
                        name: true,
                      },
                    },
                    lecturer_position: {
                      select: {
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
                  name: true,
                },
              },
            },
          },
          employee_has_workunit: {
            select: {
              work_unit: {
                select: {
                  name: true,
                },
              },
            },
          },
          employee_status: {
            select: {
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

  async getTotalEmployees(): Promise<TTotalEmployeesResponse> {
    try {
      const [total_employees, total_lecturer, total_academic_staff, total_retired_employee] =
        await Promise.all([
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
              employee_status_id: 4,
            },
          }),
        ]);
      return {
        total_employees: total_employees,
        total_lecturer: total_lecturer,
        total_academic_staff: total_academic_staff,
        total_retired_employee: total_retired_employee,
      };
    } catch (error) {
      return {
        message: "Failed to get total employees!",
      };
    }
  }
}
