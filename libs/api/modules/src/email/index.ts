import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from '@uninus/api/services';

@Module({
  imports: [
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
  ],
  controllers: [],
  providers: [EmailService],
})
export class EmailModule {}
