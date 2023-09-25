import { ApiProperty } from "@nestjs/swagger";

export class ReqUserDto {
  @ApiProperty({
    example: "",
  })
  public email!: string;

  @ApiProperty({
    example: "41037006280",
  })
  public nik!: string;
}
