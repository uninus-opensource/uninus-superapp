import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty()
  public paymentObligationId!: number;
}

export class StatusPaymentDto {
  @ApiProperty()
  public orderId!: string;
}
