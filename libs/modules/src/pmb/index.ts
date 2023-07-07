import { Module } from '@nestjs/common';
import { UserController } from '@uninus/controllers';
import { PrismaModule } from '@uninus/models';
import { CloudinaryService, EmailService, UserService } from '@uninus/services';
import { CloudinaryModule } from '../cloudinary';
import { EmailModule } from '../email';

@Module({
  imports: [PrismaModule, EmailModule, CloudinaryModule],
  controllers: [UserController],
  providers: [UserService, EmailService, CloudinaryService],
})
export class PmbModule {}
