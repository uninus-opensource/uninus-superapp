import { ApiProperty } from "@nestjs/swagger";

export class GraduationStatusDto {
  @ApiProperty({ required: true })
  registrationNumber!: string;
}
