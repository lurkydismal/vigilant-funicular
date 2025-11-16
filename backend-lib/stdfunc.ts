import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Transport, RmqOptions } from '@nestjs/microservices';

export const isProd = process.env.NODE_ENV === 'production';
export const isDev = !isProd;
export const needTrace = process.env.NEED_TRACE === 'true';

export function getEnvVar(name: string) {
    const url = process.env[name];

    if (!url) {
        throw new Error(`${name} not set`);
    }

    return url;
}

export function getEnvUrl(name: string) {
    return getEnvVar(`${name}_URL`);
}

export function getRMQUrl() {
    return getEnvUrl('RABBITMQ');
}

export function enableGlobalPipes(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
}

// TODO: Implement
export function addGlobalGuards(app: INestApplication) {
    app;
}

export function connectMicroserviceRMQ(app: INestApplication, queueName: string, durable?: boolean) {
    app.connectMicroservice<RmqOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [getRMQUrl()],
            queue: `${queueName}_rpc_queue`,
            queueOptions: { durable },
        },
    });
}
