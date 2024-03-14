import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class S3Service {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  BUCKET = this.configService.getOrThrow('AWS_S3_BUCKET');
  REGION = this.configService.getOrThrow('AWS_S3_REGION');

  async sendUploadToS3(fileName: string, file: Buffer) {
    const params = new PutObjectCommand({
      Bucket: this.BUCKET,
      Key: `${randomUUID()}_${fileName}`,
      Body: file,
    });

    try {
      await this.s3Client.send(params);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        error.$metadata.httpStatusCode,
      );
    }
  }

  async getPresignedUrl(Key: string) {
    const createPresignedUrlWithClient = ({ region, bucket, key }) => {
      const client = new S3Client({ region });
      const command = new GetObjectCommand({ Bucket: bucket, Key: key });
      return getSignedUrl(client, command, { expiresIn: 3600 });
    };

    return createPresignedUrlWithClient({
      region: this.REGION,
      bucket: this.BUCKET,
      key: Key,
    });
  }

  async getAllFiles() {
    const params = new ListObjectsV2Command({
      Bucket: this.BUCKET,
    });

    try {
      const data = await this.s3Client.send(params);

      const contents = data.Contents || [];

      const files = await Promise.all(
        contents.map(async (file) => {
          const clientUrl = await this.getPresignedUrl(file.Key);
          const extension = file.Key.split('_').pop().split('.').pop();

          return {
            key: file.Key,
            url: clientUrl || '',
            extension: extension || '',
          };
        }),
      );

      return files;
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        error.$metadata.httpStatusCode,
      );
    }
  }

  async deleteFile(Key: string) {
    const params = { Bucket: this.BUCKET, Key };
    const commandDelete = new DeleteObjectCommand(params);

    try {
      await this.s3Client.send(commandDelete);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        error.$metadata.httpStatusCode,
      );
    }
  }
}
