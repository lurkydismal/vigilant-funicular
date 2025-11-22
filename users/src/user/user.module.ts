import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEventsController } from './user.events';
import { UserService } from './user.service';
import { Profile } from './profile.entity';
import { NetworkService } from './network.service';

@Module({
    imports: [TypeOrmModule.forFeature([Profile])],
    controllers: [UserController, UserEventsController],
    providers: [UserService, NetworkService],
    exports: [UserService, NetworkService],
})
export class UserModule { }
