import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateEmployeeDto, GetEmployeeParamsDto, GetEmployeesDto } from "@uninus/api/dto";
import { EmployeeService } from "@uninus/api/services";
import { ISelectRequest, TEmployeePaginationArgs } from "@uninus/entities";
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
  @Get("/total")
  async getTotalEmployees() {
    return await this.appService.getTotalEmployees();
  }

  @ApiOperation({ summary: "Get Employees" })
  @ApiParam({ name: "id", type: "string", required: true })
  @Get("/lecturer/:id")
  async getEmployee(@Param("id") id: string) {
    return await this.appService.getEmployee({ id });
  }

  @ApiOperation({ summary: "Get Academic Staff" })
  @ApiParam({ name: "id", type: "string", required: true })
  @Get("/academic-staff/:id")
  async getAcademicStaff(@Param("id") id: string) {
    return await this.appService.getAcademicStaff({ id });
  }

  @ApiOperation({ summary: "Get Employee Categories" })
  @ApiQuery({ type: GetEmployeeParamsDto })
  @Get("/categories")
  async getEmployeeCategories(@Query() query: ISelectRequest) {
    return await this.appService.getCategories(query);
  }

  @ApiOperation({ summary: "Get Employee Types" })
  @ApiQuery({ type: GetEmployeeParamsDto })
  @Get("/types")
  async getEmployeeType(@Query() query: ISelectRequest) {
    return await this.appService.getEmployeeTypes(query);
  }

  @ApiOperation({ summary: "Get Employee Status" })
  @ApiQuery({ type: GetEmployeeParamsDto })
  @Get("/status")
  async getEmployeeStatus(@Query() query: ISelectRequest) {
    return await this.appService.getEmployeeStatus(query);
  }

  @ApiOperation({ summary: "Get Lecturer Types" })
  @ApiQuery({ type: GetEmployeeParamsDto })
  @Get("/lecturer/types")
  async getLecturerTypes(@Query() query: ISelectRequest) {
    return await this.appService.getLecturerTypes(query);
  }

  @ApiOperation({ summary: "Get Lecturer Position" })
  @ApiQuery({ type: GetEmployeeParamsDto })
  @Get("/lecturer/positions")
  async getLecturerPositions(@Query() query: ISelectRequest) {
    return await this.appService.getLecturerPositions(query);
  }

  @ApiOperation({ summary: "Get Academic Staff Types" })
  @ApiQuery({ type: GetEmployeeParamsDto })
  @Get("/academic-staff/types")
  async getAcademicStaffTypes(@Query() query: ISelectRequest) {
    return await this.appService.getAcademicStaffTypes(query);
  }

  @ApiOperation({ summary: "Get Academic Staff Position" })
  @ApiQuery({ type: GetEmployeeParamsDto })
  @Get("/academic-staff/positions")
  async getAcademicStaffPositions(@Query() query: ISelectRequest) {
    return await this.appService.getAcademicStaffPositions(query);
  }

  @ApiOperation({ summary: "Get Work Unit Categorys" })
  @ApiQuery({ type: GetEmployeeParamsDto })
  @Get("/work-unit/categories")
  async getWorkUnitCategories(@Query() query: ISelectRequest) {
    return await this.appService.getWorkUnitCategories(query);
  }

  @ApiOperation({ summary: "Get Work Unit" })
  @ApiQuery({ type: GetEmployeeParamsDto })
  @Get("/work-unit")
  async getWorkUnit(@Query() query: ISelectRequest) {
    return await this.appService.getWorkUnit(query);
  }

  @ApiOperation({ summary: "Create Employee" })
  @ApiQuery({ type: CreateEmployeeDto })
  @Post("/")
  async createEmployee() {
    return await this.appService.createEmployee();
  }
}
