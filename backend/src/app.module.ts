import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UploadModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
