import { Injectable } from "@nestjs/common";
import { CloudinaryResponse } from "@uninus/entities";
import toStream = require("buffer-to-stream");
import { ConfigOptions, v2 } from "cloudinary";
import "multer";
import { CLOUDINARY } from "./constans";
import { TFIle } from "@uninus/entities";
@Injectable()
export class CloudinaryService {
  async uploadImage(file: TFIle): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: process.env["CLD_CLOUD_NAME"],
      api_key: process.env["CLD_API_KEY"],
      api_secret: process.env["CLD_API_SECRET"],
    });
  },
};
