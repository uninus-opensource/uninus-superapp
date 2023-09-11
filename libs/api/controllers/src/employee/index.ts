import { Controller, Get, Inject, Query, UseFilters } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/filter";
import { TProfileResponse, TTotalEmployeesResponse } from "@uninus/entities";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Controller("employee")
@ApiTags("employee")
export class EmployeeController {
  constructor(@Inject("EMPLOYEE_SERVICE") private readonly client: ClientProxy) {}

  @Get()
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Pagination List Employees" })
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "per_page", required: false })
  @ApiQuery({ name: "order_by", required: false })
  @ApiQuery({ name: "filter_by", required: false })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "type", required: false })
  async getEmployees(
    @Query("page") page: number,
    @Query("per_page") perPage: number,
    @Query("order_by") orderBy: "asc" | "desc",
    @Query("filter_by") filterBy: string,
    @Query("search") search: string,
    @Query("type") type: string,
  ) {
    const response = await firstValueFrom(
      this.client
        .send<Array<TProfileResponse>>("get_employees", {
          where: {
            OR: [
              {
                position: {
                  position_category: {
                    name: {
                      contains: type || "",
                      mode: "insensitive",
                    },
                  },
                },
              },
            ],
          },
          orderBy: {
            [filterBy]: orderBy,
          },
          page,
          perPage,
        })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("/total-employees")
  async getTotalEmployees() {
    const response = await firstValueFrom(
      this.client
        .send("get_total_employees", {})
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}
