import { Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import {
  CreateEmployeeDto,
  GetEmployeeParamsDto,
  GetEmployeePositionParamsDto,
  GetEmployeesDto,
} from "@uninus/api/dto";
import { JwtAuthGuard } from "@uninus/api/guard";
import { EmployeeService } from "@uninus/api/services";
import {
  ISelectRequest,
  TEmployeePaginationArgs,
  TGetEmployeePositionRequest,
} from "@uninus/entities";
@ApiTags("Employee")
@ApiBearerAuth("bearer")
@Controller("employee")
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(private readonly appService: EmployeeService) {}

  @ApiOperation({ summary: "Create Employee" })
  @ApiQuery({ type: CreateEmployeeDto })
  @Post()
  async createEmployee() {
    return await this.appService.createEmployee();
  }

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

  @ApiOperation({ summary: "Get Academic Staff" })
  @ApiParam({ name: "id", type: "string", format: "uuid", required: true })
  @Get("/academic-staff/:id")
  async getAcademicStaff(@Param("id") id: string) {
    return await this.appService.getAcademicStaff({ id });
  }

  @ApiOperation({ summary: "Get Lecturer" })
  @ApiParam({ name: "id", type: "string", format: "uuid", required: true })
  @Get("/lecturer/:id")
  async getLecturer(@Param("id") id: string) {
    return await this.appService.getLecturer({ id });
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
  @Get("types/lecturer/")
  async getLecturerTypes(@Query() query: ISelectRequest) {
    return await this.appService.getLecturerTypes(query);
  }

  @ApiOperation({ summary: "Get Employee Position" })
  @ApiQuery({ type: GetEmployeePositionParamsDto })
  @Get("/positions")
  async getEmployeePositions(@Query() query: TGetEmployeePositionRequest) {
    return await this.appService.getEmployeePositions(query);
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
}
