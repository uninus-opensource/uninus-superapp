import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@uninus/api/services";
import { ConfigService } from "@nestjs/config";
import { AxiosRequestConfig } from "axios";

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  private apiUrl = this.configService.getOrThrow("PAYMENT_API_URL");
  private apiKey = this.configService.getOrThrow("PAYMENT_API_KEY");
  private config: AxiosRequestConfig = {
    baseURL: this.apiUrl,
    headers: {
      Authorization: `Basic  ${this.apiKey}`,
    },
  };
  async getFinanceSummary() {
    return "Success";
  }

  async requestPayment(payload) {
    const { email, firstName, lastName, phone, amount, orderId } = payload;
    const timeStamp = new Date().getTime();
    const data = {
      customerDetails: { email, firstName, lastName, phone },
      transactionDetails: { amount, currency: "IDR", orderId, expiryDuration: "2m" },
    };
    this.config.headers.Timestamp = timeStamp;
    this.config.headers.Signature = ``.trim();
    return this.httpService.post("/api/token", data, this.config);
  }

  async statusPayment(payload) {
    const { orderId } = payload;
    const timeStamp = new Date().getTime();
    const data = { trxRef: orderId };
    this.config.headers.Timestamp = timeStamp;
    this.config.headers.Signature = ``.trim();
    return this.httpService.post("/api/checkstatus", data, this.config);
  }
}
