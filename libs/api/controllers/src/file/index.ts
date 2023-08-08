import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  BadRequestException
} from '@nestjs/common';
import { FileService } from '@uninus/api/services';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly appService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(
    new ParseFilePipeBuilder()
      .addMaxSizeValidator({
        maxSize: 4000000
      })
      .addFileTypeValidator({
        fileType: /(pdf|sheet)/g
      })
      .build({
        exceptionFactory(error) {
          throw new BadRequestException(error);
        },
      })
  ) file: Express.Multer.File) {
    return this.appService.uploadFile({
      filename: file.originalname,
      file: file.buffer
    })
  }
}
