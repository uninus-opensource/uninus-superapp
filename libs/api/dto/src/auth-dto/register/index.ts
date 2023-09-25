import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({
    example: "John Doe",
    type: "string",
  })
  public fullname!: string;

  @ApiProperty({
    example: "test@gmail.com",
    type: "string",
    format: "email",
  })
  public email!: string;

  @ApiProperty({
    example: "Test1234",
    description: "Password harus lebih dari 6 karakter",
    minLength: 6,
    type: "string",
  })
  public password!: string;

  @ApiProperty({
    example: "8924798214124",
    minLength: 11,
    type: "string",
  })
  public phone_number!: string;

  @ApiProperty({
    example: "1",
    type: "number",
  })
  public role_id!: number;
}
