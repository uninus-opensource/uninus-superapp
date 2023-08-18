import { ApiProperty } from "@nestjs/swagger";

export class RegisterSwagger {
  @ApiProperty()
  public fullname!: string;

  @ApiProperty({
    description: "Email tidak valid",
    type: "string",
    format: "email",
  })
  public email!: string;

  @ApiProperty({
    description: "Password harus lebih dari 6 karakter",
    minLength: 6,
    type: "string",
  })
  public password!: string;

  @ApiProperty()
  public phone_number!: string;

  @ApiProperty()
  public role_id?: number;
}
