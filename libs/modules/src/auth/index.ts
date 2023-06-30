import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/index';
import { AuthService } from '@uninus/services';
import { AuthController } from '@uninus/controllers';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, RtStrategy } from '@uninus/entities'

@Module({
  imports: [PrismaModule, JwtModule.register({
    secret: process.env.ACCES_SECRET,
    signOptions: { expiresIn: '1h'}
  }), PassportModule.register({defaultStrategy: 'jwt'})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RtStrategy],
})
export class AuthModule {}
