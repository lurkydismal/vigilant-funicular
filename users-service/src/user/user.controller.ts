import { Controller, Get, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './update-profile.dto';

@Controller('users')
export class UserController {
    constructor(private svc: UserService) { }

    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
        return this.svc.getProfileByUserId(id);
    }

    @Patch(':id')
    patch(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProfileDto) {
        return this.svc.saveProfile(id, { avatarUrl: dto.avatarUrl });
    }
}
