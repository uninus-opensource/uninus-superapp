import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@uninus/controllers';
import { PrismaModule } from '@uninus/models';
import { AuthService } from '@uninus/services';
import { PmbModule } from '../pmb';

@Module({
  imports: [PrismaModule, JwtModule, PassportModule, PmbModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
