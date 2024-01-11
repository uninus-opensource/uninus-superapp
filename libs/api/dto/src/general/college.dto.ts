import { ApiProperty } from "@nestjs/swagger";

export class SelectOptionDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  public search!: string;
}

export class GetFacultyDto extends SelectOptionDto {
  @ApiProperty({ required: false, type: "string", format: "uuid" })
  public degreeProgramId!: string;
}

export class CreateFacultyDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  public name!: string;
  @ApiProperty({ required: false, type: "string", format: "uuid" })
  public degreeProgramId!: string;
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
  @ApiProperty({ required: false, type: "string", format: "uuid" })
  public facultyId!: string;
}

export class GetDepartmentDto extends SelectOptionDto {
  @ApiProperty({ required: false, type: "string", format: "uuid" })
  public degreeProgramId!: string;
  @ApiProperty({ required: false, type: "string", format: "uuid" })
  public facultyId!: string;
}

export class UpdateDepartmentDto extends CreateDepartmentDto {}
