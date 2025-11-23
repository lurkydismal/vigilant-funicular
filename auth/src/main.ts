import cookieParser from 'cookie-parser';
import { AuthModule } from './auth.module';
import { NestFactory } from '@nestjs/core';
import {
    connectMicroserviceRMQ,
    enableGlobalPipes,
} from '../backend-lib/stdfunc';

async function bootstrap() {
    const app = await NestFactory.create(AuthModule);

    app.use(cookieParser());

    enableGlobalPipes(app);

    connectMicroserviceRMQ(app, 'auth', true);

    await app.startAllMicroservices();

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
