import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Client } from 'minio';

// @Injectable()
// export class MediaService {
//     constructor(@Inject('MINIO_CLIENT') private readonly minio: Client) { }
//
//     async upload(file: Express.Multer.File) {
//         const key = Date.now() + '-' + file.originalname;
//         await minioClient.putObject('media', key, file.buffer);
//         return { key };
//     }
//
//     async getSignedUrl(filename: string) {
//         const url = await minioClient.presignedGetObject('media', filename, 24 * 60 * 60);
//         return { url };
//     }
// }

@Injectable()
export class MediaService {
    private readonly bucket: string;
    private readonly maxFileSize: number;
    private readonly signedUrlExpirySeconds: number;

    constructor(@Inject('MINIO_CLIENT') private readonly minio: Client) {
        this.bucket = process.env.MINIO_BUCKET || 'media';
        this.maxFileSize = parseInt(process.env.MAX_FILE_SIZE_BYTES || '10485760', 10); // 10MB default
        this.signedUrlExpirySeconds = parseInt(process.env.SIGNED_URL_EXPIRY_SECONDS || '86400', 10);
    }

    async uploadBuffer(buffer: Buffer, originalName: string, mimeType?: string) {
        if (!buffer || buffer.length === 0) {
            throw new BadRequestException('Empty file');
        }
        if (buffer.length > this.maxFileSize) {
            throw new BadRequestException('File too large');
        }

        const timestamp = Date.now();
        const sanitized = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
        const objectName = `${timestamp}-${sanitized}`;

        await this.putObject(this.bucket, objectName, buffer, buffer.length, mimeType || 'application/octet-stream');

        return { key: objectName };
    }

    async getSignedUrl(objectName: string) {
        // ensure objectName exists is optional. presigned URL can be returned without check.
        const url = await this.presignedGetObject(this.bucket, objectName, this.signedUrlExpirySeconds);
        return { url };
    }

    private putObject(bucket: string, objectName: string, buffer: Buffer, size: number, contentType: string) {
        return new Promise<void>((res, rej) => {
            const meta = { 'Content-Type': contentType };
            (this.minio as any).putObject(bucket, objectName, buffer, size, meta, (err: Error | null) => {
                if (err) return rej(err);
                res();
            });
        });
    }

    private presignedGetObject(bucket: string, objectName: string, expirySeconds: number) {
        return this.minio.presignedGetObject(bucket, objectName, expirySeconds, { requestHost: 'localhost:9000' });
    }
}
