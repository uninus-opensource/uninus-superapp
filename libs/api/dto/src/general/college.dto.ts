import { ApiProperty } from "@nestjs/swagger";

export class SelectOptionDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  public search!: string;
}

export class GetFacultyDto extends SelectOptionDto {
  @ApiProperty({
    type: "integer",
    required: false,
  })
  public degree_program_id!: number;
}

export class CreateFacultyDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  public name!: string;
  @ApiProperty({
    type: "integer",
    required: false,
  })
  public degree_program_id!: number;
}

export class UpdateFacultyDto extends CreateFacultyDto {}

export class CreateDepartmentDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  public name!: string;

  @ApiProperty({
    type: "integer",
    required: false,
  })
  public degree_program_id!: number;
  @ApiProperty({
    type: "integer",
    required: false,
  })
  public faculty_id!: number;
}

export class GetDepartmentDto extends SelectOptionDto {
  @ApiProperty({
    type: "integer",
    required: false,
  })
  public degree_program_id!: number;
  @ApiProperty({
    type: "integer",
    required: false,
  })
  public faculty_id!: number;
}

export class UpdateDepartmentDto extends CreateDepartmentDto {}

export class CreateCurriculumDto {
  @ApiProperty({
    type: "string",
    required: true,
  })
  public name!: number;
  @ApiProperty({
    type: "integer",
    required: true,
  })
  public degree_program_id!: number;
  @ApiProperty({
    type: "integer",
    required: true,
  })
  public faculty_id!: number;
  @ApiProperty({
    type: "integer",
    required: true,
  })
  public department_id!: number;
  @ApiProperty({
    type: "string",
    required: true,
  })
  public batch!: string;
  @ApiProperty({
    type: "string",
    required: true,
  })
  public release_year!: string;
  @ApiProperty({
    type: "string",
    required: true,
  })
  public in_effect!: string;
}

export class UpdateCurriculumDto extends CreateCurriculumDto {
  @ApiProperty({
    type: "string",
    required: true,
  })
  public status!: string;
}

export class CreateCourseDto {
  @ApiProperty({
    type: "string",
    required: true,
  })
  public name!: string;

  @ApiProperty({
    type: "string",
    required: true,
  })
  public course_code!: string;

  @ApiProperty({
    type: "string",
    required: true,
  })
  public curriculum_id!: string;
  @ApiProperty({
    type: "string",
    required: true,
  })
  public category_id!: number;
  @ApiProperty({
    type: "string",
    required: true,
  })
  public course_type_id!: number;
  @ApiProperty({
    type: "string",
    required: true,
  })
  @ApiProperty({
    type: "string",
    required: true,
  })
  public credit!: number;
  @ApiProperty({
    type: "string",
    required: true,
  })
  public semester!: number;
}

export class UpdateCourseDto extends CreateCourseDto {
  @ApiProperty({
    required: true,
  })
  public status!: number;
}

export class CreateCourseScheduleDto {
  @ApiProperty({
    required: true,
  })
  public semester!: number;
  @ApiProperty({
    required: true,
  })
  public class!: string;
  @ApiProperty({
    required: true,
  })
  public course_id!: string;
  @ApiProperty({
    required: true,
  })
  public schedule_id!: string;
  @ApiProperty({
    required: true,
  })
  public capacity!: number;
  @ApiProperty({
    required: true,
  })
  public total_students!: number;
}

export class UpdateCourseScheduleDto extends CreateCourseScheduleDto {}

export class CreateScheduleDto {
  @ApiProperty({
    required: true,
  })
  public day!: string;
  @ApiProperty({
    required: true,
  })
  public start_time!: string;
  @ApiProperty({
    required: true,
  })
  public end_time!: string;
}

export class UpdateScheduleDto extends CreateScheduleDto {}
