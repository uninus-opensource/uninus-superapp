import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}
  async sendEmail(email: string,subject: string, html: string) {
    const send = await this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });

    return send;
  }
}
