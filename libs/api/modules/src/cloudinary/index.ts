import { Module } from "@nestjs/common";
import { CloudinaryProvider, CloudinaryService } from "@uninus/api/services";

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
