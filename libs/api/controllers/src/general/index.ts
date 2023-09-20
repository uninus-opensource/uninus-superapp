import {
  Controller,
  Get,
  Query,
  Post,
  Delete,
  Body,
  Put,
  Param,
  Inject,
  UseFilters,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from "@nestjs/swagger";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom, throwError } from "rxjs";
import { TCreateQuestionRequest, TProfileResponse, TUpdateQuestionRequest } from "@uninus/entities";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/filter";

@Controller()
@ApiTags("General")
export class GeneralController {
  constructor(@Inject("GENERAL_SERVICE") private readonly client: ClientProxy) {}
  @Get("province")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Province" })
  @ApiResponse({
    status: 400,
    description: "Location Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  async getProvince(@Query("search") search: string, @Query("id") id: number) {
    const response = await firstValueFrom(
      this.client
        .send("get_province", { search, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("city")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get City" })
  @ApiResponse({
    status: 400,
    description: "Location Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "province_id", required: false })
  async getCity(
    @Query("id") id: number,
    @Query("province_id") province_id: string,
    @Query("search") search: string,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("get_city", { province_id, search, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("subdistrict")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Sub District" })
  @ApiResponse({
    status: 400,
    description: "Location Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "city_id", required: false })
  async getSubDistrict(
    @Query("id") id: number,
    @Query("city_id") city_id: string,
    @Query("search") search: string,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("get_subdistrict", { city_id, search, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("degree-program")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Degree Program" })
  @ApiResponse({
    status: 400,
    description: "Degree Program Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  async getDegreeProgram(@Query("search") search: string, @Query("id") id: number) {
    const response = await firstValueFrom(
      this.client
        .send("get_degree", { search, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("faculty")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Faculty" })
  @ApiResponse({
    status: 400,
    description: "Faculty Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "degree_program_id", required: false })
  @ApiQuery({ name: "id", required: false })
  async getFaculty(
    @Query("id") id: number,
    @Query("search") search: string,
    @Query("degree_program_id") degree_program_id: number,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("get_faculty", { search, degree_program_id, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("department")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Department" })
  @ApiResponse({
    status: 400,
    description: "Department Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "faculty_id", required: false })
  @ApiQuery({ name: "degree_program_id", required: false })
  async getDepartment(
    @Query("id") id: number,
    @Query("search") search: string,
    @Query("faculty_id") faculty_id: string,
    @Query("degree_program_id") degree_program_id: string,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("get_department", { search, faculty_id, degree_program_id, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("religion")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Religion" })
  @ApiResponse({
    status: 400,
    description: "Religion Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  async getReligion(@Query("id") id: number, @Query("search") search: string) {
    const response = await firstValueFrom(
      this.client
        .send("get_religion", { search, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("marital-status")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Marital Status" })
  @ApiResponse({
    status: 400,
    description: "Marital Status Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  async getMaritalStatus(@Query("id") id: number, @Query("search") search: string) {
    const response = await firstValueFrom(
      this.client
        .send("get_marital_status", { search, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("gender")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Gender" })
  @ApiResponse({
    status: 400,
    description: "Gender Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  async getGender(@Query("id") id: number, @Query("search") search: string) {
    const response = await firstValueFrom(
      this.client
        .send("get_gender", { search, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("citizenship")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Citizenship" })
  @ApiResponse({
    status: 400,
    description: "Citizenship Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  async getCitizenship(@Query("id") id: number, @Query("search") search: string) {
    const response = await firstValueFrom(
      this.client
        .send("get_citizenship", { search, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("selection-path")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Selection Path" })
  @ApiResponse({
    status: 400,
    description: "Selection Path Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "degree_program_id", required: false })
  async getSelectionPath(
    @Query("id") id: number,
    @Query("search") search: string,
    @Query("degree_program_id") degree_program_id: number,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("get_selection_path", { search, id, degree_program_id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("salary")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Salary" })
  @ApiResponse({
    status: 400,
    description: "Salary Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  async getSalary(@Query("id") id: number, @Query("search") search: string) {
    const response = await firstValueFrom(
      this.client
        .send("get_salary", { search, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("education")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Education History" })
  @ApiResponse({
    status: 400,
    description: "Education History Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "npsn", required: false })
  async getEducationHistory(
    @Query("id") id: number,
    @Query("search") search: string,
    @Query("npsn") npsn: string,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("get_education_history", { search, npsn, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("country")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Country" })
  @ApiResponse({
    status: 400,
    description: "Country Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "citizenship_id", required: false })
  async getCountry(
    @Query("id") id: number,
    @Query("search") search: string,
    @Query("citizenship_id") citizenship_id: string,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("get_country", { search, citizenship_id, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("occupation")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Occupation" })
  @ApiResponse({
    status: 400,
    description: "Occupation Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  async getOccupation(@Query("id") id: number, @Query("search") search: string) {
    const response = await firstValueFrom(
      this.client
        .send("get_occupation", { search, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("occupation-position")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Occupation Position" })
  @ApiResponse({
    status: 400,
    description: "Occupation Position Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "occupation_id", required: false })
  async getOccupationPosition(
    @Query("id") id: number,
    @Query("search") search: string,
    @Query("occupation_id") occupation_id: string,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("get_occupation_position", { search, occupation_id, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("disabilities")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Disabilities" })
  @ApiResponse({
    status: 400,
    description: "Disabilities Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  async getDisablities(@Query("id") id: number, @Query("search") search: string) {
    const response = await firstValueFrom(
      this.client
        .send("get_dissabilities", { search, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("year-graduate")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Year Graduate" })
  @ApiResponse({
    status: 400,
    description: "Year Graduate Not Found",
  })
  async getYearGraduate() {
    const response = await firstValueFrom(
      this.client
        .send("get_year_graduate", {})
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("scholarship")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Scholarship" })
  @ApiResponse({
    status: 400,
    description: "Scholarship Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  async getScholarship(@Query("id") id: number, @Query("search") search: string) {
    const response = await firstValueFrom(
      this.client
        .send("get_scholarship", { search, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("education-type")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get Education Type" })
  @ApiResponse({
    status: 400,
    description: "Education Type Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "degree_program_id", required: false })
  async getSchoolType(
    @Query("id") id: number,
    @Query("search") search: string,
    @Query("degree_program_id") degree_program_id: number,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("get_education_type", { search, id, degree_program_id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("questions")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Get All Questions" })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error",
  })
  async getAllQuestions() {
    const response = await firstValueFrom(
      this.client
        .send("get_question", {})
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Post("create-question")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Create Questions" })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error",
  })
  async createQuestion(@Body() createQuestion: TCreateQuestionRequest) {
    const response = await firstValueFrom(
      this.client
        .send("create_question", { createQuestion })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Put("update-question/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Update question by Id" })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error",
  })
  async updateQuestionById(
    @Param("id") id: string,
    @Body() updateQuestion: TUpdateQuestionRequest,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("update_question", { id, updateQuestion })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Delete("delete-question/:id")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  @ApiOperation({ summary: "Delete question by Id" })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error",
  })
  async deleteQuestionById(@Param("id") id: string) {
    const response = await firstValueFrom(
      this.client
        .send("delete_question", { id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("parent-status")
  @ApiOperation({ summary: "Get Parent Status" })
  @ApiResponse({
    status: 400,
    description: "Parent Status Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  async getParentStatus(@Query("id") id: number, @Query("search") search: string) {
    const response = await firstValueFrom(
      this.client
        .send("get_parent_status", { search, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("education-major")
  @ApiOperation({ summary: "Get School Type Major" })
  @ApiResponse({
    status: 400,
    description: "School Type Major Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "education_type_id", required: false })
  @ApiQuery({ name: "id", required: false })
  async getSchoolMajor(
    @Query("id") id: number,
    @Query("search") search: string,
    @Query("education_type_id") education_type_id: string,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("get_education_major", {
          search,
          education_type_id,
          id,
        })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("parent-education")
  @ApiOperation({ summary: "Get Parent Education" })
  @ApiResponse({
    status: 400,
    description: "Parent Education Not Found",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  async getParentEducation(@Query("id") id: number, @Query("search") search: string) {
    const response = await firstValueFrom(
      this.client
        .send("get_parent_education", {
          search,
          id,
        })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("registrans")
  @ApiOperation({ summary: "Get Total Registrans" })
  @ApiResponse({
    status: 500,
    description:
      "Invalid filter type or start_type and end_date must be filled when selecting a filter range",
  })
  @ApiQuery({ name: "filter_type", required: false })
  @ApiQuery({ name: "start_date", required: false })
  @ApiQuery({ name: "end_date", required: false })
  async getRegistrans(
    @Query("filter_type") filter_type: string,
    @Query("start_date") start_date: string,
    @Query("end_date") end_date: string,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("get_registrans", { filter_type, start_date, end_date })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  @Get("interest-programs")
  @ApiOperation({ summary: "Get Total Interest Education Program" })
  @ApiResponse({
    status: 500,
    description: "Invalid Type Filter",
  })
  @ApiQuery({ name: "filter_type", required: false })
  async getInterestPrograms(@Query("filter_type") filter_type: string) {
    const response = await firstValueFrom(
      this.client
        .send("get_interest_education_program", { filter_type })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    return response;
  }

  @Get("interest-department")
  @ApiOperation({ summary: "Get Total Interest Department" })
  @ApiResponse({
    status: 500,
    description: "Invalid Type Filter",
  })
  @ApiQuery({ name: "filter_type", required: false })
  @ApiQuery({ name: "degree_program_id", required: false })
  async getInterestDepartment(
    @Query("filter_type") filter_type: string,
    @Query("degree_program_id") degree_program_id: number,
  ) {
    const response = await firstValueFrom(
      this.client
        .send("get_interest_department", { filter_type, degree_program_id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    return response;
  }

  @Get("registration_status")
  @ApiOperation({ summary: "Get registration status" })
  @ApiResponse({
    status: 500,
    description: "Status pendaftaran tidak ditemukan",
  })
  @ApiQuery({ name: "id", required: false })
  @ApiQuery({ name: "search", required: false })
  async getRegistrationStatus(@Query("id") id: number, @Query("search") search: string) {
    const response = await firstValueFrom(
      this.client
        .send("get_registration_status", { search, id })
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );

    return response;
  }

  @ApiOperation({ summary: "Get Data Student Pagination" })
  @ApiResponse({
    status: 500,
    description: "Status pendaftaran tidak ditemukan",
  })
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "per_page", required: false })
  @ApiQuery({ name: "order_by", required: false })
  @ApiQuery({ name: "filter_by", required: false })
  @ApiQuery({ name: "search", required: false })
  @Get("/pagination-page")
  @UseFilters(new RpcExceptionToHttpExceptionFilter())
  async getPMBPagination(
    @Query("page") page: number,
    @Query("per_page") perPage: number,
    @Query("order_by") orderBy: "asc" | "desc",
    @Query("filter_by") filterBy: string,
    @Query("search") search: string,
  ) {
    const response = await firstValueFrom(
      this.client
        .send<Array<TProfileResponse>>("get_registrans_pagination", {
          where: {
            registration_number: {
              contains: search || "",
              mode: "insensitive",
            },
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
}
