import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { TFileUploadRequest, TFileUploadResponse } from '@uninus/entities';
import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { ConfigService } from '@nestjs/config'
@Injectable()

export class AppService {
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

  async uploadFile(payload:TFileUploadRequest): Promise<TFileUploadResponse> {
    const body = Buffer.from(payload.buffer)
    const key = `${Date.now().toString()+payload.filename.replace(/ /g, '-')}`
    try {
      await this.uploadToS3({key,body})
      return {
        path: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`
      }
    } catch (error) {
      throw new RpcException(error)
    }
  }

  async uploadToS3(payload:{key:string, body:Buffer}){
    try {
      await new Upload({
        client: this.s3Client,
        params: {
          ACL: 'public-read',
          Bucket: this.bucket,
          Key: payload.key,
          Body: payload.body
        },
        tags: [],
        queueSize: 4,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false,
      }).done()
    } catch (error) {
      console.log(error)
      throw new RpcException(error)
    }
  }
}
