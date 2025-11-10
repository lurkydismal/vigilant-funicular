import { setAccessTokenCookie } from './stdfunc';
import { Controller, Post, Body, HttpCode, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDto } from './register.dto';
import { type Response } from 'express';
import { LoginDto } from './login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AppController {
    constructor(private readonly app: AppService) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
        const data = await this.app.register(dto.username, dto.password);

        setAccessTokenCookie(res, data.accessToken);

        return data.user;
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const data = await this.app.login(dto.username, dto.password);

        setAccessTokenCookie(res, data.accessToken, dto.rememberMe ?? false);

        return data.user;
    }

    @UseGuards(AuthGuard)
    @Post('verify')
    @HttpCode(HttpStatus.OK)
    async verify() {
    }
}
