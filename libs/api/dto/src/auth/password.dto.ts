import { ApiProperty } from "@nestjs/swagger";

export class NewPasswordDto {
  @ApiProperty({
    example: "test@gmail.com",
  })
  public email!: string;

  @ApiProperty({
    example: "Test1234",
    description: "Password harus lebih dari 6 karakter",
    minLength: 6,
    type: "string",
  })
  public password!: string;
}

export class ForgotPasswordDto {
  @ApiProperty({
    example: "test@gmail.com",
  })
  public email!: string;
}
