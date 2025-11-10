import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const rabbitUrl = process.env.RABBITMQ_URL;
    if (!rabbitUrl) {
        throw new Error('RABBITMQ_URL not set');
    }

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    // app.connectMicroservice<RmqOptions>({
    //     transport: Transport.RMQ,
    //     options: {
    //         urls: [rabbitUrl],
    //         queue: 'posts_rpc_queue',
    //         queueOptions: { durable: true },
    //     },
    // });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
