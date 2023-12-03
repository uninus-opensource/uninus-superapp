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
  @ApiProperty({
    type: "string",
    required: false,
  })
  public degree_program_id!: number;
}

export class CreateSelectionPathDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  public name!: string;
  @ApiProperty({
    type: "string",
    required: false,
  })
  public degree_program_id!: number;
}

export class UpdateSelectionPathDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  public name!: string;
  @ApiProperty({
    type: "string",
    required: false,
  })
  public degree_program_id!: number;
}

export class GetRegistransDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  public filter_type!: string;
  @ApiProperty({
    type: "string",
    required: false,
  })
  public start_date!: string;
  @ApiProperty({
    type: "string",
    required: false,
  })
  public end_date!: string;
}

export class GetInterestProgramsDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  public filter_type!: string;
}

export class GetInterestDepartmentDto extends GetInterestProgramsDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  public degree_program_id!: string;
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
  public correct_answer!: string;

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
