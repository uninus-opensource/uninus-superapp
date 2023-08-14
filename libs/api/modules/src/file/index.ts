import { Module } from '@nestjs/common';
import { FileController } from "@uninus/api/controllers";
import { ClientsModule , Transport} from '@nestjs/microservices'

@Module({
  imports: [
   ClientsModule.register([
      {
        name: 'FILE_SERVICE',
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
  controllers: [FileController],
  providers: [],
})
export class FileModule {}

