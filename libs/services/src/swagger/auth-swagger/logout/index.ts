import { ApiProperty } from '@nestjs/swagger';
export class UserSwagger {
  @ApiProperty({
    example: '2fc66b45-e6f6-48c7-89f1-b62d0a398cfc',
  })
  public sub!: string;
}
export class LogoutSwagger {
  @ApiProperty()
  public refresh_token!: string;
}
