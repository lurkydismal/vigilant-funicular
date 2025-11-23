import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth.service';
import { Controller, Post, Body, HttpCode, HttpStatus, Res, UseGuards, Get, Param, Query, ParseIntPipe, } from '@nestjs/common';
import { LoginDto } from './DTO/login.dto';
import { RegisterDto } from './DTO/register.dto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { setResponseCookie } from 'backend-lib/stdfunc';
import { type Response } from 'express';
import { UserRequestQueryDto } from './DTO/user.request.query.dto';

@Controller('auth')
export class AuthController {
    constructor(
        @InjectPinoLogger(AuthGuard.name) private readonly logger: PinoLogger,
        private readonly authService: AuthService
    ) { }

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
        this.logger.debug({ id });

        const user = this.authService.findOneById(id);

        return user;
    }

    @UseGuards(AuthGuard)
    @Get('users')
    async getUsersBatch(@Query() query: UserRequestQueryDto) {
        this.logger.debug({ ids: query.ids });

        const users = await this.authService.findManyByIds(query.ids);

        return users;
    }
}
