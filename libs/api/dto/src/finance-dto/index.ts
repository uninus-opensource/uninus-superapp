import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty()
  public email!: string;

  @ApiProperty()
  public fullname!: string;

  @ApiProperty()
  public phone_number!: string;

  @ApiProperty()
  public amount!: number;

  @ApiProperty()
  public orderId!: string;
}

export class StatusPaymentDto {
  @ApiProperty()
  public orderId!: string;
}
