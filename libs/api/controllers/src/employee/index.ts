import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { GetEmployeeCategoriesDto, GetEmployeesDto } from "@uninus/api/dto";
import { EmployeeService } from "@uninus/api/services";
import { TEmployeePaginationArgs } from "@uninus/entities";
@ApiTags("Employee")
@ApiHeader({
  name: "app-origin",
  description: "Application Origin",
})
@Controller("employee")
export class EmployeeController {
  constructor(private readonly appService: EmployeeService) {}

  @ApiOperation({ summary: "Pagination List Employees" })
  @ApiQuery({ type: GetEmployeesDto })
  @Get()
  async getEmployees(@Query() query: TEmployeePaginationArgs) {
    return await this.appService.getEmployees(query);
  }

  @ApiOperation({ summary: "Total Employees" })
  @Get("/total-employees")
  async getTotalEmployees() {
    return await this.appService.getTotalEmployees();
  }

  @ApiOperation({ summary: "Get Employees" })
  @ApiParam({ name: "id", type: "integer", required: true })
  @Get("/lecturer/:id")
  async getEmployee(@Param("id") id: string) {
    return await this.appService.getEmployee({ id });
  }

  @ApiOperation({ summary: "Get Academic Staff" })
  @ApiParam({ name: "id", type: "integer", required: true })
  @Get("/academic-staff/:id")
  async getAcademicStaff(@Param("id") id: string) {
    return await this.appService.getAcademicStaff({ id });
  }

  @ApiOperation({ summary: "Get Employee Categories" })
  @ApiQuery({ type: GetEmployeeCategoriesDto })
  @Get("categories")
  async getCategories(@Query("id") id: number, @Query("search") search: string) {
    return await this.appService.getCategories({ id, search });
  }
}
