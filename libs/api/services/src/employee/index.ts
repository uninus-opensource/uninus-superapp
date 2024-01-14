import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import {
  ISelectRequest,
  TEmployeePaginationArgs,
  TGetEmployeePositionRequest,
} from "@uninus/entities";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Injectable()
export class EmployeeService {
  constructor(@Inject("EMPLOYEE_SERVICE") private readonly client: ClientProxy) {}

  async getEmployees(payload: TEmployeePaginationArgs) {
    const response = await firstValueFrom(
      this.client
        .send("get_employees", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    return response;
  }

  async getTotalEmployees() {
    const response = await firstValueFrom(
      this.client
        .send("get_total_employees", {})
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getLecturer(payload: { id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_lecturer", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getAcademicStaff(payload: { id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_academic_staff", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getCategories(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_employee_categories", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getEmployeeTypes(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_employee_types", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getEmployeeStatus(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_employee_status", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getLecturerTypes(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_lecturer_types", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getEmployeePositions(payload: TGetEmployeePositionRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_employee_positions", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getWorkUnitCategories(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_work_unit_categories", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getWorkUnit(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_work_unit", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createEmployee() {
    const response = await firstValueFrom(
      this.client
        .send("create_employee", {})
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
