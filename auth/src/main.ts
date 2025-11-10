import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { Transport, RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const rabbitUrl = process.env.RABBITMQ_URL;
    if (!rabbitUrl) {
        throw new Error('RABBITMQ_URL not set');
    }

    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    app.connectMicroservice<RmqOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [rabbitUrl],
            queue: 'auth_rpc_queue',
            queueOptions: { durable: true },
        },
    });

    await app.startAllMicroservices();

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
