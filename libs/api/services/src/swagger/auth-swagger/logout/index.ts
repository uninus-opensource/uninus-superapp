import { ApiProperty } from '@nestjs/swagger';

export class LogoutSwagger {
  @ApiProperty()
  public refresh_token!: string;
}
