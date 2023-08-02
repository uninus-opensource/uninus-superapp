import { ApiProperty } from "@nestjs/swagger";
export class verifyOtpSwagger {
  @ApiProperty({
    example: "",
  })
  public email!: string;

  @ApiProperty({
    example: "length 6",
  })
  public otp!: string;
}
