import { Test } from "@nestjs/testing";

import { AppService } from "./app.service";
import { TFileUploadRequest } from "@uninus/entities";
import { ConfigService } from "@nestjs/config";

describe("AppService", () => {
  let service: AppService;

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

    service = app.get<AppService>(AppService);
  });

  describe("uploadFile", () => {
    it('should return path', async () => {
      const payload: TFileUploadRequest = {
        filename: "rafli.txt",
        buffer: Buffer.from("This is text to buffer")
      }
      jest.spyOn(service, 'uploadToS3').mockImplementation(
       async ()=>{})

      const result = await service.uploadFile(payload)
      expect(result).toHaveProperty('path')
      expect(result.path).toContain( `https://BUCKET.s3.REGION.amazonaws.com/` );
      expect(result.path).toContain( payload.filename );
    });

    it('Failed error', async () => {
      const payload: TFileUploadRequest = {
        filename: "rafli.txt",
        buffer: Buffer.from("This is text to buffer")
      }
      jest.spyOn(service, 'uploadToS3').mockImplementation(
       async ()=>{
         throw new Error('Failed to upload')
       })

      expect(await service.uploadFile(payload)).toThrowError()
    });
  });
});
