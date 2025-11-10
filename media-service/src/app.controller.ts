import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Get,
    Param,
    BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { MediaService } from './app.service';

// @Controller('media')
// export class MediaController {
//     constructor(private readonly service: MediaService) { }
//
//     @Post('upload')
//     @UseInterceptors(FileInterceptor('file'))
//     async upload(@UploadedFile() file: Express.Multer.File) {
//         return this.service.upload(file);
//     }
//
//     @Get('url/:filename')
//     async getUrl(@Param('filename') filename: string) {
//         return this.service.getSignedUrl(filename);
//     }
// }

const uploadMiddleware = FileInterceptor('file', {
    storage: multer.memoryStorage(),
    limits: {
        // multer will use MAX_FILE_SIZE_BYTES env if present; otherwise fallback is in service
        fileSize: parseInt(process.env.MAX_FILE_SIZE_BYTES || '10485760', 10)
    }
});

@Controller('media')
export class MediaController {
    constructor(private readonly media: MediaService) { }

    @Post('upload')
    @UseInterceptors(uploadMiddleware)
    async upload(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('No file provided');
        }
        return this.media.uploadBuffer(file.buffer, file.originalname, file.mimetype);
    }

    @Get('url/:filename')
    async getUrl(@Param('filename') filename: string) {
        if (!filename) throw new BadRequestException('filename required');
        return this.media.getSignedUrl(filename);
    }
}
