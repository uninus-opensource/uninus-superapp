import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import {
  ICreateDepartmentRequest,
  ICreateDepartmentResponse,
  ICreateFacultyRequest,
  ICreateFacultyResponse,
  IDegreeProgramRequest,
  IDegreeProgramResponse,
  IDeleteDepartmentRequest,
  IDeleteFacultyRequest,
  IDeleteFacultyResponse,
  IGetDepartmentRequest,
  IGetDepartmentResponse,
  IGetFacultyRequest,
  IGetFacultyResponse,
  IUpdateDepartmentRequest,
  IUpdateFacultyRequest,
  IUpdateFacultyResponse,
} from "@uninus/entities";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Injectable()
export class CollegeService {
  constructor(@Inject("GENERAL_SERVICE") private readonly client: ClientProxy) {}

  async getDegreeProgram(payload: IDegreeProgramRequest): Promise<IDegreeProgramResponse> {
    const response = await firstValueFrom(
      this.client
        .send("get_degree", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getFaculty(payload: IGetFacultyRequest): Promise<IGetFacultyResponse> {
    const response = await firstValueFrom(
      this.client
        .send("get_faculty", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createFaculty(payload: ICreateFacultyRequest): Promise<ICreateFacultyResponse> {
    const response = await firstValueFrom(
      this.client
        .send("create_faculty", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateFaculty(payload: IUpdateFacultyRequest): Promise<IUpdateFacultyResponse> {
    const response = await firstValueFrom(
      this.client
        .send("update_faculty", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async deleteFaculty(payload: IDeleteFacultyRequest): Promise<IDeleteFacultyResponse> {
    const response = await firstValueFrom(
      this.client
        .send("delete_faculty", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getDepartment(payload: IGetDepartmentRequest): Promise<IGetDepartmentResponse> {
    const response = await firstValueFrom(
      this.client
        .send("get_department", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createDepartment(payload: ICreateDepartmentRequest): Promise<ICreateDepartmentResponse> {
    const response = await firstValueFrom(
      this.client
        .send("create_department", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateDepartment(payload: IUpdateDepartmentRequest) {
    const response = await firstValueFrom(
      this.client
        .send("update_department", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async deleteDepartment(payload: IDeleteDepartmentRequest) {
    const response = await firstValueFrom(
      this.client
        .send("delete_department", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
