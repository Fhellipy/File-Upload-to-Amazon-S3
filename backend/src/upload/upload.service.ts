import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  BUCKET = this.configService.getOrThrow('AWS_S3_BUCKET');
  REGION = this.configService.getOrThrow('AWS_S3_REGION');

  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.BUCKET,
        Key: `${randomUUID()}_${fileName}`,
        Body: file,
      }),
    );
  }

  async getAllFiles() {
    const createPresignedUrlWithClient = ({ region, bucket, key }) => {
      const client = new S3Client({ region });
      const command = new GetObjectCommand({ Bucket: bucket, Key: key });
      return getSignedUrl(client, command, { expiresIn: 3600 });
    };

    const data = await this.s3Client.send(
      new ListObjectsV2Command({
        Bucket: this.BUCKET,
      }),
    );

    const contents = data.Contents || [];

    const files = await Promise.all(
      contents.map(async (file) => {
        const clientUrl = await createPresignedUrlWithClient({
          region: this.REGION,
          bucket: this.BUCKET,
          key: file.Key,
        });

        const extension = file.Key.split('_').pop().split('.').pop();

        return {
          key: file.Key,
          eTag: file.ETag,
          url: clientUrl || '',
          extension: extension || '',
        };
      }),
    );

    return files;
  }

  async deleteFile(key: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.BUCKET,
        Key: key,
      }),
    );
  }
}
