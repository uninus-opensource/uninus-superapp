import { Controller } from '@nestjs/common';

import { AppService } from "./app.service";
import { MessagePattern } from '@nestjs/microservices';
import { TFileUploadRequest } from '@uninus/entities';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("upload_file")
  uploadFile(payload:TFileUploadRequest) {
    return this.appService.uploadFile(payload);
  }
}
