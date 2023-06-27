import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/index';
import { AuthService } from '@uninus/services';
import { AuthController } from '@uninus/controllers';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
