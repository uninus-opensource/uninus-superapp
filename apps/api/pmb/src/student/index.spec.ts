import { Test, TestingModule } from "@nestjs/testing";
import { StudentService } from ".";
import { PrismaService } from "@uninus/api/models";
import { CloudinaryService } from "../cloudinary";

describe("StudentService", () => {
  let service: StudentService;

  const mockPrismaService = {
    users: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  const mockCloudinaryService = {
    uploadImage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: CloudinaryService, useValue: mockCloudinaryService },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
