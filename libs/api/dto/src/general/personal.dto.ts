import { ApiProperty } from "@nestjs/swagger";
export class CreateLastEducationDto {
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

export class UpdateLastEducationDto extends CreateLastEducationDto {}

export class GetCityDto {
  @ApiProperty({
    required: false,
    type: "string",
  })
  public search!: string;

  @ApiProperty({
    required: false,
    type: "integer",
  })
  public province_id!: number;
}

export class GetSubDistrictDto {
  @ApiProperty({
    required: false,
    type: "string",
  })
  public search!: string;

  @ApiProperty({
    required: false,
    type: "integer",
  })
  public city_id!: number;
}

export class GetCountryDto {
  @ApiProperty({
    required: false,
    type: "string",
  })
  public search!: string;

  @ApiProperty({
    required: false,
    type: "integer",
  })
  public citizenship_id!: number;
}

export class GetLastEducationDto {
  @ApiProperty({
    required: false,
    type: "string",
  })
  public search!: string;

  @ApiProperty({
    required: false,
    type: "string",
  })
  public npsn!: string;
}

export class GetLastEducationTypeDto {
  @ApiProperty({
    required: false,
    type: "string",
  })
  public search!: string;

  @ApiProperty({
    required: false,
    type: "string",
  })
  public degree_program_id!: string;
}

export class GetLastMajorTypeDto {
  @ApiProperty({
    required: false,
    type: "string",
  })
  public search!: string;

  @ApiProperty({
    required: false,
    type: "string",
  })
  public education_type_id!: string;
}
