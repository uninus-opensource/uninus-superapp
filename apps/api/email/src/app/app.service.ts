import { BadRequestException, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { RpcException } from "@nestjs/microservices";
import { errorMappings } from "@uninus/api/utilities";

@Injectable()
export class AppService {
  constructor(private mailerService: MailerService) {}
  async sendEmail(email: string, subject: string, html: string) {
    try {
      const send = await this.mailerService.sendMail({
        to: email,
        subject,
        html,
      });
      if (!send) {
        throw new BadRequestException("Email tidak terkirim");
      }
      return send;
    } catch (error) {
      throw new RpcException(errorMappings(error));
    }
  }
}
