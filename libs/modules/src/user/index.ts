import { Module } from '@nestjs/common';
import { UserController } from '@uninus/controllers';
import { UserService } from '@uninus/services';
import { PrismaModule } from '../prisma/index';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
