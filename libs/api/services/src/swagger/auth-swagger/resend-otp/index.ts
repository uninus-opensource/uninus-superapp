import { ApiProperty } from "@nestjs/swagger";

export class ResendOtpSwagger {
  @ApiProperty({
    example: "",
  })
  public email!: string;
}
