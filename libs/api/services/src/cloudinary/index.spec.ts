import { Test, TestingModule } from "@nestjs/testing";
import { CloudinaryService } from ".";
import toStream = require("buffer-to-stream");
import { v2 } from "cloudinary";
import { TFIle } from "@uninus/entities";

jest.mock("buffer-to-stream", () => jest.fn());
jest.mock("cloudinary");

describe("CloudinaryService", () => {
  let service: CloudinaryService;

  let mockFile: TFIle;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudinaryService],
    }).compile();

    service = module.get<CloudinaryService>(CloudinaryService);

    mockFile = {
      fieldname: "test_fieldname",
      originalname: "test_originalname",
      encoding: "test_encoding",
      mimetype: "test_mimetype",
      size: 100,
      destination: "test_destination",
      filename: "test_filename",
      path: "test_path",
      buffer: Buffer.from("test file"),
    };

    (toStream as jest.Mock).mockImplementation(() => ({
      pipe: jest.fn(),
    }));

    (v2.uploader.upload_stream as jest.Mock).mockImplementation((cb) => {
      const mockUploadStream = {
        on: jest.fn().mockImplementation((event, eventCb) => {
          if (event === "finish") {
            eventCb();
          }
        }),
      };
      cb(null, "test result");
      return mockUploadStream;
    });
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("uploadImage", () => {
    it("should upload an image", async () => {
      const result = await service.uploadImage(mockFile);
      expect(result).toBe("test result");
      expect(toStream).toHaveBeenCalledWith(mockFile.buffer);
      expect(v2.uploader.upload_stream).toHaveBeenCalled();
    });
  });
});
