import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@uninus/services';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
