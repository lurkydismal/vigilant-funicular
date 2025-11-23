import cookieParser from 'cookie-parser';
import { MediaModule } from './media.module';
import { NestFactory } from '@nestjs/core';
import { enableGlobalPipes, } from '../backend-lib/stdfunc';

async function bootstrap() {
    const app = await NestFactory.create(MediaModule);

    app.use(cookieParser());

    enableGlobalPipes(app);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
