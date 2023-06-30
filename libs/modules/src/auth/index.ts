import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/index';
import { AuthService } from '@uninus/services';
import { AuthController } from '@uninus/controllers';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, JwtModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
