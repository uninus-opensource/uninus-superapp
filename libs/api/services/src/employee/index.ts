import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ISelectRequest, TEmployeePaginationArgs } from "@uninus/entities";
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

  async getEmployee(payload: { id: string }) {
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
}
