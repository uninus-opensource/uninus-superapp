import { Module } from '@nestjs/common';
import { UserController } from '@uninus/controllers';
import { PrismaModule } from '@uninus/models';
import { EmailService, UserService } from '@uninus/services';
import { EmailModule } from '../email';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [UserController],
  providers: [UserService, EmailService],
})
export class UserModule {}
