import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import {
  CreateDepartment,
  CreateFaculty,
  CreateScholarship,
  CreateSelectionPath,
  createQuestion,
} from "@uninus/api/dto";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Injectable()
export class PMBService {
  constructor(@Inject("GENERAL_SERVICE") private readonly client: ClientProxy) {}

  async getScholarship(payload: { search: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_scholarship", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createScholarship(payload: CreateScholarship) {
    const response = await firstValueFrom(
      this.client
        .send("create_scholarship", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateScholarship(payload: CreateScholarship & { id: number }) {
    const response = await firstValueFrom(
      this.client
        .send("update_scholarship", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async deleteScholarship(payload: { id: number }) {
    const response = await firstValueFrom(
      this.client
        .send("delete_scholarship", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getSelectionPath(payload: { search: string; degree_program_id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_selection_path", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createSelectionPath(payload: CreateSelectionPath) {
    const response = await firstValueFrom(
      this.client
        .send("create_selection_path", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateSelectionPath(payload: CreateSelectionPath & { id: number }) {
    const response = await firstValueFrom(
      this.client
        .send("update_selection_path", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async deleteSelectionpath(payload: { id: number }) {
    const response = await firstValueFrom(
      this.client
        .send("delete_selection_path", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getRegistrationPath(payload: { search: string; id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_registration_path", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getDegreeProgram(payload: { search: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_degree", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getFaculty(payload: { search: string; degree_program_id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_faculty", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createFaculty(payload: CreateFaculty) {
    const response = await firstValueFrom(
      this.client
        .send("create_faculty", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateFaculty(payload: CreateFaculty & { id: number }) {
    const response = await firstValueFrom(
      this.client
        .send("update_faculty", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async deleteFaculty(payload: { id: number }) {
    const response = await firstValueFrom(
      this.client
        .send("delete_faculty", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getDepartment(payload: { search: string; degree_program_id: string; faculty_id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_department", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createDepartment(payload: CreateDepartment) {
    const response = await firstValueFrom(
      this.client
        .send("create_department", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateDepartment(payload: CreateDepartment & { id: number }) {
    const response = await firstValueFrom(
      this.client
        .send("update_department", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async deleteDepartment(payload: { id: number }) {
    const response = await firstValueFrom(
      this.client
        .send("delete_department", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getRegistrans(payload: { end_date: string; start_date: string; filter_type: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_registrans", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getInterestPrograms(payload: { filter_type: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_interest_education_program", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    return response;
  }

  async getInterestDepartment(payload: { filter_type: string; degree_program_id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_interest_department", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    return response;
  }

  async getRegistrationStatus(payload: { search: string; id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_registration_status", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    return response;
  }

  async getAdmissionQuestions() {
    const response = await firstValueFrom(
      this.client
        .send("get_question", {})
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createAdmissionQuestions(payload: createQuestion) {
    const response = await firstValueFrom(
      this.client
        .send("create_question", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateAdmissionQuestions(payload: createQuestion & { id: number }) {
    const response = await firstValueFrom(
      this.client
        .send("update_question", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async deleteAdmissionQuestions(payload: { id: number }) {
    const response = await firstValueFrom(
      this.client
        .send("delete_question", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
