import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostsService } from './app.service';
import { PostsRepository } from './posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Post } from './post/post.entity';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => ({
                type: 'postgres',
                url: cfg.get<string>('DATABASE_URL'),
                entities: [Post],  // , Attachment
                autoLoadEntities: true,
                synchronize: cfg.get('NODE_ENV') !== 'production',
            }),
        }),
        TypeOrmModule.forFeature([Post]), // , Attachment
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
