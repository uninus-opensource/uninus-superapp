import { ApiProperty } from "@nestjs/swagger";
export class ForgotPasswordDto {
  @ApiProperty({
    example: "test@gmail.com",
  })
  public email!: string;
}
