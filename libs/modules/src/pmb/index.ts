import { Module } from '@nestjs/common';
import { UserController } from '@uninus/controllers';
import { PrismaModule } from '@uninus/models';
import { UserService } from '@uninus/services';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class PmbModule {}
