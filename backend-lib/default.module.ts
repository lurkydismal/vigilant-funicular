import { LogModule } from './logger.module';
import { Module } from '@nestjs/common';
import { PromModule } from './prometheus.module';

// Log and Prometheus endpoint
@Module({
    imports: [
        LogModule,
        PromModule,
    ],
})
export class DefaultModule { }
