import { BadRequestException, Injectable } from '@nestjs/common';
import { TFileUploadRequest, TFileUploadResponse } from '@uninus/entities';
import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { ConfigService } from '@nestjs/config'
@Injectable()
export class FileService {
  private bucket = this.configService.getOrThrow("BUCKET")
  private region = this.configService.getOrThrow("REGION")
  private readonly s3Client = new S3Client({
    region:this.region,
    credentials: {
      accessKeyId: this.configService.getOrThrow("AWS_ACCESS_KEY"),
      secretAccessKey: this.configService.getOrThrow("AWS_SECRET_ACCESS_KEY")
    }
  })

  constructor(private readonly configService: ConfigService) {}

  async uploadFile({filename, file}: TFileUploadRequest): Promise<TFileUploadResponse> {
    try {
    const key = `${Date.now().toString()}-${filename}`
    await new Upload({
      client: this.s3Client,
      params: {
        Bucket:this.bucket,
        Key: key,
        Body: file

      },
      tags: [],
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: false,
    }).done()
    return {
      path: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`
    }
    } catch (error) {
      throw new BadRequestException("Gagal mengupload file!")
    }
  }
}
