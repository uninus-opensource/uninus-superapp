import { Module } from '@nestjs/common';
import { EmployeeController } from "@uninus/api/controllers";
import { ClientsModule , Transport} from '@nestjs/microservices'
import { PrismaModule } from '@uninus/api/models';

@Module({
  imports: [
    PrismaModule,
   ClientsModule.register([
      {
        name: 'EMPLOYEE_SERVICE',
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
  controllers: [EmployeeController],
  providers: [],
})
export class EmployeeModule {}

