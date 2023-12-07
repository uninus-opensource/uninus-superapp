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

// export type TCreateCurriculumRequest = {
//   name: string;
//   degree_program_id: number;
//   faculty_id: number;
//   department_id: number;
//   batch: string;
//   release_year: string;
//   in_effect: string;
//   status: string;
// };

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
