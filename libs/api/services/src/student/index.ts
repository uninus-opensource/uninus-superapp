import { BadRequestException, Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import {
  IDeleteStudentRequest,
  IGetStudentRequest,
  IGetStudentResponse,
  IUpdateStudentRequest,
  IUpdateStudentResponse,
  TDeleteStudentResponse,
  TGraduationStatusReponse,
  TGraduationStatusRequest,
  TPaymentObligationsRequest,
  TPaymentObligationsResponse,
  emailTemplateSelection,
} from "@uninus/entities";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Injectable()
export class StudentService {
  constructor(@Inject("STUDENT_SERVICE") private readonly client: ClientProxy) {}

  async getPaymentObligations(
    payload: TPaymentObligationsRequest,
  ): Promise<TPaymentObligationsResponse> {
    const response = await firstValueFrom(
      this.client
        .send("get_payment_obligations", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async graduationStatus(payload: TGraduationStatusRequest): Promise<TGraduationStatusReponse> {
    const response = await firstValueFrom(
      this.client
        .send("get_graduation_status", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    return response;
  }

  async getDataStudent(payload: IGetStudentRequest): Promise<IGetStudentResponse> {
    const response = await firstValueFrom(
      this.client
        .send("get_student", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateDataStudent(payload: IUpdateStudentRequest): Promise<IUpdateStudentResponse> {
    const response = await firstValueFrom(
      this.client
        .send("update_student", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async deleteDataStudent(payload: IDeleteStudentRequest): Promise<TDeleteStudentResponse> {
    const response = await firstValueFrom(
      this.client
        .send("delete_student", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateDataStudentById(payload: IUpdateStudentRequest): Promise<IUpdateStudentResponse> {
    const updateStudent = await this.updateDataStudent(payload);

    const html =
      payload?.registration_status_id &&
      emailTemplateSelection(
        updateStudent.fullname as string,
        updateStudent?.registration_status as string,
      );

    const sendEmail =
      payload?.registration_status_id &&
      (await firstValueFrom(
        this.client
          .send("send_email", {
            email: updateStudent.email,
            subject: "Hasil Seleksi Penerimaan Mahasiswa Baru",
            html,
          })
          .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
      ));

    if (payload?.registration_status_id && !sendEmail) {
      throw new BadRequestException("Gagal mengirimkan email");
    }
    return payload?.registration_status_id
      ? { message: "Berhasil mengirimkan email" }
      : updateStudent;
  }

  async getDataStudentByid(payload: IGetStudentRequest): Promise<IGetStudentResponse> {
    return await this.getDataStudent(payload);
  }
}
