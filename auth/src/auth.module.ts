import { AppController } from './auth.controller';
import { AppService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthRpcController } from './auth.rpc.controller';
import { JWTModule } from 'backend-lib/jwt.module';
import { Module } from '@nestjs/common';
import { RedisProvider } from '../backend-lib/redis.provider';
import { Transport } from '@nestjs/microservices';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { getRMQUrl } from 'backend-lib/stdfunc';
import { registerModule } from 'backend-lib/dynamic.module';
import { registerTypeORM } from 'backend-lib/typeorm.module';
import { DefaultModule } from 'backend-lib/default.module';

@Module({
    imports: [
        DefaultModule,
        registerTypeORM([User]),
        JWTModule,
        UserModule,
        registerModule('auth', Transport.RMQ, [getRMQUrl()]),
        registerModule('user', Transport.RMQ, [getRMQUrl()]),
    ],
    controllers: [AppController, AuthRpcController],
    providers: [RedisProvider, AppService, AuthGuard],
    exports: [RedisProvider, AppService, AuthGuard],
})
export class AppModule { }
