import { HttpService } from "@nestjs/axios";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { PrismaService } from "@uninus/api/services";
import { ConfigService } from "@nestjs/config";
import { AxiosRequestConfig } from "axios";
import { createSignature, errorMappings, splitFullname } from "@uninus/api/utilities";
import { firstValueFrom, map } from "rxjs";
import {
  TFinanceSummaryRequest,
  TFinanceSummaryResponse,
  TCreatePaymentRequest,
  TCreatePaymentResponse,
  TStatusPaymentRequest,
  TStatusPaymentResponse,
  EFilterGraph,
  TPaymentCallbackRequest,
  TPaymentCallbackHeaders,
  TPaymentCallbackResponse,
} from "@uninus/entities";
import * as schema from "@uninus/api/models";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject("drizzle") private drizzle: NodePgDatabase<typeof schema>,
  ) {}
  private apiRequest = this.configService.getOrThrow("PAYMENT_API_REQUEST");
  private apiStatus = this.configService.getOrThrow("PAYMENT_API_STATUS");
  private apiKey = this.configService.getOrThrow("PAYMENT_API_KEY");
  private merchantId = this.configService.getOrThrow("PAYMENT_MERCHANT_ID");
  private config: AxiosRequestConfig = {
    headers: {
      Authorization: `Basic ${btoa(this.merchantId)}`,
    },
  };
  async getFinanceSummary({
    filter,
    start_date,
    end_date,
  }: TFinanceSummaryRequest): Promise<TFinanceSummaryResponse> {
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    const data: TFinanceSummaryResponse["data"] = [];

    try {
      switch (filter) {
        case EFilterGraph.DAILY: {
          const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

          const dayStart = new Date(startDate);
          while (dayStart <= endDate) {
            const dayEnd = new Date(dayStart);
            dayEnd.setDate(dayStart.getDate() + 1);

            if (dayStart.getDay() >= 1 && dayStart.getDay() <= 7) {
              const [total_student, paid, unpaid, installment_payment] = await Promise.all([
                this.prisma.students.count({
                  where: {
                    user: {
                      role_id: 2,
                    },
                    createdAt: {
                      gte: dayStart,
                      lt: dayEnd,
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
                      gte: dayStart,
                      lt: dayEnd,
                    },
                  },
                }),
                this.prisma.students.count({
                  where: {
                    payment_history: {
                      none: {},
                    },
                    createdAt: {
                      gte: dayStart,
                      lt: dayEnd,
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
                      gte: dayStart,
                      lt: dayEnd,
                    },
                  },
                }),
              ]);

              const dayStartFormatted = dayStart.toISOString().split("T")[0];
              const dayLabel = dayStartFormatted;

              const daily = {
                label: dayLabel,
                total_student: total_student,
                paid: paid,
                unpaid: unpaid,
                installment_payment: installment_payment,
              };

              data.push(daily);
            }

            dayStart.setDate(dayStart.getDate() + 1); // Pindah ke hari berikutnya
          }
          break;
        }
        case EFilterGraph.WEEKLY: {
          const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Mulai dari tanggal 1 bulan berjalan
          const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // Akhir bulan berjalan

          const weekStart = new Date(startDate);
          weekStart.setDate(startDate.getDate() - startDate.getDay() + 1); // Mulai dari Senin minggu pertama bulan ini

          while (weekStart <= endDate) {
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6); // Menggeser ke hari Minggu dalam minggu saat ini

            const [total_student, paid, unpaid, installment_payment] = await Promise.all([
              this.prisma.students.count({
                where: {
                  user: {
                    role_id: 2,
                  },
                  createdAt: {
                    gte: weekStart,
                    lt: weekEnd,
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
                    gte: weekStart,
                    lt: weekEnd,
                  },
                },
              }),
              this.prisma.students.count({
                where: {
                  payment_history: {
                    none: {},
                  },
                  createdAt: {
                    gte: weekStart,
                    lt: weekEnd,
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
                    gte: weekStart,
                    lt: weekEnd,
                  },
                },
              }),
            ]);

            const weekStartFormatted = weekStart.toISOString().split("T")[0];
            const weekEndFormatted = weekEnd.toISOString().split("T")[0];
            const weekLabel = `${weekStartFormatted} - ${weekEndFormatted}`;

            const weekly = {
              label: weekLabel,
              total_student: total_student,
              paid: paid,
              unpaid: unpaid,
              installment_payment: installment_payment,
            };

            data.push(weekly);

            weekStart.setDate(weekStart.getDate() + 7); // Pindah ke minggu berikutnya
          }
          break;
        }
        case EFilterGraph.MONTHLY: {
          const monthNames = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
          ];
          const currentYear = currentDate.getFullYear();

          for (let i = 0; i < 12; i++) {
            const currentMonth = new Date(Date.UTC(currentYear, i, 1, 0, 0, 0, 0));
            const nextMonth = new Date(Date.UTC(currentYear, i + 1, 0, 23, 59, 59, 999));

            const [total_student, paid, unpaid, installment_payment] = await Promise.all([
              this.prisma.students.count({
                where: {
                  user: {
                    role_id: 2,
                  },
                  createdAt: {
                    gte: currentMonth,
                    lt: nextMonth,
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
                    gte: currentMonth,
                    lt: nextMonth,
                  },
                },
              }),
              this.prisma.students.count({
                where: {
                  payment_history: {
                    none: {},
                  },
                  createdAt: {
                    gte: currentMonth,
                    lt: nextMonth,
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
                    gte: currentMonth,
                    lt: nextMonth,
                  },
                },
              }),
            ]);

            const monthly = {
              label: monthNames[i],
              total_student: total_student,
              paid: paid,
              unpaid: unpaid,
              installment_payment: installment_payment,
            };

            data.push(monthly);
          }
          break;
        }
        case EFilterGraph.YEARLY: {
          const currentYear = currentDate.getFullYear();
          const yearlyData = [];

          for (let i = 5; i >= 0; i--) {
            const yearStart = new Date(Date.UTC(currentYear - i, 0, 1, 0, 0, 0, 0));
            const yearEnd = new Date(Date.UTC(currentYear - i, 11, 31, 23, 59, 59, 999));

            const [total_student, paid, unpaid, installment_payment] = await Promise.all([
              this.prisma.students.count({
                where: {
                  user: {
                    role_id: 2,
                  },
                  createdAt: {
                    gte: yearStart,
                    lt: yearEnd,
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
                    gte: yearStart,
                    lt: yearEnd,
                  },
                },
              }),
              this.prisma.students.count({
                where: {
                  payment_history: {
                    none: {},
                  },
                  createdAt: {
                    gte: yearStart,
                    lt: yearEnd,
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
                    gte: yearStart,
                    lt: yearEnd,
                  },
                },
              }),
            ]);

            const yearly = {
              label: String(yearStart.getUTCFullYear()), // Konversi tahun ke string
              total_student: total_student,
              paid: paid,
              unpaid: unpaid,
              installment_payment: installment_payment,
            };

            yearlyData.push(yearly);
          }

          data.push(yearlyData);
          break;
        }
        case EFilterGraph.RANGE: {
          const dateStart = new Date(start_date);
          const dateEnd = new Date(end_date);
          const dataRange = [];

          if (dateStart > dateEnd) {
            throw new BadRequestException("Tanggal awal tidak boleh setelah tanggal akhir.");
          }

          while (dateStart <= dateEnd) {
            const currentDateStart = new Date(dateStart);
            const currentDateEnd = new Date(currentDateStart);
            currentDateEnd.setHours(23, 59, 59, 999);

            const [total_student, paid, unpaid, installment_payment] = await Promise.all([
              this.prisma.students.count({
                where: {
                  user: {
                    role_id: 2,
                  },
                  createdAt: {
                    gte: currentDateStart,
                    lt: currentDateEnd,
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
                    gte: currentDateStart,
                    lt: currentDateEnd,
                  },
                },
              }),
              this.prisma.students.count({
                where: {
                  payment_history: {
                    none: {},
                  },
                  createdAt: {
                    gte: currentDateStart,
                    lt: currentDateEnd,
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
                    gte: currentDateStart,
                    lt: currentDateEnd,
                  },
                },
              }),
            ]);

            const rangeData = {
              label: currentDateStart.toISOString().split("T")[0],
              total_student: total_student,
              paid: paid,
              unpaid: unpaid,
              installment_payment: installment_payment,
            };

            dataRange.push(rangeData);

            dateStart.setDate(dateStart.getDate() + 1);
          }

          data.push(dataRange);
          break;
        }
        default:
          throw new BadRequestException("Filter Tidak Valid");
      }
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
    try {
      const [
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
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async createPayment(payload: TCreatePaymentRequest): Promise<TCreatePaymentResponse> {
    try {
      const { userId, payment_obligation_id } = payload;

      const [student, getPaymentObligations] = await Promise.all([
        this.drizzle
          .select({
            studentId: schema.students.id,
            fullname: schema.users.fullname,
            email: schema.users.email,
            phoneNumber: schema.students.phoneNumber,
          })
          .from(schema.users)
          .leftJoin(schema.students, eq(schema.users.id, schema.students.userId))
          .where(eq(schema.users.id, userId))
          .limit(1)
          .then((res) => res.at(0)),
        this.drizzle
          .select({
            name: schema.paymentObligations.name,
            amount: schema.paymentObligations.amount,
          })
          .from(schema.paymentObligations)
          .where(eq(schema.paymentObligations.id, String(payment_obligation_id)))
          .limit(1)
          .then((res) => res.at(0)),
      ]);

      if (!student) {
        throw new BadRequestException("User tidak ditemukan");
      }
      if (!getPaymentObligations) {
        throw new BadRequestException("Pembayaran tidak ditemukan");
      }
      const { firstName, lastName } = splitFullname(student?.fullname);
      const timeStamp = Math.floor(Date.now() / 1000);

      const data = {
        customerDetails: {
          email: student?.email,
          firstName,
          lastName,
          phone: student?.phoneNumber,
        },
        transactionDetails: {
          amount: getPaymentObligations?.amount,
          currency: "IDR",
          orderId: String(`${getPaymentObligations?.name}-${timeStamp}`),
          expiryDuration: "2m",
        },
      };
      this.config.baseURL = this.apiRequest;
      this.config.headers.Timestamp = timeStamp;
      this.config.headers.Signature = await createSignature(
        JSON.stringify(data),
        timeStamp,
        this.apiKey,
      );

      const [updateStudent, createPayment] = await Promise.all([
        this.drizzle.insert(schema.paymentHistory).values({
          orderId: String(`${getPaymentObligations?.name}-${timeStamp}`),
          paymentObligationId: String(payment_obligation_id),
          studentId: student?.studentId,
        }),
        firstValueFrom(
          this.httpService
            .post("/payment-services/v2.1.0/api/token", data, this.config)
            .pipe(map((resp) => resp.data)),
        ).catch((error) => {
          throw new BadRequestException(error?.response?.statusText);
        }),
      ]);

      if (!updateStudent) {
        throw new BadRequestException("Gagal membuat transaksi");
      }
      return createPayment;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async statusPayment(payload: TStatusPaymentRequest): Promise<TStatusPaymentResponse> {
    try {
      const { order_id, userId } = payload;
      const timeStamp = new Date().getTime();
      const data = { trxRef: order_id };
      this.config.baseURL = this.apiStatus;
      this.config.headers.Timestamp = timeStamp;
      this.config.headers.Signature = await createSignature(
        JSON.stringify(data),
        timeStamp,
        this.apiKey,
      );
      const [statusPayment, dataStudent, registrationStatus] = await Promise.all([
        firstValueFrom(
          this.httpService
            .post("/sp/service/v3.0.0/api/checkstatus", data, this.config)
            .pipe(map((resp) => resp.data)),
        ).catch((error) => {
          throw new BadRequestException(error.response.statusText);
        }),
        this.drizzle
          .select({
            studentId: schema.students.id,
            selectionPath: schema.selectionPath.name,
          })
          .from(schema.users)
          .leftJoin(schema.students, eq(schema.users.id, schema.students.userId))
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(
            schema.selectionPath,
            eq(schema.admission.selectionPathId, schema.selectionPath.id),
          )
          .where(eq(schema.users.id, userId))
          .limit(1)
          .then((res) => res.at(0)),
        this.drizzle
          .select({
            id: schema.registrationStatus.id,
            name: schema.registrationStatus.name,
          })
          .from(schema.registrationStatus),
      ]);

      const { transactionStatusCode: status, vaBank, vaNumber, paymentMethod } = statusPayment;

      if (!statusPayment?.status) {
        throw new BadRequestException(statusPayment?.responseDesc);
      }

      if (status == "S") {
        const updatePayment = await Promise.all([
          this.drizzle.update(schema.paymentHistory).set({
            paymentBank: vaBank,
            paymentCode: vaNumber,
            paymentMethod: paymentMethod,
            isPaid: true,
          }),
          this.drizzle
            .update(schema.admission)
            .set({
              registrationStatusId:
                dataStudent?.selectionPath === "seleksi test"
                  ? registrationStatus.filter(
                      (el) => el.name.toLocaleLowerCase() === "belum mengikuti test" && el,
                    )[0].id
                  : registrationStatus.filter(
                      (el) => el.name.toLocaleLowerCase() === "proses seleksi" && el,
                    )[0].id,
            })
            .where(eq(schema.students.id, dataStudent?.studentId)),
        ]);

        if (!updatePayment) {
          throw new BadRequestException("Gagal update status pembayaran");
        }
        return {
          message: "Pembayaran Berhasil",
        };
      }
      return {
        message:
          status == "EX"
            ? "Pembayaran telah expired"
            : status == "CL"
              ? "Pembayaran dibatalkan"
              : status == "FL"
                ? "Pembayaran ditolak"
                : status == "N" && "Pembayaran sedang diproses",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async financeCallback(
    payload: TPaymentCallbackRequest & TPaymentCallbackHeaders,
  ): Promise<TPaymentCallbackResponse> {
    try {
      const { timestamp, signature, authorization, ...data } = payload;
      const { bankName, trxRef, userId, responseCode, responseDescription, transactionType } = data;
      const auth = authorization.split(" ")[1];
      const localSiganture = await createSignature(
        JSON.stringify(data),
        Number(timestamp),
        this.apiKey,
      );

      if (!auth && btoa(this.merchantId) !== atob(auth).replace(":", "")) {
        return {
          responseCode: "25",
          responseDescription: "Request MerchantId and Authentication Invalid",
        };
      }

      if (signature !== localSiganture) {
        return {
          responseCode: "27",
          responseDescription: "Invalid Signature",
        };
      }
      if (responseCode == "41" || responseDescription == "Transaction Expired") {
        const deletePayment = await this.prisma.paymentHistory.delete({
          where: {
            order_id: trxRef,
          },
        });

        if (!deletePayment) {
          return {
            responseCode: "40",
            responseDescription: "Data Cannot Be Updated",
          };
        }
        return {
          responseCode: "00",
          responseDescription: "Success",
        };
      }
      const getDataStudent = await this.prisma.students.findUnique({
        where: {
          phone_number: userId,
        },
        select: {
          pmb: {
            select: {
              selection_path: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      const {
        pmb: { selection_path },
      } = getDataStudent;

      const updatePayment = await this.prisma.students.update({
        where: {
          phone_number: userId,
        },
        data: {
          pmb: {
            update: {
              ...(selection_path?.name.toLowerCase() == "seleksi test"
                ? {
                    registration_status_id: 7,
                  }
                : {
                    registration_status_id: 4,
                  }),
            },
          },
          payment_history: {
            update: {
              where: {
                order_id: trxRef,
              },
              data: {
                payment_bank: bankName,
                payment_type_id: 1,
                isPaid: true,
                payment_method:
                  transactionType == 1
                    ? "Debit/Credit"
                    : transactionType == 2
                      ? "QRIS"
                      : transactionType == 3
                        ? "EMoney"
                        : transactionType == 4 && "VA",
              },
            },
          },
        },
      });

      if (!updatePayment) {
        return {
          responseCode: "40",
          responseDescription: "Data Cannot Be Updated",
        };
      }

      return {
        responseCode: "00",
        responseDescription: "Success",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
}
