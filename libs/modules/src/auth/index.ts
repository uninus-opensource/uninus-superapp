import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@uninus/controllers';
import { PrismaModule } from '@uninus/models';
import { AuthService } from '@uninus/services';
import { PmbModule } from '../pmb';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [PrismaModule, JwtModule, PassportModule, PmbModule,
  MailerModule.forRoot({
    transport: {
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // setting email di file .env dengan email akun google
        pass: process.env.SMTP_PASS, // setting apps password pada file .env setelah membuat password apps(aktifkan verifikasi 2 langkah terlebih dahulu)
      },
      tls: {
        rejectUnauthorized: true
      }
    }
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
