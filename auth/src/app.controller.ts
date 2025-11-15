import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { Controller, Post, Body, HttpCode, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';
import { setAccessTokenCookie } from './stdfunc';
import { type Response } from 'express';

@Controller('auth')
export class AppController {
    constructor(
        @InjectPinoLogger(AppService.name) private readonly logger: PinoLogger,
        private readonly app: AppService) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
        this.logger.trace(dto, 'Registration request');

        const data = await this.app.register(dto.username, dto.password);

        setAccessTokenCookie(res, data.accessToken);

        this.logger.debug(data, 'register success');

        return data.user;
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        this.logger.trace(dto, 'Login request');

        const data = await this.app.login(dto.username, dto.password);

        setAccessTokenCookie(res, data.accessToken, dto.rememberMe ?? false);

        this.logger.(data, 'register success');

        return data.user;
    }

    @UseGuards(AuthGuard)
    @Post('verify')
    @HttpCode(HttpStatus.OK)
    async verify() {
        this.logger.trace('Verify request');
    }
}
