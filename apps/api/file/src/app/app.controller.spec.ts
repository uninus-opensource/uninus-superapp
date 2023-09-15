import { Test, TestingModule } from "@nestjs/testing";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TFileUploadRequest, TFileUploadResponse } from "@uninus/entities";
import { ConfigService } from "@nestjs/config";

describe("AppController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn((key: string) => {
              return key;
            }),
          },
        },
      ],
    }).compile();
  });

  describe("uploadFile", () => {
    it("should return path", async () => {
      const appController = app.get<AppController>(AppController);
      const appService = app.get<AppService>(AppService);
      const payload: TFileUploadRequest = {
        filename: "rafli.txt",
        buffer: Buffer.from("Ini isi file"),
      };
      const expectedResult: TFileUploadResponse = {
        path: "http://path.to/file",
      };
      jest.spyOn(appService, "uploadFile").mockImplementation(async () => {
        return expectedResult;
      });
      expect(await appController.uploadFile(payload)).toEqual(expectedResult);
    });
  });
});
