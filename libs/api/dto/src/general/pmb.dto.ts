import { ApiProperty } from "@nestjs/swagger";

export class CreateScholarshipDto {
  @ApiProperty({
    example: "Beasiswa Gubernur jawabarat",
    type: "string",
  })
  public name!: string;
}

export class UpdateScholarshipDto extends CreateScholarshipDto {}

export class GetSelectionPathDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  public search!: string;
  @ApiProperty({ required: false, type: "string", format: "uuid" })
  public degreeProgramId!: string;
}

export class CreateSelectionPathDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  public name!: string;
  @ApiProperty({ required: false, type: "string", format: "uuid" })
  public degreeProgramId!: string;
}

export class UpdateSelectionPathDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  public name!: string;
  @ApiProperty({ required: false, type: "string", format: "uuid" })
  public degreeProgramId!: string;
}

export class GetRegistransDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  public filterType!: string;
  @ApiProperty({
    type: "string",
    required: false,
  })
  public startDate!: string;
  @ApiProperty({
    type: "string",
    required: false,
  })
  public endDate!: string;
}

export class GetInterestProgramsDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  public filterType!: string;
}

export class GetInterestDepartmentDto extends GetInterestProgramsDto {
  @ApiProperty({ required: false, type: "string", format: "uuid" })
  public degreeProgramId!: string;
}

export class CreateAdmissionDto {
  @ApiProperty({
    example: "Kapan Indonesia Merdeka?",
    type: "string",
  })
  public question!: string;

  @ApiProperty({
    example: "1945",
    type: "string",
  })
  public correctAnswer!: string;

  @ApiProperty({
    example: {
      A: "1945",
      B: "1923",
      C: "2000",
      D: "1909",
    },
    type: "object",
  })
  public answers!: object;
}

export class UpdateAdmissionDto extends CreateAdmissionDto {}
