import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { AuthRpcController } from './app.rpc.controller';
import { Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { RedisProvider } from '../backend-lib/redis.provider';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { LogModule } from 'backend-lib/logger.module';
import { registerModule } from 'backend-lib/dynamic.module';
import { getRMQUrl } from 'backend-lib/stdfunc';
import { JWTModule } from 'backend-lib/jwt.module';
import { registerTypeORM } from 'backend-lib/typeorm.module';
import { PromModule } from 'backend-lib/prometheus.module';

@Module({
    imports: [
        PromModule,
        LogModule,
        registerTypeORM([User]),
        JWTModule,
        UsersModule,
        registerModule('auth', Transport.RMQ, [getRMQUrl()]),
        registerModule('user', Transport.RMQ, [getRMQUrl()]),
    ],
    controllers: [AppController, AuthRpcController],
    providers: [RedisProvider, AppService, AuthGuard],
    exports: [RedisProvider, AppService, AuthGuard],
})
export class AppModule { }
