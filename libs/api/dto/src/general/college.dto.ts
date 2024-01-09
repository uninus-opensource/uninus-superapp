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
  public degreeProgramId!: number;
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
  public degreeProgramId!: number;
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
  public degreeProgramId!: number;
  @ApiProperty({
    type: "integer",
    required: false,
  })
  public facultyId!: number;
}

export class GetDepartmentDto extends SelectOptionDto {
  @ApiProperty({
    type: "integer",
    required: false,
  })
  public degreeProgramId!: number;
  @ApiProperty({
    type: "integer",
    required: false,
  })
  public facultyId!: number;
}

export class UpdateDepartmentDto extends CreateDepartmentDto {}
