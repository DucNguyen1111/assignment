import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadFileServiceAbstract } from './upload-file.abstract.service';
import { Multer } from 'multer';

@Injectable()
export class UploadFileServiceS3 implements UploadFileServiceAbstract {
  private s3Client: S3Client;
  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: configService.get('AWS_S3_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_S3_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_S3_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFileToPublicBucket(
    path: string,
    { file, fileName }: { file: Express.Multer.File; fileName: string }
  ) {
    const bucketName = this.configService.get('AWS_S3_PUBLIC_BUCKET');
    const key = `${path}/${Date.now().toString()}-${fileName}`;
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentLength: file.size, // calculate length of buffer
      })
    );

    return {
      url: `https://${bucketName}.s3.amazonaws.com/${key}`,
      key,
      bucketName,
    };
  }
}
