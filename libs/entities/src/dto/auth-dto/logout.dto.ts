import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
  @ApiProperty()
  public refresh_token!: string;
}
