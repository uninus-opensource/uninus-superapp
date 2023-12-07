import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import {
  ICreateCurriculumRequest,
  ICreateCurriculumResponse,
  IDeleteCurriculumResponse,
  IGetCurriculumResponse,
  ISelectDepartmentRequest,
  ISelectFacultyRequest,
  ISelectRequest,
  IUpdateCurriculumRequest,
  IUpdateCurriculumResponse,
  TCreateDepartmentRequest,
  TCreateFacultyRequest,
  TUpdateDepartmentRequest,
  TUpdateFacultyRequest,
} from "@uninus/entities";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Injectable()
export class CollegeService {
  constructor(@Inject("GENERAL_SERVICE") private readonly client: ClientProxy) {}

  async getDegreeProgram(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_degree", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getFaculty(payload: ISelectFacultyRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_faculty", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createFaculty(payload: TCreateFacultyRequest) {
    const response = await firstValueFrom(
      this.client
        .send("create_faculty", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateFaculty(payload: TUpdateFacultyRequest) {
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

  async getDepartment(payload: ISelectDepartmentRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_department", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createDepartment(payload: TCreateDepartmentRequest) {
    const response = await firstValueFrom(
      this.client
        .send("create_department", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateDepartment(payload: TUpdateDepartmentRequest) {
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

  async getCurriculum(payload: ISelectRequest): Promise<IGetCurriculumResponse> {
    const response = await firstValueFrom(
      this.client
        .send("get_curriculum", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createCurriculum(payload: ICreateCurriculumRequest): Promise<ICreateCurriculumResponse> {
    const response = await firstValueFrom(
      this.client
        .send("create_curriculum", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
  async updateCurriculum(payload: IUpdateCurriculumRequest): Promise<IUpdateCurriculumResponse> {
    const response = await firstValueFrom(
      this.client
        .send("update_curriculum", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
  async deleteCurriculum(payload: { id: string }): Promise<IDeleteCurriculumResponse> {
    const response = await firstValueFrom(
      this.client
        .send("delete_curriculum", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
