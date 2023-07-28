import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserSwagger {
  @ApiProperty()
  public email!: string;

  @ApiProperty()
  public nik!: string;

  @ApiProperty()
  public fullname!: string;

  @ApiProperty({
    example: 'min length 6, upper case 1, numbers 1',
  })
  public password!: string;

  @ApiProperty()
  public role_id!: number;

  @ApiProperty()
  public photo!: string;
}
