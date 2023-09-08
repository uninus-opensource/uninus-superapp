import { ApiProperty } from "@nestjs/swagger";
export class ForgotPasswordSwagger {
  @ApiProperty({
    example: "user@example.com",
  })
  public email!: string;
}
