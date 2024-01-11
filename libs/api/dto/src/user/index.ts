import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  public email!: string;

  @ApiProperty()
  public phoneNumber!: string;

  @ApiProperty({ type: "string", format: "uuid" })
  public roleIdd!: string;

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

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  public userId!: string;
}
