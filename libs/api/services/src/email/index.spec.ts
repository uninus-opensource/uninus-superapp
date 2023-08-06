import { Test } from "@nestjs/testing";
import { MailerService } from "@nestjs-modules/mailer";
import { EmailService } from "./";

describe("EmailService", () => {
  let emailService: EmailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    emailService = moduleRef.get<EmailService>(EmailService);
    mailerService = moduleRef.get<MailerService>(MailerService);
  });

  describe("sendEmail", () => {
    it("should send an email", async () => {
      const result = {}; // Define the result you expect from mailerService.sendMail here
      const email = "test@example.com";
      const subject = "Test Subject";
      const html = "<p>Test Email</p>";

      jest.spyOn(mailerService, "sendMail").mockImplementation(async () => result);

      expect(await emailService.sendEmail(email, subject, html)).toBe(result);
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: email,
        subject,
        html,
      });
    });
  });
});
