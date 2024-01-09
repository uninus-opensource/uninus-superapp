import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  IGetStudentRequest,
  IGetStudentResponse,
  IDeleteStudentRequest,
  TDeleteStudentResponse,
  IUpdateStudentResponse,
  IUpdateStudentRequest,
  TGraduationStatusRequest,
  TGraduationStatusReponse,
  TPaymentObligationsResponse,
  TPaymentObligationsRequest,
  TStudentsPaginationArgs,
  TStudentsPaginatonResponse,
} from "@uninus/entities";
import { RpcException } from "@nestjs/microservices";
import { convertNumberToWords, errorMappings } from "@uninus/api/utilities";
import * as schema from "@uninus/api/models";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { and, asc, eq, ilike } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

@Injectable()
export class AppService {
  constructor(@Inject("drizzle") private drizzle: NodePgDatabase<typeof schema>) {}

  async getDataStudent(payload: IGetStudentRequest): Promise<IGetStudentResponse> {
    try {
      const student = await this.drizzle
        .select({
          avatar: schema.users.avatar,
          email: schema.users.email,
          fullname: schema.users.fullname,
          students: {
            ...schema.students,
          },
          admission: {
            ...schema.admission,
          },
          admissionId: schema.admission.id,
          studentId: schema.students.id,
        })
        .from(schema.students)
        .leftJoin(schema.users, eq(schema.users.id, schema.students.userId))
        .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
        .where(eq(schema.users.id, payload.id))
        .limit(1)
        .then((res) => res.at(0));
      if (!student) {
        throw new BadRequestException("User tidak ditemukan");
      }
      const [paymentHistory, documents, studentGrade] = await Promise.all([
        this.drizzle
          .select()
          .from(schema.paymentHistory)
          .leftJoin(
            schema.paymentObligations,
            eq(schema.paymentObligations.id, schema.paymentHistory.paymentObligationId),
          )
          .leftJoin(
            schema.paymentType,
            eq(schema.paymentType.id, schema.paymentHistory.paymentTypeId),
          )
          .where(eq(schema.paymentHistory.studentId, student?.studentId))
          .orderBy(asc(schema.paymentHistory.createdAt)),

        this.drizzle
          .select()
          .from(schema.documents)
          .where(eq(schema.documents.studentId, student?.studentId)),
        this.drizzle
          .select()
          .from(schema.studentGrade)
          .where(eq(schema.studentGrade.admissionId, student?.admissionId)),
      ]);

      const { avatar, email, fullname, admission, students } = student;

      return JSON.parse(
        JSON.stringify(
          {
            avatar,
            email,
            fullname,
            ...admission,
            paymentHistory,
            documents,
            studentGrade,
            ...students,
          },
          (key, value) => {
            if (value !== null) return value;
          },
        ),
      );
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async getDataStudents({
    search,
    // orderBy,
    page = 1,
    perPage = 10,
  }: TStudentsPaginationArgs): Promise<TStudentsPaginatonResponse> {
    try {
      const firstDepartment = alias(schema.department, "first_department");
      const secondDepartment = alias(schema.department, "second_department");

      const [data, count] = await Promise.all([
        this.drizzle
          .select({
            id: schema.users.id,
            fullname: schema.users.fullname,
            registrationNumber: schema.admission.registrationNumber,
            gradeAverage: schema.admission.gradeAverage,
            utbkAverage: schema.admission.utbkAverage,
            selectionPath: {
              id: schema.selectionPath.id,
              name: schema.selectionPath.name,
            },
            firstDepartment: {
              id: firstDepartment.id,
              name: firstDepartment.name,
            },
            secondDepartment: {
              id: secondDepartment.id,
              name: secondDepartment.name,
            },
            registrationPath: {
              id: schema.registrationPath.id,
              name: schema.registrationPath.name,
            },
            registrationStatus: {
              id: schema.registrationStatus.id,
              name: schema.registrationStatus.name,
            },
            createdAt: schema.students.createdAt,
          })
          .from(schema.students)
          .leftJoin(schema.users, eq(schema.users.id, schema.students.userId))
          .leftJoin(schema.admission, eq(schema.admission.studentId, schema.students.id))
          .leftJoin(
            schema.selectionPath,
            eq(schema.selectionPath.id, schema.admission.selectionPathId),
          )
          .leftJoin(firstDepartment, eq(firstDepartment.id, schema.admission.firstDepartmentId))
          .leftJoin(secondDepartment, eq(secondDepartment.id, schema.admission.secondDepartmentId))
          .leftJoin(
            schema.registrationPath,
            eq(schema.registrationPath.id, schema.admission.registrationPathId),
          )
          .leftJoin(
            schema.registrationStatus,
            eq(schema.registrationStatus.id, schema.admission.registrationStatusId),
          )
          .where(
            and(
              ilike(schema.admission.registrationNumber, `%${search || ""}%`),
              ilike(schema.users.fullname, `%${search || ""}%`),
            ),
          )
          .limit(perPage)
          .offset((page - 1) * perPage)
          .orderBy(schema.students.createdAt, asc(schema.students.createdAt)),

        this.drizzle
          .select({ id: schema.students.id })
          .from(schema.students)
          .leftJoin(schema.users, eq(schema.users.id, schema.students.userId))
          .leftJoin(schema.admission, eq(schema.admission.studentId, schema.students.id))
          .where(
            and(
              ilike(schema.admission.registrationNumber, `%${search || ""}%`),
              ilike(schema.users.fullname, `%${search || ""}%`),
            ),
          )
          .then((res) => res.length),
      ]);

      const lastPage = Math.ceil(count / perPage);
      return {
        data,
        meta: {
          total: count,
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

  async updateDataStudent(payload: IUpdateStudentRequest): Promise<IUpdateStudentResponse> {
    try {
      const {
        id,
        fullname,
        avatar,
        firstDepartmentId,
        secondDepartmentId,
        selectionPathId,
        degreeProgramId,
        registrationStatusId,
        registrationPathId,
        utbkAverage,
        utbkPu,
        utbkKk,
        utbkPpu,
        utbkKmbm,
        studentGrade,
        gradeAverage,
        document,
        documents,
        testScore,
        educationNpsn,
        educationName,
        educationProvince,
        educationCity,
        educationSubdistrict,
        educationAddress,
        educationTypeId,
        ...updateStudentPayload
      } = payload;

      const [findUser, getRegistrationStatus] = await Promise.all([
        this.drizzle
          .selectDistinct({
            studentId: schema.students.id,
            admissionId: schema.admission.id,
          })
          .from(schema.users)
          .leftJoin(schema.students, eq(schema.students.userId, schema.users.id))
          .leftJoin(schema.admission, eq(schema.admission.studentId, schema.students.id))
          .where(eq(schema.users.id, payload.id))
          .limit(1)
          .then((res) => res.at(0)),
        ((documents && typeof documents[0]?.isVerified == "undefined") ||
          (document && typeof document?.name != "undefined")) &&
          this.drizzle
            .select({
              id: schema.registrationStatus.id,
            })
            .from(schema.registrationStatus)
            .where(ilike(schema.registrationStatus.name, "%belum membayar%"))
            .limit(1)
            .then((res) => res.at(0)),
      ]);

      if (!findUser) {
        throw new NotFoundException("User tidak ditemukan");
      }
      const { studentId, admissionId } = findUser;

      const [[updateStudent], [updateStudentGrade], updateDocument, createLastEducation] =
        await Promise.all([
          Promise.all([
            this.drizzle
              .update(schema.users)
              .set({
                fullname,
                avatar,
              })
              .where(eq(schema.users.id, id))
              .returning({
                avatar: schema.users.avatar,
                fullname: schema.users.fullname,
                email: schema.users.email,
              }),
            this.drizzle
              .update(schema.students)
              .set({ ...updateStudentPayload })
              .where(eq(schema.students.id, studentId))
              .returning(),
            this.drizzle
              .update(schema.admission)
              .set({
                testScore,
                firstDepartmentId,
                secondDepartmentId,
                selectionPathId,
                registrationPathId,
                degreeProgramId,
                utbkPu,
                utbkKk,
                utbkPpu,
                utbkKmbm,
                utbkAverage,
                gradeAverage,
                registrationStatusId: registrationStatusId
                  ? String(registrationStatusId)
                  : ((documents && typeof documents[0]?.isVerified == "undefined") ||
                      (document && typeof document?.name != "undefined")) &&
                    getRegistrationStatus.id,
              })
              .where(eq(schema.admission.id, admissionId))
              .returning(),
          ]),
          studentGrade &&
            (await Promise.all(
              studentGrade.map((el) =>
                this.drizzle
                  .update(schema.studentGrade)
                  .set({
                    grade: el.grade,
                  })
                  .where(
                    and(
                      eq(schema.studentGrade.admissionId, admissionId),
                      eq(schema.studentGrade.semester, el.semester),
                      eq(schema.studentGrade.subject, el.subject),
                    ),
                  ),
              ),
            )),
          (() => {
            if (documents && typeof documents[0]?.isVerified != "undefined") {
              return Promise.all(
                documents.map((el) =>
                  this.drizzle
                    .update(schema.documents)
                    .set({
                      isVerified: el.isVerified,
                    })
                    .where(
                      and(
                        eq(schema.documents.id, el.id),
                        eq(schema.documents.studentId, studentId),
                      ),
                    ),
                ),
              );
            }

            if (documents && typeof documents[0]?.name != "undefined") {
              return this.drizzle.insert(schema.documents).values(
                documents.map((el) => ({
                  name: el.name,
                  path: el.path,
                  studentId,
                })),
              );
            }

            if (document && typeof document?.name != "undefined") {
              return this.drizzle.insert(schema.documents).values({
                name: document.name,
                path: document.path,
                studentId,
              });
            }
          })(),
          educationNpsn &&
            educationName &&
            educationProvince &&
            educationCity &&
            educationSubdistrict &&
            educationAddress &&
            educationTypeId &&
            this.drizzle.insert(schema.educations).values({
              npsn: educationNpsn,
              name: educationName,
              province: educationProvince,
              city: educationCity,
              subdistrict: educationSubdistrict,
              streetAddress: educationAddress,
              educationTypeId: String(educationTypeId),
            })[0],
        ]);

      if (!updateStudent || !updateStudentGrade || !updateDocument || !createLastEducation) {
        throw new NotFoundException("Gagal update data");
      }

      return JSON.parse(
        JSON.stringify(
          {
            ...updateStudent[0],
            ...updateStudent[1],
            ...updateStudent[2],
          },
          (key, value) => {
            if (value !== null) return value;
          },
        ),
      );
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async deleteDataStudent(payload: IDeleteStudentRequest): Promise<TDeleteStudentResponse> {
    try {
      const student = await this.drizzle
        .delete(schema.users)
        .where(eq(schema.users.id, payload.id));

      if (!student) {
        throw new NotFoundException("User tidak ditemukan");
      }

      return {
        message: "Berhasil menghapus data",
      };
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }

  async checkGraduationStatus(
    payload: TGraduationStatusRequest,
  ): Promise<TGraduationStatusReponse> {
    try {
      const { registrationNumber } = payload;
      const graduationStatus = await this.drizzle
        .selectDistinct({
          fullname: schema.users.fullname,
          registrationNumber: schema.admission.registrationNumber,
          department: schema.students.departmentId,
          selectionPath: schema.selectionPath.name,
          registrationStatus: schema.registrationStatus.name,
        })
        .from(schema.admission)
        .leftJoin(schema.students, eq(schema.students.id, schema.admission.studentId))
        .leftJoin(schema.users, eq(schema.users.id, schema.students.userId))
        .leftJoin(
          schema.selectionPath,
          eq(schema.selectionPath.id, schema.admission.selectionPathId),
        )
        .leftJoin(
          schema.registrationStatus,
          eq(schema.registrationStatus.id, schema.admission.registrationStatusId),
        )
        .where(eq(schema.admission.registrationNumber, registrationNumber))
        .limit(1)
        .then((res) => res.at(0));

      if (!graduationStatus) {
        throw new NotFoundException("Nomor registrasi tidak valid");
      }

      const { registrationStatus } = graduationStatus;
      if (!registrationStatus.toLowerCase().includes("lulus")) {
        return {
          message: "Sedang Dalam Proses Seleksi",
        };
      }

      return graduationStatus;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
  async getPaymentObligations(
    payload: TPaymentObligationsRequest,
  ): Promise<TPaymentObligationsResponse> {
    try {
      const [paymentObligations, [scholarshipStudent]] = await Promise.all([
        this.drizzle
          .select({
            id: schema.paymentObligations.id,
            name: schema.paymentObligations.name,
            amount: schema.paymentObligations.amount,
          })
          .from(schema.paymentObligations)
          .where(ilike(schema.paymentObligations.name, "%UKT%")),
        this.drizzle
          .select({
            discount: schema.scholarship.discount,
          })
          .from(schema.users)
          .leftJoin(schema.students, eq(schema.users.id, schema.students.userId))
          .leftJoin(schema.scholarship, eq(schema.students.scholarshipId, schema.scholarship.id))
          .where(eq(schema.users.id, payload.userId)),
      ]);

      if (!paymentObligations || !scholarshipStudent) {
        throw new NotFoundException("Gagal dalam mengambil data");
      }

      return scholarshipStudent.discount
        ? paymentObligations.map((el) =>
            el?.name?.includes("UKT")
              ? {
                  id: el?.id,
                  name: el?.name,
                  amount: el?.amount - (el?.amount * scholarshipStudent.discount) / 100,
                  spelledOut: convertNumberToWords(
                    String(el?.amount - (el?.amount * scholarshipStudent.discount) / 100),
                  ),
                }
              : { ...el, spelled_out: convertNumberToWords(String(el?.amount)) },
          )
        : paymentObligations.map((el) => ({
            ...el,
            spelledOut: convertNumberToWords(String(el?.amount)),
          }));
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
}
