import { Injectable } from "@nestjs/common";
import { PrismaService } from "@uninus/api/models";
import { paginate } from "@uninus/api/utilities";
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
    page,
    perPage,
  }: TEmployeePaginationArgs): Promise<TEmployeesResponse> {
    const { data, meta } = await paginate(
      this.prisma.employees,
      {
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
      },
      {
        page,
        perPage,
      },
    );

    return {
      data,
      meta,
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
