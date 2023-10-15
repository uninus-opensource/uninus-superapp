import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { GeneralController } from "@uninus/api/controllers";

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: "GENERAL_SERVICE",
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
  controllers: [GeneralController],
  providers: [],
})
export class GeneralModule {}
