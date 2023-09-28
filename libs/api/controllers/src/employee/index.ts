import { Controller, Get, Inject, Query, UseFilters } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ApiHeader, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/filter";
import { EOrderByPagination, TProfileResponse } from "@uninus/entities";
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
  @ApiQuery({ name: "type", required: true })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  async getEmployees(
    @Query("page") page: number,
    @Query("per_page") perPage: number,
    @Query("order_by") orderBy: EOrderByPagination.ASC | EOrderByPagination.DESC,
    @Query("filter_by") filterBy: string,
    @Query("search") search: string,
    @Query("type") type: number,
  ) {
    const response = await firstValueFrom(
      this.client
        .send<Array<TProfileResponse>>("get_employees", {
          type,
          where: {
            OR: [
              {
                user: {
                  fullname: {
                    contains: search || "",
                    mode: "insensitive",
                  },
                },
                employee_has_category: {
                  some: {
                    employee_category_id: Number(type),
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

  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
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
