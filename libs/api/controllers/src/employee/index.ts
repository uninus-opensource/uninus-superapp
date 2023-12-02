import { Controller, Get, Param, Query, UseFilters } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/filters";
import { EmployeeService } from "@uninus/api/services";
import { EOrderByPagination } from "@uninus/entities";
@ApiTags("Employee")
@Controller("employee")
export class EmployeeController {
  constructor(private readonly appService: EmployeeService) {}

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
  @Get()
  async getEmployees(
    @Query("page") page: number,
    @Query("per_page") perPage: number,
    @Query("order_by") orderBy: EOrderByPagination.ASC | EOrderByPagination.DESC,
    @Query("filter_by") filterBy: string,
    @Query("search") search: string,
    @Query("type") type: number,
  ) {
    return await this.appService.getEmployees({ page, perPage, orderBy, filterBy, search, type });
  }

  @ApiOperation({ summary: "Total Employees" })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
  })
  @Get("/total-employees")
  async getTotalEmployees() {
    return await this.appService.getTotalEmployees();
  }

  @ApiOperation({ summary: "Get Employees" })
  @Get("/lecturer/:id")
  async getEmployee(@Param("id") id: string) {
    return await this.appService.getEmployee({ id });
  }

  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Academic Staff" })
  @Get("/academic-staff/:id")
  async getAcademicStaff(@Param("id") id: string) {
    return await this.appService.getAcademicStaff({ id });
  }

  @Get("employee-categories")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Employee Categories" })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  async getCategories(@Query("id") id: number, @Query("search") search: string) {
    return await this.appService.getCategories({ id, search });
  }
}
