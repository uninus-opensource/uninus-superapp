import { Injectable } from "@nestjs/common";
import XenditClient from "xendit-node";
import { ConfigService } from "@nestjs/config";
import { RpcException } from "@nestjs/microservices";
import { TPaymentRequest, TPaymentResponse } from "@uninus/entities";

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  private secretKey = this.configService.getOrThrow("XENDIT_SECRET_KEY");
  private readonly xendit = new XenditClient({
    secretKey: this.secretKey,
  });

  async payment(payload: TPaymentRequest): Promise<TPaymentResponse> {
    const { phone_number, bank_code, fullname } = payload;
    const { VirtualAcc } = this.xendit;
    const vaSpecificOptions = {};
    const va = new VirtualAcc(vaSpecificOptions);
    try {
      const res = await va.createFixedVA({
        externalID: `${phone_number}`,
        bankCode: bank_code,
        name: fullname,
        isClosed: true,
        isSingleUse: true,
        expectedAmt: 250000,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      return res;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
