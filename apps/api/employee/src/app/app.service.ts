import { Injectable } from "@nestjs/common";
import { PrismaService } from "@uninus/api/models";
import { paginate } from "@uninus/api/utilities";
import { TEmployeesResponse, TPaginationArgs, TTotalEmployeesResponse } from "@uninus/entities";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getEmployees({ where, orderBy, page, perPage }: TPaginationArgs) {
    const response = await paginate(
      this.prisma.employees,
      {
        where,
        select: {
          id: true,
          nip: true,
          nidn: true,
          birth_date: true,
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
          education: {
            select: {
              name: true,
            },
          },
          academin_position: {
            select: {
              name: true,
            },
          },
          position: {
            select: {
              name: true,
            },
          },
          work_unit: {
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
    // Modify the data to flatten nested properties
    const data = (response.data as Array<TEmployeesResponse>).map((item: any) => {
      return {
        id: item.id || null,
        nip: item.nip || null,
        nidn: item.nidn || null,
        birth_date: item.birth_date || null,
        faculty: item.faculty?.name || null,
        department: item.department?.name || null,
        education: item.education?.name || null,
        academin_position: item.academin_position?.name || null,
        position: item.position?.name || null,
        work_unit: item.work_unit?.name || null,
      };
    });

    return {
      data: data,
      meta: {
        total: response.meta.total,
        lastPage: response.meta.lastPage,
        currentPage: response.meta.currentPage,
        perPage: response.meta.perPage,
        prev: response.meta.prev,
        next: response.meta.next,
      },
    };
  }

  async getTotalEmployees(): Promise<TTotalEmployeesResponse> {
    try {
      const today = new Date();
      const retireAge = new Date(today.getFullYear() - 60, today.getMonth(), today.getDate());
      const [total_employees, total_lecturer, total_academic_staff, total_employee_retired] =
        await Promise.all([
          this.prisma.employees.count(),
          this.prisma.employees.count({
            where: {
              position: {
                position_category_id: 1,
              },
            },
          }),
          this.prisma.employees.count({
            where: {
              position: {
                position_category_id: 2,
              },
            },
          }),
          this.prisma.employees.count({
            // where: {
            //   birth_date: {
            //     lte: retireAge.toISOString(),
            //   },
            // },
          }),
        ]);
      return {
        total_employees: total_employees,
        total_lecturer: total_lecturer,
        total_academic_staff: total_academic_staff,
        total_employee_retired: null, // total_employee_retired,
      };
    } catch (error) {
      return {
        message: "Failed to get total employees!",
      };
    }
  }
}
