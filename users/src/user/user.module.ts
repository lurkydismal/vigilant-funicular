import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEventsController } from './user.events';
import { UserService } from './user.service';
import { Profile } from './profile.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Profile])],
    controllers: [UserController, UserEventsController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }
