import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { AuthRpcController } from './app.rpc.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'nestjs-pino';
import { Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        LoggerModule.forRoot({
            pinoHttp: {
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                    },
                },
            },
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => ({
                type: 'postgres',
                url: cfg.get<string>('DATABASE_URL'),
                entities: [User],
                autoLoadEntities: true,
                synchronize: cfg.get('NODE_ENV') !== 'production',
            }),
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => {
                const rawDefault = 3600;
                const raw = cfg.get<string>('JWT_EXPIRES_IN', String(rawDefault));
                const expiresInNum = Number(raw);
                return {
                    secret: cfg.get<string>('JWT_SECRET', 'dev-secret'),
                    signOptions: { expiresIn: Number.isFinite(expiresInNum) ? expiresInNum : rawDefault },
                };
            },
        }),
        UsersModule,
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL!],
                    queue: 'auth_rpc_queue',
                    queueOptions: { durable: true },
                },
            },
        ]),
        ClientsModule.register([
            {
                name: 'USER_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL!],
                    queue: 'user_rpc_queue',
                    queueOptions: { durable: true },
                },
            },
        ]),
    ],
    controllers: [AppController, AuthRpcController],
    providers: [RedisProvider, AppService, AuthGuard],
    exports: [RedisProvider, AppService, AuthGuard],
})
export class AppModule { }
