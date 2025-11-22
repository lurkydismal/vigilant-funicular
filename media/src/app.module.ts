import { Module } from '@nestjs/common';
import { MediaService } from './app.service';
import { MediaController } from './app.controller';
import { MinioProvider } from './minio.provider';

@Module({
    controllers: [MediaController],
    providers: [MediaService, MinioProvider],
    exports: [MinioProvider],
})
export class MediaModule { }
