import { Test } from "@nestjs/testing";

import { AppService } from "./app.service";
import { TFileUploadRequest } from "@uninus/entities";
import { ConfigService } from "@nestjs/config";

describe("AppService", () => {
  let configService: ConfigService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue:{
            getOrThrow: jest.fn((key:string)=>{
              return key
            })
          }
        }
      ],
    }).compile();

    configService = app.get<ConfigService>(ConfigService);
  });

  describe("uploadFile", () => {
    it('should return path', async () => {
      const service = new AppService(configService)
      const payload: TFileUploadRequest = {
        filename: "rafli.txt",
        buffer: Buffer.from("This is text to buffer")
      }
      const data = []
      jest.spyOn(service, 'uploadToS3').mockImplementation(
       async (payload)=>{
         data.push(payload)
       })

      const result = await service.uploadFile(payload)
      expect(result).toHaveProperty('path')
      expect(result.path).toContain( `https://BUCKET.s3.REGION.amazonaws.com/` );
      expect(result.path).toContain( payload.filename );
    });
  });
});
