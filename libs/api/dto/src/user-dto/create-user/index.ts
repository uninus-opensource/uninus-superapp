import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  public email!: string;

  @ApiProperty()
  public phone_number!: string;

  @ApiProperty()
  public fullname!: string;

  @ApiProperty({
    example: "min length 6, upper case 1, numbers 1",
  })
  public password!: string;
}
