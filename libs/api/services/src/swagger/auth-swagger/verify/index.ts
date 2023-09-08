import { ApiProperty } from "@nestjs/swagger";
export class VerifyOtpSwagger {
  @ApiProperty({
    example: "",
  })
  public email!: string;

  @ApiProperty({
    example: "length 6",
  })
  public otp!: string;
}
