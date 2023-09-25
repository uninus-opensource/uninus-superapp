import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: "test@gmail.com",
  })
  public email!: string;

  @ApiProperty({
    example: "Test1234",
    description: "Min length 6, upper case 1, numbers 1",
  })
  public password!: string;
}
