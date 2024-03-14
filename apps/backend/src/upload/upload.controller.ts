import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Injectable,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller()
@Injectable()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: /image\/(png|jpg|jpeg)/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.uploadService.upload(file.originalname, file.buffer);
  }

  @Get('list')
  async getAllFiles() {
    return this.uploadService.getAllFiles();
  }

  @Delete('file/:key')
  async delete(@Param('key') key: string) {
    return this.uploadService.delete(key);
  }
}
