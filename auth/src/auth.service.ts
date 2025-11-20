import * as argon2 from 'argon2';
import { ClientProxy } from '@nestjs/microservices';
import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectPinoLogger(AuthService.name) private readonly logger: PinoLogger,
        private readonly user: UserService,
        private readonly jwt: JwtService,
        @Inject('USER_SERVICE') private readonly client: ClientProxy,
    ) { }

    private jwtPayload(user: { id: number; username: string }) {
        return { sub: String(user.id), username: user.username };
    }

    async register(username: string, password: string) {
        try {
            const user = await this.user.createUser({ username: username, password });

            try {
                this.client.emit('user.created', { id: user.id });

                this.logger.trace(user, 'user.created event emitted');
            } catch (err) {
                this.logger.error({ err, user: user }, 'Emitting user.created event');
            }

            const token = await this.jwt.signAsync(
                this.jwtPayload({ id: user.id, username: user.username }),
            );

            return { user: this.user.sanitize(user), accessToken: token };
        } catch (err) {
            // user.createUser already throws ConflictException for duplicates
            if (err.name === 'ConflictException') throw err;

            throw new InternalServerErrorException('Failed to create user');
        }
    }

    async login(username: string, password: string) {
        const user = await this.user.findOneByUsername(username);

        if (!user) {
            this.logger.debug({ username }, 'User not found');

            throw new UnauthorizedException('Invalid credentials');
        }

        const ok = await argon2.verify(user.passwordHash, password);

        if (!ok) {
            this.logger.debug(user, 'Password mismatch');

            throw new UnauthorizedException('Invalid credentials');
        }

        const token = await this.jwt.signAsync(
            this.jwtPayload({ id: user.id, username: user.username }),
        );

        return { user: this.user.sanitize(user), accessToken: token };
    }

    async findOneById(id: number) {
        const user = await this.user.findOneById(id);

        return { user: this.user.sanitize(user) };
    }

    async findManyByIds(ids: number[]) {
        return await this.user.findManyByIds(ids);
    }
}
