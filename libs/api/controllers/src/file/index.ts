import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  BadRequestException,
  Inject
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices'
import { TFIle } from '@uninus/entities';
import { firstValueFrom } from 'rxjs';

@Controller('file')
export class FileController {
  constructor(
    @Inject('FILE_SERVICE') private readonly client: ClientProxy
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile(
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
  ) file: TFIle) {
    try {
      const data = await firstValueFrom(this.client.send('upload_file',{
        buffer: file.buffer,
        filename: file.originalname
      }))
      return data
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error()
      })
    }
  }
}
