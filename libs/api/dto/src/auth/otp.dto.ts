import { ApiProperty } from "@nestjs/swagger";

export class ResendOtpDto {
  @ApiProperty({
    example: "test@gmail.com",
  })
  public email!: string;
}
export class VerifyOtpDto {
  @ApiProperty({
    example: "test@gmail.com",
  })
  public email!: string;

  @ApiProperty({
    example: "8298263",
  })
  public otp!: string;
}
