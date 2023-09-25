import { ApiProperty } from "@nestjs/swagger";

export class ResendOtpDto {
  @ApiProperty({
    example: "test@gmail.com",
  })
  public email!: string;
}
