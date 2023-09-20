import { ApiProperty } from "@nestjs/swagger";
export class PaymentDto {
  @ApiProperty({
    example: "8934789324",
  })
  public phone_number!: string;
  @ApiProperty({
    example: "BRI",
  })
  public bank_code!: string;

  @ApiProperty({
    example: "Jhon",
  })
  public fullname!: string;
}
