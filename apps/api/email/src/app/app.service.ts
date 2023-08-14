import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AppService {
  constructor(private mailerService: MailerService) {}
  async sendEmail(email: string, subject: string, html: string) {
    const send = await this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
    return send;
  }
}
