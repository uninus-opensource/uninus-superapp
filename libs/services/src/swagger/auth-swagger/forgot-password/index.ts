import { ApiProperty } from '@nestjs/swagger';
export class forgotPasswordSwagger {
  @ApiProperty({
    example: 'user@example.com',
  })
  public email!: string;
}
