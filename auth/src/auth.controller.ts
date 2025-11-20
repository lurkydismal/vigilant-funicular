import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth.service';
import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Res,
    UseGuards,
    Get,
    Param,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { LoginDto } from './DTO/login.dto';
import { RegisterDto } from './DTO/register.dto';
import { setResponseCookie } from 'backend-lib/stdfunc';
import { type Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './DTO/user.dto';
import { UserRequestQueryDto } from './DTO/user.request.query.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    private setAccessTokenCookie(
        response: Response,
        token: string,
        needRemember?: boolean,
    ) {
        setResponseCookie(response, 'accessToken', token, needRemember, true);
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(
        @Body() dto: RegisterDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const data = await this.authService.register(dto.username, dto.password);

        this.setAccessTokenCookie(res, data.accessToken);

        return data.user;
    }

    @Post('login')
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const data = await this.authService.login(dto.username, dto.password);

        this.setAccessTokenCookie(res, data.accessToken, dto.rememberMe ?? false);

        return data.user;
    }

    @UseGuards(AuthGuard)
    @Post('verify')
    async verify() { }

    @UseGuards(AuthGuard)
    @Get('user/:id')
    async getUser(@Param('id', ParseIntPipe) id: number) {
        const user = this.authService.findOneById(id);

        return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
    }

    @Get('users')
    async getUsersBatch(@Query() query: UserRequestQueryDto) {
        const users = await this.authService.findManyByIds(query.ids);

        return users.map(u => plainToInstance(UserDto, u, { excludeExtraneousValues: true }));
    }
}
