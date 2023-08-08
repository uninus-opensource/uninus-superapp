import { Module } from '@nestjs/common';
import { FileController } from "@uninus/api/controllers";
import { FileService } from "@uninus/api/services";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [ConfigModule.forRoot({isGlobal: true})],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}

