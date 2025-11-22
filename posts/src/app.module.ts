import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { Module } from '@nestjs/common';
import { Post } from './post/post.entity';
import { PostsRepository } from './posts.repository';
import { PostsService } from './app.service';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { Tag } from './post/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

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
                entities: [Post, Tag],  // , Attachment
                autoLoadEntities: true,
                synchronize: cfg.get('NODE_ENV') !== 'production',
            }),
        }),
        TypeOrmModule.forFeature([Post, Tag]), // , Attachment
        ClientsModule.register([
            {
                name: 'RABBITMQ_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL!],
                    queue: 'posts_rps_queue',
                    queueOptions: { durable: true },
                },
            },
        ]),
    ],
    controllers: [AppController],
    providers: [PostsService, PostsRepository],
    exports: [PostsService],
})
export class AppModule { }
