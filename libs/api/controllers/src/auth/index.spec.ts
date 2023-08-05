import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from ".";
import { AuthService } from "@uninus/api/services";

describe("AuthController", () => {
  let controller: AuthController;

  const mockAuthService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
