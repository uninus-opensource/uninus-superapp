import { ApiProperty } from '@nestjs/swagger';

export class resendOtpSwagger {
  @ApiProperty({
    example: '',
  })
  public email!: string;
}
