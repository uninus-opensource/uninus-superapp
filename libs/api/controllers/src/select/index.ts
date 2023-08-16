import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from "@nestjs/swagger";
import { SelectService } from "@uninus/api/services";

@Controller()
@ApiTags("Select")
export class SelectController {
  constructor(private readonly appService: SelectService) {}

  @Get("province")
  @ApiOperation({ summary: "Get Province" })
  @ApiResponse({
    status: 400,
    description: "Location Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  getProvince(@Query("id") id: number, @Query("search") search: string) {
    return this.appService.getProvince({ search, id });
  }

  @Get("city")
  @ApiOperation({ summary: "Get City" })
  @ApiResponse({
    status: 400,
    description: "Location Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "province_id", required: false })
  @ApiQuery({ name: "id", required: false })
  getCity(
    @Query("id") id: number,
    @Query("province_id") province_id: string,
    @Query("search") search: string,
  ) {
    return this.appService.getCity({ province_id, search, id });
  }

  @Get("sub-district")
  @ApiOperation({ summary: "Get Sub District" })
  @ApiResponse({
    status: 400,
    description: "Location Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "city_id", required: false })
  @ApiQuery({ name: "id", required: false })
  getSubDistrict(
    @Query("id") id: number,
    @Query("city_id") city_id: string,
    @Query("search") search: string,
  ) {
    return this.appService.getSubDistrict({ city_id, search, id });
  }

  @Get("degree-program")
  @ApiOperation({ summary: "Get Degree Program" })
  @ApiResponse({
    status: 400,
    description: "Degree Program Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  getDegreeProgram(@Query("search") search: string, @Query("id") id: number) {
    return this.appService.getDegreeProgram({ search, id });
  }

  @Get("faculty")
  @ApiOperation({ summary: "Get Faculty" })
  @ApiResponse({
    status: 400,
    description: "Faculty Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "degree_program_id", required: false })
  @ApiQuery({ name: "id", required: false })
  getFaculty(
    @Query("id") id: number,
    @Query("search") search: string,
    @Query("degree_program_id") degree_program_id: string,
  ) {
    return this.appService.getFaculty({ search, degree_program_id, id });
  }

  @Get("department")
  @ApiOperation({ summary: "Get Department" })
  @ApiResponse({
    status: 400,
    description: "Department Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "faculty_id", required: false })
  @ApiQuery({ name: "degree_program_id", required: false })
  @ApiQuery({ name: "id", required: false })
  getDepartment(
    @Query("id") id: number,
    @Query("search") search: string,
    @Query("faculty_id") faculty_id: string,
    @Query("degree_program_id") degree_program_id: string,
  ) {
    return this.appService.getDepartment({ search, faculty_id, degree_program_id, id });
  }

  @Get("religion")
  @ApiOperation({ summary: "Get Religion" })
  @ApiResponse({
    status: 400,
    description: "Religion Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  getReligion(@Query("id") id: number, @Query("search") search: string) {
    return this.appService.getReligion({ search, id });
  }

  @Get("marital-status")
  @ApiOperation({ summary: "Get Marital Status" })
  @ApiResponse({
    status: 400,
    description: "Marital Status Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  getMaritalStatus(@Query("id") id: number, @Query("search") search: string) {
    return this.appService.getMaritalStatus({ search, id });
  }

  @Get("gender")
  @ApiOperation({ summary: "Get Gender" })
  @ApiResponse({
    status: 400,
    description: "Gender Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  getGender(@Query("id") id: number, @Query("search") search: string) {
    return this.appService.getGender({ search, id });
  }

  @Get("citizenship")
  @ApiOperation({ summary: "Get Citizenship" })
  @ApiResponse({
    status: 400,
    description: "Citizenship Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  getCitizenship(@Query("id") id: number, @Query("search") search: string) {
    return this.appService.getCitizenship({ search, id });
  }

  @Get("selection-path")
  @ApiOperation({ summary: "Get Selection Path" })
  @ApiResponse({
    status: 400,
    description: "Selection Path Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  getSelectionPath(@Query("id") id: number, @Query("search") search: string) {
    return this.appService.getSelectionPath({ search, id });
  }

  @Get("salary")
  @ApiOperation({ summary: "Get Salary" })
  @ApiResponse({
    status: 400,
    description: "Salary Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  getSalary(@Query("id") id: number, @Query("search") search: string) {
    return this.appService.getSalary({ search, id });
  }

  @Get("education-history")
  @ApiOperation({ summary: "Get Education History" })
  @ApiResponse({
    status: 400,
    description: "Education History Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "npsn", required: false })
  @ApiQuery({ name: "id", required: false })
  getEducationHistory(
    @Query("id") id: number,
    @Query("search") search: string,
    @Query("npsn") npsn: string,
  ) {
    return this.appService.getEducationHistory({ search, npsn, id });
  }

  @Get("country")
  @ApiOperation({ summary: "Get Country" })
  @ApiResponse({
    status: 400,
    description: "Country Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "citizenship_id", required: false })
  @ApiQuery({ name: "id", required: false })
  getCountry(
    @Query("id") id: number,
    @Query("search") search: string,
    @Query("citizenship") citizenship_id: string,
  ) {
    return this.appService.getCountry({ search, citizenship_id, id });
  }

  @Get("occupation")
  @ApiOperation({ summary: "Get Occupation" })
  @ApiResponse({
    status: 400,
    description: "Occupation Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  getOccupation(@Query("id") id: number, @Query("search") search: string) {
    return this.appService.getOccupation({ search, id });
  }

  @Get("occupation-position")
  @ApiOperation({ summary: "Get Occupation Position" })
  @ApiResponse({
    status: 400,
    description: "Occupation Position Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "occupation_id", required: false })
  @ApiQuery({ name: "id", required: false })
  getOccupationPosition(
    @Query("id") id: number,
    @Query("search") search: string,
    @Query("occupation_id") occupation_id: string,
  ) {
    return this.appService.getOccupationPosition({ search, occupation_id, id });
  }

  @Get("disabilities")
  @ApiOperation({ summary: "Get Disabilities" })
  @ApiResponse({
    status: 400,
    description: "Disabilities Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  getDisablities(@Query("id") id: number, @Query("search") search: string) {
    return this.appService.getDisabilites({ search, id });
  }

  @Get("year-graduate")
  @ApiOperation({ summary: "Get Year Graduate" })
  @ApiResponse({
    status: 400,
    description: "Year Graduate Not Found",
  })
  getYearGraduate() {
    return this.appService.getYearGraduate();
  }

  @Get("scholarship")
  @ApiOperation({ summary: "Get Scholarship" })
  @ApiResponse({
    status: 400,
    description: "Scholarship Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  getScholarship(@Query("id") id: number, @Query("search") search: string) {
    return this.appService.getScholarship({ search, id });
  }

  @Get("school-type")
  @ApiOperation({ summary: "Get School Type" })
  @ApiResponse({
    status: 400,
    description: "School Type Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  getSchoolType(@Query("id") id: number, @Query("search") search: string) {
    return this.appService.getSchoolType({ search, id });
  }

  @Get("parent-status")
  @ApiOperation({ summary: "Get Parent Status" })
  @ApiResponse({
    status: 400,
    description: "Parent Status Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "id", required: false })
  getParentStatus(@Query("id") id: number, @Query("search") search: string) {
    return this.appService.getParentStatus({ search, id });
  }

  @Get("school-type-major")
  @ApiOperation({ summary: "Get School Type Major" })
  @ApiResponse({
    status: 400,
    description: "School Type Major Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "school_type_id", required: false })
  @ApiQuery({ name: "id", required: false })
  getSchoolMajor(
    @Query("id") id: number,
    @Query("search") search: string,
    @Query("school_type_id") school_type_id: string,
  ) {
    return this.appService.getSchoolMajor({ search, school_type_id, id });
  }
}
