import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";

import {
  IInterestDepartment,
  IInterestEducationPrograms,
  IRegistransRequest,
  ISelectRequest,
  ISelectionRequest,
  TCreateQuestionRequest,
  TCreateScholarshipRequest,
  TCreateSelectionPathRequest,
  TUpdateQuestionRequest,
  TUpdateScholarshipRequest,
  TUpdateSelectionPathRequest,
} from "@uninus/entities";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Injectable()
export class PMBService {
  constructor(@Inject("GENERAL_SERVICE") private readonly client: ClientProxy) {}

  async getScholarship(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_scholarship", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createScholarship(payload: TCreateScholarshipRequest) {
    const response = await firstValueFrom(
      this.client
        .send("create_scholarship", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateScholarship(payload: TUpdateScholarshipRequest) {
    const response = await firstValueFrom(
      this.client
        .send("update_scholarship", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async deleteScholarship(payload: { id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("delete_scholarship", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getSelectionPath(payload: ISelectionRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_selection_path", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createSelectionPath(payload: TCreateSelectionPathRequest) {
    const response = await firstValueFrom(
      this.client
        .send("create_selection_path", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateSelectionPath(payload: TUpdateSelectionPathRequest) {
    const response = await firstValueFrom(
      this.client
        .send("update_selection_path", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async deleteSelectionpath(payload: { id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("delete_selection_path", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getRegistrationPath(payload: ISelectionRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_registration_path", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getRegistrans(payload: IRegistransRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_registrans", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getInterestPrograms(payload: IInterestEducationPrograms) {
    const response = await firstValueFrom(
      this.client
        .send("get_interest_education_program", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    return response;
  }

  async getInterestDepartment(payload: IInterestDepartment) {
    const response = await firstValueFrom(
      this.client
        .send("get_interest_department", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    return response;
  }

  async getRegistrationStatus(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_registration_status", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    return response;
  }

  async getAdmissionTest() {
    const response = await firstValueFrom(
      this.client
        .send("get_admission_test", {})
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createAdmissionTest(payload: TCreateQuestionRequest) {
    const response = await firstValueFrom(
      this.client
        .send("create_admission_test", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateAdmissionTest(payload: TUpdateQuestionRequest) {
    const response = await firstValueFrom(
      this.client
        .send("update_admission_test", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async deleteAdmissionTest(payload: { id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("delete_admission_test", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
