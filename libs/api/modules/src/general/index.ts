import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CollegeController, PMBController, PersonalController } from "@uninus/api/controllers";
import { CollegeService, PMBService, PersonalService } from "@uninus/api/services";

@Module({
  imports: [
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
  controllers: [PersonalController, PMBController, CollegeController],
  providers: [PersonalService, PMBService, CollegeService],
})
export class GeneralModule {}
