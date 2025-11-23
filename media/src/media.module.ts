import { Module } from '@nestjs/common';
// import { DefaultModule } from 'backend-lib/module/default.module';
// import { JWTModule } from 'backend-lib/module/jwt.module';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MinioProvider } from './minio.provider';
import { AuthGuard } from 'backend-lib/guard/auth.guard';
import { PromModule } from 'backend-lib/module/prometheus.module';
import { LogModule } from 'backend-lib/module/logger.module';

@Module({
    imports: [
        LogModule,
        PromModule,
        // DefaultModule, // FIX: Does not export log
        // JWTModule,
    ],
    controllers: [MediaController],
    providers: [MediaService, MinioProvider, AuthGuard],
})
export class MediaModule { }
