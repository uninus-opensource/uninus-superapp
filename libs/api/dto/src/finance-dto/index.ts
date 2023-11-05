import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty()
  public payment_obligation_id!: number;
}

export class StatusPaymentDto {
  @ApiProperty()
  public orderId!: string;
}
