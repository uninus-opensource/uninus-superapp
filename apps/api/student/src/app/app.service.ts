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
            admission: {
              ...schema.admission,
            },
          },
        })
        .from(schema.users)
        .leftJoin(schema.students, eq(schema.users.id, schema.students.userId))
        .leftJoin(schema.admission, eq(schema.students.id, schema.admission.studentId))
        .where(eq(schema.users.id, payload.id))
        .limit(1)[0];

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
          .where(eq(schema.paymentHistory.studentId, student?.students?.id))
          .orderBy(asc(schema.paymentHistory.createdAt)),

        this.drizzle
          .select()
          .from(schema.documents)
          .where(eq(schema.documents.studentId, student?.students?.id)),
        this.drizzle
          .select()
          .from(schema.studentGrade)
          .where(eq(schema.studentGrade.admissionId, student?.students?.admissionId)),
      ]);
      if (!student) {
        throw new BadRequestException("User tidak ditemukan");
      }
      const {
        avatar,
        email,
        fullname,
        students: { admission, ...studentData },
      } = student;

      return JSON.parse(
        JSON.stringify(
          {
            avatar,
            email,
            fullname,
            ...admission,
            payment: paymentHistory,
            documents,
            studentGrade,
            ...studentData,
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
              id: schema.department.id,
              name: schema.department.name,
            },
            secondDepartment: {
              id: schema.department.id,
              name: schema.department.name,
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
          .leftJoin(schema.department, eq(schema.department.id, schema.admission.firstDepartmentId))
          .leftJoin(
            schema.department,
            eq(schema.department.id, schema.admission.secondDepartmentId),
          )
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
        first_department_id,
        second_department_id,
        selection_path_id,
        degree_program_id,
        registration_status_id,
        average_utbk,
        utbk_pu,
        utbk_kk,
        utbk_ppu,
        utbk_kmbm,
        student_grade,
        average_grade,
        document,
        documents,
        registration_path_id,
        test_score,
        education_npsn,
        education_name,
        education_province,
        education_district_city,
        education_sub_district,
        education_street_address,
        education_type_id,
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
          .limit(1)[0],
        ((documents && typeof documents[0]?.isVerified == "undefined") ||
          (document && typeof document?.name != "undefined")) &&
          this.drizzle
            .select({
              id: schema.registrationStatus.id,
            })
            .from(schema.registrationStatus)
            .where(ilike(schema.registrationStatus.name, "%belum membayar%"))
            .limit(1)[0],
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
                testScore: test_score,
                firstDepartmentId: String(first_department_id),
                secondDepartmentId: String(second_department_id),
                selectionPathId: String(selection_path_id),
                registrationPathId: String(registration_path_id),
                degreeProgramId: String(degree_program_id),
                utbkPu: utbk_pu,
                utbkKk: utbk_kk,
                utbkPpu: utbk_ppu,
                utbkKmbm: utbk_kmbm,
                utbkAverage: average_utbk,
                gradeAverage: average_grade,
                registrationStatusId: registration_status_id
                  ? String(registration_status_id)
                  : ((documents && typeof documents[0]?.isVerified == "undefined") ||
                      (document && typeof document?.name != "undefined")) &&
                    getRegistrationStatus.id,
              })
              .where(eq(schema.admission.id, admissionId))
              .returning(),
          ]),
          student_grade &&
            (await Promise.all(
              student_grade.map((el) =>
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
          education_npsn &&
            education_name &&
            education_province &&
            education_district_city &&
            education_sub_district &&
            education_street_address &&
            education_type_id &&
            this.drizzle.insert(schema.lastEducations).values({
              npsn: education_npsn,
              name: education_name,
              province: education_province,
              city: education_district_city,
              subdistrict: education_sub_district,
              streetAddress: education_street_address,
              lastEducationTypeId: String(education_type_id),
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
      const { registration_number } = payload;
      const graduationStatus = await this.drizzle
        .selectDistinct({
          fullname: schema.users.fullname,
          registration_number: schema.admission.registrationNumber,
          department: schema.students.departmentId,
          selection_path: schema.selectionPath.name,
          registration_status: schema.registrationStatus.name,
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
        .where(eq(schema.admission.registrationNumber, registration_number))
        .limit(1)[0];

      if (!graduationStatus) {
        throw new NotFoundException("Nomor registrasi tidak valid");
      }

      const { registration_status } = graduationStatus;
      if (!registration_status.toLowerCase().includes("lulus")) {
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
                  spelled_out: convertNumberToWords(
                    String(el?.amount - (el?.amount * scholarshipStudent.discount) / 100),
                  ),
                }
              : { ...el, spelled_out: convertNumberToWords(String(el?.amount)) },
          )
        : paymentObligations.map((el) => ({
            ...el,
            spelled_out: convertNumberToWords(String(el?.amount)),
          }));
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
}
