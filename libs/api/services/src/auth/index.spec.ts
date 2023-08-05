import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from ".";
import { PrismaService } from "@uninus/api/models";
import { EmailService } from "../email";

describe("AuthService", () => {
  let service: AuthService;

  const mockPrismaService = {};
  const mockEmailService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: EmailService, useValue: mockEmailService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
