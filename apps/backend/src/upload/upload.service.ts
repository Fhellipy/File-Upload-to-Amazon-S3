import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class UploadService {
  constructor(private s3: S3Service) {}

  async upload(fileName: string, file: Buffer) {
    await this.s3.sendUploadToS3(fileName, file);
  }

  async getAllFiles() {
    return await this.s3.getAllFiles();
  }

  async delete(key: string) {
    await this.s3.deleteFile(key);
  }
}
