import { ApiProperty } from "@nestjs/swagger";

export class CreateFaculty {
  @ApiProperty({
    example: "Fakultas Keamanan Informasi",
    type: "string",
  })
  public name!: string;

  @ApiProperty({
    example: 1,
    type: "integer",
  })
  public degree_program_id!: number;
}

export class UpdateFaculty {
  @ApiProperty({
    example: "Fakultas Keamanan Informasi",
    type: "string",
  })
  public name!: string;

  @ApiProperty({
    example: 1,
    type: "integer",
  })
  public degree_program_id?: number;
}

export class CreateDepartment {
  @ApiProperty({
    example: "S1 - Cyber Security",
    type: "string",
  })
  public name!: string;

  @ApiProperty({
    example: 1,
    type: "integer",
  })
  public faculty_id!: number;

  @ApiProperty({
    example: 1,
    type: "integer",
  })
  public degree_program_id!: number;
}

export class CreateSelectionPath {
  @ApiProperty({
    example: "Seleksi Akademik",
    type: "string",
  })
  public name!: string;

  @ApiProperty({
    example: 1,
    type: "integer",
  })
  public degree_program_id!: number;
}

export class CreateEducation {
  @ApiProperty({
    example: "12345678",
    type: "string",
  })
  public npsn!: string;

  @ApiProperty({
    example: "SMA Wakanda",
    type: "string",
  })
  public name!: string;

  @ApiProperty({
    example: "Jawa barat",
    type: "string",
  })
  public province!: string;

  @ApiProperty({
    example: "Bandung",
    type: "string",
  })
  public district_city!: string;

  @ApiProperty({
    example: "Buah batu",
    type: "string",
  })
  public sub_district!: string;

  @ApiProperty({
    example: "Jl Setiabudi no 192, Rw 002 Rt 003",
    type: "string",
  })
  public street_address!: string;

  @ApiProperty({
    example: 1,
    type: "integer",
  })
  public education_type_id!: number;
}

export class CreateScholarship {
  @ApiProperty({
    example: "Beasiswa Gubernur jawabarat",
    type: "string",
  })
  public name!: string;
}

export class createQuestion {
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
