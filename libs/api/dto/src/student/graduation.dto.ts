import { ApiProperty } from "@nestjs/swagger";

export class GraduationStatusDto {
  @ApiProperty()
  registrationNumber!: string;
}
