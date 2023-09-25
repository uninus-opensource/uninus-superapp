import { ApiProperty } from "@nestjs/swagger";

export class GraduationStatusDto {
  @ApiProperty()
  registration_number!: string;
}
