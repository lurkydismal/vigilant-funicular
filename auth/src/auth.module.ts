import { AuthController } from './auth.controller';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth.service';
import { DefaultModule } from 'backend-lib/module/default.module';
import { JWTModule } from 'backend-lib/module/jwt.module';
import { Module } from '@nestjs/common';
import { RedisProvider } from '../backend-lib/redis.provider';
import { Transport } from '@nestjs/microservices';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { getRMQUrl } from 'backend-lib/stdfunc';
import { registerModule } from 'backend-lib/module/dynamic.module';
import { registerTypeORM } from 'backend-lib/module/typeorm.module';

@Module({
    imports: [
        DefaultModule,
        JWTModule,
        UserModule,
        registerModule('user', Transport.RMQ, [getRMQUrl()]),
        registerTypeORM([User]),
    ],
    controllers: [AuthController],
    providers: [RedisProvider, AuthService, AuthGuard],
})
export class AuthModule { }
