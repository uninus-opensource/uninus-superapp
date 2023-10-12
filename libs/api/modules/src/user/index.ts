import { Module } from "@nestjs/common";
import { UserController } from "@uninus/api/controllers";
import { PrismaModule } from "../prisma";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: "USER_SERVICE",
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
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
