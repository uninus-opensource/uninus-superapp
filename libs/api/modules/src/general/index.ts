import { Module } from "@nestjs/common";
import { PrismaModule } from "@uninus/api/models";
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
        },
      },
    ]),
  ],
  controllers: [GeneralController],
  providers: [],
})
export class GeneralModule {}
