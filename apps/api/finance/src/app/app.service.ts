import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@uninus/api/services";
import { ConfigService } from "@nestjs/config";
import { AxiosRequestConfig } from "axios";
import { createSignature, splitFullname } from "@uninus/api/utilities";
import {
  TCreatePaymentRequest,
  TCreatePaymentResponse,
  TStatusPaymentRequest,
  TStatusPaymentResponse,
} from "@uninus/entities";
import { firstValueFrom, map } from "rxjs";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  private apiRequest = this.configService.getOrThrow("PAYMENT_API_REQUEST");
  private apiStatus = this.configService.getOrThrow("PAYMENT_API_STATUS");
  private apiKey = this.configService.getOrThrow("PAYMENT_API_KEY");
  private merchantId = this.configService.getOrThrow("PAYMENT_MERCHANT_ID");
  private config: AxiosRequestConfig = {
    headers: {
      Authorization: `Basic  ${this.merchantId}`,
    },
  };
  async getFinanceSummary() {
    return "Success";
  }

  async requestPayment(payload: TCreatePaymentRequest): Promise<TCreatePaymentResponse> {
    const { email, fullname, phone_number, amount, orderId } = payload;
    const { firstName, lastName } = splitFullname(fullname);
    const timeStamp = new Date().getTime();
    const data = {
      customerDetails: { email, firstName, lastName, phone: phone_number },
      transactionDetails: { amount, currency: "IDR", orderId, expiryDuration: "2m" },
    };
    this.config.baseURL = this.apiRequest;
    this.config.headers.Timestamp = timeStamp;
    this.config.headers.Signature = createSignature(JSON.stringify(data), timeStamp, this.apiKey);

    const response = await firstValueFrom(
      this.httpService
        .post("/payment-services/v2.1.0/api/token", data, this.config)
        .pipe(map((resp) => resp.data)),
    ).catch((error) => {
      throw new RpcException(new BadRequestException(error.response.statusText));
    });

    return response;
  }

  async statusPayment(payload: TStatusPaymentRequest): Promise<TStatusPaymentResponse> {
    const { orderId } = payload;
    const timeStamp = new Date().getTime();
    const data = { trxRef: orderId };
    this.config.baseURL = this.apiStatus;
    this.config.headers.Timestamp = timeStamp;
    this.config.headers.Signature = createSignature(JSON.stringify(data), timeStamp, this.apiKey);
    const response = await firstValueFrom(
      this.httpService.post("/api/checkstatus", data, this.config).pipe(map((resp) => resp.data)),
    ).catch((error) => {
      throw new RpcException(new BadRequestException(error.response.statusText));
    });
    return response;
  }
}
