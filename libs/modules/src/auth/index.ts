import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@uninus/controllers';
import { JwtStrategy, RtStrategy } from '@uninus/entities';
import { PrismaModule } from '@uninus/models';
import { AuthService, EmailService } from '@uninus/services';
import { PmbModule } from '../pmb';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: true,
        },
      },
    }),
    PmbModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, JwtStrategy, RtStrategy],
})
export class AuthModule {}
