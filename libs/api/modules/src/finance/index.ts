import { Module } from "@nestjs/common";
import { FinanceController } from "@uninus/api/controllers";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { FinanceService } from "@uninus/api/services";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "FINANCE_SERVICE",
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
          username: process.env.REDIS_USERNAME,
          retryAttempts: 3,
          retryDelay: 2000,
        },
      },
    ]),
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
