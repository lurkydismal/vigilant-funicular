import cookieParser from 'cookie-parser';
import { AppModule } from './auth.module';
import { NestFactory } from '@nestjs/core';
import { connectMicroserviceRMQ, enableGlobalPipes } from '../backend-lib/stdfunc';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    enableGlobalPipes(app);

    connectMicroserviceRMQ(app, 'auth', true);

    await app.startAllMicroservices();

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
