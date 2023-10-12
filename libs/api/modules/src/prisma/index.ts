import { Global, Module } from "@nestjs/common";
import { PrismaService } from "@uninus/api/services";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
