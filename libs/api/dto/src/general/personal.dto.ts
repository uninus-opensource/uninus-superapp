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
  public city!: string;

  @ApiProperty({
    example: "Buah batu",
    type: "string",
  })
  public subdistrict!: string;

  @ApiProperty({
    example: "Jl Setiabudi no 192, Rw 002 Rt 003",
    type: "string",
  })
  public streetAddress!: string;

  @ApiProperty({
    type: "string",
  })
  public educationTypeId!: number;
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
  public provinceId!: number;
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
  public cityId!: number;
}

export class GetCountryDto {
  @ApiProperty({
    required: false,
  })
  public search!: string;

  @ApiProperty({
    required: false,
  })
  public citizenshipId!: string;
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
  public degreeProgramId!: string;
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
  public educationTypeId!: string;
}
