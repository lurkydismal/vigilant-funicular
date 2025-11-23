import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Get,
    Param,
    BadRequestException,
    UseGuards
} from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { AuthGuard } from 'backend-lib/guard/auth.guard';
import { MediaService } from './media.service';

const uploadMiddleware = FileInterceptor('file', {
    storage: multer.memoryStorage(),
    limits: {
        // multer will use MAX_FILE_SIZE_BYTES env if present; otherwise fallback is in service
        fileSize: parseInt(process.env.MAX_FILE_SIZE_BYTES || '10485760', 10)
    }
});

@Controller('media')
export class MediaController {
    constructor(
        @InjectPinoLogger(MediaController.name) private readonly logger: PinoLogger,
        private readonly media: MediaService
    ) { }

    @UseGuards(AuthGuard)
    @Post('upload')
    @UseInterceptors(uploadMiddleware)
    async upload(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('No file provided');
        }
        return this.media.uploadBuffer(file.buffer, file.originalname, file.mimetype);
    }

    @UseGuards(AuthGuard)
    @Get('url/:filename')
    async getUrl(@Param('filename') filename: string) {
        if (!filename) throw new BadRequestException('filename required');
        return this.media.getSignedUrl(filename);
    }
}
