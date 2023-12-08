import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import {
  CreateCourseDto,
  CreateCourseScheduleDto,
  CreateCurriculumDto,
  CreateDepartmentDto,
  CreateFacultyDto,
  GetDepartmentDto,
  GetFacultyDto,
  SelectOptionDto,
  UpdateCourseDto,
  UpdateCourseScheduleDto,
  UpdateCurriculumDto,
  UpdateDepartmentDto,
  UpdateFacultyDto,
} from "@uninus/api/dto";
import { CollegeService } from "@uninus/api/services";
import {
  ICreateCourseRequest,
  ICreateCourseScheduleRequest,
  ICreateCurriculumRequest,
  ISelectDepartmentRequest,
  ISelectFacultyRequest,
  ISelectRequest,
  IUpdateCourseRequest,
  IUpdateCourseScheduleRequest,
  IUpdateCurriculumRequest,
  TCreateDepartmentRequest,
  TCreateFacultyRequest,
  TUpdateDepartmentRequest,
  TUpdateFacultyRequest,
} from "@uninus/entities";

@ApiTags("General:College")
@Controller()
export class CollegeController {
  constructor(private readonly appService: CollegeService) {}

  @ApiOperation({ summary: "Get Degree Program" })
  @ApiQuery({ type: SelectOptionDto })
  @Get("degree-program")
  async getDegreeProgram(@Query() query: ISelectRequest) {
    return await this.appService.getDegreeProgram(query);
  }

  @ApiOperation({ summary: "Get Faculty" })
  @ApiQuery({ type: GetFacultyDto })
  @Get("faculty")
  async getFaculty(@Query() query: ISelectFacultyRequest) {
    return await this.appService.getFaculty(query);
  }

  @ApiOperation({ summary: "Create new Faculty" })
  @ApiBody({ type: CreateFacultyDto })
  @Post("faculty")
  async createFaculty(@Body() payload: TCreateFacultyRequest) {
    return await this.appService.createFaculty(payload);
  }

  @ApiOperation({ summary: "Update faculty" })
  @ApiBody({ type: UpdateFacultyDto })
  @ApiParam({ name: "id", type: "integer", required: true })
  @Patch("faculty/:id")
  async updateFaculty(@Param("id") id: number, @Body() payload: TUpdateFacultyRequest) {
    return await this.appService.updateFaculty({ id, ...payload });
  }

  @ApiOperation({ summary: "Delete Faculty" })
  @ApiParam({ name: "id", type: "integer", required: true })
  @Delete("faculty/:id")
  async deleteFaculty(@Param("id") id: number) {
    return await this.appService.deleteFaculty({ id });
  }

  @ApiOperation({ summary: "Get Department" })
  @ApiQuery({ type: GetDepartmentDto })
  @Get("department")
  async getDepartment(@Query() query: ISelectDepartmentRequest) {
    return await this.appService.getDepartment(query);
  }

  @ApiOperation({ summary: "Create new Department" })
  @ApiBody({ type: CreateDepartmentDto })
  @Post("department")
  async createDepartment(@Body() payload: TCreateDepartmentRequest) {
    return await this.appService.createDepartment(payload);
  }

  @ApiOperation({ summary: "Update Department" })
  @ApiBody({ type: UpdateDepartmentDto })
  @ApiParam({ name: "id", type: "integer", required: true })
  @Patch("department/:id")
  async updateDepartment(@Param("id") id: number, @Body() payload: TUpdateDepartmentRequest) {
    return await this.appService.updateDepartment({ id, ...payload });
  }

  @ApiOperation({ summary: "Delete Department" })
  @ApiParam({ name: "id", type: "integer", required: true })
  @Delete("department/:id")
  async deleteDepartment(@Param("id") id: number) {
    return await this.appService.deleteDepartment({ id });
  }

  @ApiOperation({ summary: "Get Curriculum" })
  @ApiQuery({ type: SelectOptionDto })
  @Get("curriculum")
  async getCurriculum(@Query() query: ISelectRequest) {
    return await this.appService.getCurriculum(query);
  }

