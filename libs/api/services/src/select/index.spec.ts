import { Test, TestingModule } from "@nestjs/testing";
import { SelectService } from ".";
import { PrismaService } from "@uninus/api/models";

describe("SelectService", () => {
  let service: SelectService;

  const mockPrismaService = {
    province: { findMany: jest.fn() },
    city: { findMany: jest.fn() },
    subDistrict: { findMany: jest.fn() },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<SelectService>(SelectService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
