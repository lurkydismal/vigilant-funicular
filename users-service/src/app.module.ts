import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LoggerModule } from 'nestjs-pino';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { Profile } from './user/profile.entity';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrometheusModule.register({
            defaultMetrics: {
                enabled: true,
            },
        }),
        LoggerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => ({
                pinoHttp: {
                    level: Boolean(cfg.get('NEED_TRACE') == 'true') ? 'trace' : (cfg.get('NODE_ENV') !== 'production' ? 'debug' : 'info'),
                    transport: {
                        target: 'pino-pretty',
                        options: {
                            colorize: true,
                            translateTime: 'SYS:standard',
                        },
                    },
                },
            }),
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => ({
                type: 'postgres',
                url: cfg.get<string>('DATABASE_URL'),
                entities: [Profile],
                autoLoadEntities: true,
                synchronize: cfg.get('NODE_ENV') !== 'production',
            }),
        }),
        UserModule,
    ],
})
export class AppModule { }
