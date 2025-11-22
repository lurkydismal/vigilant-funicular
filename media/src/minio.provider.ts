import { Client } from 'minio';
import { Provider } from '@nestjs/common';

export const MinioProvider: Provider = {
    provide: 'MINIO_CLIENT',
    useFactory: async () => {
        // TODO: Improve
        const endPoint = process.env.MINIO_ENDPOINT || 'minio';
        const port = parseInt(process.env.MINIO_PORT || '9000', 10);
        const accessKey = process.env.MINIO_ACCESS_KEY!;
        const secretKey = process.env.MINIO_SECRET_KEY!;
        const bucket = process.env.MINIO_BUCKET || 'media';
        const useSSL = (process.env.MINIO_USE_SSL === 'true');

        const client = new Client({
            endPoint,
            port,
            accessKey,
            secretKey,
            useSSL,
        });

        try {
            const exists = await client.bucketExists(bucket);

            if (!exists) {
                await client.makeBucket(bucket, '');
            }

        } catch (err) {
            console.error('MinIO bucket check failed', err);

            throw err;
        }

        return client;
    }
};
