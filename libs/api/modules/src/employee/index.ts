import { Module } from "@nestjs/common";
import { EmployeeController } from "@uninus/api/controllers";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { EmployeeService } from "@uninus/api/services";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "EMPLOYEE_SERVICE",
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
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