  @ApiOperation({ summary: "Get Curriculum By Id" })
  @ApiParam({ name: "id", type: "string", required: true })
  @Get("curriculum/:id")
  async getCurriculumById(@Param("id") id: string) {
    return await this.appService.getCurriculumById({ id });
  }

  @ApiOperation({ summary: "Create Curriculum" })
  @ApiBody({ type: CreateCurriculumDto })
  @Post("curriculum")
  async createCurriculum(@Body() payload: ICreateCurriculumRequest) {
    return await this.appService.createCurriculum(payload);
  }

  @ApiOperation({ summary: "Update Curriculum" })
  @ApiBody({ type: UpdateCurriculumDto })
  @ApiParam({ name: "id", type: "string", required: true })
  @Patch("curriculum/:id")
  async updateCurriculum(@Param("id") id: string, @Body() payload: IUpdateCurriculumRequest) {
    return await this.appService.updateCurriculum({ id, ...payload });
  }

  @ApiOperation({ summary: "Delete Curriculum" })
  @ApiParam({ name: "id", type: "string", required: true })
  @Delete("curriculum/:id")
  async deleteCurriculum(@Param("id") id: string) {
    return await this.appService.deleteCurriculum({ id });
  }

  @ApiOperation({ summary: "Get Courses" })
  @ApiQuery({ type: SelectOptionDto })
  @Get("course")
  async getCourses(@Query() query: ISelectRequest) {
    return await this.appService.getCourses(query);
  }

  @ApiOperation({ summary: "Get Course By Id" })
  @ApiParam({ name: "id", type: "string", required: true })
  @Get("course/:id")
  async getCourseById(@Param("id") id: string) {
    return await this.appService.getCourseById({ id });
  }

  @ApiOperation({ summary: "Create Course" })
  @ApiBody({ type: CreateCourseDto })
  @Post("course")
  async createCourse(@Body() payload: ICreateCourseRequest) {
    return await this.appService.createCourse(payload);
  }

  @ApiOperation({ summary: "Update Course" })
  @ApiBody({ type: UpdateCourseDto })
  @ApiParam({ name: "id", type: "string", required: true })
  @Patch("course/:id")
  async updateCourse(@Param("id") id: string, @Body() payload: IUpdateCourseRequest) {
    return await this.appService.updateCourse({ id, ...payload });
  }

  @ApiOperation({ summary: "Delete Course" })
  @ApiParam({ name: "id", type: "string", required: true })
  @Delete("course/:id")
  async deleteCourse(@Param("id") id: string) {
    return await this.appService.deleteCourse({ id });
  }

  @ApiOperation({ summary: "Get Course Schedule " })
  @ApiQuery({ type: SelectOptionDto })
  @Get("course/schedule")
  async getCourseSchedule(@Query() query: ISelectRequest) {
    return await this.appService.getCourseSchedule(query);
  }

  @ApiOperation({ summary: "Get Course Schedule By Id" })
  @ApiParam({ name: "id", type: "string", required: true })
  @Get("course/schedule/:id")
  async getCourseScheduleById(@Param("id") id: string) {
    return await this.appService.getCourseScheduleById({ id });
  }

  @ApiOperation({ summary: "Create Course Schedule" })
  @ApiBody({ type: CreateCourseScheduleDto })
  @Post("course/schedule")
  async createCourseSchedule(@Body() payload: ICreateCourseScheduleRequest) {
    return await this.appService.createCourseSchedule(payload);
  }

  @ApiOperation({ summary: "Update Course Schedule" })
  @ApiBody({ type: UpdateCourseScheduleDto })
  @ApiParam({ name: "id", type: "string", required: true })
  @Patch("course/schedule/:id")
  async updateCourseSchedule(
    @Param("id") id: string,
    @Body() payload: IUpdateCourseScheduleRequest,
  ) {
    return await this.appService.updateCourseSchedule({ id, ...payload });
  }

  @ApiOperation({ summary: "Delete Course Schedule" })
  @ApiParam({ name: "id", type: "string", required: true })
  @Delete("course/schedule/:id")
  async deleteCourseSchedule(@Param("id") id: string) {
    return await this.appService.deleteCourseSchedule({ id });
  }
}
