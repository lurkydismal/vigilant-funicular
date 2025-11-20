import { AuthController } from './auth.controller';
import { AuthGuard } from './guard/auth.guard';
import { AuthRpcController } from './auth.rpc.controller';
import { AuthService } from './auth.service';
import { DefaultModule } from 'backend-lib/default.module';
import { JWTModule } from 'backend-lib/jwt.module';
import { Module } from '@nestjs/common';
import { RedisProvider } from '../backend-lib/redis.provider';
import { Transport } from '@nestjs/microservices';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { getRMQUrl } from 'backend-lib/stdfunc';
import { registerModule } from 'backend-lib/dynamic.module';
import { registerTypeORM } from 'backend-lib/typeorm.module';

@Module({
  imports: [
    DefaultModule,
    JWTModule,
    UserModule,
    registerModule('auth', Transport.RMQ, [getRMQUrl()]),
    registerModule('user', Transport.RMQ, [getRMQUrl()]),
    registerTypeORM([User]),
  ],
  controllers: [AuthController, AuthRpcController],
  providers: [RedisProvider, AuthService, AuthGuard],
  exports: [RedisProvider, AuthService, AuthGuard],
})
export class AuthModule {}
