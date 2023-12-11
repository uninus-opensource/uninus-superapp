import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  public email!: string;

  @ApiProperty()
  public phone_number!: string;

  @ApiProperty()
  public role_id!: number;

  @ApiProperty()
  public fullname!: string;

  @ApiProperty({
    example: "min length 6, upper case 1, numbers 1",
  })
  public password!: string;
}

export class UpdateUserDto {
  @ApiProperty()
  public email!: string;

  @ApiProperty()
  public fullname!: string;

  @ApiProperty({
    example: "min length 6, upper case 1, numbers 1",
  })
  public password!: string;
}

export class CreateNotificationDto {
  @ApiProperty({ required: true })
  public title!: string;

  @ApiProperty({ required: true })
  public detail!: string;

  @ApiProperty({ required: false })
  public user_id!: string;
}
