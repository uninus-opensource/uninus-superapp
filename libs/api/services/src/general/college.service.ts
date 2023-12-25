import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import {
  ISelectDepartmentRequest,
  ISelectFacultyRequest,
  ISelectRequest,
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

  async deleteDepartment(payload: { id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("delete_department", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
