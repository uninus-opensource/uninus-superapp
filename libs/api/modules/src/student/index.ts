import { Module } from "@nestjs/common";
import { StudentController } from "@uninus/api/controllers";
import { ClientsModule, Transport } from "@nestjs/microservices";
@Module({
  imports: [
    ClientsModule.register([
      {
        name: "STUDENT_SERVICE",
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
  controllers: [StudentController],
  providers: [],
})
export class StudentModule {}
