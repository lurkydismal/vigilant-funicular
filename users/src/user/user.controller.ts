import {
    Controller,
    Get,
    Patch,
    Param,
    Body,
    ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { UpdateProfileDto } from './update-profile.dto';

@Controller('users')
export class UserController {
    constructor(
        @InjectPinoLogger(UserController.name) private readonly logger: PinoLogger,
        private svc: UserService
    ) { }

    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
        this.logger.trace(id, 'User profile get request');

        return this.svc.getProfileByUserId(id);
    }

    @Patch(':id')
    patch(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProfileDto) {
        this.logger.trace(id, 'User profile patch request');

        return this.svc.saveProfile(id, { avatarUrl: dto.avatarUrl });
    }
}

// const payload = await this.jwt.verifyAsync(token);
// console.log(payload.id, payload.username);
//
// @Get('profile')
// async profile(@Req() request) {
//     const token = request.cookies?.accessToken;
//     if (!token) throw new UnauthorizedException();
//
//     const payload = await this.jwt.verifyAsync(token);
//
//     return {
//         id: payload.id,
//         username: payload.username,
//     };
// }
