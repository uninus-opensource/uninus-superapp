import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from ".";
import { PrismaService } from "@uninus/api/models";
import { EmailService } from "../email";

describe("UserService", () => {
  let service: UserService;

  const mockPrismaService = {
    users: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  const mockEmailService = {
    sendEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: EmailService, useValue: mockEmailService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
