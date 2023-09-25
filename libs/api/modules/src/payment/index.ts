import { Module } from '@nestjs/common';
import { PaymentController } from "@uninus/api/controllers";
import { ClientsModule , Transport} from '@nestjs/microservices'

@Module({
  imports: [
   ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.REDIS,
        options:{
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
          username: process.env.REDIS_USERNAME,
        }
      }
    ]),
  ],
  controllers: [PaymentController],
  providers: [],
})
export class PaymentModule {}

