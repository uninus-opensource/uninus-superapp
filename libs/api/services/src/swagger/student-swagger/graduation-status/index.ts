import { ApiProperty } from "@nestjs/swagger";

export class GraduationStatusSwagger {
  @ApiProperty()
  registration_number!: string;
}
