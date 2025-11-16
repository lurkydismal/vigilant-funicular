import * as argon2 from 'argon2';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
    constructor(
        @InjectPinoLogger(AppService.name) private readonly logger: PinoLogger,
        private readonly users: UsersService,
        private readonly jwt: JwtService,
        @Inject('USER_SERVICE') private readonly client: ClientProxy
    ) { }

    private jwtPayload(user: { id: number; username: string }) {
        return { sub: String(user.id), username: user.username };
    }

    async register(username: string, password: string) {
        try {
            const user = await this.users.createUser({ username: username, password });

            try {
                this.client.emit('user.created', { id: user.id });
                this.logger.trace(user, 'user.created event emitted');
            } catch (err) {
                this.logger.error({ err, user: user }, 'Emitting user.created event');
            }

            const token = await this.jwt.signAsync(this.jwtPayload({ id: user.id, username: user.username }));

            return { user: this.users.sanitize(user), accessToken: token };
        } catch (err) {
            // users.createUser already throws ConflictException for duplicates
            if (err.name === 'ConflictException') throw err;

            throw new InternalServerErrorException('Failed to create user');
        }
    }

    async login(username: string, password: string) {
        const user = await this.users.findByUsername(username);

        if (!user) {
            this.logger.debug({ username }, 'User not found');

            throw new UnauthorizedException('Invalid credentials');
        }

        const ok = await argon2.verify(user.passwordHash, password);

        if (!ok) {
            this.logger.debug(user, 'Password mismatch');

            throw new UnauthorizedException('Invalid credentials');
        }

        const token = await this.jwt.signAsync(this.jwtPayload({ id: user.id, username: user.username }));

        return { user: this.users.sanitize(user), accessToken: token };
    }

    async getUser(id: number) {
        const user = await this.users.findById(id);

        return { user: this.users.sanitize(user) };
    }
}
