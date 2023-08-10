import { Module } from "@nestjs/common";
import { StudentController } from "@uninus/api/controllers";
import { PrismaModule } from "@uninus/api/models";
import { CloudinaryService } from "@uninus/api/services";
import { CloudinaryModule } from "../cloudinary";
import { ClientsModule, Transport } from "@nestjs/microservices";
@Module({
  imports: [
    PrismaModule,
    CloudinaryModule,
    ClientsModule.register([
      {
        name: 'STUDENT_SERVICE',
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
  controllers: [StudentController],
  providers: [CloudinaryService],
})
export class StudentModule {}
