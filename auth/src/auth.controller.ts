import { AppService } from './auth.service';
import { setResponseCookie } from 'backend-lib/stdfunc';
import { AuthGuard } from './auth.guard';
import { Controller, Post, Body, HttpCode, HttpStatus, Res, UseGuards, Get, Param } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';
import { type Response } from 'express';

@Controller('auth')
export class AppController {
    constructor(
        @InjectPinoLogger(AppService.name) private readonly logger: PinoLogger,
        private readonly app: AppService) { }

    private setAccessTokenCookie(response: Response, token: string, needRemember?: boolean) {
        setResponseCookie(response, 'accessToken', token, needRemember, true);
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
        this.logger.trace(dto, 'Registration request');

        const data = await this.app.register(dto.username, dto.password);

        this.setAccessTokenCookie(res, data.accessToken);

        return data.user;
    }

    @Post('login')
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        this.logger.trace(dto, 'Login request');

        const data = await this.app.login(dto.username, dto.password);

        this.setAccessTokenCookie(res, data.accessToken, dto.rememberMe ?? false);

        return data.user;
    }

    @UseGuards(AuthGuard)
    @Post('verify')
    async verify() {
        this.logger.trace('Verify request');
    }

    @UseGuards(AuthGuard)
    @Get('user/:id')
    async getUser(@Param('id') id: number) {
        return this.app.getUser(id);
    }
}
