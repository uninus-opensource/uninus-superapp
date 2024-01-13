import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({ required: true })
  public paymentObligationId!: number;
}

export class StatusPaymentDto {
  @ApiProperty({ required: true })
  public orderId!: string;
}
