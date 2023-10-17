import { Injectable } from "@nestjs/common";
import { PrismaService } from "@uninus/api/services";
import { TFinanceSummaryRequest, TFinanceSummaryResponse } from "@uninus/entities";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getFinanceSummary({
    filter,
    range,
  }: TFinanceSummaryRequest): Promise<TFinanceSummaryResponse> {
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    console.log(filter, range);
    const [
      data,
      total_student,
      additions_total_student,
      student_with_scholarship,
      additions_student_scholarship,
      paids,
      additions_paids,
      installment_payment,
      additions_installment_payment,
      unpaids,
      additions_unpaids,
    ] = await Promise.all([
      this.prisma.students.findMany({}),
      this.prisma.students.count({
        where: {
          user: {
            role_id: 2,
          },
        },
      }),
      this.prisma.students.count({
        where: {
          user: {
            role_id: 2,
          },
          createdAt: {
            gte: currentDate,
            lt: nextDate,
          },
        },
      }),
      this.prisma.students.count({
        where: {
          NOT: {
            scholarship_id: null,
          },
        },
      }),
      this.prisma.students.count({
        where: {
          NOT: {
            scholarship_id: null,
          },
          createdAt: {
            gte: currentDate,
            lt: nextDate,
          },
        },
      }),
      this.prisma.students.count({
        where: {
          NOT: {
            payment_history: {
              some: {
                payment_obligation: {
                  name: "Ukt",
                },
              },
            },
          },
        },
      }),
      this.prisma.students.count({
        where: {
          NOT: {
            payment_history: {
              some: {
                payment_obligation: {
                  name: "Ukt",
                },
              },
            },
          },
          createdAt: {
            gte: currentDate,
            lt: nextDate,
          },
        },
      }),
      this.prisma.students.count({
        where: {
          payment_history: {
            some: {
              payment_type: {
                name: "Cicil",
              },
              payment_obligation: {
                name: "Ukt",
              },
            },
          },
        },
      }),
      this.prisma.students.count({
        where: {
          payment_history: {
            some: {
              payment_type: {
                name: "Cicil",
              },
              payment_obligation: {
                name: "Ukt",
              },
            },
          },
          createdAt: {
            gte: currentDate,
            lt: nextDate,
          },
        },
      }),
      this.prisma.students.count({
        where: {
          payment_history: {
            none: {},
          },
        },
      }),
      this.prisma.students.count({
        where: {
          payment_history: {
            none: {},
          },
          createdAt: {
            gte: currentDate,
            lt: nextDate,
          },
        },
      }),
    ]);
    return {
      data,
      summary: {
        total_student,
        additions_total_student,
        student_with_scholarship,
        additions_student_scholarship,
        paids,
        additions_paids,
        installment_payment,
        additions_installment_payment,
        unpaids,
        additions_unpaids,
      },
    };
  }
}
