import { Module } from '@nestjs/common';
import { UserController } from '@uninus/controllers';
import { PrismaService, UserService } from '@uninus/services';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
