import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { errorMappings } from "@uninus/api/utilities";
import {
  TSelectionResponse,
  ISelectRequest,
  TScholarshipResponse,
  TCreateQuestionRequest,
  TUpdateQuestionRequest,
  TDeleteQuestionResponse,
  ISelectionRequest,
  IRegistransRequest,
  IInterestEducationPrograms,
  EFilterTypeTotalRegistrans,
  TInterestEducationPrograms,
  EFilterTypeInterestProgram,
  EFilterTypeStudyProgramInterest,
  TRegistrationStatusResponse,
  IInterestDepartment,
  TInterestDepartmentResponse,
  TCreateSelectionPathRequest,
  TGeneralResponse,
  TCreateScholarshipRequest,
  TRegistrationPathResponse,
  TQuestionResponse,
  TTotalRegistransRes,
  TUpdateScholarshipRequest,
  TUpdateSelectionPathRequest,
} from "@uninus/entities";
import * as schema from "@uninus/api/models";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { and, eq, gte, ilike, lte, isNull, isNotNull } from "drizzle-orm";
@Injectable()
export class PMBService {
  constructor(@Inject("drizzle") private drizzle: NodePgDatabase<typeof schema>) {}

  async getScholarship(payload: ISelectRequest): Promise<TScholarshipResponse> {
    try {
      const { search } = payload;
      const scholarship = await this.drizzle
        .select({
          id: schema.scholarship.id,
          name: schema.scholarship.name,
          discount: schema.scholarship.discount,
        })
        .from(schema.scholarship)
        .where(ilike(schema.scholarship.name, `%${search || ""}%`));

      if (!scholarship) {
        throw new NotFoundException("Data Beasiswa Tidak Ditemukan!");
      }

      return scholarship;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async createScholarship(payload: TCreateScholarshipRequest): Promise<TGeneralResponse> {
    try {
      const newScholarship = await this.drizzle.insert(schema.scholarship).values({
        name: payload.name,
        discount: payload.discount,
      });

      if (!newScholarship) {
        throw new BadRequestException("Gagal menambahkan gagal beasiswa baru");
      }

      return {
        message: "Berhasil menambahkan beasiswa baru",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async updateScholarship(payload: TUpdateScholarshipRequest): Promise<TGeneralResponse> {
    try {
      const updateScholarship = await this.drizzle
        .update(schema.scholarship)
        .set({
          name: payload.name,
        })
        .where(eq(schema.scholarship.id, payload.id));

      if (!updateScholarship) {
        throw new BadRequestException("Gagal memperbarui Beasiswa");
      }

      return {
        message: "Berhasil memperbarui data beasiswa",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async deleteScholarship(payload: { id: string }): Promise<TGeneralResponse> {
    try {
      const deleteScholarship = await this.drizzle
        .delete(schema.scholarship)
        .where(eq(schema.scholarship.id, payload.id));

      if (!deleteScholarship) {
        throw new BadRequestException(`Gagal menghapus beasiswa`);
      }

      return {
        message: `Berhasil menghapus beasiswa `,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getSelectionPath(payload: ISelectionRequest): Promise<TSelectionResponse> {
    try {
      const {
        search,

        degreeProgramId,
      } = payload;
      const selection = await this.drizzle
        .select({
          id: schema.selectionPath.id,
          name: schema.selectionPath.name,
        })
        .from(schema.selectionPath)
        .where(
          and(
            and(
              ilike(schema.selectionPath.name, `%${search || ""}%`),
              ilike(schema.selectionPath.degreeProgramId, `%${degreeProgramId || ""}%`),
            ),
          ),
        );
      if (!selection) {
        throw new NotFoundException("Data Jalur Seleksi Tidak Ditemukan!");
      }

      return selection;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getRegistrationPath(payload: ISelectionRequest): Promise<TRegistrationPathResponse> {
    try {
      const { search } = payload;
      const registrationPath = await this.drizzle
        .select({
          id: schema.registrationPath.id,
          name: schema.registrationPath.name,
        })
        .from(schema.registrationPath)
        .where(ilike(schema.registrationPath.name, `%${search || ""}%`));

      if (!registrationPath) {
        throw new NotFoundException("Data Jalur Seleksi Tidak Ditemukan!");
      }

      return registrationPath;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async createSelectionPath(payload: TCreateSelectionPathRequest): Promise<TGeneralResponse> {
    try {
      const newSelectionPath = await this.drizzle.insert(schema.selectionPath).values({
        name: payload.name,
        degreeProgramId: payload.degreeProgramId,
      });
      if (!newSelectionPath) {
        throw new BadRequestException("Gagal menambahkan Jalur Seleksi baru");
      }

      return {
        message: "Berhasil menambahkan jalur seleksi baru",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async updateSelectionPath(payload: TUpdateSelectionPathRequest): Promise<TGeneralResponse> {
    try {
      const updatedSelectionPath = await this.drizzle
        .update(schema.selectionPath)
        .set({
          name: payload.name,
          degreeProgramId: payload.degreeProgramId,
        })
        .where(eq(schema.selectionPath.id, payload.id));

      if (!updatedSelectionPath) {
        throw new BadRequestException("Gagal memperbarui jalur seleksi");
      }

      return {
        message: "Berhasil memperbarui jalur seleksi",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async deleteSelectionPath(payload: { id: string }): Promise<TGeneralResponse> {
    try {
      const selctionPath = await this.drizzle
        .delete(schema.selectionPath)
        .where(eq(schema.selectionPath.id, payload.id));
      if (!selctionPath) {
        throw new BadRequestException(`Gagal menghapus Jalur seleksi`);
      }

      return {
        message: `Berhasil menghapus Jalur seleksi `,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getTotalRegistrans(payload: IRegistransRequest): Promise<TTotalRegistransRes> {
    try {
      const { filterType, startDate, endDate } = payload;
      // const whereClause: {
      //   createdAt?: {
      //     gte?: Date;
      //     lte?: Date;
      //   };
      // } = {};

      const responseData: TTotalRegistransRes = {
        data: [],
        summary: {
          totalRegistrans: 0,
          totalInterest: 0,
          paidsForm: 0,
          paidsUkt: 0,
          acceptedRegistrans: 0,
        },
      };

      if (filterType) {
        switch (filterType) {
          case EFilterTypeTotalRegistrans.WEEKLY: {
            const weekData: TTotalRegistransRes["data"] = [];

            for (let i = 0; i < 7; i++) {
              const currentDate = new Date();
              currentDate.setDate(currentDate.getDate() - i);
              currentDate.setUTCHours(0, 0, 0, 0);

              const [
                totalRegistrans,
                totalInterest,
                acceptedRegistrans,
                paidsFormCount,
                paidsUKTCount,
              ] = await Promise.all([
                this.drizzle
                  .select({
                    id: schema.students.id,
                  })
                  .from(schema.students)
                  .leftJoin(schema.documents, eq(schema.students.id, schema.documents.studentId))
                  .where(
                    and(
                      isNotNull(schema.documents.id),
                      gte(schema.students.createdAt, currentDate),
                      lte(
                        schema.students.createdAt,
                        new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 - 1),
                      ),
                    ),
                  )
                  .then((res) => res.length),
                this.drizzle
                  .select({
                    id: schema.students.id,
                  })
                  .from(schema.students)
                  .leftJoin(schema.documents, eq(schema.students.id, schema.documents.studentId))
                  .where(
                    and(
                      isNull(schema.documents.id),
                      gte(schema.students.createdAt, currentDate),
                      lte(
                        schema.students.createdAt,
                        new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 - 1),
                      ),
                    ),
                  )
                  .then((res) => res.length),
                this.drizzle
                  .select({
                    id: schema.students.id,
                  })
                  .from(schema.students)
                  .leftJoin(schema.admission, eq(schema.admission.studentId, schema.students.id))
                  .leftJoin(
                    schema.registrationStatus,
                    eq(schema.admission.registrationStatusId, schema.registrationStatus.id),
                  )
                  .where(
                    and(
                      gte(schema.students.createdAt, currentDate),
                      lte(
                        schema.students.createdAt,
                        new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 - 1),
                      ),
                      ilike(schema.registrationStatus.name, "%Lulus Seleksi%"),
                    ),
                  )
                  .then((res) => res.length),
                this.drizzle
                  .select({
                    id: schema.students.id,
                  })
                  .from(schema.students)
                  .leftJoin(schema.admission, eq(schema.admission.studentId, schema.students.id))
                  .leftJoin(
                    schema.registrationStatus,
                    eq(schema.admission.registrationStatusId, schema.registrationStatus.id),
                  )
                  .where(
                    and(
                      gte(schema.students.createdAt, currentDate),
                      lte(
                        schema.students.createdAt,
                        new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 - 1),
                      ),
                      ilike(schema.registrationStatus.name, "%Proses Seleksi%"),
                    ),
                  )
                  .then((res) => res.length),
                this.drizzle
                  .select({
                    id: schema.students.id,
                  })
                  .from(schema.students)
                  .leftJoin(
                    schema.paymentHistory,
                    eq(schema.paymentHistory.studentId, schema.students.id),
                  )
                  .leftJoin(
                    schema.paymentObligations,
                    eq(schema.paymentObligations.id, schema.paymentHistory.paymentObligationId),
                  )
                  .where(
                    and(
                      gte(schema.students.createdAt, currentDate),
                      lte(
                        schema.students.createdAt,
                        new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 - 1),
                      ),
                      eq(schema.paymentHistory.isPaid, true),
                      ilike(schema.paymentObligations.name, "UKT"),
                    ),
                  )
                  .then((res) => res.length),
              ]);

              const label = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
                currentDate,
              );
              const dailyStats = {
                label,
                totalRegistrans,
                totalInterest: totalInterest,
                paidsForm: paidsFormCount,
                acceptedRegistrans: acceptedRegistrans,
                paidsUkt: paidsUKTCount,
              };

              weekData.push(dailyStats);
            }

            responseData.data = weekData;

            break;
          }

          case EFilterTypeTotalRegistrans.MONTHLY: {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
            const monthData: TTotalRegistransRes["data"] = [];

            for (let i = 0; i < 12; i++) {
              const start = new Date(startOfMonth);
              start.setMonth(start.getMonth() - i);
              start.setHours(0, 0, 0, 0);
              const end = new Date(endOfMonth);
              end.setMonth(end.getMonth() - i);
              end.setHours(23, 59, 59, 999);
              const [
                totalRegistrans,
                totalInterest,
                acceptedRegistrans,
                paidsFormCount,
                paidsUKTCount,
              ] = await Promise.all([
                this.drizzle
                  .select({
                    id: schema.students.id,
                  })
                  .from(schema.students)
                  .leftJoin(schema.documents, eq(schema.students.id, schema.documents.studentId))
                  .where(
                    and(
                      isNotNull(schema.documents.id),
                      gte(schema.students.createdAt, start),
                      lte(schema.students.createdAt, end),
                    ),
                  )
                  .then((res) => res.length),
                this.drizzle
                  .select({
                    id: schema.students.id,
                  })
                  .from(schema.students)
                  .leftJoin(schema.documents, eq(schema.students.id, schema.documents.studentId))
                  .where(
                    and(
                      isNull(schema.documents.id),
                      gte(schema.students.createdAt, start),
                      lte(schema.students.createdAt, end),
                    ),
                  )
                  .then((res) => res.length),
                this.drizzle
                  .select({
                    id: schema.students.id,
                  })
                  .from(schema.students)
                  .leftJoin(schema.admission, eq(schema.admission.studentId, schema.students.id))
                  .leftJoin(
                    schema.registrationStatus,
                    eq(schema.admission.registrationStatusId, schema.registrationStatus.id),
                  )
                  .where(
                    and(
                      gte(schema.students.createdAt, start),
                      lte(schema.students.createdAt, end),
                      ilike(schema.registrationStatus.name, "%Lulus Seleksi%"),
                    ),
                  )
                  .then((res) => res.length),
                this.drizzle
                  .select({
                    id: schema.students.id,
                  })
                  .from(schema.students)
                  .leftJoin(schema.admission, eq(schema.admission.studentId, schema.students.id))
                  .leftJoin(
                    schema.registrationStatus,
                    eq(schema.admission.registrationStatusId, schema.registrationStatus.id),
                  )
                  .where(
                    and(
                      gte(schema.students.createdAt, start),
                      lte(schema.students.createdAt, end),
                      ilike(schema.registrationStatus.name, "%Proses Seleksi%"),
                    ),
                  )
                  .then((res) => res.length),
                this.drizzle
                  .select({
                    id: schema.students.id,
                  })
                  .from(schema.students)
                  .leftJoin(
                    schema.paymentHistory,
                    eq(schema.paymentHistory.studentId, schema.students.id),
                  )
                  .leftJoin(
                    schema.paymentObligations,
                    eq(schema.paymentObligations.id, schema.paymentHistory.paymentObligationId),
                  )
                  .where(
                    and(
                      gte(schema.students.createdAt, start),
                      lte(schema.students.createdAt, end),
                      eq(schema.paymentHistory.isPaid, true),
                      ilike(schema.paymentObligations.name, "UKT"),
                    ),
                  )
                  .then((res) => res.length),
              ]);

              const label = `${start.toLocaleString("default", {
                month: "long",
              })} ${start.getFullYear()}`;

              const monthlyStast = {
                label,
                totalRegistrans: totalRegistrans,
                totalInterest: totalInterest,
                paidsForm: paidsFormCount,
                acceptedRegistrans: acceptedRegistrans,
                paidsUkt: paidsUKTCount,
              };

              monthData.push(monthlyStast);
            }
            monthData.reverse();
            responseData.data = monthData;
            break;
          }

          case EFilterTypeTotalRegistrans.YEARLY: {
            const now = new Date();
            const yearData: TTotalRegistransRes["data"] = [];

            for (let i = 0; i < 5; i++) {
              const currentYear = now.getFullYear() - i;
              const currentYearStart = new Date(currentYear, 0, 1);
              const currentYearEnd = new Date(currentYear, 11, 31, 23, 59, 59, 999);

              const [
                totalRegistrans,
                totalInterest,
                acceptedRegistrans,
                paidsFormCount,
                paidsUKTCount,
              ] = await Promise.all([
                this.drizzle
                  .select({
                    id: schema.students.id,
                  })
                  .from(schema.students)
                  .leftJoin(schema.documents, eq(schema.students.id, schema.documents.studentId))
                  .where(
                    and(
                      isNotNull(schema.documents.id),
                      gte(schema.students.createdAt, currentYearStart),
                      lte(schema.students.createdAt, currentYearEnd),
                    ),
                  )
                  .then((res) => res.length),
                this.drizzle
                  .select({
                    id: schema.students.id,
                  })
                  .from(schema.students)
                  .leftJoin(schema.documents, eq(schema.students.id, schema.documents.studentId))
                  .where(
                    and(
                      isNull(schema.documents.id),
                      gte(schema.students.createdAt, currentYearStart),
                      lte(schema.students.createdAt, currentYearEnd),
                    ),
                  )
                  .then((res) => res.length),
                this.drizzle
                  .select({
                    id: schema.students.id,
                  })
                  .from(schema.students)
                  .leftJoin(schema.admission, eq(schema.admission.studentId, schema.students.id))
                  .leftJoin(
                    schema.registrationStatus,
                    eq(schema.admission.registrationStatusId, schema.registrationStatus.id),
                  )
                  .where(
                    and(
                      gte(schema.students.createdAt, currentYearStart),
                      lte(schema.students.createdAt, currentYearEnd),
                      ilike(schema.registrationStatus.name, "%Lulus Seleksi%"),
                    ),
                  )
                  .then((res) => res.length),
                this.drizzle
                  .select({
                    id: schema.students.id,
                  })
                  .from(schema.students)
                  .leftJoin(schema.admission, eq(schema.admission.studentId, schema.students.id))
                  .leftJoin(
                    schema.registrationStatus,
                    eq(schema.admission.registrationStatusId, schema.registrationStatus.id),
                  )
                  .where(
                    and(
                      gte(schema.students.createdAt, currentYearStart),
                      lte(schema.students.createdAt, currentYearEnd),
                      ilike(schema.registrationStatus.name, "%Proses Seleksi%"),
                    ),
                  )
                  .then((res) => res.length),
                this.drizzle
                  .select({
                    id: schema.students.id,
                  })
                  .from(schema.students)
                  .leftJoin(
                    schema.paymentHistory,
                    eq(schema.paymentHistory.studentId, schema.students.id),
                  )
                  .leftJoin(
                    schema.paymentObligations,
                    eq(schema.paymentObligations.id, schema.paymentHistory.paymentObligationId),
                  )
                  .where(
                    and(
                      gte(schema.students.createdAt, currentYearStart),
                      lte(schema.students.createdAt, currentYearEnd),
                      eq(schema.paymentHistory.isPaid, true),
                      ilike(schema.paymentObligations.name, "UKT"),
                    ),
                  )
                  .then((res) => res.length),
              ]);

              const label = currentYear.toString();

              const yearlyStats = {
                label,
                totalRegistrans: totalRegistrans,
                totalInterest: totalInterest,
                paidsForm: paidsFormCount,
                acceptedRegistrans: acceptedRegistrans,
                paidsUkt: paidsUKTCount,
              };

              yearData.push(yearlyStats);
            }

            responseData.data = yearData;

            break;
          }

          case EFilterTypeTotalRegistrans.RANGE: {
            if (!startDate || !endDate) {
              throw new BadRequestException(
                "start date dan end date wajib diisi ketika memilih filter range",
              );
            }

            const startOfRange = new Date(startDate);
            const endOfRange = new Date(endDate);

            const [
              totalRegistrans,
              totalInterest,
              acceptedRegistrans,
              paidsFormCount,
              paidsUKTCount,
            ] = await Promise.all([
              this.drizzle
                .select({
                  id: schema.students.id,
                })
                .from(schema.students)
                .leftJoin(schema.documents, eq(schema.students.id, schema.documents.studentId))
                .where(
                  and(
                    isNotNull(schema.documents.id),
                    gte(schema.students.createdAt, startOfRange),
                    lte(schema.students.createdAt, endOfRange),
                  ),
                )
                .then((res) => res.length),
              this.drizzle
                .select({
                  id: schema.students.id,
                })
                .from(schema.students)
                .leftJoin(schema.documents, eq(schema.students.id, schema.documents.studentId))
                .where(
                  and(
                    isNull(schema.documents.id),
                    gte(schema.students.createdAt, startOfRange),
                    lte(schema.students.createdAt, endOfRange),
                  ),
                )
                .then((res) => res.length),
              this.drizzle
                .select({
                  id: schema.students.id,
                })
                .from(schema.students)
                .leftJoin(schema.admission, eq(schema.admission.studentId, schema.students.id))
                .leftJoin(
                  schema.registrationStatus,
                  eq(schema.admission.registrationStatusId, schema.registrationStatus.id),
                )
                .where(
                  and(
                    gte(schema.students.createdAt, startOfRange),
                    lte(schema.students.createdAt, endOfRange),
                    ilike(schema.registrationStatus.name, "%Lulus Seleksi%"),
                  ),
                )
                .then((res) => res.length),
              this.drizzle
                .select({
                  id: schema.students.id,
                })
                .from(schema.students)
                .leftJoin(schema.admission, eq(schema.admission.studentId, schema.students.id))
                .leftJoin(
                  schema.registrationStatus,
                  eq(schema.admission.registrationStatusId, schema.registrationStatus.id),
                )
                .where(
                  and(
                    gte(schema.students.createdAt, startOfRange),
                    lte(schema.students.createdAt, endOfRange),
                    ilike(schema.registrationStatus.name, "%Proses Seleksi%"),
                  ),
                )
                .then((res) => res.length),
              this.drizzle
                .select({
                  id: schema.students.id,
                })
                .from(schema.students)
                .leftJoin(
                  schema.paymentHistory,
                  eq(schema.paymentHistory.studentId, schema.students.id),
                )
                .leftJoin(
                  schema.paymentObligations,
                  eq(schema.paymentObligations.id, schema.paymentHistory.paymentObligationId),
                )
                .where(
                  and(
                    gte(schema.students.createdAt, startOfRange),
                    lte(schema.students.createdAt, endOfRange),
                    eq(schema.paymentHistory.isPaid, true),
                    ilike(schema.paymentObligations.name, "UKT"),
                  ),
                )
                .then((res) => res.length),
            ]);

            const label = `Data dari ${startDate} hingga ${endDate}`;

            const rangeStats = {
              label,
              totalRegistrans: totalRegistrans,
              totalInterest: totalInterest,
              paidsForm: paidsFormCount,
              acceptedRegistrans: acceptedRegistrans,
              paidsUkt: paidsUKTCount,
            };

            responseData.data = [rangeStats];

            break;
          }

          default: {
            throw new BadRequestException("Filter Tidak Valid");
          }
        }
      }
      const [totalRegistrans, totalInterest, acceptedRegistrans, paidsFormCount, paidsUKTCount] =
        await Promise.all([
          this.drizzle
            .select({
              id: schema.students.id,
            })
            .from(schema.students)
            .leftJoin(schema.documents, eq(schema.students.id, schema.documents.studentId))
            .where(and(isNotNull(schema.documents.id)))
            .then((res) => res.length),
          this.drizzle
            .select({
              id: schema.students.id,
            })
            .from(schema.students)
            .leftJoin(schema.documents, eq(schema.students.id, schema.documents.studentId))
            .where(isNull(schema.documents.id))
            .then((res) => res.length),
          this.drizzle
            .select({
              id: schema.students.id,
            })
            .from(schema.students)
            .leftJoin(schema.admission, eq(schema.admission.studentId, schema.students.id))
            .leftJoin(
              schema.registrationStatus,
              eq(schema.admission.registrationStatusId, schema.registrationStatus.id),
            )
            .where(ilike(schema.registrationStatus.name, "%Lulus Seleksi%"))
            .then((res) => res.length),
          this.drizzle
            .select({
              id: schema.students.id,
            })
            .from(schema.students)
            .leftJoin(schema.admission, eq(schema.admission.studentId, schema.students.id))
            .leftJoin(
              schema.registrationStatus,
              eq(schema.admission.registrationStatusId, schema.registrationStatus.id),
            )
            .where(ilike(schema.registrationStatus.name, "%Proses Seleksi%"))
            .then((res) => res.length),
          this.drizzle
            .select({
              id: schema.students.id,
            })
            .from(schema.students)
            .leftJoin(
              schema.paymentHistory,
              eq(schema.paymentHistory.studentId, schema.students.id),
            )
            .leftJoin(
              schema.paymentObligations,
              eq(schema.paymentObligations.id, schema.paymentHistory.paymentObligationId),
            )
            .where(
              and(
                eq(schema.paymentHistory.isPaid, true),
                ilike(schema.paymentObligations.name, "UKT"),
              ),
            )
            .then((res) => res.length),
        ]);

      (responseData.summary.totalRegistrans = totalRegistrans),
        (responseData.summary.totalInterest = totalInterest),
        (responseData.summary.acceptedRegistrans = acceptedRegistrans),
        (responseData.summary.paidsForm = paidsFormCount),
        (responseData.summary.paidsUkt = paidsUKTCount);

      return responseData;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getInterestEducationPrograms(
    payload: IInterestEducationPrograms,
  ): Promise<TInterestEducationPrograms> {
    try {
      const { filterType } = payload;
      let whereClause: {
        createdAt?: {
          gte?: Date;
          lte?: Date;
        };
      } = {};

      if (filterType) {
        switch (filterType) {
          case EFilterTypeInterestProgram.WEEKLY: {
            const now = new Date();
            const today = now.getUTCDate();
            const weekStart = new Date(now);
            weekStart.setUTCDate(now.getUTCDate() - today);
            weekStart.setUTCHours(0, 0, 0, 0);
            const weekEnd = new Date(weekStart);
            weekEnd.setUTCDate(weekStart.getUTCDate() + 6);
            weekEnd.setUTCHours(23, 59, 59, 999);

            whereClause = {
              createdAt: {
                gte: weekStart,
                lte: weekEnd,
              },
            };

            break;
          }

          case EFilterTypeInterestProgram.MONTHLY: {
            const currentDate = new Date();
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonth = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              0,
              23,
              59,
              59,
              999,
            );

            whereClause = {
              createdAt: {
                gte: startOfMonth,
                lte: endOfMonth,
              },
            };
            break;
          }

          case EFilterTypeInterestProgram.YEARLY: {
            const currentYear = new Date().getFullYear();
            const startOfYear = new Date(currentYear, 0, 1);
            const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

            whereClause = {
              createdAt: {
                gte: startOfYear,
                lte: endOfYear,
              },
            };
            break;
          }

          default: {
            throw new BadRequestException("Filter Tidak Valid");
          }
        }
      }
      const [bachelorCount, magisterCount, doctorCount] = await Promise.all([
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.admission.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.degreeProgram.name, "%S1%"),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),

        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))

          .leftJoin(
            schema.degreeProgram,
            eq(schema.admission.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.degreeProgram.name, "%S2%"),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))

          .leftJoin(
            schema.degreeProgram,
            eq(schema.admission.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.degreeProgram.name, "%S2%"),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
      ]);

      const result = {
        data: [
          {
            name: "Program Sarjana(S1)",
            total: bachelorCount,
          },
          {
            name: "Program Pascasarjana(S2)",
            total: magisterCount,
          },
          {
            name: "Program Pascasarjana(S3)",
            total: doctorCount,
          },
        ],
      };

      return result;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getInterestDepartment(payload: IInterestDepartment): Promise<TInterestDepartmentResponse> {
    try {
      const { filterType, degreeProgramId } = payload;
      let whereClause: {
        createdAt?: {
          gte?: Date;
          lte?: Date;
        };
      } = {};

      if (filterType) {
        switch (filterType) {
          case EFilterTypeStudyProgramInterest.WEEKLY: {
            const now = new Date();
            const today = now.getUTCDate();
            const weekStart = new Date(now);
            weekStart.setUTCDate(now.getUTCDate() - today);
            weekStart.setUTCHours(0, 0, 0, 0);
            const weekEnd = new Date(weekStart);
            weekEnd.setUTCDate(weekStart.getUTCDate() + 6);
            weekEnd.setUTCHours(23, 59, 59, 999);

            whereClause = {
              createdAt: {
                gte: weekStart,
                lte: weekEnd,
              },
            };

            break;
          }

          case EFilterTypeStudyProgramInterest.MONTHLY: {
            const currentDate = new Date();
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonth = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              0,
              23,
              59,
              59,
              999,
            );

            whereClause = {
              createdAt: {
                gte: startOfMonth,
                lte: endOfMonth,
              },
            };

            break;
          }

          case EFilterTypeStudyProgramInterest.YEARLY: {
            const currentYear = new Date().getFullYear();
            const startOfYear = new Date(currentYear, 0, 1);
            const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

            whereClause = {
              createdAt: {
                gte: startOfYear,
                lte: endOfYear,
              },
            };
            break;
          }

          default: {
            throw new BadRequestException("Invalid Type Filter");
          }
        }
      }

      const [
        mAdmPendidikan,
        mPai,
        mIHukum,
        pai,
        pbs,
        pgmi,
        kpi,
        pls,
        plb,
        pgpaud,
        pbsi,
        pbing,
        pba,
        pmath,
        ppkn,
        te,
        tif,
        ti,
        iKomunikasi,
        iPerpustakaan,
        akuntansi,
        manajemen,
        iHukum,
        agrotek,
        dIPendidikan,
      ] = await Promise.all([
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S2 - Administrasi Pendidikan%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S2 - Pendidikan Agama Islam%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),

        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S2 - Ilmu Hukum%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Pendidikan Agama Islam%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Perbankan Syariah%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Pendidikan Guru Madrasah Ibtidaiyah%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Komunikasi dan Penyiaran Islam%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Pendidikan Luar Sekolah%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Pendidikan Luar Biasah%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Pendidikan Guru Pendidikan Anak Usia Dini%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Pendidikan Bahasa dan Sastra Indonesia%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Pendidikan Bahasa Ingris%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Pendidikan Bahasa Arab%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Pendidikan Matematika%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Pendidikan Pancasila dan Kewarganegaraan%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Teknik Elektro%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Teknik Informatika%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Teknik Industri%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Ilmu Komunikasi%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Ilmu Perpustakaan%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Akuntansi%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Manajemen%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Ilmu Hukum%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S1 - Agroteknologi%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
        this.drizzle
          .select({
            id: schema.students.id,
          })
          .from(schema.students)
          .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
          .leftJoin(schema.department, eq(schema.admission.firstDepartmentId, schema.department.id))
          .leftJoin(
            schema.degreeProgram,
            eq(schema.department.degreeProgramId, schema.degreeProgram.id),
          )
          .where(
            and(
              ilike(schema.department.name, "%S3 - Ilmu Pendidikan%"),
              eq(schema.degreeProgram.id, degreeProgramId),
              gte(schema.students.createdAt, whereClause.createdAt.gte),
              lte(schema.students.createdAt, whereClause.createdAt.lte),
            ),
          )
          .then((res) => res.length),
      ]);

      return {
        mAdmPendidikan,
        mPai,
        mIHukum,
        pai,
        pbs,
        pgmi,
        kpi,
        pls,
        plb,
        pgpaud,
        pbsi,
        pbing,
        pba,
        pmath,
        ppkn,
        te,
        tif,
        ti,
        iKomunikasi,
        iPerpustakaan,
        akuntansi,
        manajemen,
        iHukum,
        agrotek,
        dIPendidikan,
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getRegistrationStatus(payload: ISelectRequest): Promise<TRegistrationStatusResponse> {
    try {
      const { search } = payload;
      const registrationStatus = await this.drizzle
        .select({
          id: schema.registrationStatus.id,
          name: schema.registrationStatus.name,
        })
        .from(schema.registrationStatus)
        .where(ilike(schema.registrationStatus.name, `%${search}%` || ""));

      if (!registrationStatus.length) {
        throw new NotFoundException("Status pendaftaran tidak ditemukan");
      }
      return registrationStatus;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getAdmissionTest(): Promise<TQuestionResponse> {
    try {
      const questions = await this.drizzle.select().from(schema.admissionTest);

      if (!questions.length) {
        throw new NotFoundException("Soal tidak tersedia");
      }

      const formattedQuestions = questions.map((question) => ({
        id: question.id,
        question: question.question,
        correctAnswer: question.correctAnswer,
        answers: question.answers.reduce((accumulator, value, index) => {
          return {
            ...accumulator,
            [String.fromCharCode("a".charCodeAt(0) + index).toUpperCase()]: value,
          };
        }, {}),
      }));

      return formattedQuestions;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async createAdmissionTest(data: TCreateQuestionRequest) {
    try {
      const { question, correctAnswer, answers } = data;

      const newQuestion = await this.drizzle.insert(schema.admissionTest).values({
        question,
        correctAnswer: correctAnswer,
        answers: Object.values(answers),
      });
      if (!newQuestion) {
        throw new BadRequestException("Gagal membuat soal");
      }
      return {
        message: "Berhasil membuat soal",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async updateAdmissionTest(payload: TUpdateQuestionRequest): Promise<TGeneralResponse> {
    try {
      const existingQuestion = await this.drizzle
        .select({ id: schema.admissionTest.id })
        .from(schema.admissionTest)
        .where(eq(schema.admissionTest.id, payload.id));

      if (!existingQuestion) {
        throw new NotFoundException("Soal tidak ditemukan");
      }

      const updateQuestion = await this.drizzle
        .update(schema.admissionTest)
        .set({
          question: payload.question,
          correctAnswer: payload.correctAnswer,
          answers: Object.values(payload.answers),
        })
        .where(eq(schema.admissionTest.id, payload.id));

      if (!updateQuestion) {
        throw new BadRequestException("Gagal mengubah soal");
      }

      return {
        message: "Berhasil mengubah soal",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async deleteAdmissionTest(payload: { id: string }): Promise<TDeleteQuestionResponse> {
    try {
      const deletedQuestion = await this.drizzle
        .delete(schema.admissionTest)
        .where(eq(schema.admissionTest.id, payload.id));
      if (!deletedQuestion) {
        throw new BadRequestException("Soal tidak tersedia");
      }

      return {
        message: "Soal berhasil dihapus",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
}
